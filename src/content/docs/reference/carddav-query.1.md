---
title: "carddav-query(1)"
description: "CardDAV address book query tool for aerc"
slug: "reference/carddav-query.1"
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

**carddav-query** [**-h**] [**-l** *<limit>*] [**-v**] [**-c** *<file>*]

\[**-s** *<section>*] [**-k** _<key\*source>*] [**-C** _<key\_cred\*cmd>*]
\[**-s** _<server\*url>*] [**-u** *<username>*] [**-p** *<password>*] *<term>* [*<term>* ...]

This tool has been tailored for use as **address-book-cmd** in [aerc-config(5)](/reference/aerc-config.5/).

## OPTIONS

**-h**, **--help**

> show this help message and exit

**-v**, **--verbose**

> Print debug info on stderr.

**-l** *<limit>*, **--limit** *<limit>*

> Maximum number of results returned by the server. If the server does not
> support limiting, this option will be disregarded.

> Default: *10*

**-c** *<file>*, **--config-file** *<file>*

> INI configuration file from which to read the CardDAV URL endpoint.

> Default: *~/.config/aerc/accounts.conf*

**-S** *<section>*, **--config-section** *<section>*

> INI configuration section where to find _<key\*source>* and
> _<key\_cred\*cmd>*. By default the first section where _<key\*source>*
> is found will be used.

**-k** _<key\*source>*, **--config-key-source** _<key\*source>*

> INI configuration key to lookup in *<section>* from *<file>*. The value
> must respect the following format:

  https?://_<username>*[:*<password>*]@*<hostname>*/*<path/to/addressbook>_

> Both *<username>* and *<password>* must be percent encoded. If
> *<password>* is omitted, it can be provided via **--config-key-cred-cmd**
> or **--password**.

> Default: *carddav-source*

**-C** _<key\_cred\*cmd>*, **--config-key-cred-cmd** _<key\_cred\*cmd>*

> INI configuration key to lookup in *<section>* from *<file>*. The value
> is a command that will be executed with **sh -c** to determine
> *<password>* if it is not present in _<key\*source>*.

> Default: *carddav-source-cred-cmd*

**-s** _<server_url>*, **--server-url** *<server_url>_

> CardDAV server URL endpoint. Overrides configuration file.

**-u** *<username>*, **--username** *<username>*

> Username to authenticate on the server. Overrides configuration file.

**-p** *<password>*, **--password** *<password>*

> Password for the specified user. Overrides configuration file.

## POSITIONAL ARGUMENTS

*<term>*
	Search term. Will be used to search contacts from their FN (formatted
	name), EMAIL, NICKNAME, ORG (company) and TITLE fields.

## EXAMPLES

These are excerpts of *~/.config/aerc/accounts.conf*.

### Fastmail

```
[fastmail]
carddav-source = https://janedoe%40fastmail.com@carddav.fastmail.com/dav/addressbooks/user/janedoe@fastmail.com/Default
carddav-source-cred-cmd = pass fastmail.com/janedoe
address-book-cmd = carddav-query -S fastmail %s
```

### Gmail

```
[gmail]
carddav-source = https://johndoe%40gmail.com@www.googleapis.com/carddav/v1/principals/johndoe@gmail.com/lists/default
carddav-source-cred-cmd = pass gmail.com/johndoe
address-book-cmd = carddav-query -S gmail %s
```

## SEE ALSO

[aerc-config(5)](/reference/aerc-config.5/)
