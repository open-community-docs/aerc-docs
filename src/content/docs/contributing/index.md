---
title: Contributing
description: How to contribute to the aerc community documentation
sidebar:
  order: 0
---

This documentation is a community effort. Whether you have a quick tip to share or want to write an entire provider guide, your contributions are welcome.

## Ways to Contribute

### Share a Recipe (Easiest)

Recipes are short, focused configuration snippets — things like "how to set up desktop notifications" or "how to render HTML email with w3m." They are the easiest way to contribute.

1. Fork the repository
2. Create a new file under `src/content/docs/recipes/`
3. Use the frontmatter format from existing recipes (see [Desktop Notifications](/recipes/desktop-notifications/) or [HTML Email Rendering](/recipes/html-rendering/) for examples)
4. Submit a pull request

A good recipe has a clear title, a brief explanation of what it does, a working configuration snippet, and any relevant caveats.

### Write a Provider Guide (Moderate)

Provider guides walk users through configuring aerc for a specific email service (Gmail, Fastmail, PrivateEmail, etc.). They follow a consistent structure:

1. Prerequisites (app passwords, 2FA, etc.)
2. Credential storage with pass
3. `accounts.conf` for direct IMAP
4. `accounts.conf` for maildir with mbsync
5. `~/.mbsyncrc` configuration
6. Provider-specific notes and troubleshooting

Look at the [Gmail guide](/providers/gmail/) for a thorough example. Create your file under `src/content/docs/providers/` and submit a pull request.

### Improve an Existing Guide (Moderate)

Found a mistake, an outdated instruction, or a missing detail? Edit the relevant file and submit a pull request. Common improvements include:

- Fixing outdated configuration syntax
- Adding troubleshooting tips based on your experience
- Clarifying steps that confused you when you first followed the guide
- Adding cross-links to related pages

### Improve Reference Documentation (Advanced)

The reference pages under `/reference/` are auto-generated from upstream aerc man pages. To change those, submit a patch to the [aerc mailing list](https://lists.sr.ht/~rjarry/aerc-devel) following the upstream contribution process. Changes merged upstream will be synced into this documentation automatically.

## Style Guidelines

- **Be concise.** Short sentences, clear structure. Avoid unnecessary filler.
- **Show working configs.** Every guide should include copy-pasteable configuration blocks that actually work.
- **Use placeholder values consistently.** Use `you@example.com`, `Your Name`, and `example.com` in examples. For provider-specific guides, use realistic values (e.g., `username@gmail.com` for Gmail).
- **Cross-link to reference pages.** When mentioning a configuration option, link to the relevant man page using paths like `/reference/aerc-config.5/` or `/reference/aerc-accounts.5/`.
- **Frontmatter is required.** Every content page needs `title`, `description`, and `sidebar` fields in its YAML frontmatter.
- **Test your instructions.** If possible, verify that the configuration you are documenting actually works before submitting.

## Pull Request Process

1. **Fork and branch.** Create a feature branch from `main`.
2. **Write your content.** Follow the structure and style of existing pages.
3. **Build locally.** Run the Starlight dev server to verify your page renders correctly and all links work.
4. **Submit a PR.** Include a brief description of what you are adding or changing.
5. **Review.** A maintainer will review your PR. Expect feedback on clarity, accuracy, and consistency with the rest of the docs.

## Local Development

```bash
# Clone the repository
git clone <your-fork-url>
cd aerc-docs

# Install dependencies
pnpm install

# Start the dev server
pnpm dev

# Run tests
pnpm test

# Build for production
pnpm build
```

The dev server will hot-reload as you edit files, so you can preview your changes in real time.

## Questions?

If you are not sure whether something belongs in the docs, or how to structure your contribution, open an issue in the repository. We are happy to help you get started.
