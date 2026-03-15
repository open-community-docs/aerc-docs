---
title: Recipe Template
description: Template for contributing a new recipe to aerc docs
sidebar:
  order: 2
---

Use this template when contributing a new recipe. Copy the markdown below into a new file at `src/content/docs/recipes/your-recipe-name.md`.

## Template

````markdown
---
title: Your Recipe Title
description: One sentence describing what this recipe does
---

## Problem

Describe the problem this recipe solves. What are you trying to accomplish?
Keep it to 1-2 sentences.

## Solution

Step-by-step instructions to implement the solution. Number the steps if
order matters.

## Configuration

```ini
# Which config file this goes in (aerc.conf, accounts.conf, binds.conf, etc.)
# Include only the relevant section

[section]
key = value
```

## Explanation

Explain why this configuration works. Mention any caveats, edge cases, or
alternative approaches. Link to reference pages where relevant.

## See Also

- [Relevant man page](/reference/aerc-config.5/)
- [Related guide](/guides/some-guide/)
````

## Guidelines

- **One recipe, one file** — keep each recipe focused on a single task
- **Test your config** — make sure it actually works before submitting
- **Use generic examples** — replace real email addresses with `you@example.com`
- **Link to references** — cross-link to man pages with `[aerc-config(5)](/reference/aerc-config.5/)`
- **Keep it short** — recipes should be quick to scan and implement
