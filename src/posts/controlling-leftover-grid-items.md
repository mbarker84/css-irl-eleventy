---
title: 'Controlling Leftover Grid Items with Pseudo-selectors'
date: '2019-04-13'
tags: ['post', 'css grid']
---

I recently wrote about [some of the cases where you might want to use Grid instead of flexbox](/to-grid-or-to-flex), and vice-versa. One of the scenarios I pointed out _might_ be a better case for using flexbox is when you want to control the behaviour of any leftover grid items that don’t fill an entire row.

<figure>
  <img src="/controlling-leftover-grid-items-01.svg" alt="10 items on a 4x4 grid">
	<figcaption>As there are only 10 items in this grid rather than 12, we may want to control how those last two items are displayed.</figcaption>
</figure>

In the typographic world, words at the end of a paragraph that don’t take up a full line are called [widows](https://www.fonts.com/content/learning/fontology/level-2/text-typography/rags-widows-orphans). These grid items behave in a similar way, so that’s how I’m referring to them here. (Side note: The CSS properties `widows` and `orphans` deal with these typographic behaviours in paged media and multi-column layout.)

## Why would we want to use Grid here?

To my mind, using grid is often the better choice when it comes to defining a fixed number of columns that each need to take up a proportion of the available space. We can use the _fr_ unit here, which is designed for this purpose:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}
```

This will give us three equal width columns that utilise all the space available. Doing this with Grid is a lot cleaner than the flexbox solution, which would require `calc()` and negative margins to get the same effect. In this demo, the first example uses flexbox and the second uses Grid to achieve the same layout:

<iframe height="374" style="width: 100%;" scrolling="no" title="Flexbox vs Grid layout examples" src="//codepen.io/michellebarker/embed/xeXgqy/?height=374&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/xeXgqy/'>Flexbox vs Grid layout examples</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In this case, our Grid items don’t require us to place them explicitly. They will all be placed into the next available cell using Grid’s default auto-placement, which is helpful if we don’t know the number of items in our Grid.

The problem arises if we want to control the behaviour of any leftover items. If there is just one widow, perhaps we want it to fill the entire row, or maybe we’d prefer to align it to the right instead of the left. Or if there are two items, maybe we want to center them:

<figure>
  <img src="/to-grid-or-to-flex-01.svg" alt="Two flexbox layout examples">
</figure>

We can’t achieve this by relying solely on auto-placement, but we _can_ still get the behaviours we want using with only a little bit of extra code.

## nth-child concatenation

By combining `:nth-child()` and `:last-child` pseudo-selectors, we can detect whether an item is a widow or not and adjust our styles accordingly. [Heydon Pickering](http://www.heydonworks.com/) demonstrated a similar technique, which he refers to as _quantity queries_, in [this A List Apart article](https://alistapart.com/article/quantity-queries-for-css/). We’re going to use it slightly differently here, because we’re not querying _how many_ items there are. We want to detect whether an item is both a last-child _and_ comes immediately after a child that is a multiple of three (i.e. it’s the first item in a row). (We can’t use `:last-child` alone, as this would select the last item regardless of whether it’s a widow or not.)

Then we can target that item with our styles, e.g. setting it to span three grid tracks:

```css
li:last-child:nth-child(3n - 2) {
  grid-column: span 3;
}
```

You can see it in action in this demo:

<iframe height="415" style="width: 100%;" scrolling="no" title="CSS Grid + nth-child to control last row behaviour" src="//codepen.io/michellebarker/embed/KEXErp/?height=415&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/KEXErp/'>CSS Grid + nth-child to control last row behaviour</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

In the first of the two examples shown I’m targeting the last child item if it is also the _second_ item in a row and making that span two columns, while the second example targets the last child if it is the _first_ item in the row:

```css
/* Target the second item on the last row, as long as it is the last item in the grid */

li:last-child:nth-child(3n - 1) {
  grid-column: span 2;
}

/* Target the first item on the last row, if it is the last item */

li:last-child:nth-child(3n - 2) {
  grid-column: span 3;
}
```

### Centering the items

Using flexbox for this layout would allow us to center our items easily by using `justify-content: center` on the container, which would allow the one or two remaining grid items to be centered instead of spanning multiple columns:

<figure>
  <img src="/controlling-leftover-grid-items-02.svg" alt="A grid with the two leftover items centred">
</figure>

This might be a nicer option in some cases, as making a grid item wider can draw more attention to it and make it seem more important, when perhaps this is not the intention.

We can achieve this with grid too – we just need a couple more small steps in our process. First we’re going to give our grid six columns instead of three:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 20px;
}
```

Then we need to make each item span two columns instead of one:

```css
li {
  grid-column: span 2;
}
```

Using a _span_ value rather than a start or end line number allows us to still take advantage of Grid’s auto-placement – we don’t need to explicitly place the items. We’re telling our grid that they should each span two tracks, but otherwise flow naturally into the available grid cells.

Then we can target the last and last-but-one grid items as before, but instead adjust their `grid-column-end` line instead of their span:

```css
/* Dealing with 2 orphan items */

li:last-child:nth-child(3n - 1) {
  grid-column-end: -2;
}

li:nth-last-child(2):nth-child(3n + 1) {
  grid-column-end: 4;
}

/* Dealing with single orphan */

li:last-child:nth-child(3n - 2) {
  grid-column-end: 5;
}
```

This gives them the effect of being centered.

<iframe height="417" style="width: 100%;" scrolling="no" title="CSS Grid + nth-child" src="//codepen.io/michellebarker/embed/aMVLxb/?height=417&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/aMVLxb/'>CSS Grid + nth-child</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Conclusion

There are still some instances where it might be more convenient to use Flexbox for a layout like this, which become more apparent when implementing it responsively. The above examples won’t work if you’re using CSS Grid’s `auto-fill` and `auto-fit` keywords instead of a fixed number of column tracks, because (without some fairly complex calculations) you can’t be sure of how many items will be on a grid row at any one time. `auto-fill` and `auto-fit` are quite useful in that they can deliver a responsive layout without the need for media queries – your grid responds to the containing block. Using flexbox allows us to achieve a similar thing, albeit with some hacks to accommodate gutters.

The techniques detailed in this post can still be useful, and give you one more tool in your toolbox that can help you make an informed decision when building layouts.
