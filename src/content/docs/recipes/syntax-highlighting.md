---
title: Syntax-Highlighted Attachments
description: Use bat for syntax highlighting of code and structured data in aerc
sidebar:
  order: 6
---

## Problem

Code attachments and structured data (JSON, YAML, diffs) display as plain text with no highlighting, making them hard to read.

## Solution

Use [bat](https://github.com/sharkdp/bat) as a filter for code-related MIME types.

## Configuration

Add to `[filters]` in `~/.config/aerc/aerc.conf`:

```ini
[filters]
# Shell scripts
application/x-sh = bat -fP -l sh
application/x-shellscript = bat -fP -l sh

# Data formats
application/json = bat -fP -l json
application/xml = bat -fP -l xml
application/x-yaml = bat -fP -l yaml
application/toml = bat -fP -l toml
application/javascript = bat -fP -l js

# Code
text/x-diff = bat -fP -l diff
text/x-patch = bat -fP -l diff
text/x-python = bat -fP -l py
text/x-script.python = bat -fP -l py
text/x-csrc = bat -fP -l c
text/x-c = bat -fP -l c
text/x-go = bat -fP -l go
text/x-rust = bat -fP -l rust

# Catch-all: highlight any text type using filename for language detection
text/* = bat -fP --file-name="$AERC_FILENAME" --style=plain
```

### Install bat

```bash
# Arch Linux
pacman -S bat

# Debian / Ubuntu
apt install bat    # binary may be named 'batcat'

# macOS
brew install bat
```

## Explanation

- **`-f`** — force color output (bat normally auto-detects terminal)
- **`-P`** — disable paging (aerc handles paging)
- **`-l <lang>`** — explicitly set the language for highlighting
- **`--file-name`** — uses the `$AERC_FILENAME` environment variable so bat can detect the language from the attachment filename
- **`--style=plain`** — hides bat's header/line-numbers (the catch-all is less noisy this way)

### Theming

To match your terminal theme, add `--theme=<name>`:

```ini
application/json = bat -fP -l json --theme=Dracula
```

Run `bat --list-themes` to see available themes.

### Order matters

More specific MIME types should come before the `text/*` catch-all. aerc uses the first matching filter.

## See Also

- [Filters and Rendering](/guides/filters/) — full filter pipeline guide
- [aerc-config(5)](/reference/aerc-config.5/) — `[filters]` reference and environment variables
