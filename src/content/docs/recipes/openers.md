---
title: Attachment Openers
description: Configure external programs for opening attachments in aerc
sidebar:
  order: 8
---

## Problem

You want to open email attachments with the right application — images in a viewer, PDFs in a reader, videos in a player.

## Solution

Configure the `[openers]` section in `~/.config/aerc/aerc.conf` to map MIME types to external programs.

## Configuration

```ini
[openers]
# Images — open in your preferred viewer
image/* = loupe {}

# PDFs
application/pdf = evince {}

# Audio and video
audio/* = mpv {}
video/* = mpv {}

# Spreadsheets and documents
application/vnd.openxmlformats-officedocument.* = libreoffice {}

# Copy mailto links to clipboard (Wayland)
x-scheme-handler/mailto = printf '%s' {} | wl-copy

# Copy mailto links to clipboard (X11)
# x-scheme-handler/mailto = printf '%s' {} | xclip -selection clipboard

# Fallback — open with system default
* = xdg-open {}
```

## How Openers Work

- **`:open`** opens the current message part with the matching opener
- **`:open-link`** opens a URL from the message using the scheme handler
- **`{}`** is replaced with the temporary filename or URL (properly shell-quoted)
- If `{}` isn't in the command, the filename is appended to the end
- Commands run via `sh -c`
- Glob patterns work the same way as in `[filters]`

## Usage

| Command | Action |
|---------|--------|
| `o` or `O` | Open current part with configured opener |
| `:open` | Same as above |
| `:open-link` | Pick a URL from the message and open it |
| `:save <path>` | Save attachment to disk instead of opening |

## Explanation

- **`image/*`** catches all image types (jpeg, png, gif, etc.)
- **`x-scheme-handler/mailto`** handles `mailto:` links extracted from emails
- **Wayland vs X11** — use `wl-copy` for Wayland compositors, `xclip` for X11
- **Fallback** — `xdg-open` uses your system's default application associations

## See Also

- [Image Previews](/recipes/image-preview/) — inline image previews with chafa
- [aerc-config(5)](/reference/aerc-config.5/) — `[openers]` reference
