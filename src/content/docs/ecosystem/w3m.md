---
title: w3m
description: HTML email rendering for aerc using w3m
sidebar:
  order: 4
---

[w3m](https://w3m.sourceforge.net/) is a text-based web browser that can render HTML into formatted plain text. In the context of aerc, w3m serves as an HTML-to-text filter — it takes the HTML part of an email and converts it into readable terminal output, handling tables, lists, links, and basic CSS.

## How It Integrates with aerc

aerc uses configurable filters to display message parts. When you receive an HTML email, aerc pipes the content through the filter defined for the `text/html` MIME type. w3m processes the HTML and outputs formatted text that aerc displays in its message viewer. The filter is configured in the `[filters]` section of `~/.config/aerc/aerc.conf`.

## Installation

```bash
# Arch Linux          # Debian / Ubuntu      # macOS
pacman -S w3m          apt install w3m         brew install w3m
```

## Filter Configuration

### Interactive mode (recommended)

```ini
[filters]
text/plain = colorize
text/html  = ! w3m -I UTF-8 -T text/html
```

The `!` prefix runs w3m interactively within the terminal, letting you scroll and follow links with w3m's own keybindings.

### Non-interactive (dump) mode

```ini
[filters]
text/plain = colorize
text/html  = w3m -T text/html -dump -o display_link_number=1 | colorize
```

| Flag | Purpose |
|------|---------|
| `-T text/html` | Treat input as HTML |
| `-dump` | Output formatted text to stdout |
| `-I UTF-8` | Set input encoding to UTF-8 |
| `-o display_link_number=1` | Append numbered link references |

## Inline Images with Sixel

If your terminal supports sixel graphics (foot, WezTerm, mlterm), aerc ships a filter that leverages w3m's image capabilities:

```ini
[filters]
text/plain = colorize
text/html  = ! html-unsafe -sixel

[viewer]
show-images = true
```

:::caution
The `html-unsafe` filter loads external images from the email. This can leak your IP address and confirm to senders that you opened the message.
:::

## Comparison with Alternatives

| Filter | Rendering | Interactive | Images | Dependencies |
|--------|-----------|-------------|--------|-------------|
| **w3m** | Excellent | Yes (with `!`) | Sixel | w3m |
| **Built-in html** | Good | No | With `-sixel` | None |
| **lynx** | Good | No | No | lynx |
| **pandoc** | Basic | No | No | pandoc |

w3m is the best choice for HTML-heavy emails with complex layouts. For simpler emails, aerc's built-in `html` filter works well without external dependencies.

## Troubleshooting

- **Garbled output** — pass `-I UTF-8` to set the input encoding.
- **Links not visible** — use `-o display_link_number=1` in dump mode.
- **Filter not applied** — verify the `text/html` entry in `[filters]`. Filters match in order; specific patterns must come first.
- **Images not rendering** — confirm sixel terminal support, use `html-unsafe -sixel`, and set `show-images = true`.

## Related Pages

- [HTML Email Rendering](/recipes/html-rendering/) — full guide comparing all HTML filter options
- [aerc-config(5)](/reference/aerc-config.5/) — configuration reference for `[filters]` and `[viewer]`
- [Ecosystem Overview](/ecosystem/) — other companion tools for aerc
- [w3m upstream](https://w3m.sourceforge.net/) — official project site
