---
title: Installation
description: How to install aerc on your system
sidebar:
  order: 1
---

aerc is available in most Linux distribution repositories, Homebrew on macOS, and can be built from source.

## Arch Linux

```bash
pacman -S aerc
```

## Debian / Ubuntu

```bash
apt install aerc
```

## Fedora

```bash
dnf install aerc
```

## macOS (Homebrew)

```bash
brew install aerc
```

## From Source

```bash
git clone https://git.sr.ht/~rjarry/aerc
cd aerc
make
sudo make install
```

See the [upstream README](https://git.sr.ht/~rjarry/aerc) for build dependencies.

## Companion Tools

Most aerc users also install some of these:

- **isync** (mbsync) — IMAP-to-maildir sync for offline access
- **notmuch** — fast full-text search
- **w3m** — HTML email rendering
- **pass** — secure credential storage

See the [Ecosystem Overview](/ecosystem/) for the full list and how each tool fits with aerc.
