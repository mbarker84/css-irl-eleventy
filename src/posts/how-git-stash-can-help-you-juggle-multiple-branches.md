---
title: 'How Git Stash Can Help You Juggle Multiple Branches'
date: '2019-05-25'
tags: ['post', 'workflow', 'git']
---

When juggling multiple branches in Git, it’s easy to accidentally start working on the wrong branch, before realising you need to switch to another. Or sometimes you might be working on a feature and you’re not ready to commit your changes yet, when someone asks you to fix an urgent bug and you need to jump onto another branch. This is where Git’s `stash` command comes in useful.

## Creating and applying a stash entry

Stashing allows us to save a copy of our uncommitted changes on the current working branch.

<figure>
  <img src="/how-git-stash-01.svg" alt="A stash entry added to the stash list">
</figure>

In its simplest form, the `git stash` command creates a stash entry. To reapply our stashed changes at a later point, we can use `git stash apply`.

Create a stash:

```
git stash
```

Apply a stash entry to your current working branch:

```
git stash apply
```

We can apply the stash entry to a different branch – it doesn’t have to be the branch that we created the stash from.

### Stashing untracked files

By default, `git stash` will only stash the _tracked_ files. If we want to create or apply a stash entry including [_untracked_ files](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository) (e.g. files that have not previously been staged, or files that are in our _.gitignore_), we can add the `-u` (or `--include-untracked`) flag to our command:

Create a stash entry including untracked files:

```
git stash -u
```

To apply a stash entry including untracked files:

```
git apply -u
```

## Multiple stash entries

`git stash apply` will apply the last stash entry you created to your current working branch. But it’s possible to store multiple stashes at the same time, and to apply them individually. To list all the stash entries, use `git stash list`. This will bring up a list that looks something like this:

```
git stash list
stash@{0}: WIP on my-branch: ca96af0 Commit message 3
stash@{1}: WIP on my-branch: 03af20c Commit message 2
stash@{2}: WIP on my-branch: 216b662 Commit message 1

```

By default, stash entries are named WIP (Work in Progress), followed by the branch and commit the stash entry was created from. This might not be very useful if we have multiple stash entries – it’s not very easy to see what changes we’ll be applying! Instead, we could save our stash with a custom message, so it’s easier to see what it relates to:

```
git stash save 'my brand new stash'
```

Now, when we list our stash entries, we’ll see our custom message instead of the generic one:

```
git stash list
stash@{0}: On my-branch: my brand new stash
stash@{1}: WIP on my-branch: ca96af0 Commit message 3
stash@{2}: WIP on my-branch: 03af20c Commit message 2
stash@{3}: WIP on my-branch: 216b662 Commit message 1
```

To apply a particular stash entry from our list, we can reference it with the _apply_ command:

```
git stash apply stash@{2}
```

(Replace the last part with whichever stash reference we wish to use.)

Subsequent stash entries are added to the beginning of the stash list. The most recent stash will have the reference `stash@{0}`.

The stash list can contain stash entries from different branches, which could each be applied to other branches in your project.

<figure>
  <img src="/how-git-stash-02.svg" alt="Stashes created from multiple branches">
</figure>

## Applying vs. popping

Applying a stash entry will keep a copy in the stash list – so we could apply the same stash entry to multiple branches. If we run `git stash list` after applying the stash, we’ll see the stash we applied is still there.

List all our current stashes:

```
git stash list
```

If we want to remove a stash entry from the list when we apply it, we could use `pop` instead of `apply:

```
git stash pop
```

This works similarly to `apply`, where it will pop the last stash entry by default Or we could instead pop an individual stash:

```
git pop stash@{2}
```

Popping is probably a good idea if you know you don’t need to apply your stash entry on any other branches, and you want to keep your stash list nice and clean.

## Creating a new branch with a stash applied

We can use `branch` to a new branch and apply the most recent stash entry:

```
git stash branch
```

This is basically a shortcut for the following:

```
git checkout -b my-new-branch
git stash apply
```

Again, it can take a reference to a specific stash entry if you wish to apply a different entry:

```
git stash branch stash@{2}
```

## Removing and clearing stashes

It’s a good idea to keep a clean store and remove the stash entries we don’t need anymore, especially when moving between branches. Life will be much simpler if we only have a handful of stashes to pick from, rather than hundreds! Plus once our changes are commited, we don’t really need those stashes anyway.

We can remove individual stashes from the stash list by using the `drop` command. As with `pop` and `apply`, this will affect the latest stash entry by default. If you want to target a specific stash then we can pass it the stash reference:

```
git stash drop stash@{2}
```

Alternatively we can clear all our stash entries at once:

```
git stash clear
```
