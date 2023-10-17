---
title: 'Styling External Links with Attribute Selectors'
date: '2023-10-11'
tags: ['post', 'css']
---

You might notice on some websites you visit that external links display a little icon next to them. This is super helpful for users, as it lets them know that the link is going to take them somewhere off-site.

I’ve just recently implemented custom styling for external links within posts on this site. The good news is we don’t need to append a special class to external links or alter the markup in any way. We can simply use an attribute selector.

## Using attribute selectors

CSS allows us to style HTML elements based on their attributes by wrapping them in square brackets. For example, we can style any element with the `hidden` attribute to have a `display` property of `none`:

```css
[hidden] {
  display: none;
}
```

We can also style elements when the attribute equals a particular value. For form elements, we could style particular input types without having to use a class:

```css
input[type='checkbox'] {
  accent-color: deeppink;
}
```

For our external links we want to apply the styling when the `href` attribute contains a link to an external site. We don’t know exactly what that value will be (and it wouldn’t be practical to add each individual URL to our stylesheet!), but we know that internal links (links to other posts on the site) will begin with a slash, whereas external links will begin with `https://`. So we can style only the links that begin with `http` by inserting a `^` character into our attribute selector:

```css
a[href^='http'] {
  /* Styles for external links */
}
```

Alternatively we can use other operators to determine different styling conditions:

```css
/* Matches the URL exacly */
a[href='https://css-irl.info']
{
}

/* Has 'css' anywhere in the URL */
a[href*='css'] {
}

/* Ends with .info */
a[href$='.info'] {
}

/* Class contains the word 'link' */
a[class~='link'] {
}
```

Additionally, by adding `s` or `i` before the end bracket we can control whether they are compared case-sensitively or insensitively:

```css
/* Case sensitive */
a[href*='css-irl' s] {
}

/* Case insensitive */
a[href*='css-irl' i] {
}
```

## Styling the pseudo element

For our external links, we’ll append an icon by styling a pseudo element. Here we’re using the `content` property with a base64 encoded SVG, as the icon is very simple. But you could use an image URL, another character, or an emoji. We can add a small margin to position it slightly away from the text.

```css
a[href^='http']::after {
  content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewbox='0 0 12.2 12.2' width='14' height='14'%3E%3Cpath d='M5.7 0v1.5h4L4.5 6.7l1 1.1 5.3-5.2v3.9h1.4V0z'/%3E%3Cpath fill='none' d='M3.4 6.7l3-2.9H1.5v7h7V5.9l-3 2.9z'/%3E%3Cpath d='M8.5 5.9v4.9h-7v-7h4.9l1.5-1.6H0v10h10V4.4z'/%3E%3C/svg%3E");
  margin-left: 0.25em;
}
```

One problem with using `content` with an SVG is we don’t have full control over the size of the icon. It uses the intrinsic dimensions of the SVG. If we want to apply the icon to **any** external link regardless of font size (e.g. a heading), we might be better off using the `background-image` property. We can set a width and height (in ems, which are relative to font size), and use `background-size` to ensure our SVG covers the entire area.

We need to set the `content` property to an empty string, otherwise the pseudo element won’t render. We also need to set the `display` property to `inline-block`.

(Note: I’m using a custom property for the image URL, for brevity.)

```css
a[href^='http']::after {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 0.25em;
  background-size: 100%;
  background-image: url(--var(svgUrl));
}
```

## Preventing an ”orphan” icon

There’s one more thing we can improve about this approach. Currently it’s possible for the icon to wrap onto the next line of text, leaving an undesirable orphan icon all on its own.

<figure style="max-width: 40rem">
  <img src="/styling-external-links-01.webp" width="900" height="443" alt="Two external links with appended icon. In the second link the icon wraps onto the next line">
</figure>

If we add `position: absolute` to the pseudo element, and a bit of right padding to the anchor element, then the icon will never wrap by itself.

<figure style="max-width: 40rem">
  <img src="/styling-external-links-02.webp" width="900" height="443" alt="Two external links with appended icon. The icon no longer wraps on its own">
</figure>

```css
a[href^='http'] {
  padding-right: 1.25em;
}

a[href^='http']::after {
  position: absolute;
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-left: 0.25em;
  background-size: 100%;
  background-image: url(--var(svgUrl));
}
```

<aside>
  <p>Unfortunately this trick doesn’t work in the latest version of Chrome.</p>
</aside>

Here’s the full code:

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="XWoGgrX" data-user="michellebarker" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/XWoGgrX">
  Untitled</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
