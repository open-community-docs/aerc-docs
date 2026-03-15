---
title: "aerc-maildir(5)"
description: "Maildir backend configuration for aerc"
slug: "reference/aerc-maildir.5"
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

aerc implements the maildir format.

## CONFIGURATION

Basic Maildir configuration may be done interactively with the **:new-account**
command.

The following maildir-specific options are available:

**check-mail-cmd** = *<command>*

> Command to run in conjunction with **check-mail** option.

> Example:
  check-mail-cmd = mbsync -a

**check-mail-timeout** = *<duration>*

> Timeout for the **check-mail-cmd**. The command will be stopped if it does
> not complete in this interval and an error will be displayed. Increase from
> the default if repeated errors occur

> Default: 10s

**source** = *maildir*|*maildirpp*://_<path>_

> The **source** indicates the path to the directory containing your maildirs
> rather than one maildir specifically.

> The path portion of the URL following *maildir://* must be either an absolute
> path prefixed by */* or a path relative to your home directory prefixed with
> **~**. For example:

  source = maildir:///home/me/mail

  source = maildir://~/mail

> If your maildir is using the Maildir++ directory layout, you can use the
> *maildirpp://* scheme instead:

  source = maildirpp:///home/me/mail

  source = maildirpp://~/mail

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/) [aerc-smtp(5)](/reference/aerc-smtp.5/) [aerc-notmuch(5)](/reference/aerc-notmuch.5/)
