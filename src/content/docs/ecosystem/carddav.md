---
title: carddav-query
description: CardDAV address book integration for aerc
sidebar:
  order: 5
---

carddav-query is a companion tool shipped with aerc for querying CardDAV address books. It connects to CardDAV servers — such as Nextcloud, Radicale, Baikal, or Google Contacts — and returns matching contacts for tab-completion when composing messages in aerc.

## How It Integrates with aerc

aerc's `address-book-cmd` option in `accounts.conf` accepts any command that takes a search string and outputs matching contacts. When you start typing a name or address in the To, Cc, or Bcc fields, aerc runs the command with the typed text as an argument and presents matching results as completion candidates.

## Installation

carddav-query is included in the aerc source tree under `contrib/`. Some distributions package it alongside aerc:

```bash
# Arch Linux (included with aerc)
pacman -S aerc

# From source
go install git.sr.ht/~rjarry/aerc/contrib/carddav-query@latest
```

Verify it is available: `carddav-query --help`

## Configuration

In `~/.config/aerc/accounts.conf`, add `address-book-cmd` to the relevant account:

```ini
[Personal]
source            = imaps://you%40example.com@imap.example.com:993
source-cred-cmd   = pass email/you@example.com
outgoing          = smtps+plain://you%40example.com@smtp.example.com:465
outgoing-cred-cmd = pass email/you@example.com
default           = INBOX
from              = Your Name <you@example.com>
address-book-cmd  = carddav-query -s https://dav.example.com/carddav/ -u you@example.com -p "pass email/you@example.com" "%s"
```

The `%s` placeholder is replaced by the search term aerc passes to the command.

### Common flags

| Flag | Purpose |
|------|---------|
| `-s` | CardDAV server URL |
| `-u` | Username for authentication |
| `-p` | Password command (executed to retrieve the password) |

Run `carddav-query --help` for the full list of options.

## CardDAV Server URLs

| Provider | URL pattern |
|----------|-------------|
| **Nextcloud** | `https://cloud.example.com/remote.php/dav/addressbooks/users/you/contacts/` |
| **Radicale** | `https://dav.example.com/you/contacts/` |
| **Baikal** | `https://dav.example.com/dav.php/addressbooks/you/default/` |

Check your provider's documentation for the exact endpoint.

## Testing

Verify carddav-query returns results before configuring aerc:

```bash
carddav-query -s https://dav.example.com/carddav/ -u you@example.com -p "pass email/you@example.com" "john"
```

Output should be tab-separated `email\tname` lines.

## Alternative Address Book Commands

| Tool | Description |
|------|-------------|
| **abook** | Terminal address book with its own file format |
| **khard** | Console CardDAV client with local vCard sync |
| **notmuch address** | Extracts addresses from indexed email |

Example using notmuch:

```ini
address-book-cmd = notmuch address "%s"
```

## Troubleshooting

- **No completions** — test the command in a terminal first. Check URL, credentials, and search term.
- **Auth failures** — verify the credential command prints only the password to stdout.
- **Slow completions** — CardDAV queries go over the network. Consider khard or notmuch for local lookups.

## Related Pages

- [carddav-query(1)](/reference/carddav-query.1/) — command reference for carddav-query
- [aerc-accounts(5)](/reference/aerc-accounts.5/) — account configuration including `address-book-cmd`
- [pass (password-store)](/ecosystem/pass/) — credential management for carddav-query
- [Ecosystem Overview](/ecosystem/) — other companion tools for aerc
