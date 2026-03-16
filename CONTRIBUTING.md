# Contributing to aerc docs

Last Updated On: 2026-03-14

Thank you for your interest in improving the aerc documentation! This guide explains how to contribute.

## Types of Contributions

### Recipes (Low Barrier)

Recipes are community-contributed configuration snippets. To add one:

1. Fork this repository
2. Create a new file in `src/content/docs/recipes/your-recipe.md`
3. Use this template:

```markdown
---
title: Your Recipe Title
description: One-line description
---

## Problem

What problem does this solve?

## Solution

Step-by-step instructions.

## Configuration

\`\`\`ini
# aerc.conf or accounts.conf snippets
\`\`\`

## Explanation

Why this works, any caveats.
```

4. Open a pull request

### Provider Guides (Medium Barrier)

Provider guides help users configure aerc with specific email providers. Follow the existing guides in `src/content/docs/providers/` as templates.

### Guide Improvements

Edit existing content in `src/content/docs/guides/`. Open a PR with your changes.

### Reference Documentation

Reference pages are **auto-generated** from upstream aerc man pages. To suggest changes to reference content, submit patches to the [aerc-devel mailing list](https://lists.sr.ht/~rjarry/aerc-devel).

## Development Setup

```bash
git clone https://github.com/open-community-docs/aerc-docs.git
cd aerc-docs
pnpm install

# Start dev server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

## Style Guide

- Write in plain, direct English
- Use second person ("you") not first person ("we")
- Include working configuration examples
- Cross-link to reference pages: `[aerc-config(5)](/reference/aerc-config.5/)`
- Keep code blocks short and focused
- Test your configuration examples before submitting

## Pull Request Process

1. CI builds the site and runs tests automatically
2. A preview URL is generated for every PR
3. At least one maintainer reviews for accuracy
4. Recipes merge quickly; guides need careful review
