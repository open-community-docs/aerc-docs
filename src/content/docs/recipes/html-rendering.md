---
title: HTML Email Rendering
description: Configure aerc to render HTML emails
sidebar:
  order: 2
---

Many emails arrive as HTML-only or with an HTML part that contains content not present in the plain text version. aerc uses configurable filters to convert HTML into readable text in the terminal.

## How Filters Work

Filters are configured in the `[filters]` section of `~/.config/aerc/aerc.conf`. When aerc opens a message part, it finds the first filter matching the MIME type and pipes the content through it. The output is displayed in aerc's built-in pager.

Filters are matched in order, so place more specific patterns before general ones. See the filters section of [aerc-config(5)](/reference/aerc-config.5/) for the full specification.

## Option 1: Built-in html Filter (Recommended Starting Point)

aerc ships with a built-in `html` filter that converts HTML to styled text with colors:

```ini
[filters]
text/plain = colorize
text/html  = html | colorize
```

The `html` filter is bundled with aerc and requires no external dependencies. It handles common HTML email patterns well and produces colored output.

### Pros and Cons

- **Pros**: No external dependencies, good color support, handles most common HTML email layouts
- **Cons**: Complex HTML (heavy CSS, tables used for layout) may not render as cleanly as w3m

## Option 2: w3m (Best Rendering Quality)

[w3m](https://w3m.sourceforge.net/) is a text-based web browser that produces high-quality text output from HTML. It handles complex layouts, tables, and CSS better than simpler converters.

```ini
[filters]
text/plain = colorize
text/html  = ! w3m -I UTF-8 -T text/html
```

The `!` prefix runs w3m in interactive mode within aerc's terminal, allowing you to scroll and follow links.

### With Inline Images (Sixel)

If your terminal supports sixel graphics (e.g., foot, WezTerm, mlterm), you can enable inline image rendering:

```ini
[filters]
text/plain = colorize
text/html  = ! html-unsafe -sixel
```

The `html-unsafe` filter allows loading external image URLs. Use it only if you are comfortable with remote content being fetched when you open an email.

You also need to enable the `show-images` option in the `[viewer]` section:

```ini
[viewer]
show-images = true
```

### Install w3m

```bash
# Arch Linux
pacman -S w3m

# Debian / Ubuntu
apt install w3m

# macOS
brew install w3m
```

### Pros and Cons

- **Pros**: Excellent rendering of tables, lists, and complex layouts; interactive mode allows link navigation; optional image support
- **Cons**: External dependency; interactive mode means the pager is w3m rather than aerc's built-in pager

## Option 3: pandoc (Clean Plain Text)

[pandoc](https://pandoc.org/) converts between many document formats. It can produce clean plain text from HTML:

```ini
[filters]
text/plain = colorize
text/html  = pandoc -f html -t plain | colorize
```

### Pros and Cons

- **Pros**: Very clean plain text output, strips all formatting noise, output goes through aerc's built-in pager
- **Cons**: Loses all visual structure (headings, emphasis, tables render as flat text); heavier dependency than w3m

## Option 4: lynx

[lynx](https://lynx.invisible-island.net/) is a classic text-mode browser that can also dump HTML as formatted text:

```ini
[filters]
text/plain = colorize
text/html  = lynx -dump -stdin -display_charset=utf-8 | colorize
```

### Pros and Cons

- **Pros**: Good plain text output, handles most HTML well, widely available
- **Cons**: External dependency; less capable than w3m with complex layouts

## Choosing a Filter

| Filter        | Rendering | Dependencies | Interactive | Images |
|---------------|-----------|-------------|-------------|--------|
| `html` (built-in) | Good  | None        | No          | With `-sixel` |
| w3m           | Excellent | w3m         | Yes         | With sixel  |
| pandoc        | Basic     | pandoc      | No          | No     |
| lynx          | Good      | lynx        | No          | No     |

For most users, start with the **built-in html filter**. If you find HTML emails hard to read, try **w3m** for better rendering. Use **pandoc** if you prefer stripped-down plain text output.

## Preferring Plain Text

If you would rather see the plain text version of multipart emails when one is available, make sure your `[viewer]` section has the right ordering:

```ini
[viewer]
alternatives = text/plain,text/html
```

This tells aerc to prefer `text/plain` over `text/html` when both are present. The HTML filter only kicks in when there is no plain text alternative or you manually switch to the HTML part.

See [aerc-config(5)](/reference/aerc-config.5/) for all viewer options.

## Next Steps

- [Filters and Rendering guide](/guides/filters/) — deep dive into aerc's entire filter pipeline
- [w3m](/ecosystem/w3m/) — more about w3m and aerc integration
- [aerc-config(5)](/reference/aerc-config.5/) — full configuration reference, including all filter options
