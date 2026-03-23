---
title: "aerc(1)"
description: "aerc email client command reference"
slug: "reference/aerc.1"
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

**aerc** [**-h**] [**-v**] [**-a** *<name>*] [**-C** *<file>*] [**-A** *<file>*] [**-B**

*<file>*] [**-I**] [**mailto:***<...>* | **mbox:***<file>* | :*<command...>*]

For a guided tutorial, use **:help tutorial** from aerc, or **man aerc-tutorial**
from your terminal.

## OPTIONS

**-h**, **--help**

> Show aerc usage help and exit.

**-v**, **--version**

> Print the installed version of aerc and exit.

**-a** *<name>*
**--account** *<name>*

> Load only the named account, as opposed to all configured accounts. It
> can also be a comma separated list of names. This option may be
> specified multiple times. The account order will be preserved.

**-C** *</path/to/aerc.conf>*
**--aerc-conf** *</path/to/aerc.conf>*

> Instead of using _$XDG_CONFIG_HOME/aerc/aerc.conf_ use the file at the
> specified path for configuring aerc.

**-A** *</path/to/accounts.conf>*
**--accounts-conf** *</path/to/accounts.conf>*

> Instead of using _$XDG_CONFIG_HOME/aerc/accounts.conf_ use the file at the
> specified path for configuring accounts.

**-B** *</path/to/binds.conf>*
**--binds-conf** *</path/to/binds.conf>*

> Instead of using _$XDG_CONFIG_HOME/aerc/binds.conf_ use the file at the
> specified path for configuring binds.

**-I**, **--no-ipc**

> Run commands (**mailto:***...*, **:***<command...>*, **mbox:***<file>*) directly
> in this instance rather than over IPC in an existing aerc instance. Also
> disable creation of an IPC server for subsequent aerc instances to
> communicate with this one.

**mailto:***address[,address][?query[&query]]*

> Open the composer with the address(es) in the To field. These
> addresses must not be percent encoded.

> If aerc is already running (and IPC is not disabled), the composer is
> started in that instance; otherwise a new instance is started with the
> composer.

> The following (optional) query parameters are supported:

| Query | Description |
|---|---|
| *subject=<text>* | Subject line will be completed with the *<text>* |
| *body=<text>* | Message body will be completed with the *<text>* |
| *cc=<address>[,<address>]* | Cc header will be completed with the list of addresses |
| *bcc=<address>[,<address>]* | Bcc header will be completed with the list of addresses |
| *in-reply-to=<message-id>* | In-reply-to header will be set to the message id |
| *account=<accountname>* | Specify the account (must be in *accounts.conf*; default is the selected account) |
| *template=<template-file>* | Template sets the template file for creating the message |

	Note that reserved characters in the queries must be percent encoded.

**:***<command...>*

> Run an aerc-internal command as you would in Ex-Mode. See *RUNTIME
> COMMANDS* below.

> The command to be executed and its arguments can either be passed as
> separate arguments in the shell (e.g., *aerc :cmd arg1 arg2*) or as a single
> argument in the shell (e.g., *aerc ":cmd arg1 arg2"*). In the former case,
> aerc may add quotes to the command before it is parsed in an attempt to
> preserve arguments containing spaces and other special characters. In the
> latter case, aerc will parse the command verbatim, as if it had been typed
> directly on aerc's command line. This latter form can be helpful for
> commands that don't interpret quotes in their arguments.

> If aerc is already running (and IPC is not disabled), the command is run in
> that instance; otherwise a new instance is started with the command.

**mbox:***<file>*

> Open the specified mbox file as a virtual temporary account.

> If aerc is already running (and IPC is not disabled), the file is opened in
> that instance; otherwise a new instance is started with the file.

## RUNTIME COMMANDS

To execute a command, press **:** to bring up the command interface. Commands may
also be bound to keys, see [aerc-binds(5)](/reference/aerc-binds.5/) for details. In some contexts, such
as the terminal emulator, **<c-x>** is used to bring up the command interface.

Different commands work in different contexts, depending on the kind of tab you
have selected.

Dynamic arguments are expanded following [aerc-templates(7)](/reference/aerc-templates.7/) depending on the
context. For example, if you have a message selected, the following command:

```
:filter -f "{{index (.From | emails) 0}}"
```

Will filter all messages sent by the same sender.

Aerc stores a history of commands, which can be cycled through in command mode.
Pressing the up key cycles backwards in history, while pressing down cycles
forwards.

### GLOBAL COMMANDS

These commands work in any context.

**:help** *<topic>*
**:man** *<topic>*

> Display one of aerc's man pages in the embedded terminal.

**:help** **keys**
**:man** **keys**

> Display the active key bindings in the current context.

**:new-account** [**-t**]

> Start the new account wizard.

> **-t**: Create a temporary account. Do not modify *accounts.conf*.

**:cd** *<directory>*

> Changes aerc's current working directory.

**:z** *<directory or zoxide query>*

> Changes aerc's current working directory using zoxide. If zoxide is not on
> **$PATH**, the command will not be registered.

**:change-tab** [**+**|**-**]*<tab name or index>*
**:ct** [**+**|**-**]*<tab name or index>*

> Changes the focus to the tab with the given name. If a number is given,
> it's treated as an index. If the number is prepended with **+** or **-**, the number
> is interpreted as a delta from the selected tab. If only a **-** is given, changes
> the focus to the previously selected tab.

**:exec** *<command>*

> Executes an arbitrary command in the background. Aerc will set the
> environment variables **$account** and **$folder** when the command is
> executed from an Account tab or an opened message.

> Note: commands executed in this way are not executed with the shell.

**:echo** *<string>*

> Resolve templates in *<string>* and print it.

**:eml** [*<path>*]
**:preview** [*<path>*]

> Opens an eml file and displays the message in the message viewer.

> Can also be used in the message viewer to open an rfc822 attachment or
> in the composer to preview the message.

**:pwd**

> Displays aerc's current working directory in the status bar.

**:version**

> Displays the version of the running aerc instance.

**:send-keys** *<keystrokes>*

> Send keystrokes to the currently visible terminal, if any. Can be used to
> control embedded editors to save drafts or quit in a safe manner.

> Here's an example of quitting a Vim-like editor:

  **:send-keys** *<Esc>:wq!<Enter>*

> Note: when used in *binds.conf* (see [aerc-binds(5)](/reference/aerc-binds.5/)), angle brackets
> need to be escaped in order to make their way to the command:

  <C-q> = :send-keys \\<Esc\\>:wq!\\<Enter\\><Enter>

> This way the *<Esc>* and the first *<Enter>* keystrokes are passed to
> **:send-keys**, while the last *<Enter>* keystroke is executed directly,
> committing the **:send-keys** command's execution.

**:term** [*<command>...*]
**:terminal** [*<command>...*]

> Opens a new terminal tab with a shell running in the current working
> directory, or the specified command.

**:move-tab** [*+*|*-*]*<index>*

> Moves the selected tab to the given index. If *+* or *-* is specified, the
> number is interpreted as a delta from the selected tab.

**:prev-tab** [*<n>*]
**:next-tab** [*<n>*]

> Cycles to the previous or next tab in the list, repeating *<n>* times
> (default: *1*).

**:pin-tab**

> Moves the current tab to the left of all non-pinned tabs and displays
> the **pinned-tab-marker** (default: *`*) to the left of the tab title.

**:unpin-tab**

> Removes the **pinned-tab-marker** from the current tab and returns the tab
> to its previous location.

**:prompt** *<prompt>* *<command>...*

> Displays the prompt on the status bar, waits for user input, then appends
> that input as the last argument to the command and executes it. The input is
> passed as one argument to the command, unless it is empty, in which case no
> extra argument is added.

**:menu** [**-c** *"<shell-cmd>"*] [**-e**] [**-b**] [**-a**] [**-d**] [**-l**] [**-t** *"<title>"*]

*<aerc-cmd ...>*
	Opens a popover dialog running *sh -c "<shell-cmd>"* (if not specified
	**[general].default-menu-cmd** will be used). When the command exits, all
	lines printed on its standard output will be appended to *<aerc-cmd ...>*
	and executed as a standard aerc command like [xargs(1)](https://man7.org/linux/man-pages/man1/xargs.1.html) would do when
	used in a shell. A colon (**:**) prefix is supported for *<aerc-cmd ...>*
	but is not required.

	**:menu** can be used without an external program by setting *<shell-cmd>*
	to *-*. This also acts as a fallback in case where no *<shell-cmd>* was
	specified at all or the executable in the *<shell-cmd>* was not found.

	**-c** *"<shell-cmd>"*
		Override **[general].default-menu-cmd**. See [aerc-config(5)](/reference/aerc-config.5/) for
		more details.

	**-e**: Stop executing commands on the first error.

	**-b**: Do **NOT** spawn the popover dialog. Start the commands in the
	background (**NOT** in a virtual terminal). Use this if *<shell-cmd>* is
	a graphical application that does not need a terminal.

	**-t**: Override the dialog title (otherwise derived from *<shell-cmd>*)

	*<shell-cmd>* may be fed with input text using the following flags:
		**-a**: All account names, one per line. E.g.:

			'<account>' LF

		**-d**: All current account directory names, one per line. E.g.:

			'<directory>' LF

		**-ad**: All directories of all accounts, one per line. E.g.:

			'<account>' '<directory>' LF

		**-l**: All links extracted from the current message.

		Quotes may be added by aerc when either tokens contain special
		characters. The quotes should be preserved for *<aerc-cmd ...>*.

	Examples:

	```
	:menu -adc fzf :cf -a
	:menu -c 'fzf --multi' :attach
	:menu -dc 'fzf --multi' :cp
	:menu -bc 'dmenu -l 20' :cf
	:menu -c 'ranger --choosefiles=%f' :attach
	:menu -lc fzf :open-link
	```

	This may also be used in key bindings (see [aerc-binds(5)](/reference/aerc-binds.5/)):

	```
	<C-p> = :menu -adc fzf :cf -a<Enter>
	```

**:choose** **-o** *<key>* *<text>* *<command>* [**-o** *<key>* *<text>* *<command>*]...

> Prompts the user to choose from various options.

**:reload** [**-B**] [**-C**] [**-s** *<styleset-name>*]

> Hot-reloads the config files for the key binds and general **aerc** config.
> Reloading of the account config file is not supported.

> If no flags are provided, *binds.conf*, *aerc.conf*, and the current
> styleset will all be reloaded.

> **-B**: Reload *binds.conf*.

> **-C**: Reload *aerc.conf*.

> **-s** *<styleset-name>*
  Load the specified styleset.

> Sending the **SIGHUP** signal to the **aerc** process will cause **:reload**
> to be performed (with no flags).

**:repeat**

> Repeats aerc's previously executed command when you last pressed **:**.

**:suspend**

> Suspends the aerc process. Some ongoing connections may be terminated.

**:quit** [**-f**]
**:exit** [**-f**]
**:q**    [**-f**]

> Exits aerc. If a task is being performed that should not be interrupted
> (like sending a message), a normal quit call might fail. In this case,
> closing aerc can be forced with the **-f** option.

**:redraw**

> Force a full redraw of the screen.

### MESSAGE COMMANDS

These commands are valid in any context that has a selected message (e.g. the
message list, the message in the message viewer, etc).

**:archive** [**-m** *<strategy>*] *<scheme>*

> Moves the selected message to the archive. The available schemes are:

> *flat*: No special structure, all messages in the archive directory

> *year*: Messages are stored in folders per year

> *month*: Messages are stored in folders per year and subfolders per month

> The **-m** option sets the multi-file strategy. See [aerc-notmuch(5)](/reference/aerc-notmuch.5/) for more
> details.

**:accept** [**-e**|**-E**] [**-s**]

> Accepts an iCalendar meeting invitation. This opens a compose window
> with a specially crafted attachment. Sending the email will let the
> inviter know that you accepted and will likely update their calendar as
> well. This will NOT add the meeting to your own calendar, that must be
> done as a separate manual step (e.g. by piping the text/calendar part to
> an appropriate script).

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

> **-s**: Skips the editor and goes directly to the review screen.

**:accept-tentative** [**-e**|**-E**] [**-s**]

> Accepts an iCalendar meeting invitation tentatively.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

> **-s**: Skips the editor and goes directly to the review screen.

**:copy** [**-dp**] [**-a** *<account>*] [**-m** *<strategy>*] *<folder>*
**:cp** [**-dp**] [**-a** *<account>*] [**-m** *<strategy>*] *<folder>*

> Copies the selected message(s) to *<folder>*.

> **-d**: Decrypt the message before copying.

> **-p**: Create *<folder>* if it does not exist.

> **-a**: Copy to *<folder>* of *<account>*. If *<folder>* does
> not exist, it will be created whether or not **-p** is used.

> **-m**: Set the multi-file strategy. See [aerc-notmuch(5)](/reference/aerc-notmuch.5/) for more details.

**:decline** [**-e**|**-E**] [**-s**]

> Declines an iCalendar meeting invitation.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

> **-s**: Skips the editor and goes directly to the review screen.

**:delete** [**-m** *<strategy>*]
**:delete-message** [**-m** *<strategy>*]

> Deletes the selected message.

> **-m**: Set the multi-file strategy. See [aerc-notmuch(5)](/reference/aerc-notmuch.5/) for more details.

**:envelope** [**-h**] [**-s** *<format-specifier>*]

> Opens the message envelope in a dialog popup.

> **-h**: Show all header fields

> **-s** *<format-specifier>*
  User-defined format specifier requiring two *%s* for the key and
  value strings. Default format: *%-20.20s: %s*

**:recall** [**-f**] [**-e**|**-E**] [**-s**]

> Opens the selected message for re-editing. Messages can only be
> recalled from the postpone directory.

> **-f**: Open the message for re-editing even if it is not in the postpone
> directory. Aerc remembers the folder, so the further **:postpone** call will
> save the message back there.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

> **-s**: Skips the editor and goes directly to the review screen.

> Original recalled messages are deleted if they are sent or postponed again.
> In both cases you have another copy of the message somewhere. Otherwise the
> recalled message is left intact. This happens if the recalled message is
> discarded after editing. It can be deleted with **:rm** if it is not needed.

**:forward** [**-A**|**-F**] [**-T** *<template-file>*] [**-x** *<account>*] [**-e**|**-E**] [**-s**] [*<address>*...]

> Opens the composer to forward the selected message to another recipient.

> **-A**: Forward the message and all attachments.

> **-F**: Forward the full message as an RFC 2822 attachment.

> **-T** *<template-file>*
  Use the specified template file for creating the initial
  message body. Unless **-F** is specified, this defaults to what
  is set as **forwards** in the **[templates]** section of
  *aerc.conf*.

> **-x**: *<account>*
  Forward with the specified account instead of the current one.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

> **-s**: Skips the editor and goes directly to the review screen.

**:move** [**-p**] [**-a** *<account>*] [**-m** *<strategy>*] *<folder>*
**:mv** [**-p**] [**-a** *<account>*] [**-m** *<strategy>*] *<folder>*

> Moves the selected message(s) to *<folder>*.

> **-p**: Create *<folder>* if it does not exist.

> **-a**: Move to *<folder>* of *<account>*. If *<folder>* does
> not exist, it will be created whether or not **-p** is used.

> **-m**: Set the multi-file strategy. See [aerc-notmuch(5)](/reference/aerc-notmuch.5/) for more details.

**:patch** *<args ...>*

> Patch management sub-commands. See [aerc-patch(7)](/reference/aerc-patch.7/) for more details.

**:pipe** [**-bdmps**] *<cmd>*

> Downloads and pipes the selected message into the given shell command
> (executed with *sh -c "<cmd>"*), and opens a new terminal tab to show
> the result. By default, the selected message part is used in the message
> viewer and the full message is used in the message list. In the compose
> review mode, pipes the composed message that is about to be sent.

> Operates on multiple messages when they are marked. When piping multiple
> messages, aerc will write them with mbox format separators.

> **-b**: Run the command in the background instead of opening a terminal tab

> **-d**: Pipe the (full) message but decrypt it first.

> **-m**: Pipe the full message

> **-p**: Pipe just the selected message part, if applicable

> **-s**: Silently close the terminal tab after the command is completed

> This can be used to apply patch series with git:

  **:pipe -m** *git am -3*

> When at least one marked message subject matches a patch series (e.g.
> *[PATCH X/Y]*), all marked messages will be sorted by subject to ensure
> that the patches are applied in order.

**:reply** [**-acfqs**] [**-T** *<template-file>*] [**-A** *<account>*] [**-e**|**-E**]

> Opens the composer to reply to the selected message.

> **-a**: Reply all

> **-c**: Close the view tab when replying. If the reply is not sent, reopen
> the view tab.

> **-f**: Reply to all addresses in From and Reply-To headers.

> **-q**: Insert a quoted version of the selected message into the reply
> editor. This defaults to what is set as **quoted-reply** in the **[templates]**
> section of *aerc.conf*.

> **-s**: Skip opening the text editor and go directly to the review screen.

> **-T** *<template-file>*
  Use the specified template file for creating the initial
  message body.

> **-A** *<account>*
  Reply with the specified account instead of the current one.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

**:read** [**-t**]

> Marks the marked or selected messages as read.

> **-t**: Toggle the messages between read and unread.

**:unread** [**-t**]

> Marks the marked or selected messages as unread.

> **-t**: Toggle the messages between read and unread.

**:flag** [**-t**] [**-a**] [**-f**] [**-x** *<flag>*]

> Sets (enables) a certain flag on the marked or selected messages.

> **-t**: Toggle the flag instead of setting (enabling) it.

> **-a**: Mark message as answered/unanswered.

> **-f**: Mark message as forwarded/not-forwarded.

> **-x** *<flag>*: Mark message with specific flag.
  The available flags are (adapted from RFC 3501, section 2.3.2):

  *seen*
  	Message has been read
  *answered*
  	Message has been answered
  *forwarded*
  	Message has been forwarded
  *flagged*
  	Message is flagged for urgent/special attention
  *draft*
  	Message is a draft

> (Arbitrary IMAP keyword flags are managed using **:modify-labels** / **:tag**.)

**:unflag** [**-t**] [**-a**] [**-f**] [**-x** *<flag>*]

> Operates exactly like **:flag**, defaulting to unsetting (disabling) flags.

**:modify-labels** [*+*|*-*|*!*]*<label>*...
**:tag** [*+*|*-*|*!*]*<label>*...

> Modify message labels (e.g. IMAP and notmuch tags, GMail or Proton labels).
> Labels prefixed with a **+** are added, those prefixed with a **-** are
> removed and those prefixed with a **!** are toggled (toggling is not
> supported for IMAP, GMail nor Proton). As a convenience, labels without either
> operand add the specified label.

> Example: add *inbox* and *unread* labels, remove *spam* label.

  **:modify-labels** *+inbox* *-spam* *unread*

**:unsubscribe** [**-e**|**-E**] [**-s**]

> Attempt to automatically unsubscribe the user from the mailing list through
> use of the List-Unsubscribe header. If supported, aerc may open a compose
> window pre-filled with the unsubscribe information or open the unsubscribe
> URL in a web browser.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

> **-s**: Skips the editor and goes directly to the review screen.

### MESSAGE LIST COMMANDS

**:align** *top|center|bottom*

> Aligns the selected message. The available positions are:

	*top*: Top of the message list.
	*center*: Center of the message list.

> *bottom*: Bottom of the message list.

**:disconnect**
**:connect**

> Disconnect or reconnect the current account. This only applies to
> certain email sources.

**:clear** [**-s**]

> Clears the current search or filter criteria.

> By default, the selected message will be kept. To clear the selected
> message and move cursor to the top of the message list, use the **-s** flag.

> **-s**: Selects the message at the top of the message list after clearing.

**:cf** [**-a** *<account>*] *<folder>*

> Change the folder shown in the message list to *<folder>*.

> **-a** *<account>*
  Change to *<folder>* of *<account>* and focus its corresponding
  tab.

**:check-mail**

> Check for new mail on the selected account. Non-IMAP backends require
> check-mail-cmd to be set in order for aerc to initiate a check for new mail.
> Issuing a manual **:check-mail** command will reset the timer for automatic checking.

**:compose** [**-H** *"<header>: <value>"*] [**-T** *<template-file>*] [**-e**|**-E**] [**-s**] [*<body>*]

> Open the compose window to send a new email. The new email will be sent with
> the current account's outgoing transport configuration. For details on
> configuring outgoing mail delivery consult [aerc-accounts(5)](/reference/aerc-accounts.5/).

> **-H** *"<header>: <value>"*
  Add the specified header to the message, e.g:

  	**:compose -H** *"X-Custom: custom value"*

> **-T** *<template-file>*
  Use the specified template file for creating the initial
  message body.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

> **-s**: Skips the editor and goes directly to the review screen.

> *<body>*: The initial message body.

**:bounce** [**-A** *<account>*] *<address>* [*<address>*...]
**:resend** [**-A** *<account>*] *<address>* [*<address>*...]

> Bounce the selected message or all marked messages to the specified addresses,
> optionally using the specified account. This forwards the message while
> preserving all the existing headers. The new sender (**From**), date (**Date**),
> **Message-ID** and recipients (**To**) are prepended to the headers with the **Resent-**
> prefix. For more information please refer to section 3.6.6 of RFC 2822. Note
> that the bounced message is not copied over to the **sent** folder.

> Also please note that some providers (notably for instance Microsoft's
> O365) do not allow sending messages with the **From** header not matching
> any of the account's identities (even if **Resent-From** matches some).

**:recover** [**-f**] [**-e**|**-E**] *<file>*

> Resume composing a message that was not sent nor postponed. The file may
> not contain header data unless **[compose].edit-headers** was enabled when
> originally composing the aborted message.

> **-f**: Delete the *<file>* after opening the composer.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

**:filter** [*<options>*] *<terms>*...

> Similar to **:search**, but filters the displayed messages to only the search
> results. The search syntax is dependent on the underlying backend.
> Refer to [aerc-search(1)](/reference/aerc-search.1/) for details.

**:mkdir** *<name>*

> Creates a new folder for this account and changes to that folder.

**:rmdir** [**-f**] [*<folder>*]

> Removes the folder *<folder>*, or the current folder if not specified.

> By default, it will fail if the directory is non-empty (see **-f**).

> **-f**
  Remove the directory even if it contains messages.

> Some programs that sync maildirs may recover deleted directories (e.g.
> **offlineimap**). These can either be specially configured to properly
> handle directory deletion, or special commands need to be run to delete
> directories (e.g. *offlineimap --delete-folder*).

> It is possible, with a slow connection and the IMAP backend, that new
> messages arrive in the directory before they show up - using **:rmdir** at
> this moment would delete the directory and such new messages before the
> user sees them.

**:next** *<n>*[*%*]
**:next-message** *<n>*[*%*]
**:prev** *<n>*[*%*]
**:prev-message** *<n>*[*%*]

> Selects the next (or previous) message in the message list. If specified as
> a percentage, the percentage is applied to the number of messages shown on
> screen and the cursor advances that far.

**:next-folder** [**-u**] *<n>*
**:prev-folder** [**-u**] *<n>*

> Cycles to the next (or previous) folder shown in the sidebar, repeated
> *<n>* times (default: *1*).

> **-u**
  Cycles to the next (or previous) folder shown in the sidebar with unseen
  emails.

**:expand-folder** [*<folder>*]
**:collapse-folder** [*<folder>*]
**:toggle-folder** [*<folder>*]

> Expands, collapses, or toggles a folder when the directory tree is enabled.
> If no *<folder>* argument is specified, the currently selected folder is
> acted upon.

**:export-mbox** *<file>*

> Exports messages in the current folder to an mbox file. If there are marked
> messages in the folder, only the marked ones are exported. Otherwise the
> whole folder is exported.

**:import-mbox** *<path>*

> Imports all messages from an (gzipped) mbox file to the current folder.
> *<path>* can either be a path to a file or an URL.

> Examples:

> ```
> :import-mbox ~/messages.mbox
> :import-mbox https://lists.sr.ht/~rjarry/aerc-devel/patches/55634/mbox
> :import-mbox https://lore.kernel.org/all/20190807155524.5112-1-steve.capper@arm.com/t.mbox.gz
> ```

**:next-result**
**:prev-result**

> Selects the next or previous search result.

**:query** [**-a** *<account>*] [**-n** *name*] [**-f**] *<notmuch query>*

> Create a virtual folder using the specified top-level notmuch query. This
> command is exclusive to the notmuch backend.

> **-a** *<account>*
  Change to *<folder>* of *<account>* and focus its corresponding
  tab.

> **-n** *<name>*
  Specify the display name for the virtual folder. If not provided,
  *<notmuch query>* is used as the display name.

> **-f**
  Load the query results into an already existing folder (messages
  in the original folder are not deleted).

**:search** [*<options>*] *<terms>*...

> Searches the current folder for messages matching the given set of
> conditions.  The search syntax is dependent on the underlying backend.
> Refer to [aerc-search(1)](/reference/aerc-search.1/) for details.

**:select** *<n>*
**:select-message** *<n>*

> Selects the *<n>*\th message in the message list (and scrolls it into
> view if necessary).

**:hsplit** [[*+*|*-*]*<n>*]

**:split** [[*+*|*-*]*<n>*]

> Creates a horizontal split, showing *<n>* messages and a message view
> below the message list. If a *+* or *-* is prepended, the message list
> size will grow or shrink accordingly. The split can be cleared by
> calling **:[h]split** *0*, or just **:[h]split**. The split can be toggled
> by calling split with the same (absolute) size repeatedly. For example,
> **:[h]split** *10* will create a split. Calling **:[h]split** *10* again
> will remove the split. If not specified, *<n>* is set to an estimation
> based on the user's terminal. Also see **:vsplit**.

**:sort** [[**-r**] *<criterion>*]...

> Sorts the message list by the given criteria. **-r** sorts the
> immediately following criterion in reverse order.

> Available criteria:

| Criterion |
|---|

:- **Description**

:- Date and time of the messages arrival

:- Addresses in the Cc field

:- Date and time of the message

:- Addresses in the From field

:- Presence of the read flag

:- Presence of the flagged flag

:- Size of the message

:- Subject of the message

:- Addresses in the To field

**:toggle-threads**

> Toggles between message threading and the normal message list.

**:toggle-sidebar**

> Toggles the sidebar on or off.

**:fold** [**-at**]
**:unfold** [**-at**]

> Collapse or un-collapse the thread children of the selected message.
> If the toggle flag **-t** is set, the folded status is changed. If the
> **-a** flag is set, all threads in the current view are affected. Folded
> threads can be identified by *{{.Thread\*}}* template attributes
> in **[ui].index-columns**. See [aerc-config(5)](/reference/aerc-config.5/) and [aerc-templates(7)](/reference/aerc-templates.7/)
> for more details.

**:toggle-thread-context**

> Toggles between showing entire thread (when supported) and only showing
> messages which match the current query / mailbox.

**:view** [**-pb**]
**:view-message** [**-pb**]

> Opens the message viewer to display the selected message. If the peek
> flag **-p** is set, the message will not be marked as seen and ignores the
> **auto-mark-read** config. If the background flag **-b** is set, the message
> will be opened in a background tab.

**:vsplit** [[*+*|*-*]*<n>*]

> Creates a vertical split of the message list. The message list will be
> *<n>* columns wide, and a vertical message view will be shown to the
> right of the message list. If a *+* or *-* is prepended, the message
> list size will grow or shrink accordingly. The split can be cleared by
> calling **:vsplit** *0*, or just **:vsplit**. The split can be toggled by
> calling split with the same (absolute) size repeatedly. For example,
> **:vsplit** *10* will create a split. Calling **:vsplit** *10* again will
> remove the split. If not specified, *<n>* is set to an estimation based
> on the user's terminal. Also see **:split**.

### MESSAGE VIEW COMMANDS

**:close**

> Closes the message viewer.

**:next** *<n>*[*%*]
**:prev** *<n>*[*%*]

> Selects the next (or previous) message in the message list. If specified as
> a percentage, the percentage is applied to the number of messages shown on
> screen and the cursor advances that far.

**:next-part**
**:prev-part**

> Cycles between message parts being shown. The list of message parts is shown
> at the bottom of the message viewer.

**:open** [**-d**] [*<args...>*]

> Saves the current message part to a temporary file, then opens it. If no
> arguments are provided, it will open the current MIME part with the
> matching command in the **[openers]** section of *aerc.conf*. When no match
> is found in **[openers]**, it falls back to the default system handler.

> **-d**: Delete the temporary file after the opener exits

> When arguments are provided:

- The first argument must be the program to open the message part with.
>   Subsequent args are passed to that program.
- *{}* will be expanded as the temporary filename to be opened. If it is
>   not encountered in the arguments, the temporary filename will be
>   appended to the end of the command.

**:copy-link** *<url>*

> Copy the specified URL to the system clipboard. This uses the OSC52
> escape sequence which must be supported by the terminal.

**:open-link** *<url>* [*<args...>*]

> Open the specified URL with an external program. The opening logic is
> the same as for **:open** but the opener program will be looked up
> according to the URL scheme MIME type: *x-scheme-handler/<scheme>*.

**:save** [**-fpaA**] *<path>*

> Saves the current message part to the given path.
> If the path is not an absolute path, **[general].default-save-path** from
> *aerc.conf* will be prepended to the path given.
> If path ends in a trailing slash or if a folder exists on disc or if **-a**
> is specified, aerc assumes it to be a directory.
> When passed a directory **:save** infers the filename from the mail part if
> possible, or if that fails, uses *aerc\*$DATE_.

> **-f**: Overwrite the destination whether or not it exists

> **-p**: Create any directories in the path that do not exist

> **-a**: Save all attachments. Individual filenames cannot be specified.

> **-A**: Same as **-a** but saves all the named parts, not just attachments.

**:mark** [**-atvVTsr**] *<filter>*

> Marks messages. Commands will execute on all marked messages instead of the
> highlighted one if applicable. The flags below can be combined as
> needed. The existence of a filter implies **-a** unless **-T** has been
> specified.

> **-a**: Apply to all messages in the current folder

> **-t**: toggle the mark state instead of marking a message

> **-v**: Enter / leave visual mark mode

> **-V**: Same as **-v** but does not clear existing selection

> **-T**: Marks the displayed message thread of the selected message.

> **-s**: apply the filter to the From: header (does not work with **-v** or **-V**)

> **-r**: apply the filter to the To:, Cc:, Bcc: headers (does not work with
> **-v** or **-V**)

**:unmark** [**-atTsr**] *<filter>*

> Unmarks messages. The flags below can be combined as needed. The
> existence of a filter implies **-a** unless **-T** has been specified.

> **-a**: Apply to all messages in the current folder

> **-t**: toggle the mark state instead of unmarking a message

> **-T**: Marks the displayed message thread of the selected message.

> **-s**: apply the filter to the From: header (does not work with **-v** or **-V**)

> **-r**: apply the filter to the To:, Cc:, Bcc: headers (does not work with
> **-v** or **-V**)

**:remark**

> Re-select the last set of marked messages. Can be used to chain commands
> after a selection has been acted upon

**:toggle-headers**

> Toggles the visibility of the message headers.

**:toggle-key-passthrough**

> Enter or exit the **[view::passthrough]** key bindings context. See
> [aerc-binds(5)](/reference/aerc-binds.5/) for more details.

### MESSAGE COMPOSE COMMANDS

**:abort**

> Close the composer without sending, discarding the message in progress.

> If the text editor exits with an error (e.g. **:cq** in `vim(1)`), the
> message is immediately discarded.

**:attach** *<path>*
**:attach** **-m** [*<arg>*]
**:attach** **-r** <name> <cmd>

> Attaches the file at the given path to the email. The path can contain
> globbing syntax described at https://godocs.io/path/filepath#Match.

> **-m** [*<arg>*]
  Runs the **file-picker-cmd** to select files to be attached.
  Requires an argument when **file-picker-cmd** contains the *%s* verb.

> **-r** <name> <cmd>
  Runs the <cmd>, reads its output and attaches it as <name>. The
  attachment MIME type is derived from the <name>'s extension.

**:attach-key**

> Attaches the public key for the configured account to the email.

**:detach** [*<path>*]

> Detaches the file with the given path from the composed email. If no path is
> specified, detaches the first attachment instead. The path can contain
> globbing syntax described at https://godocs.io/path/filepath#Match.

**:cc** *<addresses>*
**:bcc** *<addresses>*

> Sets the Cc or Bcc header to the given addresses. If an editor for the header
> is not currently visible in the compose window, a new one will be added.

**:edit** [**-e**|**-E**]

> (Re-)opens your text editor to edit the message in progress. This will
> also allow editing the message headers. Only available from the review
> screen.

> **-e**: Forces **[compose].edit-headers** = *true* for this message only.

> **-E**: Forces **[compose].edit-headers** = *false* for this message only.

**:multipart** [**-d**] *<mime/type>*

> Converts the message to multipart/alternative and adds the specified
> *<mime/type>* part. Only the MIME types that are configured in the
> **[multipart-converters]** section of *aerc.conf* are supported and their
> related commands will be used to generate the alternate part.

> **-d**:
  Remove the specified alternative *<mime/type>* instead of
  adding it. If no alternative parts are left, make the message
  text/plain (i.e. not multipart/alternative).

**:next-field**
**:prev-field**

> Cycles between input fields in the compose window. Only available when
> the text editor is visible and **[compose].edit-headers** = *false*.

**:postpone** [**-t** *<folder>*]

> Saves the current state of the message to the **postpone** folder (from
> *accounts.conf*) for the current account by default. Only available from
> the review screen.

> **-t**: Overrides the target folder for saving the message

> If the message was force-recalled with **:recall -f** from a different folder,
> the **:postpone** command will save it back to that folder instead of the
> default **postpone** folder configured in settings. Use **-t** to override that
> or use **:mv** to move the saved message to a different folder.

**:send** [**-a** *<scheme>*] [**-t** *<folder>*] [**-r**|**-R**] [**--dsn**]

> Sends the message using this accounts default outgoing transport
> configuration. For details on configuring outgoing mail delivery consult
> [aerc-accounts(5)](/reference/aerc-accounts.5/). Only available from the review screen.

> **-a**: Archive the message being replied to. See **:archive** for schemes.

> **-t**: Overrides the Copy-To folder for saving the message.

> **-r**: Also save the sent message to the folder of the message being
> replied to.

> **-R**: Do not save the sent message to the folder of the message being
> replied to (overrides **copy-to-replied** account setting).

> **--dsn**: Request delivery status notification from the server. This
> will request notification on successful delivery, delayed delivery,
> and delivery failure.

**:switch-account** *<account-name>*
**:switch-account** **-n**
**:switch-account** **-p**

> Switches the account. Can be used to switch to a specific account from
> its name or to cycle through accounts using the **-p** and **-n** flags.

> **-p**: switch to previous account

> **-n**: switch to next account

**:header** [**-f**] *<name>* [*<value>*]

**:header** [**-d**] *<name>*

> Add a new email header to the compose window. If the header is already
> set and is not empty, **-f** must be used to overwrite its value.

> **-f**: Overwrite any existing header.

> **-d**: Remove the header instead of adding it.

**:encrypt**

> Encrypt the message to all recipients. If a key for a recipient cannot
> be found the message will not be encrypted.

**:sign**

> Sign the message using the account's default key. If **pgp-key-id** is set
> in *accounts.conf* (see [aerc-accounts(5)](/reference/aerc-accounts.5/)), it will be used in
> priority. Otherwise, the **From** header address will be used to look for
> a matching private key in the pgp keyring.

### TERMINAL COMMANDS

**:close**

> Closes the terminal.

## LOGGING

Aerc does not log by default, but collecting log output can be useful for
troubleshooting and reporting issues. Redirecting stdout when invoking aerc will
write log messages to that file:

	$ aerc > aerc.log

Persistent logging can be configured via the **log-file** and **log-level** settings
in *aerc.conf*.

## SEE ALSO

[aerc-config(5)](/reference/aerc-config.5/) [aerc-imap(5)](/reference/aerc-imap.5/) [aerc-jmap(5)](/reference/aerc-jmap.5/) [aerc-notmuch(5)](/reference/aerc-notmuch.5/) [aerc-smtp(5)](/reference/aerc-smtp.5/)

[aerc-maildir(5)](/reference/aerc-maildir.5/) [aerc-sendmail(5)](/reference/aerc-sendmail.5/) [aerc-search(1)](/reference/aerc-search.1/) [aerc-stylesets(7)](/reference/aerc-stylesets.7/)

[aerc-templates(7)](/reference/aerc-templates.7/) [aerc-accounts(5)](/reference/aerc-accounts.5/) [aerc-binds(5)](/reference/aerc-binds.5/) [aerc-tutorial(7)](/reference/aerc-tutorial.7/)

[aerc-patch(7)](/reference/aerc-patch.7/)
