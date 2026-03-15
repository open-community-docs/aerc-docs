---
title: pass (password-store)
description: Secure credential management for aerc with pass
sidebar:
  order: 3
---

[pass](https://www.passwordstore.org/) is the standard Unix password manager. It stores each password as a GPG-encrypted file inside `~/.password-store/`, with optional git tracking. pass is the most common way to supply credentials to aerc, mbsync, and msmtp without storing passwords in plain text.

## How It Integrates with aerc

aerc's `source-cred-cmd` and `outgoing-cred-cmd` options accept any command that prints a password to stdout. When aerc needs to authenticate, it runs the command and reads the first line of output. The same mechanism works for mbsync's `PassCmd` and msmtp's `passwordeval`.

## Installation

```bash
# Arch Linux          # Debian / Ubuntu      # macOS
pacman -S pass         apt install pass        brew install pass
```

pass requires GnuPG. Most distributions pull it in as a dependency.

## Initial Setup

```bash
# Generate a GPG key (if you do not have one)
gpg --gen-key

# Initialize the password store with your GPG key
pass init "you@example.com"

# Optional: enable git tracking for change history
pass git init
```

## Storing Email Passwords

Use an `email/` prefix to keep credentials organized:

```bash
pass insert email/you@example.com
pass insert email/you@work-example.com
```

Verify retrieval works:

```bash
pass show email/you@example.com
```

## Usage Across Tools

The same `pass` command works in aerc, mbsync, and msmtp:

```ini
# ~/.config/aerc/accounts.conf
[Personal]
source-cred-cmd   = pass email/you@example.com
outgoing-cred-cmd = pass email/you@example.com

# ~/.mbsyncrc
IMAPAccount personal
PassCmd "pass email/you@example.com"

# ~/.msmtprc
account personal
passwordeval "pass email/you@example.com"
```

## GPG Agent Tips

The GPG agent caches your passphrase so you are not prompted repeatedly. To extend the cache timeout, add to `~/.gnupg/gpg-agent.conf`:

```ini
default-cache-ttl 28800
max-cache-ttl 86400
```

Reload the agent after changes: `gpgconf --kill gpg-agent`

## Alternatives

Any command that prints a password to stdout works with aerc's `*-cred-cmd` options:

| Tool | Example command |
|------|----------------|
| **secret-tool** (GNOME Keyring) | `secret-tool lookup email you@example.com` |
| **1Password CLI** | `op read "op://Personal/Email/password"` |
| **Bitwarden CLI** | `bw get password email-login` |
| **KeePassXC CLI** | `keepassxc-cli show ~/passwords.kdbx Email -a password` |
| **gopass** | `gopass show -o email/you@example.com` |

## Related Pages

- [First Account](/getting-started/first-account/) — setting up credentials during initial configuration
- [Multi-Account Management](/guides/multi-account/) — credential commands for multiple accounts
- [mbsync (isync)](/ecosystem/mbsync/) — using pass with mbsync
- [msmtp](/ecosystem/msmtp/) — using pass with msmtp
- [pass upstream documentation](https://www.passwordstore.org/) — official project site
