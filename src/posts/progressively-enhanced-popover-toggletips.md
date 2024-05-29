---
title: 'Progressively Enhanced Popover Toggletips'
date: '2024-05-27'
lastEdited: '2024-05-29'
tags: ['post', 'demo', 'css', 'layout']
---

<figure>
  <img srcset="/progressively-enhanced-toggletips_1600.webp 1600w, /progressively-enhanced-toggletips_1200.webp 1200w, /progressively-enhanced-toggletips_900.webp 900w, /progressively-enhanced-toggletips_700.webp 700w," sizes="(min-width: 1200px) 1200px, 90vw" src="/progressively-enhanced-toggletips_1200.webp 1200w" width="1600" height="900" alt="Exerpt of text with toggletip visible in foreground">
</figure>

The [CSS Anchor Positioning specification](https://www.w3.org/TR/css-anchor-position-1/) enables us to position elements relative to an anchor, wherever they are in our web page. As I [wrote recently](/anchor-positioning-and-the-popover-api/), one thing that particularly excites me is being able to combine anchor positioning with the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API) to show and hide elements.

Anchor positioning [isn’t very well supported yet](https://caniuse.com/?search=anchor%20positioning): in fact, it’s currently only supported in the latest Chrome release. Here’s a code experiment with anchor-positioned toggletips (with text borrowed from [Manifesto for a Humane Web](https://humanewebmanifesto.com/)). In browsers that don’t support anchor positioning, simple anchor links allow the user to navigate to the article references. But in supporting browsers, buttons replace the anchor links. These open popovers, which display the references relative to the position in the article.

<p class="codepen" data-height="421" data-default-tab="result" data-slug-hash="QWRKzRy" data-pen-title="Progressively enhanced popover toggletips" data-user="michellebarker" style="height: 421px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/QWRKzRy">
  Progressively enhanced popover toggletips</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

We _could_ also hide the list when anchor positioning is supported, but I think it’s also more user-friendly to include references as a list **in addition** to within the document.

A small downside is that this approach requires a bit of content duplication. Additionally, I’m making use of the `:has` pseudo-class to position the little arrows attached to the bubbles when the popover is open, by styling the `::before` pseudo-element of the button.

```css
[popovertarget]:has(+ :popover-open) {
  position: relative;
  background: yellow;

  &::before {
    --clip: polygon(50% 0, 100% 100%, 0 100%);
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    width: 1rem;
    height: 1rem;
    background: lavender;
    transform: translateX(-50%);
    -webkit-clip-path: var(--clip);
    clip-path: var(--clip);
  }
}
```

This means I need to include the element with the popover attribute adjacent to the popover trigger (the button) in the HTML.

The reason I’m doing it this way and not making the arrow part of the bubble itself is because its position actually changes depending on the available space. I’m making use of the `position-try-` properties and at-rule, which allow our popover to flip to the left or right, so that it will always be visible when activated, and not overflow the viewport. Pretty cool!

```css
[popover] {
  position-try-options: --pos-left, --pos-right;
  position-try-order: most-width;
}

@position-try --pos-left {
  left: anchor(var(--anchor) -150%);
}

@position-try --pos-right {
  right: anchor(var(--anchor) 150%);
  left: auto;
}
```

I’m using custom properties for the anchor name here because each toggletip has its own anchor which needs to be referred to, but we want all the other positioning values to be the same. This can make for slightly confusing reading, however, particularly as the anchor name is a dashed ident, meaning it looks very similar to a custom property.

```css
[popover] {
  --anchor: --ref_1;

  position-anchor: var(--anchor);
  top: anchor(var(--anchor) 150%);
  left: anchor(var(--anchor) -150%);

  &#ref_2 {
    --anchor: --ref_2;
  }

  &#ref_3 {
    --anchor: --ref_3;
  }
}

[popovertarget='ref_1'] {
  anchor-name: --ref_1;
}

[popovertarget='ref_2'] {
  anchor-name: --ref_2;
}

[popovertarget='ref_3'] {
  anchor-name: --ref_3;
}
```

I hesitate to call these tooltips, as to my mind a tooltip is generally something that appears on hover, to explain the thing you’re about to click on. These could more accurately be described as “toggletips”, which provide supplementary information, as described in Heydon Pickering’s [Inclusive Components](https://inclusive-components.design/tooltips-toggletips/).

## Anchor positioning with pseudo-elements

As a bonus, I’ve refactored the above demo to work in a way that’s a little bit more user-friendly. It uses pseudo elements on the buttons with the `popovertarget` attribute in order to increase their hit area, and additionally allows us a bit more control over the positioning of the popovers, as they will be positioned relative to the pseudo-element.

Previously we were using percentage values to position the popover slightly offset from the anchor. Unfortunately lengths such as pixels or rems, or `calc()` functions are not permitted.

```css
[popover] {
  /* Not allowed :( */
  top: anchor(var(--anchor) calc(100% + 1rem));
  left: anchor(var(--anchor) -1rem);

  /* Use percentage instead */
  top: anchor(var(--anchor) 150%);
  left: anchor(var(--anchor) -150%);
}
```

But by using a pseudo-element, we can align the popover to that instead:

```css
[popovertarget] {
  &::after {
    content: '';
    position: absolute;
    inset: -1rem;
  }
}

[popover] {
  top: anchor(var(--anchor) bottom);
  left: anchor(var(--anchor) left);
}
```

Here’s the full demo, with the pseudo-elements outlined in red:

<p class="codepen" data-height="392.1640625" data-default-tab="result" data-slug-hash="PovbBdK" data-pen-title="Anchor positioning popovers with pseudo elements" data-user="michellebarker" style="height: 392.1640625px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/PovbBdK">
  Anchor positioning popovers with pseudo elements</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
