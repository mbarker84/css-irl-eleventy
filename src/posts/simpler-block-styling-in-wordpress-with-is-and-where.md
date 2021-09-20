---
title: 'Simpler Block Spacing in WordPress with :is() and :where()'
date: '2021-09-20'
tags: ['post', 'css', 'wordpress', 'workflow']
---

The `:is()` and `:where()` pseudo-selectors are relatively new additions to CSS, which allow us to target elements that meet the criteria in their parentheses. For example, using `:is()` we can target any `p`, `h2` or `ul` element with a class of `test`:

```css
.test:is(p, h2, ul) {
  background: yellow;
}
```

That’s equivalent to writing:

```css
p.test,
h2.test,
ul.test {
  background: yellow;
}
```

Conversely, we could target any `h2` that has any of the specified classes:

```css
h2:is(.heading-1, .heading-2) {
  background: yellow;
}
```

This is equivalent to:

```css
h2.heading-1,
h2.heading-2 {
  background: yellow;
}
```

It works with complex selectors too. The following targets any `h2` that is a direct child of an element with a class of `has-red-heading`:

```css
h2:is(.has-red-heading > *) {
  color: red;
}
```

`:where()`, on the face of it, is pretty similar. Indeed, we can use it in the exact same way and it will have the same effect:

```css
h2:where(.heading-1, .heading-2) {
  background: yellow;
}
```

The difference is the selectors inside `:where()` have a specificity of zero, while the selector inside `:is()` contribute to the overall specificity. To quote directly from [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/:where):

> The difference between :where() and :is() is that :where() always has 0 specificity, whereas :is() takes on the specificity of the most specific selector in its arguments.

Let’s look at how these can be useful in our CSS code.

## Better block styling

At [Atomic Smash](https://www.atomicsmash.co.uk/), the web agency where I work, we specialise in building WordPress sites. Recent developments in WordPress have made it easier than ever before to deliver entirely flexible sites: the [Gutenberg block editor](https://wordpress.org/gutenberg/) allows clients the full flexibility to add, remove or reorder blocks anywhere on the page. But it also comes with its challenges, not least of which is styling the many different block types to ensure suitable spacing between them.

## Gutenberg overview

On a webpage built with the Gutenberg block editor, each “block” is a direct child of a single wrapper element on the page. Some are simple blocks, like headings and paragraphs, others are more complex components with classes appended. We can also create custom blocks to be used in much the same way.

```html
<div class="entry-content">
  <!--Heading and paragraph core blocks-->
  <h2>Did dinosaurs really exist?</h2>
  <p>
    Yes. Semper eget duis at tellus at urna condimentum mattis pellentesque.
    Donec ac odio tempor orci dapibus ultrices in. In hac habitasse platea
    dictumst quisque sagittis purus sit.
  </p>

  <!--More complex core block-->
  <blockquote
    class="wp-block wp-block-quote"
    id="block-1cfd33a9-706c-4409-8a6e-d381bff67023"
  >
    <p>
      Dinosaurs lived a really long time ago, but they can teach us a lot about
      the present day
    </p>
  </blockquote>

  <!--Custom block-->
  <div class="as-accordion" id="accordion-block_6065ca0dd7fa1">
    <!--...block HTML-->
  </div>
</div>
```

## Block spacing

Wordpress ships a bunch of default CSS for styling the space between Gutenberg blocks, but we usually want to override that based on our design. A handy way to do that is using the [lobotomised owl selector](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/) for direct descendants of the content wrapper.

```css
.entry-content > * + * {
  margin-top: 1rem;
}
```

This sets a top margin on each block when it follows another. It’s a good start, but some blocks generally need a bit more space, so we set a larger `margin-top` value for those blocks. Here’s how that looks using Sass, which is what we use at Atomic Smash:

```scss
.entry-content {
  > * + * {
    margin-top: 1rem;
  }

  /* Any block followed by a h2, h3, h4, figure, blockquote or gallery block needs more space above */
  > * + h2,
  > * + h3,
  > * + h4,
  > * + figure,
  > * + blockquote,
  > * + .wp-block-gallery {
    margin-top: 2rem;
  }

  /* Any block that follows a figure, blockquote or gallery block needs more space above */
  > figure + *,
  > blockquote + *,
  > .wp-block-gallery + * {
    margin-top: 2rem;
  }
}
```

This is just a snapshot, and it might be that we need even more custom spacing on any given project, as well as considering different breakpoints.

We can refactor that to make it more concise using `:is()`:

```scss
.entry-content {
  > * + * {
    margin-top: 1rem;
  }

  > * + :is(h2, h3, h4, figure, blockquote, .wp-block-gallery),
  > :is(figure, blockquote, .wp-block-gallery) + * {
    margin-top: 2rem;
  }
}
```

`:is()` is probably a better option than `:where()` in this case, as we want to increase the specificity and override the default Gutenberg styles.

Here’s a demo of it in action, alongside custom properties for scaling the vertical rhythm for different breakpoints, which can help keep our code even more concise:

<p class="codepen" data-height="424" data-default-tab="html,result" data-slug-hash="OJgvrVN" data-user="michellebarker" style="height: 424px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/OJgvrVN">
  </a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
