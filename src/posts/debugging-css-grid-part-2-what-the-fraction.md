---
title: 'Part 2: What the Fr(action)?'
series: 'Debugging CSS Grid'
date: '2019-05-16'
tags: ['post', 'css grid']
---

In the second part of the _Debugging CSS Grid_ series, we’ll take a look at _fr_ (or _fraction_) units. _Fr_ units are very useful for sizing grid tracks, and vastly simplify the process of building responsive layouts. But there are one or two unexpected behaviours you may run into if you don’t understand how they work. This article will aim to demystify these.

## Introduction

The _fr_ unit is a new unit, exclusive to Grid. It allows you to size your grid tracks according to a proportion of the available space in the grid container. By using _fr_ units instead of percentages for a flexible layout, we can avoid messy and complicated _calc()_ functions to size our grid tracks. As a simple example, we can create four equal-width columns:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
}
```

<figure>
  <img src="debugging-css-grid-2-03.png" alt="Three grid items of 200px and one grid item of 1fr">
	<figcaption><em>Fig 01</em> Four equal width tracks (each sized at 1fr)</figcaption>
</figure>

The grid takes into account the 20px gap between each column track and distributes the remaining space equally. You can also use it alongside fixed tracks:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 200px) 1fr;
  column-gap: 20px;
}
```

<figure>
  <img src="debugging-css-grid-2-02.png" alt="Three grid items of 200px and one grid item of 1fr">
	<figcaption><em>Fig 02</em> The 1fr column on the right expands to fill all of the remaining space, once the fixed tracks are taken into account.</figcaption>
</figure>

This will give us three fixed columns of 200px and a fourth column, sized with the _fr_ unit, which will take up the remaining space.

We can use multiples of the _fr_ unit to create tracks that are proportionally larger or smaller. In this example, the second track will be twice the width, and the fourth track will be three times the width of the first and third tracks.

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 3fr;
  column-gap: 20px;
}
```

<figure>
  <img src="debugging-css-grid-2-01.png" alt="Four grid items of differing widths">
  <figcaption><em>Fig 02</em></figcaption>
</figure>

## All fr units are not created equal

A common mistake is to assume that all tracks sized with the same number of _fr_ units will be the same size. This is certainly what you would expect if you were using percentages for track sizing, for example. But if we compare the first and last examples above, we can quite clearly see that the _1fr_ columns in the last example (_Fig 03_) are _not_ the same size as those in the first example (_Fig 01_), despite using the same value! The reason for this is that _fr_ units are _flexible_ units. They do not behave as lengths, like pixels, rems, ems and others, which is why they cannot be used in `calc()` functions. To quote directly from the spec:

> Tracks sized with fr units are called “flexible tracks”, as they flex in response to leftover space similar to how flex items fill space in a flex container.

Flexible tracks are resolved last according to Grid’s sizing algorithm. The browser takes into account all of the fixed tracks and column or row gaps, plus the maximum size of any tracks sized using expressions like `minmax()`, then distributes the remaining space accordingly.

Consider the following example:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(20px, 300px)) 1fr;
}
```

We have three columns sized with `minmax()` (with a maximum size of 300px), plus one column of _1fr_. If the width of the grid container is less than the sum of the three columns (900px) then the last column’s maximum size will depend on the content. If the track contains no grid item (or the grid item has no content, and nothing else affecting its size, like padding or borders) then it will have a resolved width of 0 – so it will be invisible. It’s only when our grid container is larger than 900px (e.g. for larger viewports) that we will see that _1fr_ column, which will fill the remaining space in the grid.

<iframe height="419" style="width: 100%;" scrolling="no" title="minmax() and fr" src="//codepen.io/michellebarker/embed/MdpBME/?height=419&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/MdpBME/'>minmax() and fr</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Fractions of fractions

You don’t need to distribute _all_ of the available space in a grid. We can also size tracks using values of less than 1fr.

If we have three grid tracks at 0.5fr each, we might expect that they take up half the width of the available space – a fraction of a fraction. But this demo shows what actually happens here.

<iframe height="397" style="width: 100%;" scrolling="no" title="Fractions of fractions" src="//codepen.io/michellebarker/embed/mYWyjR/?height=397&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/mYWyjR/'>Fractions of fractions</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

The tracks with a size of 0.5fr actually behave as if they were 1fr! This might be somewhat surprising if we think of _fr_ tracks in the same way as length-based units (like percentages), but becomes clearer if we think of these as flex items instead.

### Understanding the flex factor

The value of the fr unit in the CSS Grid specification is referred to as the [flex factor](https://www.w3.org/TR/css-grid-1/#grid-template-columns-flex-factor). The value of any _fr_ tracks is computed by this formula:

```
<flex factor of the track> * <leftover space> / <sum of all flex factors>
```

The specification explains what happens when a track’s flex factor is less than 1:

> If the sum of the flex factors is less than 1, they’ll take up only a corresponding fraction of the leftover space, rather than expanding to fill the entire thing.

Because each of our tracks is 0.5fr, the sum of all our flex factors is greater than 1 – 1.5 to be exact. So our column tracks expand to fill all the available space. However, if we sized each track at 0.2fr, say, then the sum of the flex factors will be 0.6. If we try this out then we can see that each item will take up the equivalent proportion of the available space.

<iframe height="372" style="width: 100%;" scrolling="no" title="Fractions of fractions" src="//codepen.io/michellebarker/embed/BeWNQP/?height=372&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/BeWNQP/'>Fractions of fractions</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Intrinsic and extrinsic sizing

We’ve seen that the size of _fr_ tracks is influenced by the rest of the grid: The sizes of other tracks, and the `gap` values. This is known as _extrinsic_ sizing – where the size is determined by context. But the size of an _fr_ track is also dependent on its content. If you have three columns of 1fr, and you place an item in one of those columns whose horizontal size is larger than the equal distributed space then that track will grow to accommodate the content, while the others will become smaller to make space. This is _intrinsic_ sizing. (The [Intrinsic and Extrinsic sizing specification](https://www.w3.org/TR/css-sizing-3) offers a full explanation.)

In this example we have a grid with three child items, and one of those children contains an really long word:

<iframe height="439" style="width: 100%;" scrolling="no" title="Fr units" src="//codepen.io/michellebarker/embed/vwyyWV/?height=439&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/vwyyWV/'>Fr units</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

We can see that the column containing the longer word is larger than the other two tracks, despite being sized with the same unit. (The same thing will happen if you have some content in the grid with its own intrinsic dimensions – e.g. an `<img>` element with `width: 600px` in the CSS.)

This is a sensible behaviour and prevents our content from being cut off, or overflowing the container. But it’s not always desireable. If the purpose of our grid is to impose a strict visual layout, then this has the potential to break our layout. If we want to clamp our grid tracks so that they take up an equal proportion of the available space regardless of the size of their content, we can use CSS Grid’s `minmax()` function. By default, Grid effectively behaves as if 1fr tracks have a minimum size of auto – `minmax(auto, 1fr)`. By supplying a different minimum (e.g. _0_), we can prevent our grid tracks expanding to fit the content. You can see this in action in the following example:

<iframe height="407" style="width: 100%;" scrolling="no" title="Fr units with minmax()" src="//codepen.io/michellebarker/embed/ZNBeQw/?height=407&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/ZNBeQw/'>Fr units with minmax()</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Conclusion

Fr units are actually the simplest units to work with in Grid, and for the most part cause much less pain than using percentages and _calc()_ for your grid tracks! Don’t be put of using them! I hope this article can serve as a handy reference if you ever get caught out in some more unusual scenarios.

## Further reading

[Best Practices with Grid Layout](https://www.smashingmagazine.com/2018/04/best-practices-grid-layout/) by Rachel Andrew

[Understanding Sizing in CSS Layout](https://www.smashingmagazine.com/2018/01/understanding-sizing-css-layout/) by Rachel Andrew
