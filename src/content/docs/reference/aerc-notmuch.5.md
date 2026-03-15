---
title: "aerc-notmuch(5)"
description: "Notmuch backend configuration for aerc"
slug: "reference/aerc-notmuch.5"
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

aerc supports using the notmuch email system as a backend, for fast indexing
and searching.

For this to be enabled, aerc needs to be built with notmuch support.
Refer to the installation instructions for details.

## CONFIGURATION

Basic Notmuch configuration may be done interactively with the **:new-account**
command.

In *accounts.conf* (see [aerc-accounts(5)](/reference/aerc-accounts.5/)), the following notmuch-specific
options are available:

**check-mail-cmd** = *<command>*

> Command to run in conjunction with the **check-mail** option. It may be
> convenient to update notmuch's database in this command.

> Examples:
  check-mail-cmd = mbsync -a

  check-mail-cmd = mbsync -a && notmuch new

**check-mail-timeout** = *<duration>*

> Timeout for the **check-mail-cmd**. The command will be stopped if it does
> not complete in this interval and an error will be displayed. Increase from
> the default if repeated errors occur

> Default: *10s*

**source** = notmuch://[*<profile>*]

> The database path and configuration file are discovered automatically
> via environment variables (**NOTMUCH_CONFIG**, **NOTMUCH_DATABASE**,
> **NOTMUCH_PROFILE**) or XDG conventions. In most cases, the following
> configuration will work as expected:

  source = notmuch://

> An optional profile name can be specified:

  source = notmuch://work

**query-map** = *<file>*

> Path to a file containing a mapping from display name to notmuch query
> in the form of **<NAME>**=*<QUERY>*.

> Multiple entries can be specified, one per line. Lines starting with *#*
> are ignored and serve as comments.

> e.g. inbox=tag:inbox and not tag:archived

**exclude-tags** = *<tag1,tag2,tag3...>*

> Comma separated list of tags which will be excluded from query results,
> unless explicitly mentioned in the query.

> This can for example be useful if you use an *archive* or *spam* tag.

**enable-maildir** = *true*|*false*

> Enable maildir integration. When set to *true*, aerc will use the
> notmuch database's mail root to list available folders and enable
> commands such as **:delete** and **:archive**.

> N.B.: aerc will still always show messages and not files (under notmuch,
> a single message can be represented by several files), which makes the
> semantics of certain commands as **move** ambiguous. Use **multi-file-strategy**
> to tell aerc how to resolve these ambiguities.

> Default: *true*

**maildir-account-path** = *<path>*

> Path to the maildir account relative to the mail root. Only used when
> **enable-maildir** is set to *true*.

> This can be used to have a single notmuch database, with a suitable
> prepared maildir store, usable from multiple conceptually different
> aerc accounts.

**multi-file-strategy** = *<strategy>*

> Strategy for file operations (e.g., move, copy, delete) on messages that are
> backed by multiple files. Possible values:

- **refuse** (default): Refuse to act.
- **act-all**: Act on all files.
- **act-one**: Act on one of the files, arbitrarily chosen, and ignore the
> rest.
- **act-one-delete-rest**: Like **act-one**, but delete the remaining files.
- **act-dir**: Act on all files within the current folder and ignore the rest.
> Note that this strategy only works within the maildir directories; in other
> directories, it behaves like **refuse**.
- **act-dir-delete-rest**: Like **act-dir**, but delete the remaining files.

> Note that the strategy has no effect on cross-account operations. Copying a
> message across accounts will always copy a single file, arbitrarily chosen.
> Moving a message across accounts will always copy a single file, arbitrarily
> chosen, and refuse to delete multiple files from the source account.

## USAGE

Notmuch shows slightly different behavior than for example IMAP. Some commands
are slightly different in semantics and mentioned below:

**cf** *<notmuch query>*

> The change folder command allows for arbitrary notmuch queries. Performing a
> **:cf** command will perform a new top-level notmuch query.

**filter** *<notmuch query>*

> The filter command for notmuch backends takes in arbitrary notmuch queries.
> It applies the query on the set of messages shown in the message list. This
> can be used to perform successive filters/queries. It is equivalent to
> performing a set of queries concatenated with "and".

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/) [aerc-smtp(5)](/reference/aerc-smtp.5/) [aerc-maildir(5)](/reference/aerc-maildir.5/)
