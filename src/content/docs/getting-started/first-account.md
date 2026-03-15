---
title: First Account
description: Set up your first email account in aerc — choosing between IMAP and maildir
sidebar:
  order: 4
---

Before configuring aerc, you need to decide how it will access your email. aerc supports two approaches, each with trade-offs.

## Direct IMAP vs. Maildir

| | Direct IMAP | Maildir + mbsync |
|---|---|---|
| **Setup** | Simpler — just `accounts.conf` | More moving parts — mbsync, maildir, optional notmuch |
| **Offline** | No — requires a connection | Yes — mail is stored locally |
| **Speed** | Depends on server latency | Fast — reads from local disk |
| **Search** | Server-side (varies by provider) | Local full-text via notmuch |
| **Best for** | Single account, quick setup | Multiple accounts, power users |

**Recommendation:** Start with direct IMAP to get running quickly. Migrate to maildir later if you need offline access or faster search.

## Option A: Direct IMAP

Create `~/.config/aerc/accounts.conf`:

```ini
[Personal]
source          = imaps://you%40example.com@imap.example.com:993
source-cred-cmd = pass email/you@example.com
outgoing        = smtps+plain://you%40example.com@smtp.example.com:465
outgoing-cred-cmd = pass email/you@example.com
default         = INBOX
from            = Your Name <you@example.com>
copy-to         = Sent
```

:::tip
The `@` in your email address must be URL-encoded as `%40` in the `source` and `outgoing` URLs, but **not** in the `from` field.
:::

## Option B: Maildir + mbsync

This requires setting up mbsync first. See the [Maildir Setup with mbsync](/guides/maildir-mbsync/) guide for the full walkthrough.

Once your maildir is syncing, configure aerc to read from it:

```ini
[Personal]
source            = maildir://~/mail/personal
outgoing          = smtps+plain://you%40example.com@smtp.example.com:465
outgoing-cred-cmd = pass email/you@example.com
default           = INBOX
from              = Your Name <you@example.com>
copy-to           = Sent
check-mail-cmd    = mbsync personal && notmuch new
check-mail-timeout = 120s
```

The `check-mail-cmd` tells aerc to run mbsync periodically. Alternatively, you can use a [systemd timer](/recipes/systemd-sync-timer/) to sync in the background.

## Credential Management with pass

[pass](https://www.passwordstore.org/) is the recommended way to store credentials. It encrypts passwords with GPG and integrates cleanly with aerc's `*-cred-cmd` options.

### Initial setup

```bash
# Initialize pass (if you haven't already)
gpg --gen-key
pass init <your-gpg-key-id>

# Store your email password
pass insert email/you@example.com
```

### How it works

When aerc needs your password, it runs the command in `source-cred-cmd` or `outgoing-cred-cmd`. The command should print the password to stdout:

```bash
# Test that it works
pass show email/you@example.com
```

### Alternatives to pass

Any command that prints a password to stdout works:

```ini
# secret-tool (GNOME Keyring)
source-cred-cmd = secret-tool lookup email you@example.com

# 1Password CLI
source-cred-cmd = op read "op://Personal/Email/password"

# Bitwarden CLI
source-cred-cmd = bw get password email-login
```

## Verify It Works

Launch aerc:

```bash
aerc
```

You should see your inbox in the message list. If not, check:

1. **Connection errors** — verify server hostname, port, and TLS settings
2. **Auth errors** — test your credential command manually
3. **Encoding** — make sure `@` is `%40` in URLs

See [aerc-accounts(5)](/reference/aerc-accounts.5/) for the full list of account options.

## Next Steps

- [Basic Usage](/getting-started/basic-usage/) — navigate, read, and compose
- [Provider Guides](/providers/gmail/) — ready-made configs for your email provider
- [Multi-Account Management](/guides/multi-account/) — add more accounts
