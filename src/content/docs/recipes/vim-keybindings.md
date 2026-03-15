---
title: Vim-Style Keybindings
description: Enhanced vim-style keybindings for aerc
sidebar:
  order: 4
---

## Problem

The default aerc keybindings cover basics, but you want richer vim-style navigation: view alignment, safe delete with confirmation, patch management shortcuts, and fold toggling.

## Solution

Add these to `~/.config/aerc/binds.conf`. Each section below goes under the appropriate `[context]` header.

## Configuration

### Message list navigation

```ini
[messages]
# Align view: center, top, bottom (like vim zz/zt/zb)
# Note: these are aerc-specific — not built-in defaults
zc = :fold<Enter>
zo = :unfold<Enter>
za = :fold -t<Enter>
zM = :fold -a<Enter>
zR = :unfold -a<Enter>
<tab> = :fold -t<Enter>

# Delete with confirmation prompt
d = :prompt 'Really delete this message?' 'delete-message'<Enter>

# Quick delete without confirmation
D = :delete<Enter>

# Archive (flat structure)
a = :archive flat<Enter>
A = :unmark -a<Enter>:mark -T<Enter>:archive flat<Enter>

# Marking
v = :mark -t<Enter>
<Space> = :mark -t<Enter>:next<Enter>
V = :mark -v<Enter>
```

### Patch management shortcuts

```ini
[messages]
# Patch workflow (p prefix)
pl = :patch list<Enter>
pa = :patch apply <Tab>
pd = :patch drop <Tab>
pb = :patch rebase<Enter>
pt = :patch term<Enter>
ps = :patch switch <Tab>
```

### Message viewer

```ini
[view]
# Open links (Ctrl+l to pick a link from the message)
<C-l> = :open-link <space>

# Navigate between messages without returning to list
J = :next<Enter>
K = :prev<Enter>

# Toggle headers
H = :toggle-headers<Enter>

# Search within message (pass-through to pager)
/ = :toggle-key-passthrough<Enter>/
```

### Compose review

```ini
[compose::review]
y = :send<Enter>
n = :abort<Enter>
v = :preview<Enter>
p = :postpone<Enter>
q = :choose -o d discard abort -o p postpone postpone<Enter>
e = :edit<Enter>
a = :attach<space>
d = :detach<space>
```

## Explanation

- **Delete confirmation** — `d` prompts before deleting, preventing accidental loss. `D` deletes immediately for when you're sure.
- **Fold/unfold** — `zc`/`zo`/`za` mirror vim's fold commands. `zM` folds all threads, `zR` unfolds all.
- **Patch shortcuts** — the `p` prefix groups all patch operations together, with Tab completion for tag/project names.
- **Passthrough** — in the viewer, `/` enters passthrough mode so the search keystroke reaches your pager (less).

## See Also

- [aerc-binds(5)](/reference/aerc-binds.5/) — full keybinding configuration reference
- [Patch Workflow](/guides/patch-workflow/) — using aerc's patch management system
