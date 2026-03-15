---
title: Systemd Timer for Mail Sync
description: Automate mbsync and notmuch with a systemd user timer
sidebar:
  order: 3
---

## Problem

You want mbsync to sync your mail automatically in the background, and notmuch to reindex after each sync, without relying on aerc's `check-mail-cmd`.

## Solution

Create a systemd user service and timer that runs `mbsync -a` followed by `notmuch new` on a schedule.

## Configuration

### Service unit

Create `~/.config/systemd/user/mbsync.service`:

```ini
[Unit]
Description=Sync mail with mbsync and reindex with notmuch

[Service]
Type=oneshot
ExecStart=/usr/bin/mbsync -a
ExecStartPost=/usr/bin/notmuch new
```

### Timer unit

Create `~/.config/systemd/user/mbsync.timer`:

```ini
[Unit]
Description=Sync mail every 5 minutes

[Timer]
OnBootSec=1min
OnUnitActiveSec=5min
Unit=mbsync.service

[Install]
WantedBy=timers.target
```

### Enable and start

```bash
systemctl --user daemon-reload
systemctl --user enable --now mbsync.timer
```

### Verify it's running

```bash
# Check timer status
systemctl --user status mbsync.timer

# Check last sync result
systemctl --user status mbsync.service

# View sync logs
journalctl --user -u mbsync.service -f
```

## Explanation

- **`OnBootSec=1min`** — first sync runs 1 minute after login, giving your session time to set up GPG agent and network
- **`OnUnitActiveSec=5min`** — subsequent syncs run every 5 minutes after the last completed sync
- **`ExecStartPost`** — notmuch reindex only runs if mbsync succeeds
- **User timer** — runs under your user session, so it has access to your GPG keys and pass store

### Sync a single account

To sync only one account on demand:

```bash
mbsync personal && notmuch new
```

### Why systemd over check-mail-cmd?

Using a systemd timer instead of aerc's `check-mail-cmd` has advantages:

- Sync continues even when aerc isn't running
- Sync logs are captured by journald
- Timer is independent of aerc's lifecycle
- You can monitor it with standard systemd tools

The trade-off is that aerc won't automatically refresh the message list after a sync. You can press `Ctrl+r` to refresh manually, or set `check-mail-cmd` to a lightweight notmuch query instead.

## See Also

- [Maildir Setup with mbsync](/guides/maildir-mbsync/)
- [Notmuch Integration](/guides/notmuch/)
- [Desktop Notifications](/recipes/desktop-notifications/) — notify on new mail
