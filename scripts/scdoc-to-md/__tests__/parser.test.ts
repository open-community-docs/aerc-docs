import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { join } from 'path';
import { tokenize, buildAST } from '../parser.js';
import { emit, convertInline } from '../emitter.js';
import { parsePreamble } from '../frontmatter.js';
import { TokenType, NodeType } from '../types.js';

const FIXTURES_DIR = join(import.meta.dirname, 'fixtures');

/**
 * Load a fixture file pair (.scd input + .expected.md output).
 */
function loadFixture(name: string) {
  const input = readFileSync(join(FIXTURES_DIR, `${name}.scd`), 'utf-8');
  const expected = readFileSync(join(FIXTURES_DIR, `${name}.expected.md`), 'utf-8');
  return { input, expected };
}

describe('tokenizer', () => {
  it('tokenizes a preamble line', () => {
    const tokens = tokenize('AERC-CONFIG(5)\n');
    expect(tokens[0].type).toBe(TokenType.PREAMBLE);
    expect(tokens[0].value).toBe('AERC-CONFIG(5)');
  });

  it('tokenizes headers', () => {
    const tokens = tokenize('# NAME\n## SUBSECTION\n');
    expect(tokens[0].type).toBe(TokenType.HEADER);
    expect(tokens[0].level).toBe(1);
    expect(tokens[0].value).toBe('NAME');
    expect(tokens[1].type).toBe(TokenType.HEADER);
    expect(tokens[1].level).toBe(2);
    expect(tokens[1].value).toBe('SUBSECTION');
  });

  it('tokenizes blank lines', () => {
    const tokens = tokenize('\n\n');
    expect(tokens[0].type).toBe(TokenType.BLANK_LINE);
    expect(tokens[1].type).toBe(TokenType.BLANK_LINE);
  });

  it('tokenizes code blocks', () => {
    const tokens = tokenize('```\nsome code\n```\n');
    expect(tokens[0].type).toBe(TokenType.CODE_BLOCK_DELIMITER);
    expect(tokens[1].type).toBe(TokenType.CODE_LINE);
    expect(tokens[1].raw).toBe('some code');
    expect(tokens[2].type).toBe(TokenType.CODE_BLOCK_DELIMITER);
  });

  it('tokenizes definition terms', () => {
    const tokens = tokenize('*outgoing* = _<path>_\n');
    expect(tokens[0].type).toBe(TokenType.DEFINITION);
    expect(tokens[0].value).toBe('*outgoing* = _<path>_');
  });

  it('tokenizes indented text', () => {
    const tokens = tokenize('\tSome indented text\n');
    expect(tokens[0].type).toBe(TokenType.INDENTED_TEXT);
    expect(tokens[0].indent).toBe(1);
    expect(tokens[0].value).toBe('Some indented text');
  });

  it('tokenizes line continuations', () => {
    const tokens = tokenize('*-a* _<name>_++\n');
    expect(tokens[0].type).toBe(TokenType.LINE_CONTINUATION);
    expect(tokens[0].value).toBe('*-a* _<name>_');
  });

  it('tokenizes table headers', () => {
    const tokens = tokenize('[[ *Header1*\n:[ *Header2*\n');
    expect(tokens[0].type).toBe(TokenType.TABLE_HEADER);
    expect(tokens[1].type).toBe(TokenType.TABLE_HEADER);
  });

  it('tokenizes table rows', () => {
    const tokens = tokenize('|  cell1\n:  cell2\n');
    expect(tokens[0].type).toBe(TokenType.TABLE_ROW);
    expect(tokens[1].type).toBe(TokenType.TABLE_ROW);
  });

  it('tokenizes list items', () => {
    const tokens = tokenize('- First item\n- Second item\n');
    expect(tokens[0].type).toBe(TokenType.LIST_ITEM);
    expect(tokens[0].value).toBe('First item');
    expect(tokens[1].type).toBe(TokenType.LIST_ITEM);
    expect(tokens[1].value).toBe('Second item');
  });
});

describe('AST builder', () => {
  it('parses preamble', () => {
    const tokens = tokenize('AERC(1)\n\n# NAME\n\naero\n');
    const ast = buildAST(tokens);
    expect(ast.type).toBe(NodeType.DOCUMENT);
    expect(ast.preamble).toBe('AERC(1)');
  });

  it('parses sections', () => {
    const tokens = tokenize('AERC(1)\n\n# FIRST\n\nText.\n\n# SECOND\n\nMore text.\n');
    const ast = buildAST(tokens);
    expect(ast.children).toHaveLength(2);
    expect(ast.children[0].title).toBe('FIRST');
    expect(ast.children[1].title).toBe('SECOND');
  });

  it('parses nested sections', () => {
    const tokens = tokenize('AERC(1)\n\n# PARENT\n\n## CHILD\n\nText.\n');
    const ast = buildAST(tokens);
    expect(ast.children).toHaveLength(1);
    expect(ast.children[0].title).toBe('PARENT');
    expect(ast.children[0].children).toHaveLength(1);
    const child = ast.children[0].children[0];
    expect(child.type).toBe(NodeType.SECTION);
  });

  it('parses code blocks', () => {
    const tokens = tokenize('AERC(1)\n\n# EXAMPLE\n\n```\ncode here\n```\n');
    const ast = buildAST(tokens);
    const section = ast.children[0];
    expect(section.children[0].type).toBe(NodeType.CODE_BLOCK);
  });

  it('parses definition lists', () => {
    const source = 'AERC(1)\n\n# OPTIONS\n\n*--flag*\n\tDescription.\n';
    const tokens = tokenize(source);
    const ast = buildAST(tokens);
    const section = ast.children[0];
    expect(section.children[0].type).toBe(NodeType.DEFINITION_LIST);
  });
});

describe('frontmatter', () => {
  it('parses standard preamble', () => {
    const fm = parsePreamble('AERC-CONFIG(5)');
    expect(fm.title).toBe('aerc-config(5)');
    expect(fm.section).toBe('5');
    expect(fm.slug).toBe('aerc-config.5');
    expect(fm.editUrl).toBe(false);
  });

  it('parses main aerc preamble', () => {
    const fm = parsePreamble('AERC(1)');
    expect(fm.title).toBe('aerc(1)');
    expect(fm.section).toBe('1');
  });

  it('throws on invalid preamble', () => {
    expect(() => parsePreamble('invalid')).toThrow('Invalid preamble');
  });
});

describe('inline conversion', () => {
  it('converts bold', () => {
    expect(convertInline('*bold text*')).toBe('**bold text**');
  });

  it('converts underline/italic', () => {
    expect(convertInline('_italic text_')).toBe('*italic text*');
  });

  it('converts cross-references to links', () => {
    const result = convertInline('See *aerc-config*(5) for details.');
    expect(result).toBe('See [aerc-config(5)](/reference/aerc-config.5/) for details.');
  });

  it('converts unknown cross-references to code', () => {
    const result = convertInline('See *unknown-tool*(1) for details.');
    expect(result).toBe('See `unknown-tool(1)` for details.');
  });

  it('converts mixed formatting', () => {
    const result = convertInline('*bold* and _italic_');
    expect(result).toBe('**bold** and *italic*');
  });
});

describe('full conversion (fixture-based)', () => {
  it('converts aerc-sendmail.5.scd correctly', () => {
    const { input, expected } = loadFixture('aerc-sendmail.5');
    const tokens = tokenize(input);
    const ast = buildAST(tokens);
    const output = emit(ast);
    expect(output).toBe(expected);
  });

  it('includes version banner when version is provided', () => {
    const { input } = loadFixture('aerc-sendmail.5');
    const tokens = tokenize(input);
    const ast = buildAST(tokens);
    const output = emit(ast, '0.21.0');
    expect(output).toContain(':::tip[aerc 0.21.0]');
    expect(output).toContain('Auto-generated from upstream aerc 0.21.0');
  });

  it('omits version banner when no version provided', () => {
    const { input } = loadFixture('aerc-sendmail.5');
    const tokens = tokenize(input);
    const ast = buildAST(tokens);
    const output = emit(ast);
    expect(output).not.toContain(':::tip[aerc');
  });
});
