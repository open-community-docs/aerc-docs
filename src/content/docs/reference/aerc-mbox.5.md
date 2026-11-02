---
title: "aerc-mbox(5)"
description: "aerc-mbox man page (section 5)"
slug: "reference/aerc-mbox.5"
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

aerc implements the mbox file format, specifically the "mboxo" variant.

In addition to static configuration in *accounts.conf*, an *mbox:* URL can be
given as a command-line argument (see aerc(1)).

Mailboxes created via *mbox:* exist only in memory.  An mbox file is
effectively opened read-only; changes (including creating and deleting
messages) are not written back to the file.

## CONFIGURATION

The following mbox-specific options are available:

**source** = *mbox*:*<path>*

> The **source** indicates the path to a single mbox file or to a directory
> containing any number of mbox files with the *mbox* extension.

> The remainder of the URL following *mbox:* must be either an absolute path
> prefixed by */* or a path relative to your home directory prefixed with
> **~**. For example:

  source = mbox:/home/me/mail/archive.mbox

  source = mbox:~/mail/archive.mbox

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/) [aerc-smtp(5)](/reference/aerc-smtp.5/)
