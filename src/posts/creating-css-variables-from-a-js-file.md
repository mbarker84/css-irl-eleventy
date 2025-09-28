---
title: Creating CSS Theme Variables from a JS file
date: '2025-04-22'
tags: ['post', 'css', 'js']
---

For many projects I work on it’s useful to define all of our brand colours in a JavaScript file, particularly as I work on a lot of data visualisations that use them. Here’s an abridged example of how I define brand colours, as well as those used for data visualisations, and their variants:

```js
// theme.js
const theme = {
  color: {
    brand: {
      primary: {
        DEFAULT: '#7B1FA2',
        light: '#BA68C8',
        dark: '#4A148C',
      },
      secondary: {
        DEFAULT: '#E91E63',
        light: '#F48FB1',
        dark: '#C2185B',
      },
    },
    data: {
      blue: '#40C4FF',
      turquoise: '#84FFFF',
      mint: '#64FFDA',
    },
  },
}
```

I also need those variables in my CSS, where they’re defined as custom properties. But I don’t want to have to maintain my colour theme in two places! That’s why I created a script to create a CSS file that defines custom properties from a JS source file. If you’re interested, here’s how it’s done.

## Setup

For this walkthrough you’ll need Node and NPM installed. If you’re already familiar with setting up a project using NPM, you can skip over this part. Otherwise, assuming you’ve already installed NPM globally, you’ll need to run `npm init` in your project root and follow the prompts. This creates a _package.json_ file in the root of your project directory.

## Create a script file

We’ll need to create a JS file for our script so we can run it from the command line. For simplicity, let’s create a file called _index.js_ in the project root, and add a single line:

```js
// index.js
console.log('Hello world')
```

Now we should be able to run `node index.js` from the terminal and see our “Hello world” message, so we know our very basic script has run successfully.

## Import the theme

Now let’s import the theme defined in the JS file from which we want to create our CSS custom properties. We’ll call this _theme.js_. You’ll need to make sure your file [exports the theme](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) so it can be imported elsewhere.

```js
// theme.js

const theme = {
  // Theme colours as defined above...
}

export default theme
```

```js
// index.js
import theme from './theme.js'

console.log(theme)
```

Running the script again with `node index.js`, we should see the theme object logged in the terminal. Now we need to actually do something with it!

## Input and output

The aim here is to create CSS custom properties that correspond to the theme object keys. For example:

```js
// theme.js
const theme = {
  color: {
    primary: 'red',
    secondary: 'blue',
  },
}
```

Would become:

```css
/* styles.css */
:root {
  --color-primary: red;
  --color-secondary: blue;
}
```

However, our theme as defined in our JS file isn’t quite so simple. As you can see from the example at the beginning, some of our colour definitions include multiple lighter or darker variants, nested more than one level deep.

What we would like here is to map our colours so that their custom property names are prefixed with their ancestor property names. For example, we would use `--color-brand-primary` for the default primary brand colour, and `--color-brand-primary-light` for its lighter variant.

```css
:root {
  --color-brand-primary: #7b1fa2;
  --color-brand-primary-light: #ba68c8;
}
```

We shouldn’t assume that all colour will have the same property names either. We should be able to define them using any names we like, as many levels as is required.

Note, I’m including `color` here as a property of `theme`. That’s because the actual theme configuration might include things like font families too. We’ll keep it simple and focus on colour here, but the script we’re going to write should (theoretically!) work for _any_ object properties of the theme.

## Writing a recursive function

We’ll write a function that looks at any key/value pair and returns the CSS custom property definition as a string.

The first part is easy enough:

```js
// index.js
import theme from './theme.js'

const mapTheme = ([key, value]) => {
  // If value is a string, return the result
  if (typeof value === 'string') {
    return `--${key}: ${value}`
  }
}
```

This would work fine is we had a very simple theme, like this:

```js
const theme = {
  purple: '#7B1FA2',
  pink: '#E91E63',
}
```

We could convert our theme object to an array using `Object.entries()` and map over the entries with this function:

```js
// index.js
import theme from './theme.js'

const mapTheme = ([key, value]) => {
  // If value is a string, return the result
  if (typeof value === 'string') {
    return `--${key}: ${value}`
  }
}

console.log(Object.entries(theme).map(mapTheme))
// result: ['--purple: #7B1FA2', '--pink: #E91E63']
```

However, that’s not going to be enough for our nested theme variables. Instead we’ll amend the `mapTheme()` function so that if the value is _not_ a string

```js
//index.js
const mapTheme = ([key, value]) => {
  // If value is a string, return the result
  if (typeof value === 'string') {
    return `--${key}: ${value}`
  }

  // Otherwise, call the function again to check the next pair
  return Object.entries(value).flatMap(mapTheme)
}

console.log(Object.entries(theme).flatMap(mapTheme))
```

You might notice we’re using the `flatMap()` array method instead of `map()` as above. This is so that the result is output as a flat array, which is what we want, instead of nesting the custom properties.

If we check the result at this point, we’ll see it’s not quite what we want. We end up with custom property names that correspond to the nested object keys but don’t tell us anything about the parent groups. We also end up with duplicates:

```
[
  '--DEFAULT: #7B1FA2',
  '--light: #BA68C8',
  '--dark: #4A148C',
  '--DEFAULT: #E91E63',
  '--light: #F48FB1',
  '--dark: #C2185B',
  '--blue: #40C4FF',
  '--turquoise: #84FFFF',
  '--mint: #64FFDA',
]
```

If we want more useful custom property names we’ll need to append the name to its parent group name, unless the key is `DEFAULT`, in which case we’ll simply return the parent group key.

```js
// index.js
import theme from './theme.js'

const mapTheme = ([key, value]) => {
  // If value is a string, return the result
  if (typeof value === 'string') {
    return `--${key}: ${value}`
  }

  return Object.entries(value).flatMap(([nestedKey, nestedValue]) => {
    // Append to the custom property name, unless default value
    const newKey = nestedKey === 'DEFAULT' ? key : `${key}-${nestedKey}`

    // Check the new key/value pair
    return mapTheme([newKey, nestedValue])
  })
}

console.log(Object.entries(theme).flatMap(mapTheme))
```

This results in far more helpful names:

```
[
  '--color-brand-primary: #7B1FA2',
  '--color-brand-primary-light: #BA68C8',
  '--color-brand-primary-dark: #4A148C',
  '--color-brand-secondary: #E91E63',
  '--color-brand-secondary-light: #F48FB1',
  '--color-brand-secondary-dark: #C2185B',
  '--color-data-blue: #40C4FF',
  '--color-data-turquoise: #84FFFF',
  '--color-data-mint: #64FFDA',
]
```

[Codepen example](https://codepen.io/michellebarker/pen/jEErGyy)

### An alternative with a `for` loop

By the way, we could do this in a slightly different way with a `for` loop. It’s a similar amount of code, but we don’t need the nested `flatMap`, which might make for a slightly more elegant solution (you be the judge!):

```js
// index.js
let result = []

const mapTheme = (obj, key = null) => {
  for (const property in obj) {
    let name = key || property

    if (property !== 'DEFAULT' && !!key) {
      name = `${key}-${property}`
    }

    if (typeof obj[property] === 'string') {
      result.push(`--${name}: ${obj[property]}`)
    } else {
      mapTheme(obj[property], name)
    }
  }
}

mapTheme(theme)

console.log(result)
```

[Codepen example](https://codepen.io/michellebarker/pen/QwwEexL)

## Writing to a file

Now we can take these values and write them to a CSS file for use in our project. We could simply copy them from the console, but even better if we write a script that will do it for us.

We’ll import the `writeFile` method from the Node JS library and write a new async function called `buildTheme`, which we’ll export. (We’ll remove the console log from the previous example.)

```js
// index.js
import { writeFile } from 'fs/promises'
import theme from './theme.js'

const mapTheme = ([key, value]) => {
  /* ... */
}

const buildTheme = async () => {
  try {
    console.log(Object.entries(theme).flatMap(mapTheme))
  } catch (e) {
    console.error(e)
  }
}

buildTheme()
```

We should now be able to run the script from the command line by typing `node index.js` and see the result logged.

Next we’ll convert the custom properties into a suitable format for our CSS file. We’ll want each custom property to be indented and set on its own line, which we can do with the escaped characters `\n` and `\t` respectively.

```js
// index.js
import { writeFile } from 'fs/promises'
import theme from './theme.js'

const mapTheme = ([key, value]) => {
  /* ... */
}

const buildTheme = async () => {
  try {
    const result = Object.entries(theme).flatMap(mapTheme)

    // Indent each custom property and append a semicolon
    let content = result.map((line) => `\t${line};`)

    // Append and prepend brackets, and put each item on a new line
    content = [':root {', ...content, '}'].join('\n')

    console.log(content)
  } catch (e) {
    console.error(e)
  }
}

buildTheme()
```

All that remains is to write the result to a CSS file, using the `writeFile()` method. We’ll need to specify the location of the file we want to write to, and its character encoding, which will be `'utf-8'`. We’re including a helpful console log informing the user that the file has been written, and ensuring we catch any errors by also logging them to the console.

```js
// index.js
import { writeFile } from 'fs/promises'
import theme from './theme.js'

const mapTheme = ([key, value]) => {
  /* ... */
}

const buildTheme = async () => {
  try {
    const result = Object.entries(theme).flatMap(mapTheme)

    let content = result.map((line) => `\t${line};`)
    content = [':root {', ...content, '}'].join('\n')

    // Write to the file
    await writeFile('src/theme.css', content, { encoding: 'utf-8' })

    console.log('CSS file written')
  } catch (e) {
    console.error(e)
  }
}

buildTheme()
```

Running the script now outputs the CSS file we need.

```css
@theme {
  --color-brand-primary: #7b1fa2;
  --color-brand-primary-light: #ba68c8;
  --color-brand-primary-dark: #4a148c;
  --color-brand-secondary: #e91e63;
  --color-brand-secondary-light: #f48fb1;
  --color-brand-secondary-dark: #c2185b;
  --color-data-blue: #40c4ff;
  --color-data-turquoise: #84ffff;
  --color-data-mint: #64ffda;
}
```

Here’s the complete file:

```js
// index.js
import { writeFile } from 'fs/promises'
import theme from './theme.js'

const mapTheme = ([key, value]) => {
  if (typeof value === 'string') {
    return `--${key}: ${value}`
  }

  return Object.entries(value).flatMap(([nestedKey, nestedValue]) => {
    const newKey = nestedKey === 'DEFAULT' ? key : `${key}-${nestedKey}`

    return mapTheme([newKey, nestedValue])
  })
}

const buildTheme = async () => {
  try {
    const result = Object.entries(theme).flatMap(mapTheme)

    let content = result.map((line) => `\t${line};`)
    content = [':root {', ...content, '}'].join('\n')

    await writeFile('src/theme.css', content, { encoding: 'utf-8' })

    console.log('CSS file written')
  } catch (e) {
    console.error(e)
  }
}

buildTheme()
```
