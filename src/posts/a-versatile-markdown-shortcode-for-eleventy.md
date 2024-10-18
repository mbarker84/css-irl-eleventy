---
title: A Versatile Markdown Shortcode for Eleventy
date: '2024-10-18'
tags: ['post', 'html', 'eleventy', 'javascript']
---

When writing blog posts in Markdown files I often find myself needing to add HTML elements that aren’t accounted for in Markdown. Some common ones are `<aside>` elements, where I include content tangentially related to the post itself, or external references.

Having to include HTML in Markdown is kind of a pain, because once you start writing HTML, you can’t then use Markdown _inside_ it: everything inside the HTML element must also be HTML. This is pretty annoying for elements where you might want to include multiple paragraphs or links, for example. The markdown writing experience is far more pleasant.

## Shortcodes

I use the static site generator [Eleventy](https://www.11ty.dev) for this blog, and I decided to make use of a great Eleventy feature: shortcodes.

### Simple shortcodes

Shortcodes are created with a Javascript function in the Eleventy config file for a project. There are two types of shortcodes in Eleventy. The simpler of the two takes a number of arguments and can be rendered with a single line in a Markdown file. For example, if we created a shortcode called “aside”, which renders an `<aside>` element with a single line of text, it would work like this using the [Nunjucks](https://mozilla.github.io/nunjucks/) templating language, which this blog uses:

<pre class="language-njk">
{% raw %}
{% aside "This is an aside" %}
{% endraw %}
</pre>

Other templating languages work differently, and the Eleventy docs include [references for using shortcodes in various templating languages](https://www.11ty.dev/docs/shortcodes/).

To create the simple shortcode in our `eleventy.config.js` file we can use Eleventy’s `addShortcode` function. Here’s how it looks:

```js
eleventy.addShortcode("aside", (content) => {
	return `<aside>${content}</aside>
})
```

Here’s how that renders in HTML:

```html
<aside>This is an aside</aside>
```

This isn’t all that different to just writing the HTML in the first place, so you might wonder why we’d bother with a shortcode. It’s far more useful however, when we want to render more verbose HTML, such as adding classes or nested elements. Here’s one called “hotlink”, which I use for rendering a link that looks like a button:

<pre class="language-njk">
{% raw %}
{% hotlink 'https://css-tricks.com', 'Read it on CSS Tricks' %}
{% endraw %}
</pre>

It’s defined as follows:

```js
eleventyConfig.addShortcode('hotlink', (url, title, target = '_blank') => {
  return `<a class="hotlink" href="${url}" target=${target}>${title}</a>`
})
```

### Paired shortcodes for more verbose content

A simple shortcode probably isn’t going to cut it in all cases though. There’s a good chance that in our `<aside>` we might want to include links, multiple paragraphs, or other elements, which the simple shortcode doesn’t allow.

For this we can use a **paired** shortcode. This allows us to use a template tag with markdown content inside it, which means we get the superior experience of writing markdown instead of HTML. Here’s how we can include an `<aside>` with a heading and multiple paragraphs:

<pre class="language-njk">
{% raw %}
{% aside %}
## Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
{% endaside %}
{% endraw %}
</pre>

A paired shortcode is defined using the `addPairedShortcode` function in the Eleventy config file:

```js
eleventyConfig.addPairedShortcode('aside', (content) => {
  return `<aside>${content}</aside>`
})
```

This renders the markdown content as HTML inside our `<aside>` element.

### A more versatile shortcode

Although this example works just fine, it only gives us an `<aside>` element. We could improve the utility of this shortcode so that it enables us to render _any_ HTML element, and with a custom class too. Let’s adjust the code in `eleventy.config.js`:

```js
eleventyConfig.addPairedShortcode(
  'element',
  (content, el = 'aside', className) => {
    return `<${el} class="${className}">${content}</${el}>`
  }
)
```

Our function now takes three arguments: `content` is the markdown between our opening and closing template tags. The second and third arguments define the element and an optional class name respectively. We’ll include a default value of `’aside’` for the element, as we don’t want it to every be _nothing_.

This is how we’ll include it in our markdown file:

<pre class="language-njk">
{% raw %}
{% element 'aside', 'pink' %}
## Heading

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
{% endelement %}
{% endraw %}
</pre>

This will render an `<aside>` element with a class of “pink” in our HTML.
