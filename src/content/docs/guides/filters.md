---
title: Filters and Rendering
description: Configure aerc's message filters for HTML, code, images, and more
sidebar:
  order: 3
---

Filters transform email content before displaying it. When you open a message, aerc matches the MIME type of each part against your `[filters]` configuration and pipes the content through the matching command.

## How Filters Work

```
Email part (text/html) → filter command (w3m | colorize) → pager (less)
```

Filters are configured in the `[filters]` section of `~/.config/aerc/aerc.conf`. Each line maps a MIME type pattern to a shell command:

```ini
[filters]
text/plain=colorize
text/html=w3m -T text/html -dump -o display_link_number=1 | colorize
```

The email body is piped to stdin of the command, and the command's stdout is displayed in the message viewer.

## Built-in Filters

aerc ships these filters (found in `/usr/lib/aerc/filters/` or `/usr/share/aerc/filters/`):

| Filter | Purpose |
|--------|---------|
| `colorize` | Adds ANSI colors for URLs, quotes, diff hunks, and email signatures |
| `html` | Renders HTML email to text using w3m with network isolation |
| `html-unsafe` | Same as `html` but without network isolation |
| `hldiff` | Highlights diff/patch content |
| `calendar` | Renders text/calendar (ICS) events as human-readable text |
| `plaintext` | Passes text through unchanged |
| `wrap` | Wraps long lines to terminal width |
| `show-ics-details.py` | Detailed ICS calendar parsing |

## Basic Configuration

A good starting configuration:

```ini
[filters]
text/plain=colorize
text/calendar=calendar
text/html=w3m -T text/html -dump -o display_link_number=1 | colorize
message/delivery-status=colorize
message/rfc822=colorize
```

## Glob Patterns

Filter MIME types support shell-style glob patterns:

```ini
# Match all text types
text/*=colorize

# Match all image types
image/*=chafa -f sixel -

# Catch-all for any text subtype not matched above
text/*=bat -fP --file-name="$AERC_FILENAME" --style=plain
```

More specific patterns take priority over wildcards.

## Advanced Filter Examples

### Syntax Highlighting with bat

[bat](https://github.com/sharkdp/bat) provides syntax highlighting for code attachments:

```ini
application/json=bat -fP -l json
application/xml=bat -fP -l xml
application/x-yaml=bat -fP -l yaml
text/x-diff=bat -fP -l diff
text/x-python=bat -fP -l py
text/x-go=bat -fP -l go
text/*=bat -fP --file-name="$AERC_FILENAME" --style=plain
```

### Markdown Rendering with glow

[glow](https://github.com/charmbracelet/glow) renders markdown with terminal formatting:

```ini
text/markdown=glow -s dracula -w 0
```

### Image Previews with chafa

[chafa](https://hpjansson.org/chafa/) displays images in the terminal using sixel or Unicode:

```ini
image/*=chafa -f sixel -s $(tput cols)x$(tput lines) -
```

Requires a terminal with sixel support (foot, WezTerm, kitty, etc.).

### Pipe Chains

Filters can be piped together:

```ini
# Render HTML, then add color highlighting
text/html=w3m -T text/html -dump -o display_link_number=1 | colorize
```

## Environment Variables

These variables are available to filter commands:

| Variable | Description |
|----------|-------------|
| `AERC_MIME_TYPE` | The MIME type/subtype of the part |
| `AERC_FORMAT` | The content type `format=` parameter (e.g., `flowed`) |
| `AERC_FILENAME` | The attachment filename, if any |
| `AERC_SUBJECT` | The message Subject header |
| `AERC_FROM` | The message From header |
| `AERC_STYLESET` | Path to the active styleset file |

## Header Filter

A special `.headers` filter post-processes email headers when `show-headers=true` in `[viewer]`:

```ini
.headers=colorize
```

## The alternatives Viewer Setting

By default, aerc shows the first available part. To prefer plain text over HTML:

```ini
[viewer]
alternatives=text/plain,text/html
```

This tells aerc to try `text/plain` first, falling back to `text/html` if plain text isn't available.

## See Also

- [HTML Email Rendering](/recipes/html-rendering/) — quick recipe for HTML setup
- [Theming & Stylesets](/guides/theming/) — configure colors for the `colorize` filter
- [aerc-config(5)](/reference/aerc-config.5/) — full `[filters]` reference
