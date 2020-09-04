---
title: 'A Layout Trick for Building a Contact List'
date: '2019-11-16'
tags: ['post', 'css', 'css grid', 'layout']
---

I recently needed to build a design for a contact list that looks like this:

<figure>
  <img src="a-layout-trick-for-building-a-contact-list.png" alt="Email address and telephone number links with accompanying icons on the right">
</figure>

It consists of an email address and telephone number (with the potential to add more contact types), each with an icon on the right and text on the left. Each item needed to be a link (including the icon). The important thing was that the width of the items should be determined by the _longest_ item. In the case of the image above, the item with the longest content would be the email address, so the second item (the telephone number) would need to be the same width as this, even though its content is shorter.

Flex or block items by default take up 100% of the parent width. Hard-coding a width on the items would not be a desirable solution, as the length of the content may be unknown.

## Solving it with Grid

I didn’t quite know how I would tackle this, but I had a hunch that using `max-content` with CSS Grid might provide the solution. It turns out I was right. If we set the following CSS properties on the list, then both items will be sized to the width of the longest item:

```css
.contact-list {
  display: grid;
  grid-template-columns: minmax(0, max-content);
}
```

Using the `grid-template-columns` property, this sets a single column for the grid, which has a minimum width of 0 and a maximum width of `max-content`. Referring to [the specification](https://www.w3.org/TR/css-sizing-3/#max-content-inline-size) for `max-content`, this is:

> A box’s “ideal” size in a given axis when given infinite available space. Usually this is the smallest size the box could take in that axis while still fitting around its contents, i.e. minimizing unfilled space while avoiding overflow.

The `0` value in the `minmax()` function doesn’t matter too much – it could in fact be and fixed value below the maximum content size. If we know that we never want our list items to be narrower than 5rem, then we might put that value in here.

## Alternative solutions

I shared this tip [on Twitter](https://twitter.com/CSSInRealLife/status/1195306788612190210?s=20) as I thought it might be useful. It got a much bigger response than I expected, so it seems this might be handy for a lot of people. A couple of people pointed out that you could also achieve the same result with `inline-block` or `inline-flex`. (Thanks [@htmlvv](https://twitter.com/htmlvv), [@ripcorddesign](https://twitter.com/ripcorddesign) and [@hack_nug](https://twitter.com/hack_nug)!) I’ve prepared a demo showing the different possible solutions:

<iframe height="371" style="width: 100%;" scrolling="no" title="Different ways to force two list items to take the width of the longest" src="https://codepen.io/michellebarker/embed/gOOQyyL?height=371&theme-id=default&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/gOOQyyL'>Different ways to force two list items to take the width of the longest</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

When using `inline-block` or `inline-flex` the browser adds a top and bottom margin, which you need to set to 0 (unless it’s desirable, of course). With `inline-flex` you also need to add `flex-direction: column`, so overall that option has the most lines of code:

```css
/* Inline-block */
.contact-list--inline-block {
  display: inline-block;
  margin: 0;
}

/* Inline-flex */
.contact-list--inline-flex {
  display: inline-flex;
  flex-direction: column;
  margin: 0;
}
```

### Pros and cons

Both these solutions have the advantage over Grid of better browser support. However, support for Grid is very good, so the only place this would really be an issue is Internet Explorer. In the context of progressive enhancement, this works totally fine, at least for my use case: in browsers that don’t support Grid, each item would simply be 100% width. Not as elegant, but perfectly functional.

The other two solutions feel a little more hacky to me – less intentional, and not really using the properties as designed. But we do plenty of hacky stuff with CSS every day, so it’s definitely not a problem. The Grid solution is the one I implemented at the time, so I’m going to stick with it – and it’s handy to know that it can also work in the context of a larger grid if needed. But feel free to pick the one that works for you!
