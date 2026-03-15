#!/usr/bin/env node
/**
 * CLI entrypoint for the scdoc-to-markdown converter.
 *
 * Usage:
 *   npx tsx scripts/scdoc-to-md/index.ts <input.scd> [output-dir]
 *   npx tsx scripts/scdoc-to-md/index.ts --all <scdoc-dir> <output-dir> [--version <ver>]
 *
 * Converts scdoc man page sources to Starlight-compatible markdown files.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'fs';
import { join, basename } from 'path';
import { tokenize, buildAST } from './parser.js';
import { emit } from './emitter.js';
import { parsePreamble } from './frontmatter.js';

/**
 * Convert a single scdoc file to markdown.
 */
function convertFile(inputPath: string, outputDir: string, version?: string): string {
  const source = readFileSync(inputPath, 'utf-8');
  const tokens = tokenize(source);
  const ast = buildAST(tokens);
  const markdown = emit(ast, version);

  // Determine output filename from preamble
  const fm = parsePreamble(ast.preamble);
  const outputFilename = `${fm.slug}.md`;
  const outputPath = join(outputDir, outputFilename);

  mkdirSync(outputDir, { recursive: true });
  writeFileSync(outputPath, markdown, 'utf-8');

  return outputPath;
}

/**
 * Convert all .scd files in a directory.
 */
function convertAll(inputDir: string, outputDir: string, version?: string): void {
  const files = readdirSync(inputDir).filter((f) => f.endsWith('.scd'));

  console.log(`Found ${files.length} scdoc files in ${inputDir}`);
  if (version) {
    console.log(`Upstream version: ${version}`);
  }

  for (const file of files) {
    const inputPath = join(inputDir, file);
    try {
      const outputPath = convertFile(inputPath, outputDir, version);
      console.log(`  ✓ ${file} → ${basename(outputPath)}`);
    } catch (err) {
      console.error(`  ✗ ${file}: ${(err as Error).message}`);
    }
  }
}

// CLI argument handling
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('Usage:');
  console.log('  npx tsx scripts/scdoc-to-md/index.ts <input.scd> [output-dir]');
  console.log('  npx tsx scripts/scdoc-to-md/index.ts --all <scdoc-dir> <output-dir> [--version <ver>]');
  process.exit(1);
}

// Parse --version flag
const versionIdx = args.indexOf('--version');
let version: string | undefined;
if (versionIdx !== -1 && versionIdx + 1 < args.length) {
  version = args[versionIdx + 1];
  args.splice(versionIdx, 2);
}

if (args[0] === '--all') {
  if (args.length < 3) {
    console.error('Usage: --all <scdoc-dir> <output-dir> [--version <ver>]');
    process.exit(1);
  }
  convertAll(args[1], args[2], version);
} else {
  const inputPath = args[0];
  const outputDir = args[1] || '.';
  const outputPath = convertFile(inputPath, outputDir, version);
  console.log(`Converted: ${outputPath}`);
}
