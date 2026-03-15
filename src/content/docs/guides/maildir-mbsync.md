---
title: Maildir Setup with mbsync
description: Configure mbsync (isync) for offline IMAP sync with aerc's maildir backend
sidebar:
  order: 1
---

Using aerc with a local maildir gives you offline access, fast search (via notmuch), and full control over your mail storage. [mbsync](https://isync.sourceforge.io/) (part of the isync project) handles the IMAP-to-maildir synchronization.

## Why Maildir + mbsync?

- **Offline access** — read and compose email without a connection
- **Speed** — local file access is faster than IMAP for large mailboxes
- **Search** — pair with notmuch for full-text search across all accounts
- **Reliability** — your mail is on disk, not dependent on a server connection

## Install mbsync

```bash
# Arch Linux
pacman -S isync

# Debian / Ubuntu
apt install isync

# macOS
brew install isync
```

## Configure mbsync

Create `~/.mbsyncrc`:

```ini
# Global settings
Create Both
Expunge Both
SyncState *

# Account definition
IMAPAccount personal
Host imap.example.com
Port 993
User you@example.com
PassCmd "pass email/example.com"
SSLType IMAPS

# Remote store
IMAPStore personal-remote
Account personal

# Local store
MaildirStore personal-local
SubFolders Verbatim
Path ~/mail/personal/
Inbox ~/mail/personal/INBOX

# Channel (sync definition)
Channel personal
Far :personal-remote:
Near :personal-local:
Patterns *
```

## Create Mail Directories

```bash
mkdir -p ~/mail/personal
```

## Run Initial Sync

```bash
mbsync -a
```

This will download all mail to `~/mail/personal/`.

## Configure aerc

In `~/.config/aerc/accounts.conf`:

```ini
[Personal]
source        = maildir://~/mail/personal
outgoing      = smtps+plain://you@example.com@smtp.example.com:465
outgoing-cred-cmd = pass email/example.com
default       = INBOX
from          = Your Name <you@example.com>
copy-to       = Sent
```

## Automate Sync

Set up a systemd timer or cron job to sync periodically:

```bash
# Sync every 5 minutes via cron
*/5 * * * * mbsync -a
```

Or use aerc's built-in new-email hook to trigger sync — see [aerc-accounts(5)](/reference/aerc-accounts.5/) for the `check-mail-cmd` option.

## Next Steps

- [Notmuch Integration](/guides/notmuch/) — add full-text search
- [Multi-Account Management](/guides/multi-account/) — set up multiple accounts
- [aerc-maildir(5)](/reference/aerc-maildir.5/) — maildir backend reference
