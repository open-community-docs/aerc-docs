---
title: PGP/GPG Encryption
description: Sign, encrypt, and verify email with GPG in aerc
sidebar:
  order: 6
---

aerc supports PGP signing and encryption through either the system GnuPG installation or an internal OpenPGP implementation.

## PGP Provider

Configure the provider in `[general]` of `~/.config/aerc/aerc.conf`:

```ini
[general]
pgp-provider = auto
```

| Value | Behavior |
|-------|----------|
| `auto` | Uses system gpg unless the internal keyring already exists (default) |
| `gpg` | Always uses the system `gpg` binary and keyring |
| `internal` | Uses aerc's built-in OpenPGP implementation |

**Recommendation:** Use `gpg` if you already have a GPG key set up. The internal provider is useful if you want aerc to manage keys independently.

## Signing Outgoing Mail

### Per-account default signing

In `~/.config/aerc/accounts.conf`:

```ini
[Personal]
source        = maildir://~/mail/personal
from          = Your Name <you@example.com>
pgp-auto-sign = true
pgp-key-id    = ABCDEF1234567890
```

- **`pgp-auto-sign`** — automatically sign all outgoing messages from this account
- **`pgp-key-id`** — the GPG key ID to use for signing (run `gpg --list-keys --keyid-format long` to find yours)

### Toggle signing in the composer

When reviewing a message before sending, press `s` to toggle signing on or off (with default keybindings).

## Encrypting Messages

### Encrypt when composing

In the compose review screen, press `x` to toggle encryption. aerc will encrypt to all recipients whose public keys are in your keyring.

### Auto-encrypt

There is no auto-encrypt option — encryption is always opt-in per message, since it requires recipients' public keys.

## Verifying Signatures

When you open a signed message, aerc automatically verifies the signature if the sender's public key is in your keyring. The verification result appears in the message header area.

## Pinentry Setup

If you use a terminal-based pinentry (not a GUI dialog), you need to tell aerc:

```ini
[general]
use-terminal-pinentry = true
```

Without this, the pinentry prompt may not appear correctly because aerc manages its own terminal.

### GPG_TTY

Some setups require setting `GPG_TTY` before launching aerc. Add to your shell's startup file (`.bashrc`, `.zshrc`, etc.):

```bash
export GPG_TTY=$(tty)
```

This ensures the GPG agent knows which terminal to use for pinentry.

## Key Management

### Import a recipient's public key

```bash
# From a keyserver
gpg --recv-keys RECIPIENT_KEY_ID

# From a file
gpg --import recipient-key.asc
```

### List your keys

```bash
gpg --list-keys --keyid-format long
```

### Generate a new key

```bash
gpg --full-gen-key
```

## Troubleshooting

### "No pinentry" or blank screen when signing

Set `use-terminal-pinentry = true` in `aerc.conf` and export `GPG_TTY` in your shell profile.

### "No secret key" when signing

Ensure `pgp-key-id` in `accounts.conf` matches a secret key in your keyring:

```bash
gpg --list-secret-keys --keyid-format long
```

### Encryption fails for a recipient

You need their public key in your keyring. Import it with `gpg --import` or `gpg --recv-keys`.

## See Also

- [aerc-config(5)](/reference/aerc-config.5/) — `pgp-provider` and `use-terminal-pinentry` options
- [aerc-accounts(5)](/reference/aerc-accounts.5/) — `pgp-auto-sign`, `pgp-key-id` options
- [aerc-binds(5)](/reference/aerc-binds.5/) — compose review keybindings for sign/encrypt
