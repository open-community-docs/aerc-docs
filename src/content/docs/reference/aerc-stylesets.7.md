---
title: "aerc-stylesets(7)"
description: "Styleset configuration for aerc"
slug: "reference/aerc-stylesets.7"
editUrl: false
sidebar:
  badge:
    text: man
    variant: note
---

:::note[Auto-generated reference]
This page is auto-generated from the upstream aerc man pages. To suggest changes, submit patches to the [aerc mailing list](https://lists.sr.ht/~rjarry/aerc-devel).
:::

## SYNOPSIS

aerc uses a simple configuration syntax to configure the styleset for
its ui.

## STYLESET CONFIGURATION

The styleset is described as **<object>**.**<attribute>** = *<value>* pairs.

For example, in the line below, the foreground color of the
style object **msglist_unread** is set to *cornflowerblue*

	**msglist_unread**.**fg** = *cornflowerblue*

The configuration also allows wildcard matching of the keys
to configure multiple style objects at a time.

## ATTRIBUTES

The following options are available to be modified for each of the
style objects.

**<object>**.**fg** = *<color>*

> The foreground color of the style object is set.

**<object>**.**bg** = *<color>*

> The background color of the style object is set.

**<object>**.**bold** = *true*|*false*|*toggle*

> The bold attribute of the style object is set/unset.

**<object>**.**blink** = *true*|*false*|*toggle*

> The blink attribute of the style object is set/unset.
> The terminal needs to support blinking text.

**<object>**.**underline** = *true*|*false*|*toggle*

> The underline attribute of the style object is set/unset.
> The terminal needs to support underline text.

**<object>**.**italic** = *true*|*false*|*toggle*

> The italic attribute of the style object is set/unset.
> The terminal needs to support italic text.

**<object>**.**dim** = *true*|*false*|*toggle*

> The dim attribute of the style object is set/unset.
> The terminal needs to support half-bright text.

**<object>**.**reverse** = *true*|*false*|*toggle*

> Reverses the color of the style object. Exchanges the foreground
> and background colors.

> If the value is *false*, it doesn't change anything.

**<object>**.**normal** = true

> All the attributes of the style object are unset.

> The value doesn't matter.

**<object>**.**default** = true

> Set the style object to the default style of the context. Usually
> based on the terminal.

> The value doesn't matter.

## STYLE OBJECTS

The style objects represent the various ui elements or ui instances for
styling.

| Style Object | Description |
|---|---|
| **default** | The default style object used for normal ui elements while not using specialized configuration. |
| **error** | The style used to show errors. |
| **warning** | The style used when showing warnings. |
| **success** | The style used for success messages. |
| **title** | The style object used to style titles in ui elements. |
| **header** | The style object used to style headers in ui elements. |
| **realname** | The style object used to style real name(s) in the email fields in the header section of the message viewer. |
| **email** | The style object used to style email(s) in the email fields in the header section of the message viewer. |
| **subject** | The style object used to style subject in the header section of the message viewer. |
| **date** | The style object used to style date in the header section of the message viewer. |
| **statusline_default** | The default style applied to the statusline. |
| **statusline_error** | The style used for error messages in statusline. |
| **statusline_success** | The style used for success messages in statusline. |
| **msglist_default** | The default style for messages in a message list. |
| **msglist_unread** | Unread messages in a message list. |
| **msglist_read** | Read messages in a message list. |
| **msglist_flagged** | The messages with the flagged flag. |
| **msglist_deleted** | The messages marked as deleted. |
| **msglist_marked** | The messages with the marked flag. |
| **msglist_result** | The messages which match the current search. |
| **msglist_answered** | The messages marked as answered. |
| **msglist_forwarded** | The messages marked as forwarded. |
| **msglist_gutter** | The message list gutter. |
| **msglist_pill** | The message list scrollbar. |
| **msglist_thread_folded** | Visible messages that have folded thread children. |
| **msglist_thread_context** | The messages not matching the mailbox / query, displayed for context. |
| **msglist_thread_orphan** | Threaded messages that have a missing parent message. |
| **dirlist_default** | The default style for directories in the directory list. |
| **dirlist_unread** | The style used for directories with unread messages |
| **dirlist_recent** | The style used for directories with recent messages |
| **part_switcher** | Background for the part switcher in the message viewer. |
| **part_filename** | Attachment file name in the part switcher. |
| **part_mimetype** | Attachment/part MIME type in the part switcher. |
| **completion_default** | The default style for the completion engine. |
| **completion_description** | Completion item descriptions. |
| **completion_gutter** | The completion gutter. |
| **completion_pill** | The completion pill. |
| **tab** | The style for the tab bar. |
| **stack** | The style for ui stack element. |
| **spinner** | The style for the loading spinner. |
| **border** | The style used to draw borders (only the **bg** color is used unless you customize **border-char-vertical** and/or **border-char-horizontal** in *aerc.conf*). |
| **selector_default** | The default style for the selector ui element. |
| **selector_focused** | The focused item in a selector ui element. |
| **selector_chooser** | The item chooser in a selector ui element. |

These next style objects only affect the built-in **colorize** filter and must be
declared under a **[viewer]** section of the styleset file.

| Style Object | Description |
|---|---|
| **url** | URLs. |
| **header** | RFC-822-like header names. |
| **signature** | Email signatures. |
| **diff_meta** | Patch diff meta lines. |
| **diff_chunk** | Patch diff chunks. |
| **diff_chunk_func** | Patch diff chunk function names. |
| **diff_add** | Patch diff added lines. |
| **diff_del** | Patch diff deleted lines. |
| **diff_whitespace** | Patch diff trailing whitespace. |
| **quote_1** | First level quoted text. |
| **quote_2** | Second level quoted text. |
| **quote_3** | Third level quoted text. |
| **quote_4** | Fourth level quoted text. |
| **quote_x** | Above fourth level quoted text. |

User defined styles can be used to style arbitrary strings in go-templates (see
*.Style* in [aerc-templates(7)](/reference/aerc-templates.7/)). User styles must be defined in the *[user]*
ini section. Styles can be referenced by their name (e.g. *red.fg* is named
"red").

Example:

```
[user]
red.fg=red
```

User styles are layered with other styles applied to the context in which they
are rendered. The user style colors (fg and/or bg) will only be effective if the
context style does not define any. Other boolean attributes will be merged with
the underlying style boolean attributes.

For example, if the context style is:

	fg=red bold

And the inline style is:

	fg=yellow italic underline

The effective style will be:

	fg=red bold italic underline

## FNMATCH STYLE WILDCARD MATCHING

The styleset configuration can be made simpler by using the fnmatch
style wildcard matching for the style object.

The special characters used in the fnmatch wildcards are:

| Pattern | Meaning |
|---|---|
| **\*** | Matches everything |
| **\?** | Matches any single character |

For example, the following wildcards can be made using this syntax.

| Example | Description |
|---|---|
| **\****.**fg* = *blue* | Set the foreground color of all style objects to blue. |
| **\**list**.**bg* = *hotpink* | Set the background color of all style objects that end in list to hotpink. |

Note that the statements in a given styleset are parsed in the order in which
they are written. That means that with the following styleset:

```
msglist_marked.fg = pink
msglist_*.fg = white
```

The **msglist_marked.fg** attribute will be set to *white*.

## SELECTED MODIFIER

The **selected** modifier can be applied to any style object. The style provided for
the **selected** modifier is applied on top of the style object it corresponds to.

If you would like to make sure messages that are flagged as read in the msglist
appear in yellow foreground and black background, you can specify that with
this:

	**msglist_default**.**selected**.**fg** = *yellow*

	**msglist_default**.**selected**.**bg** = *black*

If we specify the global style selected modifier using fnmatch as below:

	**\****.**selected**.**reverse* = *toggle*

This toggles the reverse switch for selected version of all the style objects.

**selected** objects inherit from all attributes of their non-selected

counterparts. **selected** statements are parsed after non-selected ones and
effectively override the attributes of the non-selected style object.

## LAYERED STYLES

Some styles, (currently the **msglist_\**** and **dirlist_\** ones) are applied in
layers. If a style differs from the base (in this case **\**list_default*) then
that style applies, unless overridden by a higher layer. If **fg** and **bg** colors
are not defined explicitly (or defined to the default color) they will be
considered as "transparent" and the colors from the lower layer will be used
instead.

The order that **msglist_\*** styles are applied in is, from first to last:

. **msglist_default**
. **msglist_unread**
. **msglist_read**
. **msglist_answered**
. **msglist_forwarded**
. **msglist_flagged**
. **msglist_deleted**
. **msglist_result**
. **msglist_thread_folded**
. **msglist_thread_context**
. **msglist_thread_orphan**
. **msglist_marked**

So, the marked style will override all other msglist styles.

The order for **dirlist_\*** styles is:

. **dirlist_default**
. **dirlist_unread**
. **dirlist_recent**

## DYNAMIC MESSAGE LIST STYLES

All **msglist_\*** styles can be defined for specific email header values. The
syntax is as follows:

	**msglist_<name>**.*<header>*,_<header_value>*.**<attribute>** = *<attr_value>_

If _<header_value>* starts with a tilde character *~_, it will be interpreted as
a regular expression. If you are writing regular expressions that try to match
with *.* or *\.* you need to wrap like this *~/<expression>/*.

_<header>,<header_value>_ can be specified multiple times to narrow down matches
to more than one email header value. In that case, all given headers must match
for the dynamic style to apply.

Examples:

```
msglist\*.X-Sourcehut-Patchset-Update,APPROVED.fg = green
msglist\*.X-Sourcehut-Patchset-Update,NEEDS\_REVISION.fg = yellow
msglist\*.X-Sourcehut-Patchset-Update,REJECTED.fg = red
"msglist_*.Subject,~^(\\[[\w-]+\]\\s*)?\\[(RFC )?PATCH.fg" = #ffffaf
"msglist_*.Subject,~^(\\[[\w-]+\]\\s*)?\\[(RFC )?PATCH.selected.fg" = #ffffaf
"msglist_*.From,~^Bob.Subject,~^(\\[[\w-]+\]\\s*)?\\[(RFC )?PATCH.selected.fg" = #ffffaf
"msglist_*.List-ID,~/lists\.sr\.ht/selected.fg" = blue
```

When a dynamic style is matched to an email header, it will be used in priority
compared to its non-dynamic counterpart. Provided the following styleset:

```
msglist_marked.fg = blue
msglist_*.Subject,~foobar.fg = red
```

An email with *foobar* in its subject will be colored in *red* all the time,
since **msglist_\**** also applies to **msglist\_marked*.

When multiple _<header>,<header_value>_ pairs are given, the last style which
matches all given patterns will be applied. Provided the following styleset:

```
msglist_*.From,~^Bob.Subject,~foobar.fg = red
msglist_*.From,~^Bob.fg = blue
```

An email from *Bob* with *foobar* in its subject will be colored in *blue*,
since the second style is a full match too.

## COLORS

The color values are set using any of the following methods:

*default*
	The color is set as per the system or terminal default.

*<Color name>*
	Any w3c approved color name is used to set colors for the style.

*<Hex code>*
	Hexcode for a color can be used. The format must be *#XXXXXX*.

*<Dec number>*
	Color based on the terminal palette index. Valid numbers are
	between *0* and *255*.

## DEFAULTS

Before parsing a styleset, it is first initialized with the following defaults:

```
*.selected.bg = 12
*.selected.fg = 15
*.selected.bold = true
statusline_*.dim = true
*warning.dim = false
*warning.bold = true
*warning.fg = 11
*success.dim = false
*success.bold = true
*success.fg = 10
*error.dim = false
*error.bold = true
*error.fg = 9
border.bg = 12
border.fg = 15
title.bg = 12
title.fg = 15
title.bold = true
header.fg = 4
header.bold = true
msglist_unread.bold = true
msglist_deleted.dim = true
msglist_marked.bg = 6
msglist_marked.fg = 15
msglist_pill.bg = 12
msglist_pill.fg = 15
part_mimetype.fg = 12
selector_chooser.bold = true
selector_focused.bold = true
selector_focused.bg = 12
selector_focused.fg = 15
completion_*.bg = 8
completion_pill.bg = 12
completion_default.fg = 15
completion_description.fg = 15
completion_description.dim = true

[viewer]
url.underline = true
url.fg = 3
header.bold = true
header.fg = 4
signature.dim = true
signature.fg = 4
diff_meta.bold = true
diff_chunk.fg = 6
diff_chunk_func.fg = 6
diff_chunk_func.dim = true
diff_add.fg = 2
diff_del.fg = 1
diff_whitespace.bg = 1
quote_1.fg = 6
quote_2.fg = 4
quote_3.fg = 6
quote_3.dim = true
quote_4.fg = 4
quote_4.dim = true
quote_x.fg = 5
quote_x.dim = true
```

You can choose either to reset everything (except in the **[viewer]** section) by
starting your styleset with these two lines:

```
*.default=true
*.normal=true
```

Or selectively override style object attributes.

If you want to also reset the **[viewer]** section, you need to insert the same
two lines:

```
[viewer]
*.default=true
*.normal=true
```

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-config(5)](/reference/aerc-config.5/)
