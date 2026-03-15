---
title: Templates
description: Customize compose, reply, and forward templates in aerc
sidebar:
  order: 8
---

aerc uses [Go's text/template](https://pkg.go.dev/text/template) syntax for message templates. Templates control the initial content when composing, replying, or forwarding messages.

## Template Structure

A template file has two parts separated by a blank line:

```
Headers (optional)

Body text
```

Example:

```
X-Mailer: aerc

Hello,

Best regards,
Your Name
```

:::caution
If your template has no custom headers, it **must** start with a blank line to avoid the first line being parsed as a header.
:::

## Shipped Templates

aerc includes three default templates in `/usr/share/aerc/templates/`:

| Template | Used for | Content |
|----------|----------|---------|
| `new_message` | New compositions | Empty body |
| `quoted_reply` | Reply with quote | Attribution line + quoted original |
| `forward_as_body` | Forwarding | Forwarded message headers + body |

## Configuring Templates

In `[templates]` of `~/.config/aerc/aerc.conf`:

```ini
[templates]
template-dirs = ~/.config/aerc/templates
new-message   = new_message
quoted-reply  = quoted_reply
forwards      = forward_as_body
```

The `template-dirs` path is searched first, then the default locations.

## Using Templates

### When composing

```
:compose -T my_template
```

### When replying

```
:reply -Tquoted_reply
```

The default keybinding `rq` uses `quoted_reply` automatically.

## Available Template Data

### Addresses

```
{{.From}}           List of senders
{{.To}}             List of To recipients
{{.Cc}}             List of Cc recipients
{{.Bcc}}            List of Bcc recipients
{{.ReplyTo}}        List of Reply-To addresses
{{.Peer}}           Senders, or To recipients if message is from you
{{.OriginalFrom}}   Senders of the original message (reply/forward)
```

Access individual fields:

```
{{(index .From 0).Name}}       First sender's name
{{(index .From 0).Address}}    First sender's email
```

### Date and Time

```
{{.Date}}           Current date/time (compose) or message date
{{.OriginalDate}}   Original message date (reply/forward)
```

Format dates:

```
{{.Date | dateFormat "2006-01-02"}}
{{.Date.Local | dateFormat "Mon, 02 Jan 2006 15:04:05"}}
```

### Subject

```
{{.Subject}}        Message subject
{{.SubjectBase}}    Subject without Re:/Fwd: prefixes
```

### Message Properties

```
{{.Number}}         Message number in the list
{{.Size}}           Message size in bytes
{{.Flags}}          List of message flags
{{.Labels}}         Message labels (notmuch tags)
{{.IsUnread}}       Boolean: message is unread
{{.IsFlagged}}      Boolean: message is flagged
{{.HasAttachment}}  Boolean: has attachments
```

### Headers

```
{{.Header "X-Custom-Header"}}              Current message header
{{.OriginalHeader "X-Custom-Header"}}      Original message header (reply/forward)
```

### Message Body

```
{{.OriginalText}}   Quoted original message text (reply/forward)
```

## Template Functions

| Function | Description | Example |
|----------|-------------|---------|
| `names` | Extract names from addresses | `{{.From \| names}}` |
| `emails` | Extract emails from addresses | `{{.From \| emails}}` |
| `mstrings` | Format addresses as strings | `{{.From \| mstrings}}` |
| `dateFormat` | Format a date | `{{.Date \| dateFormat "Jan 02"}}` |
| `humanReadable` | Format bytes | `{{.Size \| humanReadable}}` |
| `join` | Join list with separator | `{{.Flags \| join ""}}` |
| `split` | Split string by separator | `{{.Subject \| split ":"}}` |
| `trimPrefix` | Remove prefix | `{{.Subject \| trimPrefix "Re: "}}` |
| `trimSuffix` | Remove suffix | — |
| `toUpper` | Uppercase | `{{.Subject \| toUpper}}` |
| `toLower` | Lowercase | — |
| `contains` | Check substring | `{{if contains .Subject "urgent"}}` |
| `hasPrefix` | Check prefix | — |
| `hasSuffix` | Check suffix | — |
| `wrap` | Wrap text to width | `{{wrap 72 .OriginalText}}` |
| `quote` | Prefix lines with `> ` | `{{quote .OriginalText}}` |

## Custom Template Examples

### Quoted reply with signature

Create `~/.config/aerc/templates/my_reply`:

```
On {{.OriginalDate | dateFormat "Mon, 02 Jan 2006"}}, {{(index .OriginalFrom 0).Name}} wrote:
{{quote .OriginalText}}

Best,
Your Name
```

### New message with standard headers

Create `~/.config/aerc/templates/work_message`:

```
X-Mailer: aerc

Hi,



Thanks,
Your Name
```

### Column format templates

Templates are also used for the message list columns in `aerc.conf`:

```ini
[ui]
index-columns = flags:4,name<20%,subject,date>=

column-flags   = {{.Flags | join ""}}
column-name    = {{index (.From | names) 0}}
column-subject = {{.ThreadPrefix}}{{.Subject}}
column-date    = {{.DateAutoFormat .Date.Local}}
```

## See Also

- [aerc-templates(7)](/reference/aerc-templates.7/) — full template syntax and function reference
- [aerc-config(5)](/reference/aerc-config.5/) — `[templates]` and column configuration
