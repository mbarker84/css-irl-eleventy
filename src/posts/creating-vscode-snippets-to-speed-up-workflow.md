---
title: 'Creating VS Code Snippets to Speed Up Workflow'
date: '2023-03-07'
tags: ['post', 'workflow', 'tooling']
---

Writing code can be repetitive, and many developers (myself included) opt to make our lives easier by configuring our code editor of choice to auto-complete common statements in the given coding language.

My own preferred editor, [VS Code](https://code.visualstudio.com), includes [Intellisense](https://code.visualstudio.com/docs/editor/intellisense) out of the box, which provides common code snippets for auto-completion as you type. Pressing <kbd>Enter</kbd> or <kbd>Tab</kbd> inserts them into your code.

Perhaps you need something more custom? There are many extensions in the VS Code Marketplace that provide snippets in a variety of languages. Personally, I use Sarah Drasner’s [Vue VS Code Snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) extension, which includes a whole bunch of snippets for Vue.

## Writing our own snippets

But we can also create our own snippets! To try this out, let’s create a snippet for a min-width media query — something I have to type out fairly frequently.

### Create a new snippets file

To access the application snippets files we can press <kbd>Shift</kbd> + <kbd>Command</kbd> + <kbd>P</kbd> to bring up the command palette on a Mac (on Windows it might be a slightly different combination), then select the option **Configure User Snippets**. Alternatively, we can go to **Code > Settings > Configure User Snippets**. This brings up any existing snippets files, and a menu of available languages for creating new snippets. We can select one of these, or select **New Global Snippets file** if our snippet should be available in all languages. We’ll select “CSS”. This brings up a new JSON file, where we can start writing our snippet.

There’s also an option to create project-specific snippets. I generally find creating global ones most useful, but there could be occasions where project-specific snippets might be preferred. You could commit this to the repository to share it between all developers.

### Define the snippet

Let’s add some JSON for our new snippet, which we’re going to call “Breakpoint”. Our code needs to include three things:

1. A prefix — what we’ll type in order to trigger the snippet to be inserted
2. The body — the actual code to be inserted
3. A description — this appears in the menu, and will help us find our snippet easily.

We’ll create a simple, single-line snippet first:

```json
{
  "Breakpoint": {
    "prefix": "bp",
    "body": ["@media screen and (min-width: )"],
    "description": "Create a new min-width media query"
  }
}
```

Now, if we open a CSS file in VS Code and type `bp` then <kbd>Enter</kbd>, the body of our snippet should be inserted into our file!

### Multi-line snippets

If we want to include multiple lines of code, we need to write each line as a string in the body array. We’ll make our snippet span three lines, adding the curly parentheses:

```json
{
  "Breakpoint": {
    "prefix": "bp",
    "body": ["@media screen and (min-width: ) {", "", "}"],
    "description": "Create a new min-width media query"
  }
}
```

### Cursor position and tab stops

We can control the position of the cursor when the snippet is expanded. Adding `$0` into a string denotes the final tab stop, while `$1`, `$2`, etc. are cursor positions that can be tabbed through in order.

As the first thing we’ll probably want to do is determine the min-width for the media query, let’s set our first tab stop there. We’ll set our final cursor position inside the media query parentheses, with a tab character before it (`\t`)

```json
{
  "Breakpoint": {
    "prefix": "bp",
    "body": ["@media screen and (min-width: $1) {", "\t$0", "}"],
    "description": "Create a new min-width media query"
  }
}
```

### Placeholder choice

If we have a few breakpoint values we use fairly frequently, we could configure our snippet to allow us to select from those predefined values. Let’s add three possible values to choose from for our media query:

```json
{
  "Breakpoint": {
    "prefix": "bp",
    "body": [
      "@media screen and (min-width: ${1|600px,900px,1200px|}) {",
      "\t$0",
      "}"
    ],
    "description": "Create a new min-width media query"
  }
}
```

## Using our snippet

Now when we type `bp` in a CSS file, it should expand our media query and give us a choice of values, which we can select by pressing <kbd>Enter</kbd>. We can also opt to insert a snippet by bringing up the command palette (<kbd>Shift</kbd> + <kbd>Command</kbd> + <kbd>P</kbd>) and selecting **Snippets: Insert Snippet**, which brings up relevant snippets for our file.

## Further reading

VS Code snippets are great for speeding up your workflow. There’s even more you can do with them, including using variables and assigning key bindings. Check out the [documentation](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_create-your-own-snippets). Happy coding!
