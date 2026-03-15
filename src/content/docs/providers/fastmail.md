---
title: Fastmail
description: Configure aerc with Fastmail using JMAP or IMAP
sidebar:
  order: 2
---

Fastmail is a privacy-focused email provider with excellent standards compliance. It supports both JMAP (a modern alternative to IMAP) and traditional IMAP, giving you two options for connecting aerc.

## Prerequisites

1. Go to **Settings > Privacy & Security > Integrations** in the Fastmail web interface.
2. Under **App Passwords**, click **New App Password**.
3. Choose a name (e.g., "aerc") and select **Mail (IMAP/POP/SMTP)** access.
4. Copy the generated password.

## Store Your Password with pass

```bash
pass insert email/fastmail
```

## Server Details

| Protocol | Server | Port | Encryption |
|----------|--------|------|------------|
| JMAP | api.fastmail.com | 443 | HTTPS |
| IMAP | imap.fastmail.com | 993 | TLS/SSL |
| SMTP | smtp.fastmail.com | 465 | TLS/SSL |

## Option A: JMAP (Recommended)

JMAP is Fastmail's preferred protocol — it's faster and more efficient than IMAP, especially for operations like search and folder sync. aerc has native JMAP support.

In `~/.config/aerc/accounts.conf`:

```ini
[Fastmail]
source            = jmap://you%40fastmail.com@api.fastmail.com
source-cred-cmd   = pass email/fastmail
outgoing          = smtps+plain://you%40fastmail.com@smtp.fastmail.com:465
outgoing-cred-cmd = pass email/fastmail
default           = INBOX
from              = Your Name <you@fastmail.com>
copy-to           = Sent
```

:::tip
With JMAP, you get server-side search, push notifications, and no need for mbsync. It's the simplest setup for Fastmail users.
:::

See [aerc-jmap(5)](/reference/aerc-jmap.5/) for all JMAP-specific options.

## Option B: Direct IMAP

If you prefer IMAP or need features not yet supported by aerc's JMAP backend:

```ini
[Fastmail]
source            = imaps://you%40fastmail.com@imap.fastmail.com:993
source-cred-cmd   = pass email/fastmail
outgoing          = smtps+plain://you%40fastmail.com@smtp.fastmail.com:465
outgoing-cred-cmd = pass email/fastmail
default           = INBOX
from              = Your Name <you@fastmail.com>
copy-to           = Sent
```

See [aerc-imap(5)](/reference/aerc-imap.5/) for all IMAP options.

## Option C: Maildir with mbsync

For offline access:

```ini
# accounts.conf
[Fastmail]
source              = maildir://~/mail/fastmail
outgoing            = smtps+plain://you%40fastmail.com@smtp.fastmail.com:465
outgoing-cred-cmd   = pass email/fastmail
default             = INBOX
from                = Your Name <you@fastmail.com>
copy-to             = Sent
check-mail-cmd      = mbsync fastmail
check-mail          = 5m
```

```ini
# ~/.mbsyncrc
IMAPAccount fastmail
Host imap.fastmail.com
Port 993
User you@fastmail.com
PassCmd "pass email/fastmail"
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

IMAPStore fastmail-remote
Account fastmail

MaildirStore fastmail-local
SubFolders Verbatim
Path ~/mail/fastmail/
Inbox ~/mail/fastmail/INBOX

Channel fastmail
Far :fastmail-remote:
Near :fastmail-local:
Patterns *
Create Both
Expunge Both
SyncState *
```

```bash
mkdir -p ~/mail/fastmail
mbsync fastmail
```

## Custom Domains

If you use a custom domain with Fastmail, replace `you%40fastmail.com` with your custom domain email (e.g., `you%40yourdomain.com`). The server hostnames remain the same — Fastmail handles the routing.

## Next Steps

- [aerc-jmap(5)](/reference/aerc-jmap.5/) — JMAP backend reference
- [Maildir Setup with mbsync](/guides/maildir-mbsync/) — full offline sync guide
- [Notmuch Integration](/guides/notmuch/) — add full-text search
