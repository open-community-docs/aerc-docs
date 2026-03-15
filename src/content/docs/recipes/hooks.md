---
title: Event Hooks
description: Run commands automatically on mail events in aerc
sidebar:
  order: 9
---

## Problem

You want to automate actions when mail events occur — notifications on new mail, syncing after deletions, logging sent messages.

## Solution

Configure the `[hooks]` section in `~/.config/aerc/aerc.conf`.

## Configuration

### New mail notification

```ini
[hooks]
mail-received = notify-send -i mail-unread "[$AERC_ACCOUNT] New mail" "From: $AERC_FROM_NAME\n$AERC_SUBJECT"
```

### Sync after flag changes

Keep your maildir in sync with the server when you read, flag, or delete messages:

```ini
[hooks]
flag-changed = mbsync "$AERC_ACCOUNT:$AERC_FOLDER" &
mail-deleted = mbsync "$AERC_ACCOUNT:$AERC_FOLDER" &
mail-added   = mbsync "$AERC_ACCOUNT:$AERC_FOLDER" &
```

The `&` runs the sync in the background so aerc doesn't block.

### Conditional hooks

Run different commands per account:

```ini
[hooks]
mail-sent = sh -c 'if [ "$AERC_ACCOUNT" = "Work" ]; then mbsync work; fi'
```

## Available Hooks

| Hook | Trigger | Key Variables |
|------|---------|---------------|
| `mail-received` | New email arrives | `AERC_ACCOUNT`, `AERC_FOLDER`, `AERC_FROM_NAME`, `AERC_FROM_ADDRESS`, `AERC_SUBJECT`, `AERC_MESSAGE_ID` |
| `mail-deleted` | Message deleted | `AERC_ACCOUNT`, `AERC_FOLDER`, `AERC_FOLDER_ROLE` |
| `mail-added` | Message added to folder | `AERC_ACCOUNT`, `AERC_FOLDER`, `AERC_FOLDER_ROLE` |
| `mail-sent` | Message sent | `AERC_ACCOUNT`, `AERC_FROM_NAME`, `AERC_FROM_ADDRESS`, `AERC_SUBJECT`, `AERC_TO`, `AERC_CC` |
| `tag-modified` | Notmuch tag changed | `AERC_ACCOUNT`, `AERC_TAG_ADDED`, `AERC_TAG_REMOVED`, `AERC_TAG_TOGGLED` |
| `flag-changed` | Message flag toggled | `AERC_ACCOUNT`, `AERC_FOLDER`, `AERC_FLAG` |
| `aerc-shutdown` | aerc exits | `AERC_LIFETIME` |
| `aerc-startup` | aerc starts | `AERC_VERSION`, `AERC_BINARY` |

## Environment Variables

All hooks have access to `AERC_ACCOUNT` and `AERC_ACCOUNT_BACKEND`. Additional variables depend on the hook — see the table above.

## Examples

### Play a sound on new mail

```ini
mail-received = paplay /usr/share/sounds/freedesktop/stereo/message-new-email.oga &
```

### Auto-tag with notmuch

```ini
mail-received = notmuch tag +inbox +unread -- id:$AERC_MESSAGE_ID
```

### Final sync on exit

```ini
aerc-shutdown = mbsync -a
```

### Log sent mail

```ini
mail-sent = echo "$(date): Sent to $AERC_TO - $AERC_SUBJECT" >> ~/mail-sent.log
```

## Explanation

- Hooks run via `sh -c`, so you have full shell syntax
- Background commands with `&` prevent blocking the UI
- `AERC_FOLDER_ROLE` gives the semantic role (inbox, sent, trash, etc.) regardless of the actual folder name
- Hooks fire for all accounts unless you add conditional logic

## See Also

- [Desktop Notifications](/recipes/desktop-notifications/) — detailed notification setup
- [aerc-config(5)](/reference/aerc-config.5/) — `[hooks]` reference
