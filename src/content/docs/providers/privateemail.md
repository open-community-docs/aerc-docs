---
title: PrivateEmail (Namecheap)
description: Configure aerc with PrivateEmail (Namecheap's email hosting)
sidebar:
  order: 5
---

[PrivateEmail](https://privateemail.com/) is the email hosting service offered by Namecheap. It supports standard IMAP and SMTP, making it straightforward to use with aerc.

## Server Details

| Protocol | Server                    | Port | Encryption |
|----------|---------------------------|------|------------|
| IMAP     | mail.privateemail.com     | 993  | TLS/SSL    |
| SMTP     | mail.privateemail.com     | 465  | TLS/SSL    |

## Store Your Password with pass

```bash
pass insert email/privateemail
```

Enter your PrivateEmail account password when prompted.

## accounts.conf (Direct IMAP)

Add this to `~/.config/aerc/accounts.conf`:

```ini
[PrivateEmail]
source            = imaps://you%40yourdomain.com@mail.privateemail.com:993
source-cred-cmd   = pass email/privateemail
outgoing          = smtps+plain://you%40yourdomain.com@mail.privateemail.com:465
outgoing-cred-cmd = pass email/privateemail
default           = INBOX
from              = Your Name <you@yourdomain.com>
copy-to           = Sent
```

Replace `you@yourdomain.com` with your full PrivateEmail address. The `@` is URL-encoded as `%40`.

See [aerc-accounts(5)](/reference/aerc-accounts.5/) for all available account options.

## accounts.conf (Maildir with mbsync)

For offline access using maildir (see [Maildir Setup with mbsync](/guides/maildir-mbsync/)):

```ini
[PrivateEmail]
source            = maildir://~/mail/privateemail
outgoing          = smtps+plain://you%40yourdomain.com@mail.privateemail.com:465
outgoing-cred-cmd = pass email/privateemail
default           = INBOX
from              = Your Name <you@yourdomain.com>
copy-to           = Sent
check-mail-cmd    = mbsync privateemail
check-mail        = 5m
```

## mbsync Configuration

Create or add to `~/.mbsyncrc`:

```ini
IMAPAccount privateemail
Host mail.privateemail.com
Port 993
User you@yourdomain.com
PassCmd "pass email/you@yourdomain.com"
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

IMAPStore privateemail-remote
Account privateemail

MaildirStore privateemail-local
SubFolders Verbatim
Path ~/mail/privateemail/
Inbox ~/mail/privateemail/INBOX

Channel privateemail
Far :privateemail-remote:
Near :privateemail-local:
Patterns *
Create Both
Expunge Both
SyncState *
```

Run the initial sync:

```bash
mkdir -p ~/mail/privateemail
mbsync privateemail
```

## Multiple PrivateEmail Domains

If you host multiple domains on PrivateEmail (a common Namecheap setup), repeat the mbsync block for each account with a unique channel name:

```ini
# --- Work account ---
IMAPAccount work
Host mail.privateemail.com
Port 993
User work@company.com
PassCmd "pass email/work@company.com"
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

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

# --- Notifications account ---
IMAPAccount notifications
Host mail.privateemail.com
Port 993
User notifications@example.org
PassCmd "pass email/notifications@example.org"
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

IMAPStore notifications-remote
Account notifications

MaildirStore notifications-local
SubFolders Verbatim
Path ~/mail/notifications/
Inbox ~/mail/notifications/INBOX

Channel notifications
Far :notifications-remote:
Near :notifications-local:
Patterns *
Create Both
Expunge Both
SyncState *
```

Each account needs its own `IMAPAccount`, `IMAPStore`, `MaildirStore`, and `Channel` block. The `Account` name ties the stores to the right IMAP connection.

Sync all at once with `mbsync -a`, or individually with `mbsync work`.

## Folder Names

PrivateEmail uses standard IMAP folder names: `INBOX`, `Sent`, `Drafts`, `Trash`, and `Junk`. There is no special prefix or non-standard hierarchy like some other providers. Folders you create in the PrivateEmail web interface will appear as top-level IMAP folders and sync as expected.

If a folder name contains spaces, mbsync handles it automatically. In aerc, you can navigate to any folder with the `:cf` command.

## Next Steps

- [Maildir Setup with mbsync](/guides/maildir-mbsync/) — full offline sync guide
- [Notmuch Integration](/guides/notmuch/) — add fast full-text search
- [Desktop Notifications](/recipes/desktop-notifications/) — get notified of new mail
- [aerc-smtp(5)](/reference/aerc-smtp.5/) — SMTP configuration reference
