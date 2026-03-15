---
title: "aerc-sendmail(5)"
description: "Sendmail configuration for aerc"
slug: "reference/aerc-sendmail.5"
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

aerc can defer to sendmail for the delivery of outgoing messages.

## CONFIGURATION

Basic sendmail configuration may be done interactively with the **:new-account**
command.

In *accounts.conf* (see [aerc-accounts(5)](/reference/aerc-accounts.5/)), the following sendmail-specific
options are available:

**outgoing** = *</path/to/sendmail>*

> This should be set to the path to the sendmail binary you wish to use,
> which is generally */usr/sbin/sendmail*. aerc will execute it with a list of
> recipients on the command line and pipe the message to deliver to stdin.

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/)
