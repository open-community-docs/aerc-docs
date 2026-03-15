---
title: Notmuch Integration
description: Set up notmuch for fast full-text search across all your email in aerc
sidebar:
  order: 2
---

[notmuch](https://notmuchmail.org/) provides fast, tag-based full-text search across all your mail. aerc has a native notmuch backend that lets you use notmuch queries directly as mail folders.

## Install notmuch

```bash
# Arch Linux
pacman -S notmuch

# Debian / Ubuntu
apt install notmuch

# macOS
brew install notmuch
```

## Initialize notmuch

```bash
notmuch setup
```

When prompted:
- **Your name**: Your Name
- **Your email**: you@example.com (add all your addresses)
- **Mail root**: `~/mail` (the parent of all your maildir stores)

Then build the initial index:

```bash
notmuch new
```

## Configure aerc with notmuch

In `~/.config/aerc/accounts.conf`:

```ini
[Personal]
source          = notmuch://~/mail
query-map       = ~/mail/.notmuch/query-map
default         = tag:inbox
from            = Your Name <you@example.com>
outgoing        = smtps+plain://you@example.com@smtp.example.com:465
outgoing-cred-cmd = pass email/example.com
copy-to         = Sent
```

## Query Map

Create `~/mail/.notmuch/query-map` to define virtual folders:

```
tag:inbox=INBOX
tag:unread=Unread
tag:flagged=Flagged
tag:sent=Sent
tag:archive=Archive
tag:trash=Trash
folder:personal/Drafts=Drafts
```

Each line maps a notmuch query to a folder name shown in aerc's sidebar.

## Keep the Index Updated

After each mbsync run, update the notmuch index:

```bash
mbsync -a && notmuch new
```

Or configure aerc to do it automatically via `check-mail-cmd` in `accounts.conf`:

```ini
check-mail-cmd  = mbsync -a && notmuch new
check-mail-timeout = 120s
```

## Searching with notmuch

In aerc, use `:search` or `/` with notmuch query syntax:

```
:search tag:unread
:search from:alice subject:meeting
:filter date:2024-01-01..2024-02-01
```

See [aerc-search(1)](/reference/aerc-search.1/) and the [notmuch search syntax](https://notmuchmail.org/manpages/notmuch-search-terms-7/) for full details.

## Next Steps

- [aerc-notmuch(5)](/reference/aerc-notmuch.5/) — full notmuch backend reference
- [Maildir Setup with mbsync](/guides/maildir-mbsync/) — set up the maildir backend
