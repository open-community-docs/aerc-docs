---
title: Gmail
description: Configure aerc with Gmail using IMAP and SMTP
sidebar:
  order: 1
---

Gmail works well with aerc over IMAP and SMTP. The main requirement is generating an App Password, since Gmail no longer supports plain password authentication for third-party clients.

## Prerequisites

1. **Enable 2-Step Verification** on your Google account at [myaccount.google.com/security](https://myaccount.google.com/security).
2. **Generate an App Password** at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Select "Mail" as the app and your device type. Google will give you a 16-character password — save it securely.

:::caution
Google removed the "Allow less secure apps" option in 2022. App Passwords are now the only way to use IMAP/SMTP with third-party clients. You **must** have 2-Step Verification enabled before you can create an App Password.
:::

## Store Your Password with pass

Rather than putting your App Password directly in the config file, store it with [pass](https://www.passwordstore.org/):

```bash
pass insert email/gmail
```

Enter the 16-character App Password when prompted.

## accounts.conf (Direct IMAP)

To connect aerc directly to Gmail over IMAP, add this to `~/.config/aerc/accounts.conf`:

```ini
[Gmail]
source          = imaps://username%40gmail.com@imap.gmail.com:993
source-cred-cmd = pass email/gmail
outgoing        = smtps+plain://username%40gmail.com@smtp.gmail.com:465
outgoing-cred-cmd = pass email/gmail
default         = INBOX
from            = Your Name <username@gmail.com>
copy-to         = [Gmail]/Sent Mail
```

Replace `username` with your actual Gmail username. The `@` in the email address is URL-encoded as `%40`.

See [aerc-accounts(5)](/reference/aerc-accounts.5/) and [aerc-imap(5)](/reference/aerc-imap.5/) for all available options.

## accounts.conf (Maildir with mbsync)

If you prefer offline access via maildir (see [Maildir Setup with mbsync](/guides/maildir-mbsync/) for the full guide), configure aerc to read from the local maildir instead:

```ini
[Gmail]
source            = maildir://~/mail/gmail
outgoing          = smtps+plain://username%40gmail.com@smtp.gmail.com:465
outgoing-cred-cmd = pass email/gmail
default           = INBOX
from              = Your Name <username@gmail.com>
copy-to           = Sent Mail
check-mail-cmd    = mbsync gmail
check-mail        = 5m
```

## mbsync Configuration

Gmail has a non-standard folder layout. All default folders live under a `[Gmail]/` prefix on the server (e.g., `[Gmail]/Sent Mail`, `[Gmail]/Drafts`). The mbsync config below handles this properly.

Create or add to `~/.mbsyncrc`:

```ini
# Gmail account
IMAPAccount gmail
Host imap.gmail.com
Port 993
User username@gmail.com
PassCmd "pass email/gmail"
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

IMAPStore gmail-remote
Account gmail

MaildirStore gmail-local
SubFolders Verbatim
Path ~/mail/gmail/
Inbox ~/mail/gmail/INBOX

Channel gmail
Far :gmail-remote:
Near :gmail-local:
Patterns * !"[Gmail]/All Mail" !"[Gmail]/Important" !"[Gmail]/Starred"
Create Both
Expunge Both
SyncState *
```

Key settings:

- **`TLSType IMAPS`** — use implicit TLS (preferred over the older `SSLType` alias)
- **`CertificateFile`** — path to your system CA bundle (on Debian/Ubuntu: `/etc/ssl/certs/ca-certificates.crt`, on Fedora: `/etc/pki/tls/certs/ca-bundle.crt`, on macOS with Homebrew: `/opt/homebrew/etc/openssl/cert.pem`)
- **`Patterns`** — syncs all folders **except** `[Gmail]/All Mail`, `[Gmail]/Important`, and `[Gmail]/Starred`. These are virtual Gmail labels that duplicate mail and would waste disk space
- **`Create Both`** — creates folders on both sides when they appear
- **`Expunge Both`** — permanently deletes messages marked for deletion on both sides
- **`SyncState *`** — stores sync state alongside the maildir

Run the initial sync:

```bash
mkdir -p ~/mail/gmail
mbsync gmail
```

## Troubleshooting

### "Invalid credentials" or "Application-specific password required"

You are likely using your regular Google password instead of an App Password. Generate one at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords). Remember that 2-Step Verification must be enabled first.

### "Less secure app" option is missing

Google removed this option entirely. App Passwords are the supported replacement. If you previously relied on "less secure apps" access, you must switch to an App Password.

### Sent mail appears twice

Gmail automatically saves sent messages to `[Gmail]/Sent Mail`. If aerc's `copy-to` is also set to save sent mail, you will get duplicates. When using direct IMAP, set `copy-to = [Gmail]/Sent Mail` and aerc will detect the duplicate. When using maildir with mbsync, you may want to omit `copy-to` entirely or set it to match the synced Sent folder name.

### Folders not appearing

Gmail uses labels internally, which IMAP exposes as folders. Make sure the labels you want are enabled for IMAP access under Gmail Settings > Labels > "Show in IMAP."

## Next Steps

- [Maildir Setup with mbsync](/guides/maildir-mbsync/) — full offline sync guide
- [Notmuch Integration](/guides/notmuch/) — add fast full-text search
- [Desktop Notifications](/recipes/desktop-notifications/) — get notified of new mail
- [aerc-smtp(5)](/reference/aerc-smtp.5/) — SMTP configuration reference
