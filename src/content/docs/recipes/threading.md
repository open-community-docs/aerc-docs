---
title: Thread Customization
description: Configure threaded message views with custom prefixes in aerc
sidebar:
  order: 5
---

## Problem

You want threaded email conversations with a clean, readable tree display using custom Unicode characters.

## Solution

Enable threading in `[ui]` of `~/.config/aerc/aerc.conf` and customize the thread prefix characters.

## Configuration

### Enable threading

```ini
[ui]
threading-enabled = true
```

### Customize thread prefix characters

```ini
[ui]
# Arrow tip character
thread-prefix-tip = "▸"

# Indentation between levels
thread-prefix-indent = "  "

# Vertical line connecting siblings
thread-prefix-stem = "│"

# Horizontal connector
thread-prefix-limb = "─"

# Folded thread indicator
thread-prefix-folded = "▶"

# Unfolded thread indicator
thread-prefix-unfolded = "▼"

# First child of a thread
thread-prefix-first-child = "┬"

# Message with siblings below
thread-prefix-has-siblings = "├─"

# Standalone message (no parent, no children)
thread-prefix-lone = "•"

# Orphan message (no parent, has children)
thread-prefix-orphan = "┌"

# Last sibling in a thread
thread-prefix-last-sibling = "└─"
```

### Result

With these settings, threads render as:

```
• Standalone message
┌ Thread start
├─▸ First reply
│ └─▸ Nested reply
└─▸ Second reply
```

### Thread info in columns

Show thread counts in the subject column:

```ini
[ui]
column-subject = {{.ThreadPrefix}}{{if .ThreadFolded}}{{printf "{%d}" .ThreadCount}}{{end}}{{.Subject}}
```

When a thread is folded, this shows `{5}` before the subject indicating 5 messages in the thread.

### Fold/unfold keybindings

```ini
# In binds.conf [messages]
zc = :fold<Enter>
zo = :unfold<Enter>
za = :fold -t<Enter>
zM = :fold -a<Enter>
zR = :unfold -a<Enter>
<tab> = :fold -t<Enter>
```

## Additional Threading Options

```ini
[ui]
# Build threads client-side when the server doesn't support it
#force-client-threads = false

# Show messages outside the current query for thread context
#show-thread-context = false

# Reverse thread order (newest on top)
#reverse-thread-order = false

# Sort siblings by message sort criteria instead of UID
#sort-thread-siblings = false
```

## Explanation

- **Thread prefix chars** use Unicode box-drawing characters for a clean tree. The defaults use ASCII which works everywhere but looks basic.
- **Folding** collapses threads to their root message, showing the thread count. Useful for busy mailing lists.
- **Thread context** shows related messages that don't match your current filter, grayed out with the `msglist_thread_context` style object.

## See Also

- [aerc-config(5)](/reference/aerc-config.5/) — all `[ui]` threading options
- [Theming & Stylesets](/guides/theming/) — style `msglist_thread_*` objects
- [Vim-Style Keybindings](/recipes/vim-keybindings/) — fold/unfold shortcuts
