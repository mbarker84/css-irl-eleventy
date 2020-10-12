---
title: 'Quick Command Line Tip: Create Mutliple Files With the Same Extension'
date: '2020-09-25'
tags: ['post', 'command line', 'workflow']
---

If you’re familiar with the command line, you’ll probably already know you can create a new file using the `touch` command. For example, this command will create a new _index.html_ file in your current directory:

```bash
touch index.html
```

How about creating multiple files? Sure, we can do that all in one command:

```bash
touch index.html styles.css index.js
```

When it comes to multiple files with the same extension then sure, we could use the above method. But what about if you want to create 10, 20, 100 or more files? That could get a little tedious.

In my current workflow, I use [Nunjucks](https://mozilla.github.io/nunjucks/) as a templating language, and I typically work with tens or even hundreds of components in template partials. As part of our development planning process at [Atomic Smash](https://www.atomicsmash.co.uk/), we like to create these files upfront, before development begins in earnest. This is so that several developers can work on the project simultaneously using the same file naming conventions, and adding comments into the component files to plan the data that needs to feed into them.

If you need to create multiple files with the same extension, then the following line of code definitely speeds up that process. Just replace the content inside the curly brackets with your comma-separated list of file names, and the `.njk` extension with your desired file extension:

```bash
touch {hero,lightbox,form,another-component}.njk
```

This command creates the following Nunjucks files:

```
hero.njk
lightbox.njk
form.njk
another-component.njk
```

I hope this saves you a bit of time like it does for me!
