---
title: Desktop Notifications
description: Get desktop notifications for new mail in aerc
sidebar:
  order: 1
---

aerc can send desktop notifications when new mail arrives using its built-in hooks system and standard notification tools like `notify-send`.

## Basic Setup with notify-send

Add the following to `~/.config/aerc/aerc.conf`:

```ini
[hooks]
mail-received = notify-send "New mail from $AERC_FROM_NAME" "$AERC_SUBJECT"
```

This sends a desktop notification with the sender's name as the title and the subject as the body whenever new mail is received.

### Available Environment Variables

The `mail-received` hook sets several environment variables you can use in your notification command:

| Variable           | Description                      |
|--------------------|----------------------------------|
| `$AERC_ACCOUNT`    | Account name from accounts.conf  |
| `$AERC_FOLDER`     | Folder that received the mail    |
| `$AERC_FROM_NAME`  | Sender's display name            |
| `$AERC_FROM_ADDRESS` | Sender's email address         |
| `$AERC_SUBJECT`    | Message subject line             |
| `$AERC_MSGID`      | Message ID header                |

See the hooks section of [aerc-config(5)](/reference/aerc-config.5/) for the full list.

## Including the Account and Folder

If you manage multiple accounts, include the account and folder in the notification:

```ini
[hooks]
mail-received = notify-send "[$AERC_ACCOUNT/$AERC_FOLDER] New mail from $AERC_FROM_NAME" "$AERC_SUBJECT"
```

## Enabling Mail Checking

For notifications to fire, aerc needs to periodically check for new mail. Set `check-mail` in `~/.config/aerc/accounts.conf`:

```ini
[Personal]
source          = imaps://you%40example.com@imap.example.com:993
# ... other settings ...
check-mail      = 5m
```

For maildir/notmuch backends, you also need `check-mail-cmd` to trigger the external sync:

```ini
[Personal]
source          = maildir://~/mail/personal
# ... other settings ...
check-mail-cmd  = mbsync personal && notmuch new
check-mail      = 5m
```

See [aerc-accounts(5)](/reference/aerc-accounts.5/) for details on `check-mail` and `check-mail-cmd`.

## Notification Daemons

The `notify-send` command requires a notification daemon to be running. Which daemon you use depends on your desktop environment:

- **dunst** — A lightweight, highly configurable notification daemon popular in X11 and Sway setups. Supports custom formatting, urgency levels, and per-app rules.
- **mako** — A lightweight notification daemon designed for Wayland compositors (Sway, Hyprland, etc.). Configured via `~/.config/mako/config`.
- **fnott** — Another Wayland-native notification daemon with a minimal footprint.
- **GNOME / KDE** — These desktop environments include built-in notification daemons that work with `notify-send` out of the box.

All of these work with the standard `notify-send` command from `libnotify`.

### Install libnotify

```bash
# Arch Linux
pacman -S libnotify

# Debian / Ubuntu
apt install libnotify-bin

# macOS (using terminal-notifier instead)
brew install terminal-notifier
```

On macOS, replace `notify-send` with `terminal-notifier -title ... -message ...` in your hook.

## Advanced: Custom Notification Script

For more control, write a small script and call it from the hook:

```bash
#!/bin/sh
# ~/.local/bin/aerc-notify.sh

# Skip notifications for mailing lists
case "$AERC_FOLDER" in
    lists/*) exit 0 ;;
esac

# Use different urgency for specific senders
if echo "$AERC_FROM_ADDRESS" | grep -q "boss@work.com"; then
    urgency="critical"
else
    urgency="normal"
fi

notify-send -u "$urgency" \
    "New mail in $AERC_ACCOUNT" \
    "From: $AERC_FROM_NAME\nSubject: $AERC_SUBJECT"
```

Make it executable and reference it in `aerc.conf`:

```ini
[hooks]
mail-received = ~/.local/bin/aerc-notify.sh
```

## Next Steps

- [aerc-config(5)](/reference/aerc-config.5/) — full configuration reference, including all hook types
- [Ecosystem Overview](/ecosystem/) — companion tools for aerc
