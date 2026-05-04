---
title: "aerc-jmap(5)"
description: "JMAP backend configuration for aerc"
slug: "reference/aerc-jmap.5"
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

aerc implements the JMAP protocol as specified by RFCs 8620 and 8621.

## CONFIGURATION

Basic JMAP configuration may be done interactively with the **:new-account**
command.

In *accounts.conf* (see [aerc-accounts(5)](/reference/aerc-accounts.5/)), the following JMAP-specific options
are available:

**source** = *<scheme>*://[*<username>*][*:<password>@*]*<hostname>*[*:<port>*]/_<path>_

> Remember that all fields must be URL encoded. The *@* symbol, when URL
> encoded, is *%40*.

> *<hostname>*[*:<port>*]/_<path>_ is the HTTPS JMAP session resource as
> specified in RFC 8620 section 2 without the leading *https://* scheme.

> Possible values of *<scheme>* are:

> *jmap*
  JMAP over HTTPS using Basic authentication.

> *jmap+oauthbearer*
  JMAP over HTTPS using OAUTHBEARER authentication

  The username is ignored and may be left empty. If specifying the
  password, make sure to prefix it with *:* to make it explicit
  that the username is empty. Or set the username to any random
  value. E.g.:

  ```
  source = jmap+oauthbearer://:s3cr3t@example.com/jmap/session
  source = jmap+oauthbearer://me:s3cr3t@example.com/jmap/session
  ```

> Your source credentials must have the *urn:ietf:params:jmap:mail*
> capability.

**source-cred-cmd** = *<command>*

> Specifies the command to run to get the password for the JMAP account.
> This command will be run using *sh -c command*. If a password is
> specified in the **source** option, the password will take precedence over
> this command.

> Example:
  source-cred-cmd = pass hostname/username

**outgoing** = *jmap://*

> The JMAP connection can also be used to send emails. No need to repeat
> the URL nor any credentials. Just the URL scheme will be enough.

> Your source credentials must have the *urn:ietf:params:jmap:submission*
> capability.

**cache-state** = *true*|*false*

> Cache all email state (mailboxes, email headers, mailbox contents, email
> flags, etc.) on disk in a levelDB database located in folder
> *~/.cache/aerc/<account>/state*.

> The cached data should remain small, in the order of a few megabytes,
> even for very large email stores. Aerc will make its best to purge
> deleted/outdated information. It is safe to delete that folder when aerc
> is not running and it will be recreated from scratch on next startup.

> Default: *false*

**cache-blobs** = *true*|*false*

> Cache all downloaded email bodies and attachments on disk as individual
> files in _~/.cache/aerc/<account>/blobs/<xx>/<blob_id>* (where *<xx>_ is
> a subfolder named after the last two characters of _<blob_id>_).

> Aerc will not purge the cached blobs automatically. Even when their
> related emails are destroyed permanently from the server. If required,
> you may want to run some periodic cleanup based on file creation date in
> a crontab, e.g.:

  @daily find ~/.cache/aerc/foo/blobs -type f -mtime +30 -delete

> Default: *false*

**use-labels** = *true*|*false*

> If set to *true*, mailboxes with the *archive* role (usually *Archive*)
> will be hidden from the directory list and replaced by an **all-mail**
> virtual folder. The name of that folder can be configured via the
> **all-mail** setting.

> **:archive** *flat* may still be used to effectively "tag" messages with the
> hidden *Archive* mailbox so that they appear in the **all-mail** virtual
> folder. When the **all-mail** virtual folder is selected, **:archive** *flat*
> should not be used and will have no effect. The messages will be grayed
> out but will never be refreshed until aerc is restarted.

> Also, this enables support for the **:modify-labels** (alias **:tag**)
> command.

> Default: *false*

**all-mail** = *<name>*

> Name of the virtual folder that replaces the role=*archive* mailbox when
> **use-labels** = *true*.

> Default: *All mail*

**server-ping** = *<duration>*

> Interval the server should ping the client at when monitoring for email
> changes. The server may choose to ignore this value. By default, no ping
> will be requested from the server.

> See https://pkg.go.dev/time#ParseDuration.

## NOTES

JMAP messages can be seen as "labels" or "tags". Every message must belong to
one or more mailboxes (folders in aerc). Each mailbox has a "role" as described
in https://www.iana.org/assignments/imap-mailbox-name-attributes/.

When deleting messages that belong only to the selected mailbox, aerc will
attempt to "move" these messages to a mailbox with the *trash* role. If it
cannot find such mailbox or if the selected mailbox is the *trash* mailbox, it
will effectively destroy the messages from the server.

**:delete** removes messages from the selected mailbox and effectively does the

same thing as **:tag -<selected_folder>**.

**:cp <foo>** is an alias for **:tag <foo>** or **:tag +<foo>**.

**:mv <foo>** is a compound of **:delete** and **:cp** and can be seen as an alias of

**:tag -<selected_folder> +<foo>**.

**:archive** *flat* is an alias for **:tag -<selected_folder> +<archive>**.

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-accounts(5)](/reference/aerc-accounts.5/)
