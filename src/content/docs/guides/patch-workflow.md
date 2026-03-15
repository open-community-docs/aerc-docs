---
title: Patch Workflow
description: Manage email-based patches with aerc's built-in patch system
sidebar:
  order: 9
---

aerc has a built-in patch management system designed for email-driven software development. It tracks locally applied patch sets with tags, making it easy to apply, review, and drop patches.

## Overview

In an email-based development workflow, you receive patch series on a mailing list, apply them to a local repository for testing, and eventually drop or accept them. aerc's `:patch` commands automate the bookkeeping.

Key concepts:
- **Project** — a code repository tracked by aerc
- **Tag** — a label assigned to a group of commits from an applied patch set
- **Channel** — the link between a project and its repository directory

## Getting Started

### Initialize a project

First, change to your repository directory and create a project:

```
:cd /home/you/code/myproject
:patch init
```

If no name is provided, aerc uses the directory name (`myproject`).

### Apply patches

Select or mark the patch messages in your message list, then apply them:

```
:patch apply fix-v2
```

This pipes the selected messages through `git am` (by default) and tags the resulting commits as `fix-v2`.

### List tracked patches

```
:patch list
```

Shows the current project and all tracked patch sets with their tags and commit ranges.

```
:patch list -a
```

Shows all projects.

## Commands Reference

| Command | Description |
|---------|-------------|
| `:patch init [-f] [name]` | Create a new project (optionally overwriting existing) |
| `:patch list [-a]` | List patches in current project (`-a` for all projects) |
| `:patch apply [-c cmd] [-w ref] <tag>` | Apply selected messages as patches |
| `:patch drop <tag>` | Remove a patch set from the repository |
| `:patch rebase [commit-ish]` | Rebase patch tracking data |
| `:patch find [-f] <hash>` | Find the message associated with a commit |
| `:patch cd` | Change directory to the project root |
| `:patch term [cmd]` | Open a shell in the project directory |
| `:patch switch <project>` | Switch to a different project |
| `:patch unlink [project]` | Delete project tracking data |

## Typical Workflow

1. **Receive patches** on a mailing list
2. **Initialize the project**: `:cd /path/to/repo` then `:patch init`
3. **Select patch messages** in the message list (mark multiple with `v`)
4. **Apply**: `:patch apply descriptive-tag`
5. **Test** the changes: `:patch term` to open a shell in the project
6. **Drop** if not accepted: `:patch drop descriptive-tag`

## Advanced Usage

### Custom apply command

Override the default `git am` with a custom command:

```
:patch apply -c "git -C %r am -3" fix-v2
```

`%r` is replaced with the project root directory. This is useful for maintainers who need custom git trailers or apply scripts.

### Apply to a worktree

Create an isolated git worktree for testing:

```
:patch apply -w origin/main fix-v2
```

This creates a new worktree at `origin/main`, applies the patches there, and creates a linked project. Deleting the project also cleans up the worktree.

### Rebase after upstream changes

If the underlying repository is rebased (e.g., after pulling upstream), commit hashes change:

```
:patch rebase
```

Opens an editor where you can reassign tags to the new commit hashes. You can also specify a new base:

```
:patch rebase origin/main
```

### Find the email for a commit

```
:patch find abc1234
```

Searches the current folder for the message that introduced this commit, based on subject line matching or stored Message-IDs.

## Supported VCS

Currently only **git** is supported.

## See Also

- [aerc-patch(7)](/reference/aerc-patch.7/) — full patch management reference
- [aerc(1)](/reference/aerc.1/) — general command reference
