import type {
  Token,
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
import { TokenType, NodeType } from './types.js';

/**
 * Tokenize a line of scdoc source into a Token.
 * Context-sensitive: needs to know if we're inside a code block.
 */
function tokenizeLine(line: string, inCodeBlock: boolean): Token {
  // Inside code block: everything is a code line except closing ```
  if (inCodeBlock) {
    if (line === '```') {
      return { type: TokenType.CODE_BLOCK_DELIMITER, raw: line };
    }
    return { type: TokenType.CODE_LINE, raw: line };
  }

  // Code block start
  if (line === '```') {
    return { type: TokenType.CODE_BLOCK_DELIMITER, raw: line };
  }

  // Blank line
  if (line.trim() === '') {
    return { type: TokenType.BLANK_LINE, raw: line };
  }

  // Header: ## or #
  const headerMatch = line.match(/^(#{1,2})\s+(.+)$/);
  if (headerMatch) {
    return {
      type: TokenType.HEADER,
      raw: line,
      value: headerMatch[2],
      level: headerMatch[1].length,
    };
  }

  // Table header row: [[ or :[
  if (line.match(/^\[{2}\s+/) || line.match(/^:\[/)) {
    return { type: TokenType.TABLE_HEADER, raw: line, value: line };
  }

  // Table data row: | or : at start (but not :[ which is header)
  if (line.match(/^\|\s{1,2}/) || line.match(/^:\s{1,2}/)) {
    return { type: TokenType.TABLE_ROW, raw: line, value: line };
  }

  // Line continuation marker (++ at end of previous content)
  if (line.match(/\+\+\s*$/)) {
    const content = line.replace(/\+\+\s*$/, '').trimEnd();
    return { type: TokenType.LINE_CONTINUATION, raw: line, value: content };
  }

  // List item: - at start (not indented)
  if (line.match(/^- /)) {
    return { type: TokenType.LIST_ITEM, raw: line, value: line.slice(2) };
  }

  // Indented list item
  if (line.match(/^\t+- /)) {
    const indent = line.match(/^(\t+)/)![1].length;
    const content = line.replace(/^\t+- /, '');
    return {
      type: TokenType.LIST_ITEM,
      raw: line,
      value: content,
      indent,
    };
  }

  // Indented text (definition body or sub-content)
  if (line.startsWith('\t')) {
    const indent = line.match(/^(\t+)/)![1].length;
    const content = line.replace(/^\t+/, '');

    // Check if this looks like a definition term (bold text as first element)
    if (indent === 1 && content.match(/^\*/)) {
      return {
        type: TokenType.INDENTED_TEXT,
        raw: line,
        value: content,
        indent,
      };
    }

    return {
      type: TokenType.INDENTED_TEXT,
      raw: line,
      value: content,
      indent,
    };
  }

  // Check if first line (preamble): ALL_CAPS_WITH_DASHES(N)
  if (line.match(/^[A-Z][A-Z0-9_-]+\(\d+\)\s*$/)) {
    return { type: TokenType.PREAMBLE, raw: line, value: line.trim() };
  }

  // Definition term at top level: starts with * (bold markup)
  if (line.match(/^\*/)) {
    return { type: TokenType.DEFINITION, raw: line, value: line };
  }

  // Default: regular text
  return { type: TokenType.TEXT, raw: line, value: line };
}

/**
 * Tokenize an entire scdoc source file into tokens.
 */
export function tokenize(source: string): Token[] {
  const lines = source.split('\n');
  const tokens: Token[] = [];
  let inCodeBlock = false;

  for (const line of lines) {
    const token = tokenizeLine(line, inCodeBlock);
    tokens.push(token);

    if (token.type === TokenType.CODE_BLOCK_DELIMITER) {
      inCodeBlock = !inCodeBlock;
    }
  }

  return tokens;
}

/**
 * Build an AST from a token stream.
 */
export function buildAST(tokens: Token[]): DocumentNode {
  const doc: DocumentNode = {
    type: NodeType.DOCUMENT,
    preamble: '',
    children: [],
  };

  let i = 0;

  // Skip leading blank lines
  while (i < tokens.length && tokens[i].type === TokenType.BLANK_LINE) {
    i++;
  }

  // Parse preamble
  if (i < tokens.length && tokens[i].type === TokenType.PREAMBLE) {
    doc.preamble = tokens[i].value!;
    i++;
  }

  // Skip blank lines after preamble
  while (i < tokens.length && tokens[i].type === TokenType.BLANK_LINE) {
    i++;
  }

  // Parse sections
  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === TokenType.HEADER) {
      const section = parseSection(tokens, i);
      doc.children.push(section.node);
      i = section.nextIndex;
    } else if (token.type === TokenType.BLANK_LINE) {
      i++;
    } else {
      // Content before first header — create implicit section
      const content = parseContent(tokens, i);
      if (content.nodes.length > 0) {
        const implicitSection: SectionNode = {
          type: NodeType.SECTION,
          title: '',
          level: 1,
          children: content.nodes,
        };
        doc.children.push(implicitSection);
      }
      i = content.nextIndex;
    }
  }

  return doc;
}

/**
 * Parse a section starting at a header token.
 */
function parseSection(
  tokens: Token[],
  startIndex: number
): { node: SectionNode; nextIndex: number } {
  const headerToken = tokens[startIndex];
  const section: SectionNode = {
    type: NodeType.SECTION,
    title: headerToken.value!,
    level: headerToken.level!,
    children: [],
  };

  let i = startIndex + 1;

  // Skip blank lines after header
  while (i < tokens.length && tokens[i].type === TokenType.BLANK_LINE) {
    i++;
  }

  // Parse content until next section of same or higher level
  while (i < tokens.length) {
    const token = tokens[i];

    // Stop at a header of same or higher level
    if (
      token.type === TokenType.HEADER &&
      token.level! <= section.level
    ) {
      break;
    }

    // Nested subsection
    if (token.type === TokenType.HEADER && token.level! > section.level) {
      const sub = parseSection(tokens, i);
      section.children.push(sub.node);
      i = sub.nextIndex;
      continue;
    }

    if (token.type === TokenType.BLANK_LINE) {
      i++;
      continue;
    }

    // Parse content blocks
    const content = parseContent(tokens, i);
    section.children.push(...content.nodes);
    i = content.nextIndex;
  }

  return { node: section, nextIndex: i };
}

/**
 * Parse content blocks (paragraphs, definitions, code blocks, tables, lists)
 * until a header or end of tokens.
 */
function parseContent(
  tokens: Token[],
  startIndex: number
): { nodes: ASTNode[]; nextIndex: number } {
  const nodes: ASTNode[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === TokenType.HEADER) {
      break;
    }

    if (token.type === TokenType.BLANK_LINE) {
      i++;
      continue;
    }

    // Code block
    if (token.type === TokenType.CODE_BLOCK_DELIMITER) {
      const cb = parseCodeBlock(tokens, i);
      nodes.push(cb.node);
      i = cb.nextIndex;
      continue;
    }

    // Table
    if (token.type === TokenType.TABLE_HEADER) {
      const table = parseTable(tokens, i);
      nodes.push(table.node);
      i = table.nextIndex;
      continue;
    }

    // List item at top level
    if (token.type === TokenType.LIST_ITEM && (!token.indent || token.indent === 0)) {
      const list = parseList(tokens, i);
      nodes.push(list.node);
      i = list.nextIndex;
      continue;
    }

    // Definition (bold term at start of line, followed by indented body)
    if (token.type === TokenType.DEFINITION || token.type === TokenType.LINE_CONTINUATION) {
      const defList = parseDefinitionList(tokens, i);
      nodes.push(defList.node);
      i = defList.nextIndex;
      continue;
    }

    // Regular text paragraph
    if (token.type === TokenType.TEXT || token.type === TokenType.INDENTED_TEXT) {
      const para = parseParagraph(tokens, i);
      nodes.push(para.node);
      i = para.nextIndex;
      continue;
    }

    // Fallback: skip
    i++;
  }

  return { nodes, nextIndex: i };
}

/**
 * Parse a code block between ``` delimiters.
 */
function parseCodeBlock(
  tokens: Token[],
  startIndex: number
): { node: CodeBlockNode; nextIndex: number } {
  const node: CodeBlockNode = {
    type: NodeType.CODE_BLOCK,
    lines: [],
  };

  let i = startIndex + 1; // skip opening ```

  while (i < tokens.length && tokens[i].type !== TokenType.CODE_BLOCK_DELIMITER) {
    node.lines.push(tokens[i].raw);
    i++;
  }

  if (i < tokens.length) {
    i++; // skip closing ```
  }

  return { node, nextIndex: i };
}

/**
 * Parse a table from [[ header rows and | data rows.
 */
function parseTable(
  tokens: Token[],
  startIndex: number
): { node: TableNode; nextIndex: number } {
  const headers: string[] = [];
  const alignments: string[] = [];
  const rows: string[][] = [];
  let i = startIndex;

  // Parse header columns
  while (i < tokens.length && tokens[i].type === TokenType.TABLE_HEADER) {
    const raw = tokens[i].raw;
    // [[ Header or :[ Header
    const match = raw.match(/^(?:\[\[|:\[)\s+(.+)$/);
    if (match) {
      let headerText = match[1].trim();
      // Check for bold markers
      headerText = headerText.replace(/^\*/, '').replace(/\*$/, '');
      headers.push(headerText);

      // Determine alignment: [[ = left, :[ = center
      if (raw.startsWith(':[')) {
        alignments.push('l'); // scdoc :[ means "continuation column"
      } else {
        alignments.push('l');
      }
    }
    i++;
  }

  // Parse data rows
  let currentRow: string[] = [];
  while (i < tokens.length) {
    const token = tokens[i];

    if (
      token.type === TokenType.TABLE_ROW ||
      (token.type === TokenType.TABLE_HEADER && !token.raw.match(/^\[{2}/))
    ) {
      const raw = token.raw;

      if (raw.startsWith('|')) {
        // New row starts with |
        if (currentRow.length > 0) {
          rows.push(currentRow);
        }
        currentRow = [];
        const cellMatch = raw.match(/^\|\s{1,2}(.+)$/);
        if (cellMatch) {
          currentRow.push(cellMatch[1].trim());
        }
      } else if (raw.startsWith(':')) {
        // Continuation cell
        const cellMatch = raw.match(/^:\s{1,2}(.+)$/);
        if (cellMatch) {
          currentRow.push(cellMatch[1].trim());
        }
      }
      i++;
    } else if (token.type === TokenType.BLANK_LINE) {
      break;
    } else {
      break;
    }
  }

  if (currentRow.length > 0) {
    rows.push(currentRow);
  }

  return {
    node: {
      type: NodeType.TABLE,
      headers,
      alignments,
      rows,
    },
    nextIndex: i,
  };
}

/**
 * Parse a bullet list starting at a LIST_ITEM token.
 */
function parseList(
  tokens: Token[],
  startIndex: number
): { node: ListNode; nextIndex: number } {
  const items: ListItemNode[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === TokenType.LIST_ITEM && (!token.indent || token.indent === 0)) {
      const lines = [token.value!];
      i++;

      // Continuation lines (indented text that's part of this item)
      while (
        i < tokens.length &&
        tokens[i].type === TokenType.INDENTED_TEXT &&
        tokens[i].indent === 1
      ) {
        lines.push(tokens[i].value!);
        i++;
      }

      items.push({
        type: NodeType.LIST_ITEM,
        lines,
      });
    } else if (token.type === TokenType.BLANK_LINE) {
      // Check if next non-blank is still a list item
      let j = i;
      while (j < tokens.length && tokens[j].type === TokenType.BLANK_LINE) {
        j++;
      }
      if (
        j < tokens.length &&
        tokens[j].type === TokenType.LIST_ITEM &&
        (!tokens[j].indent || tokens[j].indent === 0)
      ) {
        i = j;
        continue;
      }
      break;
    } else {
      break;
    }
  }

  return {
    node: {
      type: NodeType.LIST,
      children: items,
    },
    nextIndex: i,
  };
}

/**
 * Parse a definition list (one or more definition items).
 */
function parseDefinitionList(
  tokens: Token[],
  startIndex: number
): { node: DefinitionListNode; nextIndex: number } {
  const items: DefinitionItemNode[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    // A definition starts with a bold term (DEFINITION) or LINE_CONTINUATION
    if (token.type === TokenType.DEFINITION || token.type === TokenType.LINE_CONTINUATION) {
      const item = parseDefinitionItem(tokens, i);
      items.push(item.node);
      i = item.nextIndex;
    } else if (token.type === TokenType.BLANK_LINE) {
      // Check if next non-blank is another definition
      let j = i;
      while (j < tokens.length && tokens[j].type === TokenType.BLANK_LINE) {
        j++;
      }
      if (
        j < tokens.length &&
        (tokens[j].type === TokenType.DEFINITION ||
          tokens[j].type === TokenType.LINE_CONTINUATION)
      ) {
        i = j;
        continue;
      }
      break;
    } else {
      break;
    }
  }

  return {
    node: {
      type: NodeType.DEFINITION_LIST,
      children: items,
    },
    nextIndex: i,
  };
}

/**
 * Parse a single definition item: term line(s) + indented description.
 */
function parseDefinitionItem(
  tokens: Token[],
  startIndex: number
): { node: DefinitionItemNode; nextIndex: number } {
  let i = startIndex;
  const termParts: string[] = [];

  // Collect term lines (may span multiple lines with ++)
  while (i < tokens.length) {
    const token = tokens[i];
    if (token.type === TokenType.LINE_CONTINUATION) {
      termParts.push(token.value!);
      i++;
    } else if (token.type === TokenType.DEFINITION) {
      termParts.push(token.value!);
      i++;
      break;
    } else {
      break;
    }
  }

  const term = termParts.join('\n');
  const description: string[] = [];
  const children: ASTNode[] = [];

  // Collect description (indented text, sub-lists, code blocks, etc.)
  while (i < tokens.length) {
    const token = tokens[i];

    if (token.type === TokenType.INDENTED_TEXT) {
      description.push(token.raw);
      i++;
    } else if (token.type === TokenType.LIST_ITEM && token.indent && token.indent > 0) {
      description.push(token.raw);
      i++;
    } else if (token.type === TokenType.CODE_BLOCK_DELIMITER) {
      // Code block within definition
      const cb = parseCodeBlock(tokens, i);
      children.push(cb.node);
      i = cb.nextIndex;
    } else if (token.type === TokenType.BLANK_LINE) {
      // Blank line might be within definition or might end it
      let j = i + 1;
      while (j < tokens.length && tokens[j].type === TokenType.BLANK_LINE) {
        j++;
      }
      // If next content is indented, it's still part of this definition
      if (
        j < tokens.length &&
        (tokens[j].type === TokenType.INDENTED_TEXT ||
          (tokens[j].type === TokenType.LIST_ITEM && tokens[j].indent && tokens[j].indent! > 0) ||
          tokens[j].type === TokenType.CODE_BLOCK_DELIMITER)
      ) {
        description.push('');
        i = j;
        continue;
      }
      break;
    } else {
      break;
    }
  }

  return {
    node: {
      type: NodeType.DEFINITION_ITEM,
      term,
      description,
      children,
    },
    nextIndex: i,
  };
}

/**
 * Parse a paragraph of regular text.
 */
function parseParagraph(
  tokens: Token[],
  startIndex: number
): { node: ParagraphNode; nextIndex: number } {
  const lines: string[] = [];
  let i = startIndex;

  while (i < tokens.length) {
    const token = tokens[i];

    if (
      token.type === TokenType.TEXT ||
      token.type === TokenType.INDENTED_TEXT
    ) {
      lines.push(token.raw);
      i++;
    } else if (token.type === TokenType.LINE_CONTINUATION) {
      lines.push(token.value!);
      i++;
    } else {
      break;
    }
  }

  return {
    node: {
      type: NodeType.PARAGRAPH,
      lines,
    },
    nextIndex: i,
  };
}
