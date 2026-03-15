---
title: Theming & Stylesets
description: Customize aerc's appearance with stylesets
sidebar:
  order: 7
---

aerc's appearance is controlled by stylesets — configuration files that map UI elements to colors and text attributes.

## Applying a Styleset

In `[ui]` of `~/.config/aerc/aerc.conf`:

```ini
[ui]
styleset-name = dracula
```

## Shipped Stylesets

aerc comes with these stylesets (in `/usr/share/aerc/stylesets/`):

| Styleset | Description |
|----------|-------------|
| `default` | Terminal default colors |
| `dracula` | Dark theme based on the Dracula color scheme |
| `nord` | Arctic, north-bluish color palette |
| `solarized` | Solarized light |
| `solarized-dark` | Solarized dark |
| `catppuccin` | Pastel dark theme |
| `monochrome` | No colors, bold/underline only |
| `blue` | Blue-tinted dark theme |
| `pink` | Pink-tinted theme |

Try different themes by reloading at runtime:

```
:reload -s nord
```

## Styleset Syntax

A styleset file uses `object.attribute = value` pairs:

```ini
# Set foreground color of unread messages
msglist_unread.fg = cornflowerblue

# Make unread messages bold
msglist_unread.bold = true

# Set the status line background
statusline_default.bg = #282a36
```

### Attributes

| Attribute | Values | Description |
|-----------|--------|-------------|
| `fg` | color | Foreground color |
| `bg` | color | Background color |
| `bold` | `true` / `false` / `toggle` | Bold text |
| `italic` | `true` / `false` / `toggle` | Italic text |
| `underline` | `true` / `false` / `toggle` | Underlined text |
| `blink` | `true` / `false` / `toggle` | Blinking text |
| `dim` | `true` / `false` / `toggle` | Half-bright text |
| `reverse` | `true` / `false` / `toggle` | Swap fg/bg colors |
| `normal` | `true` | Reset all attributes |
| `default` | `true` | Use terminal defaults |

### Color Values

Colors can be specified as:

- **Named colors**: `red`, `blue`, `cornflowerblue`, etc. (X11 color names)
- **Hex**: `#ff5555`, `#282a36`
- **256-color**: `0`–`255`
- **Terminal defaults**: use `default` attribute

## Style Objects

The main UI elements you can style:

### General

| Object | What it styles |
|--------|----------------|
| `default` | Fallback for unstyled elements |
| `error` | Error messages |
| `warning` | Warning messages |
| `success` | Success messages |
| `title` | UI titles |
| `header` | UI headers |
| `border` | Borders (only `bg` applies unless custom border chars are set) |
| `spinner` | Loading spinner |

### Message List

| Object | What it styles |
|--------|----------------|
| `msglist_default` | Default message row |
| `msglist_unread` | Unread messages |
| `msglist_read` | Read messages |
| `msglist_flagged` | Flagged messages |
| `msglist_deleted` | Deleted messages |
| `msglist_marked` | Marked messages |
| `msglist_result` | Search result matches |
| `msglist_answered` | Replied messages |
| `msglist_forwarded` | Forwarded messages |
| `msglist_gutter` | List gutter |
| `msglist_pill` | Scrollbar pill |

### Directory List

| Object | What it styles |
|--------|----------------|
| `dirlist_default` | Default folder |
| `dirlist_unread` | Folders with unread messages |
| `dirlist_recent` | Folders with recent messages |

### Other

| Object | What it styles |
|--------|----------------|
| `statusline_default` | Status line |
| `statusline_error` | Status line errors |
| `statusline_success` | Status line success |
| `completion_default` | Completion menu |
| `completion_pill` | Completion scrollbar |
| `tab` | Tab bar |
| `part_filename` | Attachment filename |
| `part_mimetype` | Attachment MIME type |
| `selector_focused` | Focused selector item |

### Message Viewer (colorize filter)

These styles affect the built-in `colorize` filter and go under a `[viewer]` section in the styleset:

```ini
[viewer]
url.fg = cyan
url.underline = true
signature.fg = gray
diff_add.fg = green
diff_del.fg = red
quote_1.fg = blue
quote_2.fg = magenta
```

## Creating a Custom Styleset

1. Create the file at `~/.config/aerc/stylesets/mytheme`:

```ini
# My custom theme
default.fg = #f8f8f2
default.bg = #282a36

msglist_unread.fg = #f1fa8c
msglist_unread.bold = true

msglist_read.fg = #6272a4

statusline_default.fg = #f8f8f2
statusline_default.bg = #44475a

statusline_error.fg = #ff5555
statusline_error.bold = true

tab.fg = #bd93f9

[viewer]
url.fg = #8be9fd
url.underline = true
quote_1.fg = #6272a4
diff_add.fg = #50fa7b
diff_del.fg = #ff5555
```

2. Apply it in `aerc.conf`:

```ini
[ui]
styleset-name = mytheme
```

3. Hot-reload without restarting:

```
:reload -s mytheme
```

## Wildcard Matching

Use `*` to style multiple objects at once:

```ini
# All message list objects get the same background
msglist_*.bg = #282a36

# All status line objects
statusline_*.bg = #44475a
```

## See Also

- [aerc-stylesets(7)](/reference/aerc-stylesets.7/) — full styleset specification
- [aerc-config(5)](/reference/aerc-config.5/) — `styleset-name` and `border-char-*` options
- [Filters and Rendering](/guides/filters/) — configure the `colorize` filter that uses `[viewer]` styles
