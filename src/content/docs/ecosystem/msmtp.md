---
title: msmtp
description: Lightweight SMTP client as an alternative to aerc's built-in SMTP
sidebar:
  order: 2
---

msmtp is a lightweight SMTP client that acts as a sendmail replacement. It reads recipient addresses from the command line, accepts a message on standard input, and relays it through an SMTP server. While aerc has built-in SMTP support, msmtp is useful when you need a system-wide mail transfer agent, offline mail queuing, or already have msmtp configured for other tools.

## How It Integrates with aerc

aerc supports a sendmail backend that pipes outgoing mail to an external command. By setting `outgoing` to the path of msmtp, aerc delegates all SMTP handling to msmtp. This means msmtp's own configuration (`~/.msmtprc`) controls authentication, TLS, and server selection — aerc just hands off the message.

## Installation

```bash
# Arch Linux          # Debian / Ubuntu      # macOS
pacman -S msmtp        apt install msmtp       brew install msmtp
```

## Basic Configuration

Create `~/.msmtprc`:

```ini
defaults
auth           on
tls            on
tls_trust_file /etc/ssl/certs/ca-certificates.crt
logfile        ~/.msmtp.log

account        personal
host           smtp.example.com
port           587
from           you@example.com
user           you@example.com
passwordeval   "pass email/you@example.com"

account default : personal
```

Restrict file permissions and test the connection:

```bash
chmod 600 ~/.msmtprc
echo "Subject: Test" | msmtp --debug you@example.com
```

## Connecting to aerc

In `~/.config/aerc/accounts.conf`, set `outgoing` to use msmtp via the sendmail transport:

```ini
[Personal]
source          = imaps://you%40example.com@imap.example.com:993
source-cred-cmd = pass email/you@example.com
outgoing        = /usr/bin/msmtp
default         = INBOX
from            = Your Name <you@example.com>
copy-to         = Sent
```

No `outgoing-cred-cmd` is needed because msmtp handles authentication itself.

## When to Use msmtp vs. Built-in SMTP

| Scenario | Recommendation |
|----------|---------------|
| Simple single-account setup | aerc's built-in SMTP — fewer moving parts |
| System-wide sendmail (cron, git send-email) | msmtp — other tools share the config |
| Offline mail queuing | msmtp + msmtpq — queue and flush when online |
| You already have msmtp configured | msmtp — reuse existing config |

## Offline Queuing with msmtpq

msmtp ships with `msmtpq`, a wrapper that queues messages when the network is unavailable:

```ini
# In accounts.conf
outgoing = /usr/bin/msmtpq
```

Flush the queue manually: `msmtpq --manage`

## Multiple Accounts

msmtp selects the correct account based on the `From` header. Define additional `account` blocks in `~/.msmtprc` with their own host/user/passwordeval settings, and use `--read-envelope-from` so msmtp picks the right one automatically.

## Related Pages

- [aerc-sendmail(5)](/reference/aerc-sendmail.5/) — aerc's sendmail backend reference
- [aerc-smtp(5)](/reference/aerc-smtp.5/) — aerc's built-in SMTP backend reference
- [pass (password-store)](/ecosystem/pass/) — credential management for msmtp
- [Multi-Account Management](/guides/multi-account/) — configuring multiple accounts in aerc
- [msmtp upstream documentation](https://marlam.de/msmtp/) — official project site
