/**
 * Extract YAML frontmatter from an scdoc preamble line.
 * Preamble format: NAME(SECTION) e.g. AERC-CONFIG(5)
 */
export interface Frontmatter {
  title: string;
  description: string;
  section: string;
  slug: string;
  editUrl: boolean;
  /** Sidebar sort order based on section+name */
  sidebarOrder: number;
}

/** Map of man page names to human-readable descriptions */
const DESCRIPTIONS: Record<string, string> = {
  'aerc': 'aerc email client command reference',
  'aerc-search': 'Search and filter patterns for aerc',
  'aerc-accounts': 'Account configuration for aerc',
  'aerc-binds': 'Key binding configuration for aerc',
  'aerc-config': 'General configuration for aerc',
  'aerc-imap': 'IMAP backend configuration for aerc',
  'aerc-jmap': 'JMAP backend configuration for aerc',
  'aerc-maildir': 'Maildir backend configuration for aerc',
  'aerc-notmuch': 'Notmuch backend configuration for aerc',
  'aerc-sendmail': 'Sendmail configuration for aerc',
  'aerc-smtp': 'SMTP configuration for aerc',
  'aerc-patch': 'Local patch management for aerc',
  'aerc-stylesets': 'Styleset configuration for aerc',
  'aerc-templates': 'Template syntax for aerc',
  'aerc-tutorial': 'Getting started tutorial for aerc',
  'carddav-query': 'CardDAV address book query tool for aerc',
};

/** Sidebar ordering: section 1 first, then 5, then 7 */
const SECTION_ORDER: Record<string, number> = {
  '1': 0,
  '5': 100,
  '7': 200,
};

/**
 * Parse a preamble string like "AERC-CONFIG(5)" into frontmatter.
 */
export function parsePreamble(preamble: string): Frontmatter {
  const match = preamble.match(/^([A-Z][A-Z0-9_-]+)\((\d+)\)\s*$/);
  if (!match) {
    throw new Error(`Invalid preamble: ${preamble}`);
  }

  const rawName = match[1]; // e.g. AERC-CONFIG
  const section = match[2]; // e.g. 5

  const name = rawName.toLowerCase(); // aerc-config
  const title = `${name}(${section})`;
  const slug = `${name}.${section}`;
  const description = DESCRIPTIONS[name] || `${name} man page (section ${section})`;
  const sectionBase = SECTION_ORDER[section] ?? 300;
  // Sort alphabetically within section
  const sidebarOrder = sectionBase + (name === 'aerc' ? 0 : name.charCodeAt(5) || 50);

  return {
    title,
    description,
    section,
    slug,
    editUrl: false,
    sidebarOrder,
  };
}

/**
 * Generate YAML frontmatter string.
 */
export function generateFrontmatter(fm: Frontmatter, upstreamVersion?: string): string {
  const lines = [
    '---',
    `title: "${fm.title}"`,
    `description: "${fm.description}"`,
    `slug: "reference/${fm.slug}"`,
    `editUrl: false`,
    `sidebar:`,
    `  badge:`,
    `    text: man`,
    `    variant: note`,
  ];

  if (upstreamVersion) {
    lines.push(`# Auto-generated from upstream aerc ${upstreamVersion}`);
  }

  lines.push('---');
  return lines.join('\n');
}
