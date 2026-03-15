---
title: Image Previews in Terminal
description: Display inline image previews for image attachments in aerc
sidebar:
  order: 7
---

## Problem

Image attachments show as raw data or nothing. You want inline image previews directly in the terminal.

## Solution

Use [chafa](https://hpjansson.org/chafa/) to render images as sixel graphics or Unicode art.

## Configuration

### Filter for inline preview

Add to `[filters]` in `~/.config/aerc/aerc.conf`:

```ini
[filters]
image/* = chafa -f sixel -s $(tput cols)x$(tput lines) -
```

### Opener for full-size viewing

Add to `[openers]` to open images in a GUI viewer:

```ini
[openers]
image/* = xdg-open {}
```

Or use a specific application:

```ini
[openers]
image/* = loupe {}
```

### Install chafa

```bash
# Arch Linux
pacman -S chafa

# Debian / Ubuntu
apt install chafa

# macOS
brew install chafa
```

## Terminal Requirements

Sixel support varies by terminal:

| Terminal | Sixel Support |
|----------|---------------|
| foot | Yes |
| WezTerm | Yes |
| kitty | Yes (via kitty protocol, use `-f kitty`) |
| xterm | Yes (if compiled with `--enable-sixel-graphics`) |
| Alacritty | No |
| gnome-terminal | No |

### Fallback to Unicode

If your terminal doesn't support sixel, use block characters:

```ini
image/* = chafa -f symbols -s $(tput cols)x$(tput lines) -
```

This renders a lower-resolution preview using Unicode block elements, which works everywhere.

### Kitty terminal

For kitty, use its native protocol:

```ini
image/* = chafa -f kitty -s $(tput cols)x$(tput lines) -
```

## Explanation

- **`-f sixel`** — output format (sixel, kitty, or symbols)
- **`-s WxH`** — scale to terminal dimensions; `tput cols` and `tput lines` auto-detect size
- **`-`** — read from stdin (aerc pipes the image data)

## See Also

- [Filters and Rendering](/guides/filters/) — full filter pipeline guide
- [Openers](/recipes/openers/) — open attachments with external programs
- [aerc-config(5)](/reference/aerc-config.5/) — `[filters]` and `[openers]` reference
