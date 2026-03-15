---
title: mbsync (isync)
description: IMAP-to-maildir synchronization for offline email with aerc
sidebar:
  order: 1
---

mbsync is a command-line tool that synchronizes IMAP mailboxes with local maildir directories. It is part of the [isync](https://isync.sourceforge.io/) project. By keeping a local copy of your mail, mbsync enables offline access, faster mailbox operations, and pairs naturally with aerc's maildir backend.

## How It Integrates with aerc

aerc's maildir backend reads from directories that mbsync keeps in sync with your IMAP server. This decouples mail retrieval from the client: mbsync handles the network layer, and aerc reads from local files. aerc can trigger mbsync automatically through the `check-mail-cmd` option in `accounts.conf`.

## Installation

```bash
# Arch Linux          # Debian / Ubuntu      # macOS
pacman -S isync        apt install isync       brew install isync
```

The package is called `isync`; the binary it installs is `mbsync`.

## Core Concepts

An mbsync configuration (`~/.mbsyncrc`) has four building blocks:

| Concept | Purpose |
|---------|---------|
| **IMAPAccount** | Credentials and connection settings for an IMAP server |
| **IMAPStore** | References an IMAPAccount as the remote mail store |
| **MaildirStore** | Defines the local maildir path and folder layout |
| **Channel** | Links a remote store to a local store and defines what to sync |

A minimal configuration:

```ini
IMAPAccount work
Host imap.example.com
Port 993
User you@example.com
PassCmd "pass email/you@example.com"
SSLType IMAPS

IMAPStore work-remote
Account work

MaildirStore work-local
SubFolders Verbatim
Path ~/mail/work/
Inbox ~/mail/work/INBOX

Channel work
Far :work-remote:
Near :work-local:
Patterns *
Create Both
Expunge Both
SyncState *
```

Create the local directory and run the initial sync:

```bash
mkdir -p ~/mail/work
mbsync -a
```

## Connecting to aerc

Point aerc's maildir backend at the directory mbsync writes to. In `~/.config/aerc/accounts.conf`:

```ini
[Work]
source            = maildir://~/mail/work
outgoing          = smtps+plain://you%40example.com@smtp.example.com:465
outgoing-cred-cmd = pass email/you@example.com
default           = INBOX
from              = Your Name <you@example.com>
copy-to           = Sent
check-mail-cmd    = mbsync work
check-mail-timeout = 120s
```

## Tips

- **Selective sync** — use `Patterns` to sync only specific folders (e.g., `Patterns INBOX Sent Drafts`).
- **Multiple accounts** — define one set of Account/Store/Channel blocks per account. Run `mbsync -a` to sync all, or `mbsync work` for one.
- **Credential security** — use `PassCmd` with [pass](/ecosystem/pass/) instead of storing passwords in plain text.

## Related Pages

- [Maildir Setup with mbsync](/guides/maildir-mbsync/) — full walkthrough for setting up mbsync with aerc
- [aerc-maildir(5)](/reference/aerc-maildir.5/) — aerc's maildir backend reference
- [aerc-accounts(5)](/reference/aerc-accounts.5/) — account configuration including `check-mail-cmd`
- [pass (password-store)](/ecosystem/pass/) — credential management for mbsync and aerc
- [isync upstream documentation](https://isync.sourceforge.io/) — official project site
