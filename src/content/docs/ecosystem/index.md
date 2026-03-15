---
title: Ecosystem Overview
description: Tools and utilities that complement aerc
sidebar:
  order: 0
---

aerc follows the Unix philosophy: it does email well and relies on external tools for everything else. This section covers the companion utilities that most aerc users depend on.

## Companion Tools

### Mail Synchronization

- **[mbsync / isync](/ecosystem/mbsync/)** — Syncs IMAP mailboxes to a local maildir for offline access and fast performance. The most common way to pair aerc with a local mail store. See [Maildir Setup with mbsync](/guides/maildir-mbsync/).

### Search

- **[notmuch](https://notmuchmail.org/)** — Tag-based, full-text search engine for mail stored in maildir format. aerc has a native notmuch backend that lets you use notmuch queries as virtual folders. See [Notmuch Integration](/guides/notmuch/) and [aerc-notmuch(5)](/reference/aerc-notmuch.5/).

### Outgoing Mail

- **[msmtp](/ecosystem/msmtp/)** — A lightweight SMTP client that can be used as aerc's `sendmail` backend. Useful when you want to queue mail for later delivery or route different accounts through different SMTP servers without aerc's built-in SMTP support. See [aerc-sendmail(5)](/reference/aerc-sendmail.5/).

### Credential Management

- **[pass](/ecosystem/pass/)** — The standard Unix password manager, built on GPG and git. aerc's `source-cred-cmd` and `outgoing-cred-cmd` options work seamlessly with pass commands. See the [Quickstart](/getting-started/quickstart/) for a basic example.

### HTML Rendering

- **[w3m](/ecosystem/w3m/)** — A text-based web browser that doubles as an excellent HTML-to-text converter for aerc's filter pipeline. Supports inline images via sixel on capable terminals. See [HTML Email Rendering](/recipes/html-rendering/).
- **[lynx](https://lynx.invisible-island.net/)** — Another text-based browser that can be used as an HTML filter. Produces clean plaintext output.

### Address Book

- **[carddav-query](/ecosystem/carddav/)** — A CardDAV address book query tool bundled with aerc. Connects to CardDAV servers (Nextcloud, Radicale, etc.) and provides tab-completion for email addresses. See [carddav-query(1)](/reference/carddav-query.1/).

### Encryption and Signing

- **[GnuPG (gpg)](https://gnupg.org/)** — aerc supports PGP signing, encryption, and verification through GnuPG. See the [PGP/GPG Encryption guide](/guides/pgp/) and [aerc-config(5)](/reference/aerc-config.5/) for PGP-related options.

### Document Conversion

- **[pandoc](https://pandoc.org/)** — A universal document converter. Commonly used in aerc's filter pipeline to convert HTML to plain text, or to generate HTML alternatives from Markdown when composing. See [HTML Email Rendering](/recipes/html-rendering/) and the `[multipart-converters]` section in [aerc-config(5)](/reference/aerc-config.5/).

## How They Fit Together

A typical aerc setup chains several of these tools:

1. **mbsync** syncs your IMAP mailbox to a local maildir
2. **notmuch** indexes the maildir for fast search
3. **aerc** reads from the maildir/notmuch backend and sends via built-in SMTP (or msmtp)
4. **pass** provides credentials to aerc, mbsync, and msmtp
5. **w3m** or **pandoc** renders HTML emails in aerc's viewer
6. **carddav-query** provides address autocompletion when composing
7. **gpg** handles message signing and encryption

Each tool is optional — you can use aerc with just direct IMAP and no extras, or build out the full pipeline as your needs grow.
