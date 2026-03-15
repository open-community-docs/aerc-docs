---
title: "aerc-smtp(5)"
description: "SMTP configuration for aerc"
slug: "reference/aerc-smtp.5"
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

aerc implements the SMTP protocol as specified by RFC 5321.

## CONFIGURATION

Basic SMTP configuration may be done interactively with the **:new-account**
command.

In *accounts.conf* (see [aerc-accounts(5)](/reference/aerc-accounts.5/)), the following SMTP-specific options
are available:

**outgoing** = *<scheme>*[*+<auth>*]://_<username>*[*:<password>*]*@<hostname>*[*:<port>*]?[*<oauth2_params>_]

> Remember that all fields must be URL encoded. The *@* symbol, when URL
> encoded, is *%40*.

> The value of *<scheme>* can be:

> *smtp*
  SMTP with STARTTLS

> *smtp+insecure*
  SMTP without STARTTLS

> *smtps*
  SMTP with TLS/SSL

> Additionally, you can specify an authentication mechanism like so:

> *none*
  No authentication is required to use this SMTP server. You may omit the
  username and password in this case.

> *plain*
  Authenticate with a username and password using AUTH PLAIN. This is the
  default behavior.

> *login*
  Authenticate with a username and password using AUTH LOGIN. This is an obsolete
  protocol, but is required for some common webmail providers.

> *oauthbearer*
  SMTP with TLS/SSL using OAUTHBEARER Authentication. See
  documentation in [aerc-imap(5)](/reference/aerc-imap.5/) for usage.

> *xoauth2*
  SMTP with TLS/SSL using XOAUTH2 Authentication. See
  documentation in [aerc-imap(5)](/reference/aerc-imap.5/) for usage.

**outgoing-cred-cmd** = *<command>*

> Specifies the command to run to get the password for the SMTP
> account. This command will be run using *sh -c [command]*. If a
> password is specified in the **outgoing** option, the password will
> take precedence over this command.

> Example:
  outgoing-cred-cmd = pass hostname/username

**smtp-domain** = *<domain>*

> Local domain name to use in the HELO/EHLO SMTP command. Set this to a fully
> qualified domain name if the server requires it as an antispam measure.

> Default: *localhost*

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/)
