/** Token types produced by the scdoc tokenizer */
export const TokenType = {
  PREAMBLE: 'PREAMBLE',
  HEADER: 'HEADER',
  TEXT: 'TEXT',
  DEFINITION: 'DEFINITION',
  INDENTED_TEXT: 'INDENTED_TEXT',
  INDENTED_CONTINUATION: 'INDENTED_CONTINUATION',
  LIST_ITEM: 'LIST_ITEM',
  CODE_BLOCK_DELIMITER: 'CODE_BLOCK_DELIMITER',
  CODE_LINE: 'CODE_LINE',
  TABLE_HEADER: 'TABLE_HEADER',
  TABLE_ROW: 'TABLE_ROW',
  BLANK_LINE: 'BLANK_LINE',
  LINE_CONTINUATION: 'LINE_CONTINUATION',
} as const;

export type TokenType = (typeof TokenType)[keyof typeof TokenType];

/** A single token from the tokenizer */
export interface Token {
  type: TokenType;
  /** Raw line content */
  raw: string;
  /** Parsed value (header text, definition term, etc.) */
  value?: string;
  /** Header level (1 for #, 2 for ##) */
  level?: number;
  /** Table column alignment flags */
  alignments?: string[];
  /** Indentation depth (number of leading tabs) */
  indent?: number;
}

/** AST node types */
export const NodeType = {
  DOCUMENT: 'DOCUMENT',
  SECTION: 'SECTION',
  PARAGRAPH: 'PARAGRAPH',
  DEFINITION_LIST: 'DEFINITION_LIST',
  DEFINITION_ITEM: 'DEFINITION_ITEM',
  CODE_BLOCK: 'CODE_BLOCK',
  TABLE: 'TABLE',
  LIST: 'LIST',
  LIST_ITEM: 'LIST_ITEM',
  TEXT: 'TEXT',
} as const;

export type NodeType = (typeof NodeType)[keyof typeof NodeType];

/** Base AST node */
export interface ASTNode {
  type: NodeType;
  children?: ASTNode[];
}

/** Document root node */
export interface DocumentNode extends ASTNode {
  type: typeof NodeType.DOCUMENT;
  preamble: string;
  children: SectionNode[];
}

/** Section (# or ##) */
export interface SectionNode extends ASTNode {
  type: typeof NodeType.SECTION;
  title: string;
  level: number;
  children: ASTNode[];
}

/** Paragraph of text */
export interface ParagraphNode extends ASTNode {
  type: typeof NodeType.PARAGRAPH;
  lines: string[];
}

/** Definition list */
export interface DefinitionListNode extends ASTNode {
  type: typeof NodeType.DEFINITION_LIST;
  children: DefinitionItemNode[];
}

/** Single definition item (term + description) */
export interface DefinitionItemNode extends ASTNode {
  type: typeof NodeType.DEFINITION_ITEM;
  term: string;
  /** Description lines, preserving indentation structure */
  description: string[];
  /** Nested sub-definitions or content */
  children: ASTNode[];
}

/** Code block */
export interface CodeBlockNode extends ASTNode {
  type: typeof NodeType.CODE_BLOCK;
  lines: string[];
  language?: string;
}

/** Table */
export interface TableNode extends ASTNode {
  type: typeof NodeType.TABLE;
  headers: string[];
  /** Column alignment: 'l' for left, 'c' for center, 'r' for right */
  alignments: string[];
  rows: string[][];
}

/** Bullet list */
export interface ListNode extends ASTNode {
  type: typeof NodeType.LIST;
  children: ListItemNode[];
}

/** Bullet list item */
export interface ListItemNode extends ASTNode {
  type: typeof NodeType.LIST_ITEM;
  lines: string[];
}
