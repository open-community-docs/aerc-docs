---
title: Outlook / Microsoft 365
description: Configure aerc with Outlook.com and Microsoft 365 (OAuth2 and IMAP)
sidebar:
  order: 3
---

Microsoft offers email through several services: **Outlook.com** (personal), **Microsoft 365** (enterprise/education), and legacy **Hotmail/Live** accounts. All use the same servers but differ in authentication.

## Server Details

| Protocol | Server | Port | Encryption |
|----------|--------|------|------------|
| IMAP | outlook.office365.com | 993 | TLS/SSL |
| SMTP | smtp.office365.com | 587 | STARTTLS |

:::caution
Microsoft **disabled basic password authentication** for IMAP/SMTP in late 2022 for most accounts. You likely need OAuth2 — see the OAuth2 section below.
:::

## Option A: OAuth2 (Required for Most Accounts)

Microsoft requires OAuth2 for Outlook.com and most Microsoft 365 accounts. aerc supports this via the `xoauth2` authentication mechanism.

### Prerequisites

You need an OAuth2 token provider. The recommended approach uses a helper tool to handle the OAuth2 flow:

1. Install a token helper like [mailctl](https://github.com/pstritzke/mailctl), [mutt_oauth2.py](https://github.com/neomutt/neomutt/blob/main/contrib/oauth2/mutt_oauth2.py), or [oauth2ms](https://github.com/harishkrupo/oauth2ms).
2. Register an Azure AD application (or use an existing client ID).
3. Complete the OAuth2 authorization flow to obtain a refresh token.

### accounts.conf with oauth2ms

```ini
[Outlook]
source            = imaps+xoauth2://you%40outlook.com@outlook.office365.com:993
source-cred-cmd   = oauth2ms
outgoing          = smtp+xoauth2://you%40outlook.com@smtp.office365.com:587
outgoing-cred-cmd = oauth2ms
default           = INBOX
from              = Your Name <you@outlook.com>
copy-to           = Sent
```

The `+xoauth2` suffix tells aerc to use XOAUTH2 authentication. The credential command must output a valid OAuth2 access token.

See [aerc-imap(5)](/reference/aerc-imap.5/) for details on OAuth2 configuration parameters.

## Option B: App Password (If Available)

Some Microsoft 365 accounts (depending on admin policy) and personal accounts with 2FA enabled may support App Passwords:

1. Go to [account.microsoft.com/security](https://account.microsoft.com/security)
2. Under **Additional security options**, find **App passwords**
3. Create a new App Password

If App Passwords are available to you:

```ini
[Outlook]
source            = imaps://you%40outlook.com@outlook.office365.com:993
source-cred-cmd   = pass email/outlook
outgoing          = smtp+plain://you%40outlook.com@smtp.office365.com:587
outgoing-cred-cmd = pass email/outlook
default           = INBOX
from              = Your Name <you@outlook.com>
copy-to           = Sent
```

:::note
Microsoft is phasing out App Passwords. OAuth2 is the future-proof approach.
:::

## mbsync Configuration

For offline access via maildir:

```ini
# ~/.mbsyncrc
IMAPAccount outlook
Host outlook.office365.com
Port 993
User you@outlook.com
# For OAuth2, use your token helper:
# PassCmd "oauth2ms"
# AuthMechs XOAUTH2
# For App Password:
PassCmd "pass email/outlook"
TLSType IMAPS
CertificateFile /etc/ssl/certs/ca-certificates.crt

IMAPStore outlook-remote
Account outlook

MaildirStore outlook-local
SubFolders Verbatim
Path ~/mail/outlook/
Inbox ~/mail/outlook/INBOX

Channel outlook
Far :outlook-remote:
Near :outlook-local:
Patterns *
Create Both
Expunge Both
SyncState *
```

For OAuth2 with mbsync, uncomment the `AuthMechs XOAUTH2` line and configure `PassCmd` to run your token helper.

## Troubleshooting

### "AUTHENTICATE failed" error

Your account likely requires OAuth2 and doesn't accept plain passwords. Set up OAuth2 authentication as described above.

### SMTP connection fails on port 465

Microsoft uses port 587 with STARTTLS for SMTP, not port 465 with implicit TLS. Use:

```
outgoing = smtp+plain://you%40outlook.com@smtp.office365.com:587
```

Note: `smtp` (not `smtps`) — this uses STARTTLS on port 587.

### Folders have different names

Microsoft uses localized folder names in some configurations. Common English names: `Inbox`, `Sent Items` (not `Sent`), `Drafts`, `Deleted Items` (not `Trash`), `Junk Email`.

```ini
copy-to = Sent Items
```

## Next Steps

- [aerc-imap(5)](/reference/aerc-imap.5/) — IMAP configuration reference (includes OAuth2 docs)
- [Maildir Setup with mbsync](/guides/maildir-mbsync/) — full offline sync guide
