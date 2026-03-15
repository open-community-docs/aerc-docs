---
title: "aerc-accounts(5)"
description: "Account configuration for aerc"
slug: "reference/aerc-accounts.5"
editUrl: false
sidebar:
  badge:
    text: man
    variant: note
# Auto-generated from upstream aerc 0.21.0
---

:::tip[aerc 0.21.0]
This reference tracks **aerc 0.21.0**. [View upstream source](https://git.sr.ht/~rjarry/aerc/tree/master/item/doc).
:::

:::note[Auto-generated reference]
This page is auto-generated from the upstream aerc man pages. To suggest changes, submit patches to the [aerc mailing list](https://lists.sr.ht/~rjarry/aerc-devel).
:::

## SYNOPSIS

The *accounts.conf* file is used for configuring each mail account used for
aerc. It is expected to be in your XDG config home plus *aerc*, which defaults
to *~/.config/aerc/accounts.conf*. This file must be kept secret, as it may
include your account credentials. An alternate file can be specified via the
*--accounts-conf* command line argument, see [aerc(1)](/reference/aerc.1/).

If *accounts.conf* does not exist, the **:new-account** configuration wizard will
be executed automatically on first startup.

This file is written in the ini format where each **[section]** is the name of an
account you want to configure, and the keys & values in that section specify
details of that account's configuration. Global options may be configured by
placing them at the top of the file, before any account-specific sections. These
can be overridden for an account by specifying them again in the account
section. In addition to the options documented here, specific transports for
incoming and outgoing emails may have additional configuration parameters,
documented on their respective man pages.

## CONFIGURATION

Note that many of these configuration options are written for you, such as

**source** and **outgoing**, when you run the account configuration wizard

(**:new-account**).

**archive** = *<folder>*

> Specifies a folder to use as the destination of the **:archive** command.

> Default: *Archive*

**check-mail** = *<duration>*

> Specifies an interval to check for new mail. Mail will be checked at
> startup, and every interval. IMAP accounts will check for mail in all
> unselected folders, and the selected folder will continue to receive
> PUSH mail notifications. Maildir/Notmuch folders must use
> **check-mail-cmd** in conjunction with this option. See [aerc-maildir(5)](/reference/aerc-maildir.5/)
> and [aerc-notmuch(5)](/reference/aerc-notmuch.5/) for more information.

> Setting this option to *0* will disable **check-mail**

> Example:
  **check-mail** = *5m*

> Default: *0*

**reconnect-maxwait** = *<duration>*

> Specifies the maximum delay between reconnection attempts when the
> connection is lost. Reconnection uses exponential backoff starting
> from immediate retry, then increasing delays (approximately 1.8^n
> seconds) until this maximum is reached.

> Default: *30s*

**copy-to** = *<folder1,folder2,folder3...>*

> Specifies a comma separated list of folders to copy sent mails to,
> usually *Sent*.

> By default, the mail is copied to no folders;

**copy-to-replied** = *true*|*false*

> In addition of **copy-to**, also copy replies to the folder in which the
> replied message is.

> Default: *false*

**strip-bcc** = *true*|*false*

> Strip *Bcc* headers before sending emails. This also affects local
> copies of the sent messages (**copy-to** and **copy-to-replied**).

> Some email providers/backends automatically strip *Bcc* headers before
> dispatching the messages to recipients. Double check before setting this
> to *false* to avoid leaking any private information.

> Default: *true*

**default** = *<folder>*

> Specifies the default folder to open in the message list when aerc
> configures this account.

> Default: *INBOX*

**folders** = *<folder1,folder2,folder3...>*

> Specifies the comma separated list of folders to display in the sidebar.
> Names prefixed with *~* are interpreted as regular expressions.

> By default, all folders are displayed.

**folders-exclude** = *<folder1,folder2,folder3...>*

> Specifies the comma separated list of folders to exclude from the sidebar.
> Names prefixed with *~* are interpreted as regular expressions.
> Note that this overrides anything from **folders**.

> By default, no folders are excluded.

**enable-folders-sort** = *true*|*false*

> If *true*, folders are sorted, first by specified folders (see **folders-sort**),
> then alphabetically.

> Default: *true*

**folders-sort** = *<folder1,folder2,folder3...>*

> Specifies a comma separated list of folders to be shown at the top of the
> list in the provided order. Remaining folders will be sorted alphabetically.

**folder-map** = *<file>*

> The folder map contains a one-to-one mapping of server folders to displayed
> folder names. The **folder-map** file expects a
> *<display-folder-name>*=*<server-folder-name>*[\*]
> mapping per line (similar key=value syntax as for the **query-map** in notmuch).
> The mappings are applied as they appear in the **folder-map**.
> Supported backends: imap, maildir.

> Note that other account options such as **archive**, **default**, **copy-to**,
> **postpone**, **folders**, **folders-exclude**, **folders-sort** need to be
> adjusted if one of those folders is affected by a folder mapping.

> To apply the mapping to subfolders or folders with a similar prefix,
> append '\*' to the server folder name.

> Examples:

> Remap a single folder:
> ```
> Spam = [Gmail]/Spam
> ```

> Remap the folder and all of its subfolders:
> ```
> G = [Gmail]\*
> ```

> Remove a prefix for all subfolders:
> ```
> ** = [Gmail]/\**
> ```

> Remap all subfolders and avoid a folder collision:
> ```
> Archive/existing = Archive\*
> Archive = OldArchive\*
> ```

**from** = *<address>*

> The default value to use for the From header in new emails. This should be
> an RFC 5322-compatible string, such as *Your Name <you@example.org>*.

**aliases** = *<address1,address2,address3...>*

> All aliases of the current account. These will be used to fill in the From:
> field. Make sure that your email server accepts this value, or for example
> use [aerc-sendmail(5)](/reference/aerc-sendmail.5/) in combination with `msmtp(1)` and
> **--read-envelope-from**.

> An alias can also use fnmatch-style wildcards in the address portion. These
> wildcards can be useful for catch-all addresses. For example, the alias
> *"Your Name" <\*@you.com>* would ensure that when replying to emails addressed
> to *hi@you.com* and *contact@you.com*, the From: field is set to
> *hi@you.com* and *contact@you.com*, respectively. The name from the alias,
> not from the matching address, is used.

**use-envelope-from** = *true*|*false*

> Use the email envelope From header address instead of the **from**
> configuration option when submitting messages.

> Default: *false*

**original-to-header** = *<header>*

> Use the email address alias specified in this header when replying.

**headers** = *<header1,header2,header3...>*

> Specifies the comma separated list of headers to fetch with the message.

> By default, all headers are fetched. If any headers are specified in this
> list, aerc will append it to the following list of required headers:

- date
- subject
- from
- sender
- reply-to
- to
- cc
- bcc
- in-reply-to
- message-id
- references

**headers-exclude** = *<header1,header2,header3...>*

> Specifies the comma separated list of headers to exclude from fetching.
> Note that this overrides anything from **headers**.

> By default, no headers are excluded.

**outgoing** = *<uri>*

> Specifies the transport for sending outgoing emails on this account. It
> should be a connection string, and the specific meaning of each component
> varies depending on the protocol in use. See each protocol's man page for
> more details:

- [aerc-sendmail(5)](/reference/aerc-sendmail.5/)
- [aerc-smtp(5)](/reference/aerc-smtp.5/)

**outgoing-cred-cmd** = *<command>*

> Specifies an optional command that is run to get the outgoing account's
> password. See each protocol's man page for more details.

**outgoing-cred-cmd-cache** = *true*|*false*

> If set to *true*, the credentials returned by the command will be cached
> until aerc is shut down. Otherwise, **outgoing-cred-cmd** will be executed
> every time an email is to be sent.

> Default: *false*

**pama-auto-switch** = *true*|*false*

> If *true*, the patch manager will automatically switch to an existing
> project for the **:patch** command if the subject contains a '[PATCH <project>]'
> segment.

> Default: *false*

**pgp-auto-sign** = *true*|*false*

> If *true*, all outgoing emails from this account will be signed (if a signing
> key is available).

> Default: *false*

**pgp-attach-key** = *true*|*false*

> If *true*, attach the public signing key to signed outgoing emails.

> Default: *false*

**pgp-self-encrypt** = *true*|*false*

> If *true*, any outgoing encrypted email will be also encrypted for the sender
> or the key specified in **pgp-key-id**.

> Default: *false*

**pgp-error-level** = *none*|*warn*|*error*

> The level of error to display when opportunistic encryption cannot be
> performed. See **pgp-opportunistic-encryption**.

> Default: *warn*

**pgp-key-id** = *<key-id>*

> Specify the key id to use when signing a message. Can be either short or
> long key id. If unset, aerc will look up the key by email.

**pgp-opportunistic-encrypt** = *true*|*false*

> If *true*, any outgoing email from this account will be encrypted when all
> recipients (including Cc and Bcc field) have a public key available in
> the keyring. The level of error to display when a message can't be
> encrypted can be configured with **pgp-error-level**.

> Default: *false*

**postpone** = *<folder>*

> Specifies the folder to save postponed messages to.

> Default: *Drafts*

**send-as-utc** = *true*|*false*

> Converts the timestamp of the Date header to UTC.

> Default: *false*

**send-with-hostname** = *true*|*false*

> Uses the local hostname in outgoing Message-Id headers instead of your
> email address domain name.

> Default: *false*

**source** = *<uri>*

> Specifies the source for reading incoming emails on this account. This key
> is required for all accounts. It should be a connection string, and the
> specific meaning of each component varies depending on the protocol in use.
> See each protocol's man page for more details:

- [aerc-imap(5)](/reference/aerc-imap.5/)
- [aerc-jmap(5)](/reference/aerc-jmap.5/)
- [aerc-maildir(5)](/reference/aerc-maildir.5/)
- [aerc-notmuch(5)](/reference/aerc-notmuch.5/)

**source-cred-cmd** = *<command>*

> Specifies an optional command that is run to get the source account's
> password. See each protocol's man page for more details.

**signature-file** = *<path>*

> Specifies the file to read in order to obtain the signature to be added
> to emails sent from this account.

> Please note that by convention the Usenet signature style of two dashes,
> followed by a space ("-- ") should be placed at the top of the signature
> to separate content and signature. Aerc will add that delimiter if it is
> not already present.

**signature-cmd** = *<command>*

> Specifies the command to execute with *sh -c* in order to obtain the
> signature to be added to emails sent from this account. If the command
> fails then **signature-file** is used instead.

**trusted-authres** = *<host1,host2,host3...>*

> Comma-separated list of trustworthy hostnames from which the
> Authentication Results header will be displayed. Entries can be regular
> expressions. If you want to trust any host (e.g. for debugging),
> use the wildcard *\**.

**subject-re-pattern** = *<regexp>*

> When replying to a message, this is the regular expression that will
> be used to match the prefix of the original message's subject that has
> to be removed, to create the subject line of the new message.
> Typically, this will be used to avoid a repetition of the Re:
> prefix in the subject header. The default will match known
> translations for the common Re:.

> Default: *(?i)^((AW|RE|SV|VS|ODP|R): ?)+*

**restrict-delete** = *true*|*false*

> Controls whether immediate email deletions (as opposed to moves to
> Trash) are allowed from any folder. When *true*, deletions are only allowed
> from the Trash or Junk folders.

> Default: *false*

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-config(5)](/reference/aerc-config.5/) [aerc-imap(5)](/reference/aerc-imap.5/) [aerc-jmap(5)](/reference/aerc-jmap.5/) [aerc-maildir(5)](/reference/aerc-maildir.5/)

[aerc-notmuch(5)](/reference/aerc-notmuch.5/) [aerc-sendmail(5)](/reference/aerc-sendmail.5/) [aerc-smtp(5)](/reference/aerc-smtp.5/)
