---
title: Basic Usage
description: Learn to navigate, read, compose, and search email in aerc
sidebar:
  order: 3
---

This guide covers the fundamental operations in aerc — navigation, reading messages, composing email, and searching.

## Navigation

aerc uses vim-style keybindings by default:

| Key | Action |
|-----|--------|
| `j` / `k` | Move down / up in message list |
| `Enter` | Open selected message |
| `q` | Close current view |
| `J` / `K` | Switch between folders |
| `Ctrl+n` / `Ctrl+p` | Next / previous tab |
| `g` / `G` | Jump to first / last message |

## Reading Messages

When you open a message:

- Scroll with `j`/`k` or your pager's keybindings
- Press `q` to return to the message list
- Use `Ctrl+k` and `Ctrl+j` to switch between message parts (attachments)
- Press `J` or `K` to view next/previous message without returning to the list

## Composing Messages

| Key | Action |
|-----|--------|
| `C` | Compose new message |
| `rr` | Reply all |
| `rq` | Reply all with quote |
| `Rr` | Reply to sender only |
| `Rq` | Reply to sender with quote |

In the composer:
- `Tab` or `Ctrl+j`/`Ctrl+k` to move between header fields and editor
- Close your editor to reach the review screen
- `y` to send, `n` to cancel, `e` to re-edit, `a` to attach files

## Searching and Filtering

| Command | Action |
|---------|--------|
| `/` | Search messages |
| `\` | Filter messages (hide non-matches) |
| `n` / `N` | Next / previous search result |
| `Esc` | Clear filter |

See [aerc-search(1)](/reference/aerc-search.1/) for the full search syntax.

## The Command Line

Press `:` to open the command line. Common commands:

- `:cd <dir>` — change working directory
- `:cf <folder>` — change mail folder
- `:compose` — start composing
- `:help <topic>` — open help
- `:quit` / `:q` — exit aerc

See [aerc(1)](/reference/aerc.1/) for all available commands.

## Next Steps

- [Filters and Rendering](/guides/filters/) — customize how messages are displayed
- [Theming & Stylesets](/guides/theming/) — change aerc's appearance
- [Templates](/guides/templates/) — customize compose, reply, and forward templates
- [PGP/GPG Encryption](/guides/pgp/) — sign and encrypt email
