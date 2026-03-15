---
title: Multi-Account Management
description: Manage many email accounts in aerc with maildir, mbsync, and pass
sidebar:
  order: 5
---

aerc handles multiple accounts natively. Each account gets its own section in `accounts.conf` and appears as a separate entry in the sidebar. This guide covers patterns for managing many accounts efficiently.

## accounts.conf Structure

Each account is a separate INI section:

```ini
[Personal]
source            = maildir://~/mail/personal
outgoing          = smtps+plain://you%40gmail.com@smtp.gmail.com:465
outgoing-cred-cmd = pass email/you@gmail.com
default           = INBOX
from              = Your Name <you@gmail.com>
copy-to           = Sent

[Work]
source            = maildir://~/mail/work
outgoing          = smtps+plain://you%40company.com@mail.privateemail.com:465
outgoing-cred-cmd = pass email/you@company.com
default           = INBOX
from              = Your Name <you@company.com>
copy-to           = Sent

[Notifications]
source            = maildir://~/mail/notifications
outgoing          = smtps+plain://alerts%40example.org@mail.privateemail.com:465
outgoing-cred-cmd = pass email/alerts@example.org
default           = INBOX
from              = Alerts <alerts@example.org>
copy-to           = Sent
```

## Navigating Between Accounts

| Key | Action |
|-----|--------|
| `J` / `K` | Switch between folders (including across accounts) |
| `:cf -a AccountName FolderName` | Jump to a specific account's folder |
| `:prev-tab` / `:next-tab` | Cycle through open tabs |

## Maildir Organization

Keep each account in its own directory under a common root:

```
~/mail/
├── personal/
│   ├── INBOX/
│   ├── Sent/
│   └── Drafts/
├── work/
│   ├── INBOX/
│   ├── Sent/
│   └── Drafts/
└── notifications/
    ├── INBOX/
    └── Sent/
```

This structure works cleanly with both mbsync (each account gets its own channel) and notmuch (index the entire `~/mail/` tree).

## mbsync: Template for Many Accounts

When you have many accounts on the same provider, the mbsync config becomes repetitive. Each account needs its own block, but the structure is identical:

```ini
# Template: repeat for each account, changing the name and credentials

IMAPAccount <account-name>
Host <imap-server>
Port 993
User <email-address>
PassCmd "pass email/<email-address>"
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

IMAPStore <account-name>-remote
Account <account-name>

MaildirStore <account-name>-local
SubFolders Verbatim
Path ~/mail/<account-name>/
Inbox ~/mail/<account-name>/INBOX

Channel <account-name>
Far :<account-name>-remote:
Near :<account-name>-local:
Patterns *
Create Both
Expunge Both
SyncState *
```

Replace `<account-name>`, `<imap-server>`, and `<email-address>` for each account.

### Syncing

```bash
# Sync all accounts at once
mbsync -a

# Sync a specific account
mbsync work

# Sync multiple specific accounts
mbsync personal work
```

## Credential Management at Scale

With many accounts, organize your pass store with a consistent pattern:

```bash
# Store all email passwords under email/
pass insert email/you@gmail.com
pass insert email/you@company.com
pass insert email/alerts@example.org

# List all email passwords
pass ls email/
```

Each `*-cred-cmd` in `accounts.conf` and `PassCmd` in `.mbsyncrc` should reference the same pass entry for a given account.

## Notmuch Across All Accounts

notmuch indexes all accounts under a single database, giving you unified search:

```ini
# ~/mail/.notmuch/config (or run `notmuch setup`)
[database]
path=/home/you/mail

[user]
name=Your Name
primary_email=you@gmail.com
other_email=you@company.com;alerts@example.org
```

List all your email addresses in `other_email` (semicolon-separated) so notmuch correctly identifies messages from you.

After each sync:

```bash
mbsync -a && notmuch new
```

Or automate it with a [systemd timer](/recipes/systemd-sync-timer/).

## Adding a New Account

A quick checklist for adding another account:

1. **Store the password**: `pass insert email/new@example.com`
2. **Add mbsync block** to `~/.mbsyncrc` (copy an existing block, change name/credentials)
3. **Create maildir**: `mkdir -p ~/mail/new-account`
4. **Initial sync**: `mbsync new-account`
5. **Add account** to `~/.config/aerc/accounts.conf`
6. **Update notmuch**: add the email to `other_email` in `~/mail/.notmuch/config`
7. **Reindex**: `notmuch new`
8. **Restart aerc** to pick up the new account

## Tips

- **Account ordering** — accounts appear in the sidebar in the order they're defined in `accounts.conf`. Put your most-used account first.
- **Selective sync** — for high-volume accounts (notifications, newsletters), consider syncing less frequently or only syncing INBOX.
- **Separate outgoing credentials** — if IMAP and SMTP use different passwords, set `source-cred-cmd` and `outgoing-cred-cmd` independently.

## See Also

- [aerc-accounts(5)](/reference/aerc-accounts.5/) — full account configuration reference
- [Maildir Setup with mbsync](/guides/maildir-mbsync/) — detailed mbsync guide
- [Notmuch Integration](/guides/notmuch/) — search across all accounts
- [Systemd Timer for Mail Sync](/recipes/systemd-sync-timer/) — automate background sync
