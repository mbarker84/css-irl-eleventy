---
title: 'Setting Up a New(ish) MacBook'
date: '2023-02-28'
tags: ['post', 'workflow', 'tooling']
---

<figure>
  <img src="/setting-up-a-new-macbook.svg" alt="Digital illustration of a MacBook in bright colours, with the words “let’s go!” on the screen" width="1600" height="900">
</figure>

I recently dusted off a relatively old (~5 years) MacBook and replaced the battery with the plan that I could use it as a secondary machine, for my “non-work” stuff. The last couple of times I’ve got a new Mac I’ve gone for the option of cloning my old setup, so I don’t need to install everything again. This time, however, the whole point was to keep things simple, minimal and (hopefully) fast, so I decided to completely wipe it and start from scratch.

If you’re a developer, naturally there’s a bunch of stuff you need to install to get your environment perfectly right for coding. The following is the process I went through to install the things I need for my setup, written purely to remind me what I did, when I inevitably have to do it again sometime.

## 1. Install VSCode

When you’re coding (or indeed, installing anything you need to write code), what’s the first thing you need? A terminal! Sure, I could use built-in one on my MacBook, or download [iTerm](https://iterm2.com/). But I generally use VS Code’s terminal, and since I’ll **definitely** need VS Code for, well, writing code, let’s [go ahead and install it right away](https://code.visualstudio.com/).

### `code` command

In VS Code we can open a project from the command line by navigating to the project and typing `code .`. On a Mac, we first need to enable this by running `Install 'code' command in PATH`. (See the VS Code [command line docs](https://code.visualstudio.com/docs/editor/command-line) for more details)

## 2. Use zsh as the default

As of macOS 10.15, the default shell is zsh. However, VS Code automatically opens a bash terminal. [How to fix this](https://dev.to/nyanev/how-to-use-zsh-in-vs-code-for-mac-39dp)? We need to go into our settings in VS Code, find the property `terminal.integrated.shell.osx` and change this to `zsh`.

We’ll also need to create a _.zshrc_ file by running `touch ~/.zshrc`. This is a hidden file, so it won’t show up in Finder by default. To [view hidden files](https://www.techradar.com/how-to/how-to-show-hidden-files-in-macos) we can run:

```bash
defaults write com.apple.Finder AppleShowAllFiles true
```

Then close and reopen Finder, and our hidden files should be visible. Now we can open this file in VS Code.

## 3. Xcode Command Line Tools (and Git)

For the next steps we’re going to need [Xcode Command Line Tools](https://www.freecodecamp.org/news/install-xcode-command-line-tools/). We can download Xcode from the App Store, or use this command.

```bash
xcode-select --install
```

That gives us a prompt to confirm we want to install the command line developer tools. Yes, we do. As a special bonus, this process also installs [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), which we’re definitely going to need, so that’s handy.

## 4. Install Oh My ZSH plugin

[Oh My Zsh](https://github.com/ohmyzsh/ohmyzsh) is an open source framework for managing your zsh configuration. It enables us to easily install plugins, change our shell theme, and more. Let’s follow the instructions in the Github repository and install it via the command line:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

## 5. NVM

I can pretty much guarantee I’m going to need Node installed for **anything** I’m working on. I like to use [NVM](https://github.com/nvm-sh/nvm) (Node Version Manager), which makes it super easy to install and switch between Node versions. The best way I’ve found to install this is using the [zsh-nvm](https://github.com/lukechilds/zsh-nvm) plugin for Oh My Zsh.

First we clone the repository to our zsh plugins directory:

```bash
git clone https://github.com/lukechilds/zsh-nvm ~/.oh-my-zsh/custom/plugins/zsh-nvm
```

Then add it to our plugins section of the _.zshrc_ file. We can list plugins like this:

```
plugins=(
  git
  zsh-nvm
)
```

Now we should have NVM installed. We can run `nvm -v` to check.

## 6. Z plugin

Another plugin I find really useful is [Zsh-z](https://github.com/agkozak/zsh-z), which enables us to jump to commonly-used directories simply by typing `z` followed by the directory name. We don’t actually need to install it, as it’s now included as part of Oh My Zsh, so we can just add it to our plugins in the _.zshrc_ file:

```
plugins=(
  git
  zsh-nvm
)
```

## 7. Setting up aliases

Finally, I like to set up a few aliases for the terminal commands I use the most. We can add these to our `.zshrc` file.

```
alias gpum='git pull origin main'
alias gpm='git push origin main'
alias ga="git add ."
alias gm='git commit -m'
```

Of course, you can add any other aliases and plugins you like, as well as change your terminal theme, if that’s your bag. Happy coding!
