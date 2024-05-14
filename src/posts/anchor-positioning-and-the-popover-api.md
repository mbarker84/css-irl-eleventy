---
title: Anchor Positioning and the Popover API for a JS-Free Site Menu
date: '2024-05-14'
tags: ['post', 'css', 'layout']
---

[Anchor positioning](https://www.w3.org/TR/css-anchor-position-1/) in CSS enables us to position an element relative to an anchor element anywhere on the page. Prior to this we could only position an element relative to its closest positioned ancestor, which sometimes meant doing some HTML and CSS gymnastics or, more often than not, resorting to Javascript for positioning elements like tooltips or nested submenus.

<aside>
	<p>Anchor positioning is currently only supported in Chrome with experimental platform features enabled, You’ll need to view this article in a supporting browser in order to see the demos.</p>
</aside>

## Popovers

Anchor positioning becomes even more powerful when combined with the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API). When building components where content needs to become visible upon user interaction, it can be a challenge to ensure they are fully accessible to users of assistive technologies, and often require additional JS to get this right. Using web platform features like the Popover API can help us build more accessible websites, as much of the necessary functionality comes already baked in.

The simplest way to create a popover is to apply the `popover` attribute to the desired popover content, then use the `popovertarget` attribute to target the popover’s ID.

```html
<button popovertarget="popover_1">Open popover</button>
<p popover id="popover_1">I am the popover!</p>
```

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="MWdwbGK" data-user="michellebarker" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/MWdwbGK">
  popover</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

We can also trigger popovers with JS, but that’s for another day.

## Anchoring

If we want to position the popover relative to an element, we need to designate that element as an anchor with the `anchor-name` property. In this example, the anchor is the button that triggers the popover. The value must be a [dashed ident](https://developer.mozilla.org/en-US/docs/Web/CSS/dashed-ident).

```css
#anchor_1 {
  anchor-name: --anchor_1;
}
```

On the popover we’ll specify the anchor we’re using (with the `position-anchor` property). Then we’ll use the `anchor()` function to control the actual positioning. Here we’re specifying that we want the top left of the popover to be positioned at the bottom right of the anchor element.

```css
#popover_1 {
  position-anchor: --anchor_1;
  top: anchor(--anchor_1 bottom);
  left: anchor(--anchor_1 right);
}
```

Alternatively we could use the [logical property](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) equivalents:

```css
#popover_1 {
  position-anchor: --anchor_1;
  inset-block-start: anchor(--anchor_1 bottom);
  inset-inline-start: anchor(--anchor_1 right);
}
```

We’ll also need to reset some of the default styles on the popover element.

```css
p,
[popover] {
  margin: 0;
  padding: 0;
  border: 0;
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="NWVqjwm" data-user="michellebarker" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/NWVqjwm">
  Popover with anchor positioning (inset area)</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

We can also position our anchored element with the `inset-area`, property instead of the `anchor()` function. This is more limited, as it only permits positioning on one axis, with only a single keyword of `top`, `right`, `bottom` or `left` (or logical property equivalents: `block-start`, `inline-end`, `block-end`, `inline-start`). We can however use transforms to move our element around if we so choose.

```css
#popover_1 {
  position-anchor: --anchor_1;
  inset-area: bottom;
  transform: translateX(50%);
}
```

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="NWVqjwm" data-user="michellebarker" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/NWVqjwm">
  Popover with anchor positioning</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Popover menu demo

The following demo takes advantage of the Popover API and anchor positioning to build a navigation menu with interactive, nested submenus that doesn’t require any JS. Pretty cool!

<p class="codepen" data-height="392.03125" data-default-tab="result" data-slug-hash="qBGEVov" data-user="michellebarker" style="height: 392.03125px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/qBGEVov">
  Anchor position menu</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

Rather than the button that triggers the popover, we’re using the paren `<menu>` element.

## Animating popovers

Additionally, we’re animating the transition between open and closed states. That’s thanks to yet another new feature, which allows us to [transition discrete properties](https://developer.chrome.com/blog/entry-exit-animations), such as the `display` property.

Previously, if we wanted to transition an element that wasn’t there before to a visible state, we would have to first change the `display` property from `display: none` to `display: block` or some other value, give it an opacity of 0 (making it invisible), then perform the transition. We’s generally need some JS for that. But now we can transition the `display` value too, with the `transition-behavior` property.

```css
[popover] {
  transition: display 300ms;
  transition-behavior: allow-discrete;
}
```

Alternatively it can be included with the shorthand `transition` property.

```css
[popover] {
  transition: display 300ms allow-discrete;
}
```

We’ll need to explicitly set `display: none` on the popover, then transition it when open:

```css
[popover] {
  display: none;
  transition: display 300ms allow-discrete;

  &:popover-open {
    display: block;
  }
}
```

This won’t do much at the moment. We actually want to transition the opacity, so we need to include this too.

We should also transition the [`overlay`](https://developer.mozilla.org/en-US/docs/Web/CSS/overlay) property. This is a property set by the browser, which specifies whether a popover or `<dialog>` element is rendered in the top layer. Adding it to the transition list causes the removal of the element from the top layer to be deferred, so that it can be animated.

```css
[popover] {
  display: none;
  opacity: 0;
  transition:
    opacity 300ms,
    display 300ms allow-discrete,
    overlay 500ms allow-discrete;

  &:popover-open {
    display: block;
    opacity: 1;
  }
}
```

If we test this we can see that the element transitions out smoothly when we hide it, but it still appear instantly when we click the button.

<p class="codepen" data-height="300" data-default-tab="css,result" data-slug-hash="LYoVLVr" data-user="michellebarker" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/LYoVLVr">
  Popover with anchor positioning</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

To transition smoothly _in_, we need `@starting-style`. We’ll apply this at-rule to the `:popover-open` pseudo-class on our popover, to tell the browser what style to begin the transition from. (I’m nesting the styles here, because why use just one newly supported CSS feature when you can use them all?).

```css
[popover] {
  display: none;
  opacity: 0;
  transition:
    opacity 500ms,
    display 500ms allow-discrete,
    overlay 500ms allow-discrete;

  &:popover-open {
    display: block;
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }
}
```

Una has a great rundown of these new transition features over on the [Chrome blog](https://developer.chrome.com/blog/entry-exit-animations), so be sure to check it out.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="jOoPwWq" data-user="michellebarker" data-token="b54f7d864f0d0f921c0332e1c3ab3304" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/jOoPwWq/b54f7d864f0d0f921c0332e1c3ab3304">
  Transition and starting-style with popover</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

## Recommended resources

If you want to know more about popovers, I highly recommend [this talk from Hidde de Vries](https://www.youtube.com/watch?v=XaO2mZnIOzs) from CSS Day 2023.

There’s also loads more to learn about anchor positioning than I’m covered here! Once again, Una has an [in-depth guide](https://developer.chrome.com/blog/anchor-positioning-api).
