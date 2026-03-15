import type {
  ASTNode,
  DocumentNode,
  SectionNode,
  ParagraphNode,
  DefinitionListNode,
  DefinitionItemNode,
  CodeBlockNode,
  TableNode,
  ListNode,
  ListItemNode,
} from './types.js';
import { NodeType } from './types.js';
import { parsePreamble, generateFrontmatter } from './frontmatter.js';

/**
 * Map of scdoc cross-references to documentation site paths.
 * Internal aerc pages map to /reference/ paths; external tools to their docs.
 */
const REFERENCE_MAP: Record<string, string> = {
  'aerc(1)': '/reference/aerc.1/',
  'aerc-search(1)': '/reference/aerc-search.1/',
  'aerc-accounts(5)': '/reference/aerc-accounts.5/',
  'aerc-binds(5)': '/reference/aerc-binds.5/',
  'aerc-config(5)': '/reference/aerc-config.5/',
  'aerc-imap(5)': '/reference/aerc-imap.5/',
  'aerc-jmap(5)': '/reference/aerc-jmap.5/',
  'aerc-maildir(5)': '/reference/aerc-maildir.5/',
  'aerc-notmuch(5)': '/reference/aerc-notmuch.5/',
  'aerc-sendmail(5)': '/reference/aerc-sendmail.5/',
  'aerc-smtp(5)': '/reference/aerc-smtp.5/',
  'aerc-patch(7)': '/reference/aerc-patch.7/',
  'aerc-stylesets(7)': '/reference/aerc-stylesets.7/',
  'aerc-templates(7)': '/reference/aerc-templates.7/',
  'aerc-tutorial(7)': '/reference/aerc-tutorial.7/',
  'carddav-query(1)': '/reference/carddav-query.1/',
  // External references
  'notmuch(1)': 'https://notmuchmail.org/manpages/notmuch-1/',
  'notmuch-search-terms(7)': 'https://notmuchmail.org/manpages/notmuch-search-terms-7/',
  'less(1)': 'https://man7.org/linux/man-pages/man1/less.1.html',
  'strftime(3)': 'https://man7.org/linux/man-pages/man3/strftime.3.html',
  'tty(1)': 'https://man7.org/linux/man-pages/man1/tty.1.html',
  'xargs(1)': 'https://man7.org/linux/man-pages/man1/xargs.1.html',
  'sh(1)': 'https://man7.org/linux/man-pages/man1/sh.1p.html',
  'w3m(1)': 'https://man7.org/linux/man-pages/man1/w3m.1.html',
  'gpg(1)': 'https://man7.org/linux/man-pages/man1/gpg.1.html',
  'sendmail(8)': 'https://man7.org/linux/man-pages/man8/sendmail.8.html',
};

/**
 * Convert inline scdoc formatting to markdown.
 *
 * scdoc uses:
 *   *text* → bold (we emit **text**)
 *   _text_ → underline/italic (we emit *text*)
 *
 * Cross-references like *aerc-config*(5) become linked text.
 */
export function convertInline(text: string): string {
  let result = text;

  // First, handle cross-references: *name*(section) → [name(section)](link)
  // This must come before general bold conversion
  result = result.replace(
    /\*([a-zA-Z0-9_-]+)\*\((\d+)\)/g,
    (_match, name: string, section: string) => {
      const ref = `${name}(${section})`;
      const link = REFERENCE_MAP[ref];
      if (link) {
        return `[${ref}](${link})`;
      }
      return `\`${ref}\``;
    }
  );

  // Convert scdoc bold *text* to markdown **text**
  // Careful not to match already-converted references or asterisks in paths
  result = result.replace(
    /\*([^*\n]+)\*/g,
    (_match, content: string) => {
      // Don't double-convert things that look like they were already processed
      if (content.includes('](')) return _match;
      return `**${content}**`;
    }
  );

  // Convert scdoc underline _text_ to markdown *text* (italic)
  // Be careful with URLs containing underscores and file paths
  result = result.replace(
    /(?<![/\w])_([^_\n]+)_(?![/\w])/g,
    (_match, content: string) => {
      // Don't convert if it looks like a URL or file path
      if (content.includes('://') || content.includes('/')) {
        return `*${content}*`;
      }
      return `*${content}*`;
    }
  );

  // Convert bare URLs that are wrapped in _underscores_ to links
  result = result.replace(
    /\*?(https?:\/\/[^\s*>]+)\*?/g,
    (_match, url: string) => {
      // If it's already inside a markdown link, don't touch it
      if (result.includes(`](${url})`)) return _match;
      return url;
    }
  );

  return result;
}

/**
 * Remove a level of tab indentation from a line.
 */
function stripIndent(line: string, levels: number = 1): string {
  let result = line;
  for (let i = 0; i < levels; i++) {
    if (result.startsWith('\t')) {
      result = result.slice(1);
    }
  }
  return result;
}

/**
 * Emit a complete markdown document from a DocumentNode AST.
 */
export function emit(doc: DocumentNode, upstreamVersion?: string): string {
  const parts: string[] = [];

  // Generate frontmatter from preamble
  if (doc.preamble) {
    const fm = parsePreamble(doc.preamble);
    parts.push(generateFrontmatter(fm, upstreamVersion));
    parts.push('');

    // Version and auto-generated banners
    if (upstreamVersion) {
      parts.push(
        `:::tip[aerc ${upstreamVersion}]`,
        `This reference tracks **aerc ${upstreamVersion}**. ` +
          '[View upstream source](https://git.sr.ht/~rjarry/aerc/tree/master/item/doc).',
        ':::'
      );
      parts.push('');
    }

    parts.push(
      ':::note[Auto-generated reference]',
      'This page is auto-generated from the upstream aerc man pages. ' +
        'To suggest changes, submit patches to the ' +
        '[aerc mailing list](https://lists.sr.ht/~rjarry/aerc-devel).',
      ':::'
    );
    parts.push('');
  }

  // Emit sections
  for (const section of doc.children) {
    emitSection(section, parts);
  }

  // Clean up trailing newlines
  let result = parts.join('\n');
  result = result.replace(/\n{3,}/g, '\n\n');
  result = result.trimEnd() + '\n';

  return result;
}

/**
 * Emit a section and its children.
 */
function emitSection(section: SectionNode, parts: string[]): void {
  // Skip NAME and AUTHORS sections — frontmatter covers title,
  // and AUTHORS is boilerplate
  if (section.title === 'NAME' || section.title === 'AUTHORS') {
    return;
  }

  if (section.title) {
    const prefix = '#'.repeat(section.level + 1); // h1 → ##, h2 → ###
    parts.push(`${prefix} ${section.title}`);
    parts.push('');
  }

  for (const child of section.children) {
    emitNode(child, parts);
  }
}

/**
 * Emit any AST node to markdown.
 */
function emitNode(node: ASTNode, parts: string[]): void {
  switch (node.type) {
    case NodeType.SECTION:
      emitSection(node as SectionNode, parts);
      break;
    case NodeType.PARAGRAPH:
      emitParagraph(node as ParagraphNode, parts);
      break;
    case NodeType.DEFINITION_LIST:
      emitDefinitionList(node as DefinitionListNode, parts);
      break;
    case NodeType.CODE_BLOCK:
      emitCodeBlock(node as CodeBlockNode, parts);
      break;
    case NodeType.TABLE:
      emitTable(node as TableNode, parts);
      break;
    case NodeType.LIST:
      emitList(node as ListNode, parts);
      break;
    default:
      break;
  }
}

/**
 * Emit a paragraph.
 */
function emitParagraph(para: ParagraphNode, parts: string[]): void {
  const lines = para.lines.map((l) => convertInline(l));
  parts.push(lines.join('\n'));
  parts.push('');
}

/**
 * Emit a definition list as markdown definition-style content.
 * Uses bold term + indented description (renders well in Starlight).
 */
function emitDefinitionList(dl: DefinitionListNode, parts: string[]): void {
  for (const item of dl.children) {
    emitDefinitionItem(item, parts);
  }
}

/**
 * Emit a single definition item.
 */
function emitDefinitionItem(item: DefinitionItemNode, parts: string[]): void {
  // Emit term (convert inline formatting)
  const term = convertInline(item.term);
  parts.push(term);
  parts.push('');

  // Emit description, processing indented content
  if (item.description.length > 0) {
    const descLines: string[] = [];

    for (const rawLine of item.description) {
      if (rawLine === '') {
        descLines.push('');
        continue;
      }

      // Strip one level of indentation and convert inline
      const stripped = stripIndent(rawLine);
      const converted = convertInline(stripped);

      // Detect sub-definitions (indented bold terms)
      if (stripped.startsWith('\t')) {
        // Double-indented content — keep as indented
        const innerStripped = stripIndent(stripped);
        descLines.push(`  ${convertInline(innerStripped)}`);
      } else if (stripped.startsWith('- ')) {
        // Sub-list items
        descLines.push(converted);
      } else {
        // Regular indented description text — prefix with >
        // Actually, let's just use regular indented text
        descLines.push(`> ${converted}`);
      }
    }

    parts.push(descLines.join('\n'));
    parts.push('');
  }

  // Emit nested code blocks
  for (const child of item.children || []) {
    emitNode(child, parts);
  }
}

/**
 * Emit a code block.
 */
function emitCodeBlock(cb: CodeBlockNode, parts: string[]): void {
  const lang = cb.language || '';
  parts.push(`\`\`\`${lang}`);
  for (const line of cb.lines) {
    parts.push(line);
  }
  parts.push('```');
  parts.push('');
}

/**
 * Emit a markdown table.
 */
function emitTable(table: TableNode, parts: string[]): void {
  if (table.headers.length === 0) return;

  // Header row
  const headerCells = table.headers.map((h) => ` ${convertInline(h)} `);
  parts.push(`|${headerCells.join('|')}|`);

  // Separator row
  const separators = table.alignments.map((a) => {
    switch (a) {
      case 'c':
        return ':---:';
      case 'r':
        return '---:';
      default:
        return '---';
    }
  });
  parts.push(`|${separators.join('|')}|`);

  // Data rows
  for (const row of table.rows) {
    // Pad row to match header length
    while (row.length < table.headers.length) {
      row.push('');
    }
    const cells = row.map((c) => ` ${convertInline(c)} `);
    parts.push(`|${cells.join('|')}|`);
  }

  parts.push('');
}

/**
 * Emit a bullet list.
 */
function emitList(list: ListNode, parts: string[]): void {
  for (const item of list.children) {
    const lines = item.lines.map((l) => convertInline(l));
    parts.push(`- ${lines[0]}`);
    for (let i = 1; i < lines.length; i++) {
      parts.push(`  ${lines[i]}`);
    }
  }
  parts.push('');
}
