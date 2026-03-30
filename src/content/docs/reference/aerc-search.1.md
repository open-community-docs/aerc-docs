---
title: "aerc-search(1)"
description: "Search and filter patterns for aerc"
slug: "reference/aerc-search.1"
editUrl: false
sidebar:
  badge:
    text: man
    variant: note
---

:::note[Auto-generated reference]
This page is auto-generated from the upstream aerc man pages. To suggest changes, submit patches to the [aerc mailing list](https://lists.sr.ht/~rjarry/aerc-devel).
:::

## SYNTAX

This syntax is common to all backends.

**:filter** [**-rubae**] [**-x** *<flag>*] [**-X** *<flag>*] [**-H** *<header>:[<value>]*] [**-f** *<from>*] [**-t** *<to>*] [**-c** *<cc>*] [**-d** *<start[..end]>*] [*<terms>*...]
**:search** [**-rubae**] [**-x** *<flag>*] [**-X** *<flag>*] [**-H** *<header>:[<value>]*] [**-f** *<from>*] [**-t** *<to>*] [**-c** *<cc>*] [**-d** *<start[..end]>*] [*<terms>*...]

> Searches the current folder for messages matching the given set of
> conditions.

> **:filter** restricts the displayed messages to only the search results.

> Each space separated term of *<terms>*, if provided, is searched
> case-insensitively among subject lines unless **-b** or **-a** are
> provided.

> **-r**: Search for read messages

> **-u**: Search for unread messages

> **-x** *<flag>*, **-X** *<flag>*: Restrict search to messages with or without *<flag>*
  Use **-x** to search for messages with the flag set.
  Use **-X** to search for messages without the flag set.

  Possible values are:
  	*seen*
  		Read messages
  	*answered*
  		Replied messages
  	*forwarded*
  		Forwarded messages
  	*flagged*
  		Flagged messages
  	*draft*
  		Draft messages

> **-H** *<header>:[<value>]*:
  Search in the headers of the messages for a specific *<header>* that matches *<value>*,
  *<value>* can be omitted to only search for a *<header>*.
  If either the *<header>* or the *<value>* contain a space then the whole argument needs
  to be escaped with quotes, note: spaces around *<value>* are trimmed.

> **-b**: Search in the body of the messages

> **-a**: Search in the entire text of the messages

> **-e**: Instruct the backend to use a custom search extension
  (such as X-GM-EXT-1 if available). Search terms are expected
  in *<terms>*; other flags will be ignored.

> **-f** *<from>*: Search for messages from *<from>*

> **-t** *<to>*: Search for messages to *<to>*

> **-c** *<cc>*: Search for messages cc'ed to *<cc>*

> **-d** *<since[..until]>*:
  Search for messages within a particular date range between
  *since* and *until*, excluding the latter (in mathematical
  notation: search for messages in the [*since*, *until*)
  interval). *until* can be omitted to only search for *<since>*
  to present.

  Spaces and underscores are allowed in relative dates to improve
  readability.

  *YYYY-MM-DD*

  **today**, **yesterday**

  **(this|last) (year|month|week)**

  **Weekdays**, **Monthnames**
  	Can also be abbreviated, so Monday..Tuesday can be written
  	as Mon..Tue and February..March as Feb..Mar.

  *<N>* **(y[ear]|m[onth]|w[eek]|d[ay])**
  	*<N>* is a positive integer that represents the number
  	of time units in the past. Multiple relative terms
  	can be accumulated. The units can also be abbreviated
  	by a single letter such that yesterday would
  	correspond to *1d* (equivalent to *1 day* or _1_day_)
  	and *8 days ago* would be either *1w1d* or *8d*.

## CUSTOM IMAP EXTENSIONS

The Gmail IMAP extension (X-GM-EXT-1) can be used for searching and filtering.
To use this custom extension, make sure it is activated (see [aerc-imap(5)](/reference/aerc-imap.5/))
and use the extension **-e** flag in your **:filter** or **:search** commands.

	Example:

		:filter -e filename:pdf from:bob
		:filter -e has:attachment newer_than:2d

		:search -e is:read is:starred
		:search -e list:~rjarry/aerc-devel@lists.sr.ht

## NOTMUCH

For notmuch, it is possible to avoid using the above flags and only rely on
notmuch search syntax.

**:filter** *query*...
**:search** *query*...

> You can use the full notmuch query language as described in
> [notmuch-search-terms(7)](https://notmuchmail.org/manpages/notmuch-search-terms-7/).

> The query will only apply on top of the active folder query.

> Example, jump to next unread:

  :search tag:unread

## SEE ALSO

[aerc(1)](/reference/aerc.1/) [aerc-config(5)](/reference/aerc-config.5/)
