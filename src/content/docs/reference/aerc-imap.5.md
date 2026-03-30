---
title: "aerc-imap(5)"
description: "IMAP backend configuration for aerc"
slug: "reference/aerc-imap.5"
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

aerc implements the IMAP protocol as specified by RFC 3501, with the following
IMAP extensions:

- IDLE (RFC 2177)
- SORT (RFC 5256)
- THREAD (RFC 5256)
- LIST-STATUS (RFC 5819)
- X-GM-EXT-1 (Gmail)

## CONFIGURATION

Basic IMAP configuration may be done interactively with the **:new-account**
command.

In *accounts.conf* (see [aerc-accounts(5)](/reference/aerc-accounts.5/)), the following IMAP-specific options
are available:

**source** = *<scheme>*://_<username>*[*:<password>*]*@<hostname>*[*:<port>*]*?*[*<oauth2_params>_]

> Remember that all fields must be URL encoded. The *@* symbol, when URL
> encoded, is *%40*.

> Possible values of *<scheme>* are:

> *imap*
  IMAP with STARTTLS

> *imap+insecure*
  IMAP without STARTTLS

> *imaps*
  IMAP with TLS/SSL

> *imaps+insecure*
  IMAP with TLS/SSL, skipping certificate verification

> *imaps+login*
  IMAP with TLS/SSL using the LOGIN authentication mechanism.
  This is used as a fallback when PLAIN authentication is not
  available. Most users should not need to specify this explicitly.

> *imaps+oauthbearer*
  IMAP with TLS/SSL using OAUTHBEARER Authentication

  _<oauth2_params>_:

  If specified and a _token_endpoint_ is provided, the configured password
  is used as a refresh token to obtain an access token. If _token_endpoint_
  is omitted, refresh token exchange is skipped, and the password acts
  like an access token instead.

  - _token_endpoint_ (optional)
  - _client_id_ (optional)
  - _client_secret_ (optional)
  - *scope* (optional)

  Example:
  	imaps+oauthbearer://...?token_endpoint=https://...&client_id=

> *imaps+xoauth2*
  IMAP with TLS/SSL using XOAUTH2 Authentication. Parameters are
  the same as OAUTHBEARER.

**source-cred-cmd** = *<command>*

> Specifies the command to run to get the password for the IMAP
> account. This command will be run using *sh -c command*. If a
> password is specified in the **source** option, the password will
> take precedence over this command.

> Example:
  source-cred-cmd = pass hostname/username

**connection-timeout** = *<duration*>

> Maximum delay to establish a connection to the IMAP server. See
> https://pkg.go.dev/time#ParseDuration.

> Default: *90s*

**keepalive-period** = *<duration>*

> The interval between the last data packet sent (simple ACKs are not
> considered data) and the first keepalive probe. After the connection is
> marked to need keepalive, this counter is not used any further. See
> https://pkg.go.dev/time#ParseDuration.

> By default, the system tcp socket settings are used.

**keepalive-probes** = *<int>*

> The number of unacknowledged probes to send before considering the
> connection dead and notifying the application layer.

> By default, the system tcp socket settings are used.
> If keepalive-period is specified, this option defaults to 3 probes.

> This option is only supported on linux. On other platforms, it will be
> ignored.

**keepalive-interval** = *<duration>*

> The interval between subsequential keepalive probes, regardless of what
> the connection has exchanged in the meantime. Fractional seconds are
> truncated.

> By default, the system tcp socket settings are used.
> If **keepalive-period** is specified, this option defaults to *3s*.

> This option is only supported on linux. On other platforms, it will be
> ignored.

**check-mail-include** = *<folder1,folder2,folder3...>*

> Specifies the comma separated list of folders to include when checking for
> new mail with **:check-mail**. Names prefixed with *~* are interpreted as regular
> expressions. This setting is ignored if your IMAP server supports the
> LIST-STATUS command, in which case all folders will be checked.

> By default, all folders are included.

**check-mail-exclude** = *<folder1,folder2,folder3...>*

> Specifies the comma separated list of folders to exclude when checking for
> new mail with **:check-mail**. Names prefixed with *~* are interpreted as regular
> expressions. This setting is ignored if your IMAP server supports the
> LIST-STATUS command, in which case all folders will be checked.
> Note that this overrides anything from **check-mail-include**.

> By default, no folders are excluded.

**cache-headers** = *true*|*false*

> If set to *true*, headers will be cached. The cached headers will be stored
> in _$XDG_CACHE_HOME/aerc_, which defaults to *~/.cache/aerc*.

> Default: *false*

**cache-max-age** = *<duration>*

> Defines the maximum age of cached files. Note: the longest unit of time
> **cache-max-age** can be specified in is hours. Set to *0* to disable cleaning
> the cache

> Default: *720h* (30 days)

**idle-timeout** = *<duration>*

> The length of time the client will wait for the server to send any final
> update before the IDLE is closed.

> Default: *10s*

**idle-debounce** = *<duration>*

> Specifies the length of time from the last client command until the
> idler starts.

> Default: *10ms*

**expunge-policy** = *auto*|*low-to-high*|*stable*

> Specifies the deletion policy used when deleting multiple messages in
> one shot. *auto* attempts to automatically detect it, and will be
> correct most of the times. *low-to-high* specifies that the server
> deletes messages in increasing sequence number order (this is what GMail
> and FastMail do, and is correctly handled by the automatic detection).
> *stable* specifies that the server does not mutate the sequence numbers
> it received (this is what Dovecot and WorkMail do, and is **not** reliably
> automatically detected).

> Default: *auto*

**debug-log-path** = *<path>*

> Specifies the path where to store low-level IMAP debug logs (this can
> be useful to debug interactions between aerc and IMAP servers). If this
> path is writable, aerc will create and log to one file per account,
> called `imap_debug_ACCOUNTNAME.log`.

> By default, low-level IMAP debug logs are not generated.

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/)
