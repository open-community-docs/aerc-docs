---
title: "aerc-patch(7)"
description: "Local patch management for aerc"
slug: "reference/aerc-patch.7"
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

**aerc** provides support for managing local patch sets. In an email-based

software development workflow, there are usually many different locally applied
patch series for testing and reviewing. Managing the local repository can thus
be challenging. With the local patch management system, **aerc** facilitates this
bookkeeping process.

When applying a patch set, **aerc** creates a tag for those commits. With this
tag, the patch set can be tracked and later dropped if needed. Patches are
stored in a project data structure which also keeps track of the directory where
the repository is. Multiple code bases can be tracked by defining a separate
project for each.

## COMMANDS

The following **:patch** sub-commands are supported:

**:patch init** [**-f**] [*<project>*]

> Creates a new project *<project>*. If *<project>* is not defined, **aerc**
> will use the last element of the current directory path. It also
> performs a search for a supported repository in the current directory.

> **-f**: Overwrite an existing project.

**:patch list** [**-a**]
**:patch ls** [**-a**]

> Lists the current project with the tracked patch sets.

> **-a**: Lists all projects.

**:patch apply** [**-c** *<cmd>*] [**-w** *<commit-ish>*] *<tag>*

> Applies the selected message(s) to the repository of the current
> project. It uses the **:pipe** command for this and keeps track of the
> applied patch.

> Completions for the *<tag>* are available based on the subject lines of
> the selected or marked messages.

> **-c** *<cmd>*: Apply patches with the provided *<cmd>*. Any occurrence of
> '%r' in the command string will be replaced with the root directory of
> the current project. Note that this approach is not recommended in
> general and should only be used for very specific purposes, i.e. when
> a maintainer is applying a patch set via a separate script to deal with
> git trailers.

> **aerc** will propose completions for the *<tag>* based on the subject
> lines of the selected or marked messages.

> Example:
> ```
> :patch apply -c "git -C %r am -3" fix_v2
> ```

> **-w** *<commit-ish>*: Create a linked worktree for the current project at
> *<commit-ish>* and apply the patches to the linked worktree. A new
> project is created to store the worktree information. When this project
> is deleted, the worktree will be deleted as well.

> Example:
> ```
> :patch apply -w origin/master fix_v2
> ```

**:patch drop** *<tag>*

> Drops the patch *<tag>* from the repository.

**:patch rebase** [*<commit-ish>*]

> Rebases the patch data on commit *<commit-ish>*.

> If the *<commit-ish>* is omitted, **aerc** will use the base commit of
> the current project for the rebase.

**:patch find** [**-f**] *<commit-hash>*

> Searches the messages in the current folder of the current account for
> the message associated with this *commit hash* based on the subject line.

> If a Message-ID is linked to a commit (i.e. when **:patch apply** was
> used) then **find** will first perform a search for the Message-ID.

> **-f**: Filter the message list instead of just showing the search
> results. Only effective when search for Message-ID was not successful.

**:patch cd**

> Changes the working directory to the root directory of the current
> project.

**:patch term** [*<cmd>*]

> Opens a shell (or runs *<cmd>*) in the working directory of the
> current project.

**:patch switch** *<project>*

> Switches the context to *<project>*.

**:patch unlink** [*<project>*]

> Deletes all patch tracking data for *<project>* and unlinks it from
> a repository. If no project is provided, the current project is deleted.

**:patch**

> Root command for patch management. Use it to run the sub-commands.

## GETTING STARTED

Make sure you have an initialized project (see **:patch init**).

Now, there are two ways to get patches under the local patch management system:

- Apply patches with the **:patch apply** command. This will automatically create

  a new tag for the applied commits.

- Use **:patch rebase**. If there are some existing local patches in the commit

  history that should be managed by **aerc**, you can run *:patch rebase
  <commit-ish>* and set the *<commit-ish>* to the commit before the first patch
  that you want to include. For a **git** repository which has an upstream called
  **origin**, you would run **:patch rebase origin/master**.

## EXAMPLE

The following example demonstrates how to manage the local patch sets.

First, a project needs to be initialized. This is done by changing into the
working directory where the project's repository is located. For this example,
let's assume we have a project called *bar* in the directory
*/home/user/foo/bar*.

```
:cd /home/user/foo/bar
```

and then creating a new project with

```
:patch init
```

If no name is provided to **:patch init**, **aerc** will use the last element of the
working directory path (here: *bar*).

Now the patch tracking is ready for action. Go to the message list, mark a patch
series and apply it:

```
:patch apply fix_v2
```

This will apply the selected patch set and assigns the _fix_v2_ tag to those
commits. The tag helps to keep the commits grouped together, and will be helpful
when we want to drop this exact patch set at a later point.

With **:patch list** you can verify that the patch set was correctly applied.

If there is a change in the underlying repository (e.g. by rebasing to
upstream), the hashes of the applied local commits can change. **:patch list** can
detect such a change and will then propose to rebase the internal data. To
do this, run

```
:patch rebase
```

This will open an editor where you can adjust the correct tags again. You could
also change the rebase point by providing an optional argument (e.g. a commit
hash, or even *HEAD~3* or *origin/master*, etc.).

To drop a patch set, use the tag that was assigned during applying:

```
:patch drop fix_v2
```

And to delete the project data in **aerc**:

```
:patch unlink bar
```

## SUPPORTED REVISION CONTROL SYSTEMS

The supported revision control systems are currently: **git**.

## SEE ALSO

[aerc(1)](/reference/aerc.1/)
