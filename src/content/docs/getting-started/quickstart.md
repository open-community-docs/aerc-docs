---
title: Quickstart
description: Get aerc running with a single email account in minutes
sidebar:
  order: 2
---

This guide gets you from zero to reading email with aerc using a single IMAP account.

## Minimal accounts.conf

Create `~/.config/aerc/accounts.conf`:

```ini
[Personal]
source   = imaps://you@example.com@imap.example.com:993
outgoing = smtps+plain://you@example.com@smtp.example.com:465
default  = INBOX
from     = Your Name <you@example.com>
copy-to  = Sent
```

Replace the server addresses and credentials with your provider's settings.

## Credential Management

Instead of storing passwords in the config file, use a credential command:

```ini
source-cred-cmd  = pass email/example.com
outgoing-cred-cmd = pass email/example.com
```

This uses [pass](https://www.passwordstore.org/) to retrieve your password securely.

## Launch aerc

```bash
aerc
```

You should see your inbox. Use `j`/`k` to navigate, `Enter` to open a message, and `q` to go back.

## Next Steps

- [Basic Usage](/getting-started/basic-usage/) — learn navigation, composing, and searching
- [Provider Guides](/providers/) — ready-made configs for Gmail, Fastmail, Outlook, etc.
- [aerc-accounts(5)](/reference/aerc-accounts.5/) — full account configuration reference
