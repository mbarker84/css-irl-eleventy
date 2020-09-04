---
title: 'Solving a Tricky Layout Problem with CSS Grid'
date: '2019-01-12'
tags: ['post', 'css grid']
---

Last year, while working at [Mud](https://ournameismud.co.uk/), I worked on the CSS on a site for [Warner Brothers Leavesden Park studios](https://wbsl.com). A large part of my contribution involved using CSS Grid to build a variety of component layouts, and the layouts I built for that site have become the subject of some of my talks and articles.

This article is a case study on a particular component with a unique layout and a set of constraints. Building a layout that worked for the large number of requirements, as well as unknown content, required applying lateral thinking and a great deal of problem solving to find the right solution.

One such component looks like this:

<figure>
  <img src="/solving-a-tricky-layout-problem_01.jpg" alt="A component with a large, centred heading, a block of text on the top right and a large image on the left">
</figure>

It consists of an image or video, a large heading centered both horizontally and vertically and a block of text. The text block is aligned to the top of the image in this case, but could equally be aligned to the bottom of the image if chosen by the content author.

Not too onerous, you might think, and should be simple enough with modern layout methods. But this component comes with a set of contraints:

- The heading must be horizontally centered within the component, and vertically centered over the image.
- The text block must align to the top or bottom of the image, _unless_ the text is longer than the available space, in which case it should extend upwards (or downwards if aligned to the bottom).
- The image dimensions are unknown and not constrained by an aspect ratio – in other words, content authors could upload images of any dimensions, without causing them to be cropped.
- The length of the heading and the text block are also unknown.

The design itself consisted of a 24-column grid, and multiple variants of the component – where the image and text block could align to various different grid columns. For the purpose of this article we won’t focus on the column axis for now, as the primary focus here is the alignment of grid items on the row axis.

I’ve created a simplified view of the same component, which allows us to more easily see the bounding box for each element. (Imagine the pink outline is the component’s bounding box.)

<figure>
  <img src="/solving-a-tricky-layout-problem_02.png" alt="Simplified illustration of the component layout">
</figure>

Let’s assume the following markup for the grid container and direct children (our grid items) – we’ll ignore everying inside those elements for the purpose of this article, so that we can just focus on the layout:

```html
<article class="grid">
  <div class="grid__heading">Heading</div>
  <figure class="grid__image"></figure>
  <div class="grid__text"></div>
</article>
```

We have the following CSS to define our grid and place items on the column axis:

```css
.grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) repeat(24, minmax(0, 60px)) minmax(0, 1fr);
  column-gap: 20px;
}

.grid__heading {
  /* Using a negative line for the grid-column-end value allows us to easily center the position of the heading when we have a large grid */
  grid-column: 5 / -5;
}

.grid__image {
  grid-column: 2 / 16;
}

.grid__text {
  grid-column: span 5 / -1;
}
```

If you’re curious about the values we’re using for the `grid-template-columns` property, I have [an explanation here](https://codepen.io/michellebarker/post/css-grid-more-flexibility-with-minmax).

Now we need to define our grid rows. My initial thought was that we could define the `grid-template-rows` property as follows:

```css
.grid {
  grid-template-rows: 1fr auto 1fr;
}
```

This gives us a central row with the value of `auto` for our heading (as we don’t know how long this will be, and we want the track to grow to fit the content), and two surrounding rows of `1fr`. These two outer rows will take up an equal proportion of the available space. If we set `row-gap: 40px` (using the shorthand `gap` here for `grid-row-gap` and `grid-column-gap`) then we’ll get a 40px gutter above and below the heading, to maintain space between it and the text block.

<figure>
  <img src="/solving-a-tricky-layout-problem_03.png" alt="Component with row tracks highlighted">
</figure>

We can also use flex alignment properties with Grid, which are going to be really useful here. I’m using `align-items: center` to horizontally centre our grid items. It’s not yet obvious why we need to do that, but we’ll soon see that it becomes more useful if our text content is longer than the available space.

```css
.grid {
  /* ...Other grid code */
  grid-template-rows: 1fr auto 1fr;
  gap: 40px 20px;
  align-items: center;
}
```

Now we can place the grid items on the row axis:

```css
.grid__heading {
  grid-row: 2;
}

.grid__image {
  /* From the start of the grid to the end */
  grid-row: 1 / -1;
}

.grid__text {
  grid-row: 1;
}
```

All of our items are currently centrally aligned in their grid boxes, but if I use `align-self: flex-start` on the text block then that item will align to the top of the component, while the heading and image are centrally aligned (due to `align-items: center`, which we specified on the grid itself).

```css
.grid__text {
  grid-row: 1;
  align-self: flex-start;
}
```

So far so good. It looks like we’ve got this layout nailed. There’s just one problem: When the text block is longer than the space between the heading and the top of the image the component expands to accommodate it, pushing the image and heading downwards (which is what we want) – but unfortunately the bottom of the grid also expands, giving us extra space below the image:

<figure>
  <img src="/solving-a-tricky-layout-problem_04.png" alt="Showing extra space created at the bottom of the grid">
</figure>

If we have several components stacked on top of each other then the vertical space between them will be uneven. This isn’t ideal. What we want is for the component to grow vertically at the top (the side of our text block) but not the bottom.

<figure>
  <img src="/solving-a-tricky-layout-problem_07.png" alt="The same grid with the height of the top row only increased">
  <figcaption>The idea solution: the top row track size increases, but the bottom does not</figcaption>
</figure>

To fix this I had to think creatively! Let’s walk through the solution step-by-step.

First of all we’re going to change the three row track sizes to `auto`:

```css
.grid {
  grid-template-rows: auto auto auto;
  gap: 40px 20px;
  align-items: center;
}
```

Then we can add an extra row above our existing rows with a height of `1fr`. It’s perhaps not as obvious what will happen using the `fr` unit on the row axis. On the column axis, we know the width of our grid (which will be 100% by default), so it’s easy to imagine a column track of `1fr` filling a proportion of that space. When it comes to the row axis, the height of our grid in this case will be determined by the height of the tallest grid item – the image – which is currently placed from the first to the last grid line.

```css
.grid {
  grid-template-rows: 1fr auto auto auto;
  gap: 40px 20px;
  align-items: center;
}
```

The row we’ve added is effectively a hidden row – it’s going to collapse to `0` unless we place content in it.

<figure>
  <img src="/solving-a-tricky-layout-problem_05.png" alt="Hidden row at the top of the grid">
</figure>

There are a couple more things we need to do to our grid container before we look at item placement. We’re going to set the `row-gap` to 0 and add tracks of 40px between the heading row and its adjacent rows. We can also remove `align-items: center`, as we won’t need it anymore.

```css
.grid {
  grid-template-rows: 1fr auto 40px auto 40px auto;
  gap: 0 20px;
}
```

Now that our grid has six rows, it’s not so easy to visualise where to place our grid items on the row axis. There are more grid lines to keep track of! Naming our grid lines will be very helpful here. Then we can reference those line names to place our grid items.

```css
.grid {
  grid-template-rows:
    [text-start] 1fr [image-start] auto [text-end]
    40px [heading-start] auto [heading-end] 40px
    auto [image-end];
  gap: 0 20px;
}

.grid__heading {
  grid-row: heading;
}

.grid__image {
  grid-row: image;
}

.grid__text {
  grid-row: text;
  align-self: flex-start;
}
```

Eagle-eyed readers might notice that our text block now spans two tracks (starting at grid line 1), and our image no longer starts at grid line 1 but at line 2 instead. However, visually nothing has changed.

When we add a longer paragraph of text into the text block, it’s then that we can see the benefit of these changes. The hidden row that we added expands, while the image and heading remain centrally aligned with one another – crucially, _without_ extra space being added at the bottom of the grid!

<figure>
  <img src="/solving-a-tricky-layout-problem_06.png" alt="Hidden row expanding when text block is longer">
  <figcaption>The top row of the grid expands as the text content grows longer</figcaption>
</figure>

Hopefully it’s more obvious now why we needed to set the `row-gap` to 0 and instead use extra tracks as our gutters: if we had 40px `row-gap`, this would be visible at the top of the grid even when the text content was shorter and therefore the first track had collapsed completely. Unfortunately we can’t set different values for the `gap` properties on a single axis, otherwise we wouldn’t need those extra rows.

For a different component variant – where the text block is below the heading instead of above – we can just change the `grid-template-rows` property to include the hidden row and the end instead of the start.

```css
.grid--text-bottom {
  grid-template-rows:
    [media-start] auto 40px
    [heading-start] auto [heading-end]
    40px [text-start] auto [media-end]
    1fr [text-end];
  gap: 0 20px;
}
```

Here’s the full demo:

<iframe height='474' scrolling='no' title='CSS Grid Complex Component' src='//codepen.io/michellebarker/embed/yGzWme/?height=474&theme-id=0&default-tab=result' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/michellebarker/pen/yGzWme/'>CSS Grid Complex Component</a> by Michelle Barker (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

This solution was not actually implemented in production – it was only much later that I figured this out! Although it’s not a common layout problem to have, I hope this demonstrates some of the tricks and methods that can be employed with Grid to produce unusual layouts.
