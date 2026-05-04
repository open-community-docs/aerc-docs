---
title: "aerc-config(5)"
description: "General configuration for aerc"
slug: "reference/aerc-config.5"
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

There are three aerc config files: *aerc.conf*, *binds.conf*, and
*accounts.conf*. The last one must be kept secret, as it may include your
account credentials. We look for these files in your XDG config home plus
*aerc*, which defaults to *~/.config/aerc*. Alternate files can be specified via
command line arguments, see [aerc(1)](/reference/aerc.1/).

Examples of these config files are typically included with your installation of
aerc and are usually installed in */usr/share/aerc*.

Each file uses the ini format, and consists of sections with keys and values.
A line beginning with *#* is considered a comment and ignored, as are empty
lines. New sections begin with *[section-name]* on a single line, and keys and
values are separated with *=*.

This manual page focuses on *aerc.conf*. *binds.conf* is detailed in

[aerc-binds(5)](/reference/aerc-binds.5/) and *accounts.conf* in [aerc-accounts(5)](/reference/aerc-accounts.5/).

*aerc.conf* is used for configuring the general appearance and behavior of aerc.

## GENERAL OPTIONS

These options are configured in the **[general]** section of *aerc.conf*.

**default-save-path** = *<path>*

> Used as a default path for save operations if no other path is specified.

**pgp-provider** = *auto*|*gpg*|*internal*

> If set to *gpg*, aerc will use system gpg binary and keystore for all
> crypto operations. If set to *internal*, the internal openpgp keyring
> will be used. If set to *auto*, the system gpg will be preferred unless
> the internal keyring already exists, in which case the latter will be
> used.

> Default: *auto*

**use-terminal-pinentry** = *true*|*false*

> For terminal-based pinentry programs (such as *pinentry-tty*,
> *pinentry-curses* or *pinentry-vaxis*) to work properly with [aerc(1)](/reference/aerc.1/),
> set this to *true*.

> In some setups [aerc(1)](/reference/aerc.1/) will not be able to determine the correct tty.
> In those cases, you have to manually set _GPG_TTY_ to the output of [tty(1)](https://man7.org/linux/man-pages/man1/tty.1.html)
> before running [aerc(1)](/reference/aerc.1/) as recommended by GnuPG for invoking a GPG-agent. Add
> the following to your shell initialization scripts:

  ```
  GPG_TTY=$(tty)
  export GPG_TTY
  ```

> Default: *false*

**unsafe-accounts-conf** = *true*|*false*

> By default, the file permissions of *accounts.conf* must be restrictive
> and only allow reading by the file owner (*0600*). Set this option to
> *true* to ignore this permission check. Use this with care as it may
> expose your credentials.

> Default: *false*

**log-file** = *<path>*

> Output log messages to specified file. A path starting with *~/* is
> expanded to the user home dir. When redirecting aerc's output to a file
> using *>* shell redirection, this setting is ignored and log messages
> are printed to stdout.

**log-level** = *trace*|*debug*|*info*|*warn*|*error*

> Only log messages above the specified level to **log-file**. Supported
> levels are: *trace*, *debug*, *info*, *warn* and *error*. When
> redirecting aerc's output to a file using *>* shell redirection, this
> setting is ignored and the log level is forced to *trace*.

> Default: *info*

**disable-ipc** = *true*|*false*

> Disable IPC entirely. Don't run commands (including *mailto:...* and
> *mbox...*) in an existing aerc instance and don't start an IPC server to
> allow subsequent aerc instances to run commands in the current one.

> Default: *false*

**disable-ipc-mailto** = *true* | *false*

> Don't run *mailto:...* commands over IPC; start a new aerc instance with the
> composer instead.

> Default: *false*

**disable-ipc-mbox** = *true* | *false*

> Don't run *mbox:...* commands over IPC; start a new aerc instance with the
> mbox file instead.

> Default: *false*

**term** = *<TERM>*

> Set the $TERM environment variable used for the embedded terminal.

> Default: *xterm-256color*

**enable-osc8** = *true*|*false*

> Enable the embedded terminal to output OSC 8 (hyperlinks) escape
> sequences. Not all terminal emulators handle OSC 8 sequences properly
> and can produce confusing results, disable this setting if that occurs.

> Default: *false*

**enable-quake-mode** = *true*|*false*

> Enable Quake mode which consists of a persistent drop-down terminal
> session that appears at the top of **aerc** and can be toggled on or off.

> Toggling is done with the F1 key. Do not use this key in your key
> bindings in Quake mode.

> Default: *false*

**default-menu-cmd** = *<cmd>*

> Default shell command to use for **:menu**. This will be executed with
> *sh -c* and will run in a popover dialog.

> Any occurrence of *%f* will be replaced by a temporary file path where
> the command is expected to write output lines to be consumed by **:menu**.
> Otherwise, the lines will be read from the command's standard output.

> Example:
  **default-menu-cmd** = *fzf*

**temporary-directory** = *<path>*

> Directory where aerc saves temporary files. If it does not exist, the
> directory will be created along with its parents with permissions *700*.
> If this is empty (which is the default), the platform-specific default
> directory for temporary files is used.

## UI OPTIONS

These options are configured in the **[ui]** section of *aerc.conf*.

**index-columns** = *<column1,column2,column3...>*

> Describes the format for each row in a mailbox view. This is a comma
> separated list of column names with an optional align and width suffix.
> After the column name, one of the *<* (left), *:* (center) or *>*
> (right) alignment characters can be added (by default, left) followed by
> an optional width specifier. The width is either an integer representing
> a fixed number of characters, or a percentage between *1%* and *99%*
> representing a fraction of the terminal width. It can also be one of the
> *\** (auto) or *=* (fit) special width specifiers. Auto width columns
> will be equally attributed the remaining terminal width. Fit width
> columns take the width of their contents. If no width specifier is set,
> *\** is used by default.

> Default: *flags:4,name<20%,subject,date>=*

**column-separator** = *"<separator>"*

> String separator inserted between columns. When a column width specifier
> is an exact number of characters, the separator is added to it (i.e. the
> exact width will be fully available for that column contents).

> Default: *"  "*

**column-<name>** = *<go template>*

> Each name in **index-columns** must have a corresponding **column-<name>**
> setting. All **column-<name>** settings accept golang text/template
> syntax.

> By default, these columns are defined:

> ```
> column-flags = {{.Flags | join ""}}
> column-name = {{index (.From | names) 0}}
> column-subject = {{.ThreadPrefix}}{{.Subject}}
> column-date = {{.DateAutoFormat .Date.Local}}
> ```

> See [aerc-templates(7)](/reference/aerc-templates.7/) for all available symbols and functions.

**timestamp-format** = *<timeformat>*

> See time.Time#Format at https://godoc.org/time#Time.Format

> Default: *2006 Jan 02*

**this-day-time-format** = *<timeformat>*

> Index-only time format for messages that were received/sent today.
> If this is empty, **timestamp-format** is used instead.

> Default: *15:04*

**this-week-time-format** = *<timeformat>*

> Index-only time format for messages that were received/sent within the
> last 7 days. If this is empty, **timestamp-format** is used instead.

> Default: *Jan 02*

**this-year-time-format** = *<timeformat>*

> Index-only time format for messages that were received/sent this year.
> If this is empty, **timestamp-format** is used instead.

> Default: *Jan 02*

**message-view-timestamp-format** = *<timeformat>*

> If set, overrides **timestamp-format** for the message view.

> Default: *2006 Jan 02, 15:04 GMT-0700*

**message-view-this-day-time-format** = *<timeformat>*

> If set, overrides **timestamp-format** in the message view for messages
> that were received/sent today.

**message-view-this-week-time-format** = *<timeformat>*

> If set, overrides **timestamp-format** in the message view for messages
> that were received/sent within the last 7 days.

**message-view-this-year-time-format** = *<timeformat>*

> If set, overrides **timestamp-format** in the message view for messages
> that were received/sent this year.

**sidebar-width** = *<int>*

> Width of the sidebar, including the border. Set to zero to disable the
> sidebar.

> Default: *22*

**message-list-split** = *[<direction>] <size>*

> The default split layout for message list tabs.

> *<direction>* is optional and defaults to *horizontal*. It can take one
> of the following values: *h*, *horiz*, *horizontal*, *v*, *vert*,
> *vertical*.

> *<size>* is a positive integer representing the size (in terminal cells)
> of the message list window.

> See **:split** in [aerc(1)](/reference/aerc.1/) for more details.

**empty-message** = *<string>*

> Message to display when viewing an empty folder.

> Default: *(no messages)*

**empty-dirlist** = *<string>*

> Message to display when no folders exist or are all filtered.

> Default: *(no folders)*

**empty-subject** = *<string>*

> Text to display in message list, when the subject is empty.

> Default: *(no subject)*

**mouse-enabled** = *true*|*false*

> Enable mouse events in the ui, e.g. clicking and scrolling with the mousewheel

> Default: *false*

**new-message-bell** = *true*|*false*

> Ring the bell when a new message is received.

> Default: *true*

**tab-title-account** = _<go_template>_

> The template to use for account tab titles. See [aerc-templates(7)](/reference/aerc-templates.7/) for
> available field names. To conditionally show the unread count next to
> the account name, set to:

  **tab-title-account** = {{.Account}} {{if .Unread}}({{.Unread}}){{end}}

> Default: *{{.Account}}*

**tab-title-composer** = _<go_template>_

> The template to use for composer tab titles. See [aerc-templates(7)](/reference/aerc-templates.7/) for
> available field names.

> Default: *{{if .To}}to:{{index (.To | shortmboxes) 0}} {{end}}{{.SubjectBase}}*

**tab-title-terminal** = _<go_template>_

> The template to use for terminal tab titles. See [aerc-templates(7)](/reference/aerc-templates.7/) for
> available field names. This setting is only valid in the global **[ui]**
> section.

> Default: *{{.Title}}*

**tab-title-viewer** = _<go_template>_

> The template to use for viewer tab titles. See [aerc-templates(7)](/reference/aerc-templates.7/) for
> available field names.

> Default: *{{.Subject}}*

**pinned-tab-marker** = *"<string>"*

> Marker to show before a pinned tab's name.

> Default: *`*

**spinner** = *"<string>"*

> Animation shown while loading, split by **spinner-delimiter** (below)

> Examples:
- **spinner** = *"\-\*-,\*-\*"_
- **spinner** = *'. , .'*
- **spinner** = *"\,|,/,-"*

> Default: *"[..]    , [..]   ,  [..]  ,   [..] ,    [..],   [..] ,  [..]  , [..]   "*

**spinner-delimiter** = *<string>*

> Spinner delimiter to split string into an animation

> Default: *,*

**spinner-interval** = *<duration>*

> The delay between each spinner frame

> Default: *200ms*

**sort** = *<criteria>*

> List of space-separated criteria to sort the messages by, see **:sort**
> command in [aerc(1)](/reference/aerc.1/) for reference. Prefixing a criterion with *-r*
> reverses that criterion.

> Example:
  **sort** = *from -r date*

**dirlist-left** = *<go template>*

> Template for the left side of the directory list.
> See [aerc-templates(7)](/reference/aerc-templates.7/) for all available fields and functions.

> Default: *{{.Folder}}*

**dirlist-right** = *<go template>*

> Template for the right side of the directory list.
> See [aerc-templates(7)](/reference/aerc-templates.7/) for all available fields and functions.

> Default: *{{if .Unread}}{{humanReadable .Unread}}{{end}}*

**dirlist-delay** = *<duration>*

> Delay after which the messages are actually listed when entering
> a directory. This avoids loading messages when skipping over folders
> and makes the UI more responsive. If you do not want that, set it to
> *0s*.

> Default: *200ms*

**dirlist-tree** = *true*|*false*

> Display the directory list as a foldable tree.

> Default: *false*

**dirlist-collapse** = *<int>*

> If **dirlist-tree** is enabled, set level at which folders are collapsed
> by default. Set to *0* to disable.

> Default: *0*

**next-message-on-delete** = *true*|*false*

> Moves to next message when the current message is deleted, archived, or moved.

> Default: *true*

**auto-mark-read** = *true*|*false*

> Set the *seen* flag when a message is opened in the message viewer.

> Default: *true*

**auto-mark-read-split** = *true*|*false*

> If *true* and a message is in the message list message viewer for longer
> than *auto-mark-read-split-delay*, set that message's *seen* flag to *true*.

> Default: *false*

**auto-mark-read-split-delay** = *<duration>*

> If *auto-mark-read-split* is *true*, the duration after which a message
> being previewed in the message list message viewer must be marked as *seen*.

> Default: *3s*

**completion-popovers** = *true*|*false*

> Shows potential auto-completions for text inputs in popovers.

> Default: *true*

**completion-delay** = *<duration>*

> How long to wait after the last input before auto-completion is triggered.

> Default: *250ms*

**completion-min-chars** = *<int>*

> The minimum required characters to allow auto-completion to be triggered
> after **completion-delay**.

> Setting this to *manual* disables automatic completion, leaving only the
> manually triggered completion with the **$complete** key (see
> [aerc-binds(5)](/reference/aerc-binds.5/) for more details).

> Default: *1*

**border-char-vertical** = *"<char>"*

> Set stylable character (via the **border** element) for vertical borders.

> Default: *"│"*

**border-char-horizontal** = *"<char>"*

> Set stylable character (via the **border** element) for horizontal borders.

> Default: *"─"*

**stylesets-dirs** = *<path1:path2:path3...>*

> The directories where the stylesets are stored. The config takes
> a colon-separated list of dirs. If this is unset or if a styleset cannot
> be found, the following paths will be used as a fallback in that order:

> ```
> ${XDG_CONFIG_HOME:-~/.config}/aerc/stylesets
> ${XDG_DATA_HOME:-~/.local/share}/aerc/stylesets
> /usr/local/share/aerc/stylesets
> /usr/share/aerc/stylesets
> ```

**styleset-name** = *<string>*

> The name of the styleset to be used to style the ui elements. The
> stylesets are stored in the *stylesets* directory in the config
> directory.

> Use comma-separated list of file names to load multiple stylesets applied
> one after another in the order they are provided. This is useful if you want
> to alter the main styleset just a bit for a specific account, say to provide
> a specific messages highlighting pattern.

> Default: *default*

> Have a look at [aerc-stylesets(7)](/reference/aerc-stylesets.7/) as to how a styleset looks like.

**icon-unencrypted** = *<string>*

> The icon to display for unencrypted mails. The status indicator is only
> displayed if an icon is set.

**icon-encrypted** = *<string>*

> The icon to display for encrypted mails.

> Default: *[e]*

**icon-signed** = *<string>*

> The icon to display for signed mails where the signature was
> successfully validated.

> Default: *[s]*

**icon-signed-encrypted** = *<string>*

> The icon to display for signed and encrypted mails where the signature
> was successfully verified. The combined icon is only used if set,
> otherwise the signed and encrypted icons are displayed separately.

**icon-unknown** = *<string>*

> The icon to display for signed mails which could not be verified due to
> the key being unknown.

> Default: *[s?]*

**icon-invalid** = *<string>*

> The icon to display for signed mails where verification failed.

> Default: *[s!]*

**icon-attachment** = *<string>*

> The icon to display in **column-flags** when the message has an
> attachment.

> Default: *a*

**icon-new** = *<string>*

> The icon to display in **column-flags** when the message is unread and
> new.

> Default: *N*

**icon-old** = *<string>*

> The icon to display in **column-flags** when the message is unread and
> old.

> Default: *O*

**icon-replied** = *<string>*

> The icon to display in **column-flags** when the message has been replied
> to.

> Default: *r*

**icon-forwarded** = *<string>*

> The icon to display in **column-flags** when the message has been forwarded.

> Default: *f*

**icon-flagged** = *<string>*

> The icon to display in **column-flags** when the message is flagged.

> Default: *!*

**icon-marked** = *<string>*

> The icon to display in **column-flags** when the message is marked.

> Default: *\**

**icon-draft** = *<string>*

> The icon to display in **column-flags** when the message is a draft.

> Default: *d*

**icon-deleted** = *<string>*

> The icon to display in **column-flags** when the message has been deleted.

> Default: *X*

**fuzzy-complete** = *true*|*false*

> When typing a command or option, the popover will now show not only the
> items /starting/ with the string input by the user, but it will also show
> instances of items /containing/ the string, starting at any position and
> need not be consecutive characters in the command or option.

**reverse-msglist-order** = *true*|*false*

> Reverses the order of the message list. By default, the message list is
> ordered with the newest (highest UID) message on top. Reversing the
> order will put the oldest (lowest UID) message on top. This can be
> useful in cases where the backend does not support sorting.

> Default: *false*

**reverse-thread-order** = *true*|*false*

> Reverse display of the message threads. By default, the thread root is
> displayed at the top of the tree with all replies below. The reverse
> option will put the thread root at the bottom with replies on top.

> Default: *false*

**select-last-message** = *true*|*false*

> Positions the cursor on the last message in the message list (at the
> bottom of the view) when opening a new folder.

> Default: *false*

**sort-thread-siblings** = *true*|*false*

> Sort the thread siblings according to the **sort** criteria for the
> messages. If **sort-thread-siblings** is *false*, the thread siblings will
> be sorted based on the message UID in ascending order. If this option is
> set to *false* and **threading-by-subject** is set to *true*, then
> siblings will be ordered by subject headers using UTF-8 sorting.

> This option is only applicable for client-side threading with a backend
> that enables sorting. Note that there's a performance impact when
> sorting is activated.

> Default: *false*

**threading-enabled** = *true*|*false*

> Enable a threaded view of messages. If this is not supported by the
> backend (IMAP server or notmuch), threads will be built by the client.

> Default: *false*

**force-client-threads** = *true*|*false*

> Force threads to be built client-side. Backends that don't support threading
> will always build threads client side.

> Default: *false*

**threading-by-subject** = *true*|*false*

> If no References nor In-Reply-To headers can be matched to build client
> side threads, fallback to similar subjects. This setting also affects
> how thread siblings are ordered when **sort-thread-siblings** is left to
> *false*.

> Default: *false*

**client-threads-delay** = *<duration>*

> Delay of inactivity after which the client threads are rebuilt. Setting
> this to *0s* may introduce a noticeable lag when scrolling through the
> message list.

> Default: *50ms*

**show-thread-context** = *true*|*false*

> Enable showing of thread context. Note: this is currently only supported
> by the notmuch backend.

> Default: *false*

**msglist-scroll-offset** = *<int>*

> Set the scroll offset in number of lines from the top and bottom
> of the message list.

> Default: *0*

**dialog-position** = *top*|*center*|*bottom*

> Set the position of popover dialogs such as the one from **:menu**,
> **:envelope** or **:attach -m**.

> Default: *center*

**dialog-width** = *<percentage>*

> Set the width of popover dialogs as a percentage of the total width of
> the window. The specified value should be between *10* and *100*.

> Default: *50*

**dialog-height** = *<percentage>*

> Set the height of popover dialogs as a percentage of the total height of
> the window. The specified value should be between *10* and *100*.

> Default: *50*

**quake-terminal-height** = *<int>*

> Set the height of drop-down terminal as the number of lines from the
> top.

> Default: *20*

### THREAD PREFIX CUSTOMIZATION

You can fully customize the thread arrows appearance, which is defined by the
following configurable prefix parts:

**thread-prefix-tip** = *<string>*

> Define the arrow head.

> Default: *">"*

**thread-prefix-indent** = *<string>*

> Define the arrow indentation.

> Default: *" "*

**thread-prefix-stem** = *<string>*

> Define the vertical extension of the arrow.

> Default: *"│"*

**thread-prefix-limb** = *<string>*

> Define the horizontal extension of the arrow.

> Default: *""*

**thread-prefix-folded** = *<string>*

> Define the folded thread indicator.

> Default: *"+"*

**thread-prefix-unfolded** = *<string>*

> Define the unfolded thread indicator.

> Default: *""*

**thread-prefix-first-child** = *<string>*

> Define the first child connector.

> Default: *""*

**thread-prefix-has-siblings** = *<string>*

> Define the connector used if the message has siblings.

> Default: *├─*

**thread-prefix-lone** = *<string>*

> Define the connector used if the message has no parents and no children.

> Default: *""*

**thread-prefix-orphan** = *<string>*

> Define the connector used if the message has no parents and has children.

> Default: *""*

**thread-prefix-last-sibling** = *<string>*

> Define the connector for the last sibling.

> Default: *└─*

**thread-prefix-last-sibling-reverse** = *<string>*

> Define the connector for the last sibling in reversed threads.

> Default: *┌─*

**thread-prefix-dummy** = *<string>*

> Define the connector for the dummy head.

> Default: *┬─*

**thread-prefix-dummy-reverse** = *<string>*

> Define the connector for the dummy head in reversed threads.

> Default: *┴─*

**thread-prefix-first-child-reverse** = *<string>*

> Define the arrow appearance by selecting the first child connector in
> reversed threads.

> Default: *""*

**thread-prefix-orphan-reverse** = *<string>*

> Customize the reversed threads arrow appearance by selecting the
> connector used if the message has no parents and has children.

> Default: *""*

Default settings (mutt-style):

	```
	[PATCH aerc v5] ui: allow thread arrow customisation
	├─>[aerc/patches] build success
	├─>Re: [PATCH aerc v5] ui: allow thread arrow customisation
	├─+
	└─>
	  ├─>
	  │ ├─>
	  │ └─>
	  │   └─>
	  └─>
	```

More compact, rounded threads that are also fold-aware:

	```
	┌[PATCH aerc v5] ui: allow thread arrow customisation
	├─[aerc/patches] build success
	├─Re: [PATCH aerc v5] ui: allow thread arrow customisation
	├+
	╰┬
	 ├┬
	 │├─
	 │╰┬
	 │ ╰─
	 ╰─
	```

```
thread-prefix-tip = ""
thread-prefix-indent = ""
thread-prefix-stem = "│"
thread-prefix-limb = "─"
thread-prefix-folded = "+"
thread-prefix-unfolded = ""
thread-prefix-first-child = "┬"
thread-prefix-has-siblings = "├"
thread-prefix-orphan = "┌"
thread-prefix-dummy = "┬"
thread-prefix-lone = " "
thread-prefix-last-sibling = "╰"
```

**centered-layout-width** = *<width>*

> Center the editor and the message viewer on screen by setting a fixed
> width for them.

> *<width>* is a positive integer representing the width (in terminal cells)
> of the editor and message viewer windows.

> Default: *""*

### CONTEXTUAL UI CONFIGURATION

The UI configuration can be specialized for accounts and specific mail
directories. The specializations are added using contextual config
sections based on the context.

The contextual UI configuration is merged to the base UiConfig in the
following order: **Base UIConfig > Account Context > Folder Context**.

**[ui:account=***AccountName***]**

> Adds account specific configuration with the account name.

**[ui:folder=***FolderName***]**

> Add folder specific configuration with the folder name.

**[ui:folder~***Regex***]**

> Add folder specific configuration for folders whose names match the regular
> expression.

Example:

```
[ui:account=Work]
sidebar-width=...

[ui:folder=Sent]
index-columns=...

[ui:folder~Archive/\d+/.*]
index-columns=...
```

## STATUSLINE

These options are configured in the **[statusline]** section of *aerc.conf*.

**status-columns** = *<column1,column2,column3...>*

> Describes the format for the statusline. This is a comma separated list
> of column names with an optional align and width suffix. See
> **[ui].index-columns** for more details.

> To completely mute the statusline (except for push notifications),
> explicitly set **status-columns** to an empty string:

  status-columns=

> Default: *left<\**,center>=,right>\***

**column-separator** = *"<separator>"*

> String separator inserted between columns. See **[ui].column-separator**
> for more details.

> Default: *" "*

**column-<name>** = *<go template>*

> Each name in **status-columns** must have a corresponding **column-<name>**
> setting. All **column-<name>** settings accept golang text/template
> syntax.

> By default, these columns are defined:

> ```
> column-left = [{{.Account}}] {{.StatusInfo}}
> column-center = {{.PendingKeys}}
> column-right = {{.TrayInfo}} | {{cwd}}
> ```

> See [aerc-templates(7)](/reference/aerc-templates.7/) for all available symbols and functions.

**separator** = *"<string>"*

> Specifies the separator between grouped statusline elements (e.g. for
> the *{{.ContentInfo}}*, *{{.TrayInfo}}* and *{{.StatusInfo}}* in
> **column-<name>**).

> Default: *" | "*

**display-mode** = *text*|*icon*

> Defines the mode for displaying the status elements.

> Default: *text*

## VIEWER

These options are configured in the **[viewer]** section of *aerc.conf*.

**pager** = *<command>*

> Specifies the pager to use when displaying emails. Note that some filters
> may add ANSI escape sequences to add color to rendered emails, so you may
> want to use a pager which supports ANSI.

> Default: *less -Rc*

**alternatives** = *<mime,types>*

> If an email offers several versions (multipart), you can configure which
> mimetype to prefer. For example, this can be used to prefer plaintext over
> HTML emails.

> Default: *text/plain,text/html*

**header-layout** = *<header|layout,list...>*

> Defines the default headers to display when viewing a message. To display
> multiple headers in the same row, separate them with a pipe, e.g. *From|To*.
> Rows will be hidden if none of their specified headers are present in the
> message.

> Notmuch tags can be displayed by adding Labels.

> Authentication information from the Authentication-Results header can be
> displayed by adding *DKIM*, *SPF* or *DMARC*. To show more information
> than just the authentication result, append a plus sign (**+**) to the header name
> (e.g. *DKIM+*).

> Default: *From|To,Cc|Bcc,Date,Subject*

**show-headers** = *true*|*false*

> Default setting to determine whether to show full headers or only parsed
> ones in message viewer.

> Default: *false*

**always-show-mime** = *true*|*false*

> Whether to always show the mimetype of an email, even when it is just a single part.

> Default: *false*

**max-mime-height** = *height*

> Define the maximum height of the mimetype switcher before a scrollbar is
> used. The height of the mimetype switcher is restricted to half of the display height.
> If the provided value for the height is zero, the number of parts will
> be used as the height of the type switcher.

> Default: 0

**parse-http-links** = *true*|*false*

> Parses and extracts http links when viewing a message. Links can then be
> accessed with the **open-link** command.

> Default: *true*

**html-inline-images** = *true*|*false*

> Enable inlining of images referenced by *<img>* tags with *cid:* URLs
> in HTML emails. When enabled, aerc will fetch image parts referenced by
> their Content-ID and replace *cid:* URLs with base64-encoded *data:*
> URLs. This allows HTML emails with embedded images to be properly viewed
> in browsers.

> The feature works with all aerc commands that fetch message parts
> (**:save**, **:open**, **:pipe**, and viewing).

> For w3m, images will be displayed when using the **-sixel** option,
> which requires `img2sixel(1)` to be installed. Make sure your
> *text/html* filter in **[filters]** is configured to use w3m with
> appropriate image settings (e.g.: **text/html** = *! html -sixel*).

> Default: *false*

### CONTEXTUAL VIEWER CONFIGURATION

The viewer configuration can be specialized for senders and message
subjects. The specializations are added using contextual config
sections based on the context.

The contextual viewer configuration is merged to the base ViewerConfig
in the following order:

**Base ViewerConfig > Sender Context > From Context > Subject Context**.

**[viewer:sender=***Address***]**

> Adds sender specific configuration for a specific envelope sender
> email address.

**[viewer:sender~***Regex***]**

> Adds sender specific configuration for envelope sender addresses which
> match the regular expression.

**[viewer:from=***Address***]**

> Adds sender specific configuration for a specific *From* email address.

**[viewer:from~***Regex***]**

> Adds sender specific configuration for *From* names or addresses which
> match the regular expression.

**[viewer:subject=***Subject***]**

> Adds subject specific configuration for an exact message subject.

**[viewer:subject~***Regex***]**

> Adds subject specific configuration for message subjects which match
> the regular expression.

Example:

```
[viewer:sender~@fakeplaintext.example.com]
alternatives=text/html,text/plain

[viewer:subject=Looks like links]
parse-http-links=false
```

## COMPOSE

These options are configured in the **[compose]** section of *aerc.conf*.

**editor** = *<command>*

> Specifies the command to run the editor with. It will be shown in an
> embedded terminal, though it may also launch a graphical window if the
> environment supports it.

> The following variables are defined in the editor's environment:

> **AERC_ACCOUNT**
  the name of the current account
> **AERC_ADDRESS_BOOK_CMD**
  the *address-book-cmd* specified for the current account in
  *accounts.conf*

> Defaults to **$VISUAL**, **$EDITOR**, or `vi(1)`.

**header-layout** = *<header|layout,list...>*

> Defines the default headers to display when composing a message. To display
> multiple headers in the same row, separate them with a pipe, e.g. *To|From*.

> Default: *To|From,Subject*

**edit-headers** = *true*|*false*

> Edit headers directly into the text editor instead of having separate UI
> text inputs.

> When this is set to *true*, the **:cc**, **:bcc** and **:header** commands do
> not work, editing email headers are left to the text editor.
> **address-book-cmd** is not supported and address completion is left to
> the editor itself. **header-layout** is ignored.

> Default: *false*

**focus-body** = *true*|*false*

> Sets focus to the email body when the composer window opens.

> Default: *false*

**address-book-cmd** = *<command>*

> Specifies the command to be used to tab-complete email addresses. Any
> occurrence of *%s* in *<command>* will be replaced with anything the
> user has typed after the last comma. *<command>* is executed using
> **sh -c**

> The command must output the completions to standard output, one completion
> per line. Each line must be tab-delimited, with an email address occurring as
> the first field. Only the email address field is required. The second field,
> if present, will be treated as the contact name. Additional fields are
> ignored.

> This parameter can also be set per account in *accounts.conf*.

> Example with [carddav-query(1)](/reference/carddav-query.1/):
  **address-book-cmd** = *carddav-query %s*

> Example with `khard(1)`:
  **address-book-cmd** = *khard email --remove-first-line --parsable %s*

> Example with `maddr(1)` from **mblaze**:
  **address-book-cmd** = *maddr -ah to ~/Maildir/Sent | grep %s*

**file-picker-cmd** = *<command>*

> Specifies the command to be used to select attachments. Any occurrence of
> *%s* in the **file-picker-cmd** will be replaced with the argument *<arg>*
> to **:attach -m** *<arg>*. Any occurrence of *%f* will be replaced by the
> location of a temporary file, from which aerc will read the selected files.

> If *%f* is not present, the command must output the selected files to
> standard output, one file per line. If it is present, then aerc does not
> capture the standard output and instead reads the files from the temporary
> file which should have the same format.

> Examples:
- **file-picker-cmd** = *fzf --multi --query=%s*
- **file-picker-cmd** = *ranger --choose-files=%f*

**reply-to-self** = *true*|*false*

> If set to *false*, do not mail yourself when replying (e.g., if replying
> to emails previously sent by yourself, address your replies to the
> original To and Cc).

> Default: *true*

**empty-subject-warning** = *true*|*false*

> Warn before sending an email with an empty subject.

> Default: *false*

**no-attachment-warning** = *<regexp>*

> Specifies a regular expression against which an email's body should be
> tested before sending an email with no attachment. If the regexp
> matches, aerc will warn you before sending the message. Leave empty to
> disable this feature.

> Uses Go's regexp syntax, documented at https://golang.org/s/re2syntax.
> The *(?im)* flags are set by default (case-insensitive and multi-line).

> Example:
  **no-attachment-warning** = *^[^>]\*attach(ed|ment)*

**format-flowed** = *true*|*false*

> When set, aerc will generate *Format=Flowed* bodies with a content type
> of *"text/plain; Format=Flowed"* as described in RFC3676. This format is
> easier to handle for some mailing software, and generally just looks
> like ordinary text. To actually make use of this format's features,
> you'll need support in your editor.

> Default: *false*

**lf-editor** = *true*|*false*

> By default, aerc will use RFC2822 standard *\\r\\n* (CRLF) line breaks
> when composing messages. Use this option for text editors that only
> support non-standard *\\n* (LF) line breaks.

> Default: *false*

## MULTIPART CONVERTERS

Converters allow generating *multipart/alternative* messages by converting the
main *text/plain* body into any other text MIME type with the **:multipart**
command. Only exact MIME types are accepted. The commands are invoked with
*sh -c* and are expected to output valid UTF-8 text.

Only *text/<subtype>* MIME parts can be generated. The *text/plain* MIME type is
reserved and cannot be generated. You still need to write your emails by hand in
your favorite text editor.

Converters are configured in the **[multipart-converters]** section of
*aerc.conf*.

Example:

```
[multipart-converters]
text/html=pandoc -f markdown -t html --standalone
```

Obviously, this requires that you write your main *text/plain* body using the
markdown syntax. Also, mind that some mailing lists reject emails that contain
*text/html* alternative parts. Use this feature carefully and when possible,
avoid using it at all.

## FILTERS

Filters are a flexible and powerful way of handling viewing parts of an opened
message. When viewing messages aerc will show the list of available message
parts and their MIME type at the bottom, but unless a filter is defined for
a specific MIME type, it will only show a menu with a few options (allowing you
to open the part in an external program, save it to disk or pipe it to a shell
command). Configuring a filter will allow viewing the output of the filter in
the configured **pager** in aerc's built-in terminal.

Filters are configured in the **[filters]** section of **aerc.conf**. The first
filter which matches the part's MIME type will be used, so order them from most
to least specific. You can also match on non-MIME types, by prefixing with the
header to match against (non-case-sensitive) and a comma, e.g. *subject,text*
will match a subject which contains *text*. Use *header,~regex* to match
against a *regex*. Using *.filename* instead of a header will match against the
filename of an attachment.

Note that aerc will pipe the content into the configured filter program, so
filters need to be able to read from standard input. Many programs support
reading from stdin by putting *-* instead of a path to a file. You can also
chain together multiple filters by piping with *|*.

Some filter commands may require interactive user input. If a filter command
starts with an exclamation mark *!*, the configured **pager** will **not** be used.
Instead, the filter command will be executed as the main process in the embedded
terminal of the part viewer. The filter command standard input, output and error
will be set to the terminal TTY. The filter is expected to implement its own
paging.

aerc ships with some default filters installed in the libexec directory (usually
*/usr/libexec/aerc/filters*). Note that these may have additional dependencies
that aerc does not have alone.

The filter commands are invoked with *sh -c command*. The following folders are
prepended to the system **$PATH** to allow referencing filters from their name only.

```
${XDG_CONFIG_HOME:-~/.config}/aerc/filters
~/.local/libexec/aerc/filters
${XDG_DATA_HOME:-~/.local/share}/aerc/filters
$PREFIX/libexec/aerc/filters
$PREFIX/share/aerc/filters
/usr/libexec/aerc/filters
/usr/share/aerc/filters
```

If you want to run a program in your default **$PATH** which has the same
name as a builtin filter (e.g. */usr/bin/colorize*), use its absolute path.

The following variables are defined in the filter command environment:

**AERC_MIME_TYPE**

> the part MIME type/subtype

**AERC_FORMAT**

> the part content type format= parameter (e.g. format=flowed)

**AERC_FILENAME**

> the attachment filename (if any)

**AERC_SUBJECT**

> the message Subject header value

**AERC_FROM**

> the message From header value

**AERC_STYLESET**

> the path to the styleset used by aerc

**AERC_OSC8_URLS**

> set to *1* when OSC 8 is enabled (see **enable-osc8**)

Note that said email body is converted into UTF-8 before being passed to
filters.

If **show-headers** is enabled, only the currently viewed part body is piped into
the filter command. A special *.headers* filter command can be defined to post
process the full headers.

### EXAMPLES

*text/plain*
	Color some things, e.g. quotes, git diffs, links, etc.:

	```
	text/plain=colorize
	```

	The built-in *colorize* filter can be configured in the **[viewer]**
	section of styleset files. See [aerc-stylesets(7)](/reference/aerc-stylesets.7/).

	Wrap long lines at 100 characters, while not messing up nested quotes.
	Handles format=flowed emails properly:

	```
	text/plain=wrap -w 100 | colorize
	```

*from,<sender>*
	Another example of hard wrapping lines of emails sent by a specific
	person. Explicitly reflow all paragraphs instead of only wrapping long
	lines. This may break manual formatting in some messages:

	```
	from,thatguywhoneverhardwrapshismessages=wrap -r -w 72 | colorize
	```

*subject,~<regexp>*
	Use rainbow coloring with `lolcat(1)` for emails sent by software
	forges:

	```
	subject,~Git(hub|lab)=lolcat -f
	```

*text/html*
	Render html to a more human readable version and colorize:

	```
	text/html=html | colorize
	```

	Use pandoc to output plain text:

	```
	text/html=pandoc -f html -t plain
	```

	Use w3m internal pager to interactively view an HTML part with coloring:

	```
	text/html=! w3m -I UTF-8 -T text/html
	```

	If `img2sixel(1)` is installed and your terminal emulator supports
	displaying images using the sixel protocol, use the builtin
	**html-unsafe** filter (to allow external URLs to be loaded) in
	interactive mode with explicit sixel inline images enabled.

	```
	text/html=! html-unsafe -sixel
	```

*text/calendar*
	Parse calendar invites:

	```
	text/calendar=calendar
	```

*text/\**
	Catch any other type of text that did not have a specific filter and
	use `bat(1)` to color these:

	```
	text/\*=bat -fP --file-name="$AERC_FILENAME" --style=plain
	```

*.headers*
	Colorize email headers when **show-headers** is *true*.

	```
	.headers=colorize
	```

*message/delivery-status*
	When not being able to deliver the provider might send such emails:

	```
	message/delivery-status=colorize
	```

*message/rfc822*
	When getting emails as attachments, e.g. on some mailing lists digest
	format is sending an email with all the digest emails as attachments.
	Requires `caeml(1)` to be on **PATH**:

	```
	message/rfc822=caeml | colorize
	```

	https://github.com/ferdinandyb/caeml

*application/mbox*
	Emails as attachments in the mbox format. For example aerc can also
	create an mbox from messages with the **:pipe** command. Requires
	`catbox(1)` and `caeml(1)` to be on **PATH**:

	```
	application/mbox=catbox -c caeml | colorize
	```

	https://github.com/konimarti/catbox

*application/pdf*
	Render pdf to text and rewrap at 100 character width. Requires
	`pdftotext(1)` to be on **PATH**:

	```
	application/pdf=pdftotext - -l 10 -nopgbrk -q  - | fmt -w 100
	```

	https://www.xpdfreader.com/pdftotext-man.html

*image/\**

	This is a tricky topic. It's possible to display images in a terminal,
	but for high resolution images the terminal you are using either needs
	to support sixels or the kitty terminal graphics protocol. The built-in
	terminal emulator of aerc (via the TUI library Vaxis) supports both.
	Furthermore if you don't set any filter for images, Vaxis will figure
	out what your terminal emulator supports and either use sixels, kitty
	graphics, or fall back to a pixelated half-block. You can turn this
	feature off, by setting a filter that is essentially no-op.

	You can still set a specific filter, e.g `catimg(1)`:

	```
	image/\*=catimg -w$(tput cols) -
	```

*.filename,~<regexp>*
	Match <regexp> against the filename of an attachment, e.g. to split
	csv-s into columns:

	```
	.filename,~.*\.csv=column -t --separator=","
	```

See the wiki at https://man.sr.ht/~rjarry/aerc/ for more examples and possible
customizations of the built-in filters.

## OPENERS

Openers allow you to specify the command to use for the **:open** and **:open-link**
actions on a per-MIME-type basis. The **:open-link** URL scheme is used to
determine the MIME type as follows: *x-scheme-handler/<scheme>*. They are
configured in the **[openers]** section of *aerc.conf*.

*{}* is expanded as the temporary filename or URL to be opened with proper shell
quoting. If it is not encountered in the command, the filename/URL will be
appended to the end of the command. The command will then be executed with
*sh -c*.

Like **[filters]**, openers support basic shell globbing. The first opener which
matches the part's MIME type (or URL scheme handler MIME type) will be used, so
order them from most to least specific.

Example:

```
[openers]
x-scheme-handler/irc=hexchat
x-scheme-handler/http\*=printf '%s' {} | wl-copy
text/html=surf -dfgms
text/plain=gvim {} +125
message/rfc822=thunderbird
```

## HOOKS

Hooks are triggered whenever the associated event occurs. The commands are run
in a shell environment with information added to environment variables.

They are configured in the **[hooks]** section of aerc.conf.

**aerc-startup** = *<command>*

> Executed when aerc is started. The hook is executed as soon as the UI is
> initialized and does not wait for all accounts to be fully loaded.

> Variables:

- **AERC_VERSION**
- **AERC_BINARY**

> Example:

  **aerc-startup** = *aerc :terminal calcurse && aerc :next-tab*

**mail-received** = *<command>*

> Executed when new mail is received in the selected folder. This will
> only work reliably with maildir and some IMAP servers.

> Variables:

- **AERC_ACCOUNT**
- **AERC_ACCOUNT_BACKEND**
- **AERC_FOLDER**
- **AERC_FOLDER_ROLE**
- **AERC_FROM_NAME**
- **AERC_FROM_ADDRESS**
- **AERC_SUBJECT**
- **AERC_MESSAGE_ID**

> Example:

  **mail-received** = _notify-send "[$AERC_ACCOUNT/$AERC_FOLDER] New mail from $AERC_FROM_NAME" "$AERC_SUBJECT"_

**mail-deleted** = *<command>*

> Executed when a message is deleted from a folder. Note that this hook is
> triggered when moving a message from one folder to another.

> Variables:

- **AERC_ACCOUNT**
- **AERC_ACCOUNT_BACKEND**
- **AERC_FOLDER**
- **AERC_FOLDER_ROLE**

> Example:

  **mail-deleted** = _mbsync "$AERC_ACCOUNT:$AERC_FOLDER"_

**mail-added** = *<command>*

> Executed when a message is added to a folder. Note that this hook is not
> triggered when a new message is received (use **mail-received** for that) but
> rather is only triggered when aerc itself adds a message to a folder, e.g.
> when moving or copying a message.

> Variables:

- **AERC_ACCOUNT**
- **AERC_ACCOUNT_BACKEND**
- **AERC_FOLDER**
- **AERC_FOLDER_ROLE**

> Example:

  **mail-added** = _mbsync "$AERC_ACCOUNT:$AERC_FOLDER"_

**mail-sent** = *<command>*

> Executed when a message is sent. This does not necessarily signify
> successful posting, if a queueing system like msmtpq is used.

> Variables:

- **AERC_ACCOUNT**
- **AERC_ACCOUNT_BACKEND**
- **AERC_FROM_NAME**
- **AERC_FROM_ADDRESS**
- **AERC_SUBJECT**
- **AERC_TO**
- **AERC_CC**

> Example:

  **mail-sent** = _`if [ "$AERC_ACCOUNT" = "gmail" ]; then mbsync
  gmail; fi`_

**aerc-shutdown** = *<command>*

> Executed when aerc shuts down. Aerc will wait for the command to finish
> before exiting.

> Variables:

- **AERC_LIFETIME**

**tag-modified** = *<command>*

> Executed when notmuch tags are modified in a notmuch account. The list
> of added, removed and toggled tags are passed as variables.

> Variables:

- **AERC_ACCOUNT**
- **AERC_TAG_ADDED**
- **AERC_TAG_REMOVED**
- **AERC_TAG_TOGGLED**

**flag-changed** = *<command>*

> Executed when flags are changed on a message.

> Variables:

- **AERC_ACCOUNT**
- **AERC_ACCOUNT_BACKEND**
- **AERC_FOLDER**
- **AERC_FOLDER_ROLE**
- **AERC_FLAG**

> Example:

  **flag-changed** = _mbsync "$AERC_ACCOUNT:$AERC_FOLDER"_

## TEMPLATES

Template files are used to populate the body of an email. The **:compose**,

**:reply** and **:forward** commands can be called with the **-T** flag with the name

of the template name. The available symbols and functions are described in

[aerc-templates(7)](/reference/aerc-templates.7/).

aerc ships with some default templates installed in the share directory (usually
*/usr/share/aerc/templates*).

These options are configured in the **[templates]** section of *aerc.conf*.

**template-dirs** = *<path1:path2:path3...>*

> The directory where the templates are stored. The config takes
> a colon-separated list of dirs. If this is unset or if a template cannot
> be found, the following paths will be used as a fallback in that order:

> ```
> ${XDG_CONFIG_HOME:-~/.config}/aerc/templates
> ${XDG_DATA_HOME:-~/.local/share}/aerc/templates
> /usr/local/share/aerc/templates
> /usr/share/aerc/templates
> ```

**new-message** = _<template_name>_

> The default template to be used for new messages.

> Default: _new_message_

**quoted-reply** = _<template_name>_

> The default template to be used for quoted replies.

> Default: _quoted_reply_

**forwards** = _<template_name>_

> The default template to be used for forward as body.

> Default: _forward_as_body_

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/) [aerc-binds(5)](/reference/aerc-binds.5/) [aerc-imap(5)](/reference/aerc-imap.5/) [aerc-jmap(5)](/reference/aerc-jmap.5/)

[aerc-maildir(5)](/reference/aerc-maildir.5/) [aerc-notmuch(5)](/reference/aerc-notmuch.5/) [aerc-templates(7)](/reference/aerc-templates.7/) [aerc-sendmail(5)](/reference/aerc-sendmail.5/)

[aerc-smtp(5)](/reference/aerc-smtp.5/) [aerc-stylesets(7)](/reference/aerc-stylesets.7/) [carddav-query(1)](/reference/carddav-query.1/)
