---
title: 'To Grid or to Flex?'
date: '2019-02-10'
tags: ['post', 'css grid', 'flexbox', 'layout']
---

A recent [Twitter thread](https://twitter.com/chriscoyier/status/1088827201468813312) started by Chris Coyier got me thinking about how people in general interpret the use cases for CSS Grid Layout versus flexbox:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">For y&#39;all that have an understand of both CSS grid and flexbox, what&#39;s your favorite way of explaining the difference?</p>&mdash; Chris Coyier (@chriscoyier) <a href="https://twitter.com/chriscoyier/status/1088827201468813312?ref_src=twsrc%5Etfw">January 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Naturally some of the most insightful replies came from Rachel Andrew and Jen Simmons:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Flexbox is for one dimensional layout. A row OR a column. Grid is for two dimensional layout. Rows AND columns.</p>&mdash; Rachel Andrew (@rachelandrew) <a href="https://twitter.com/rachelandrew/status/1088827732874747910?ref_src=twsrc%5Etfw">January 25, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">Grid makes actual columns and rows. Content will line up from one to the other, as you ask it to. Flexbox doesn’t. Not only in the second dimension (which is easiest to talk about), but also in the first dimension. Flexbox isn’t for most of the things we’ve been using it for.</p>&mdash; Jen Simmons (@jensimmons) <a href="https://twitter.com/jensimmons/status/1089181330133450752?ref_src=twsrc%5Etfw">January 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

However, reading tweets individually doesn’t tell the whole story. In this article I want to unpack when and where you might want to use Grid or flexbox, and some reasons for choosing one or the other.

What surprised me about reading the responses in the thread was the number of people stating that they would only use Grid for page-level layout, and flexbox for everything else. If you take this as a rule, then you’re severely limiting yourself when it comes to Grid’s power. The main piece of advice I would give is to take every design individually, analyse the options available and don’t make assumptions about which technology you need. Here are some of the questions you could ask yourself when it comes to choosing a layout method.

## How much maths do you have to do?

My own contribution to the thread was this:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">If it looks like I’d need to reach for calc() a lot for layout then that’s usually a good sign of when I need Grid over flexbox</p>&mdash; Michelle Barker (@mbarker_84) <a href="https://twitter.com/mbarker_84/status/1089182216020742144?ref_src=twsrc%5Etfw">January 26, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

Often, if you’re having to use _calc()_ a lot to get precise track sizes (factoring in gutters, for example) then it’s worth considering using Grid, as the _fr_ unit will do the heavy lifting for you and save you any number of headaches. While that’s fine as a general principle, it’s not the whole picture. There are cases when you might need Grid, even though your layout doesn’t require _calc()_. One example might be a fixed-width, two-dimensional layout, where each track is 200px wide - you don’t need _calc()_ to tell you how wide those tracks should be, but you might still want the behaviour of Grid. Likewise, there are cases for using flexbox where you do need _calc()_, so this can only be interpreted as a guideline.

## One dimension or two?

A big difference between Grid and flexbox is that Grid allows us to control the placement of items in two dimensions (rows and columns), where flexbox does not. Again, that doesn’t mean you should _never_ use grid for one-dimensional layouts. I’ve often opted to use Grid when I need to prescisely control the size and placement for items in one dimension like in this demo and [accompanying article](https://css-tricks.com/super-power-grid-components-with-css-custom-properties/):

<iframe height="417" style="width: 100%;" scrolling="no" title="CSS Grid components with variables and media queries" src="//codepen.io/michellebarker/embed/XBPMZZ/?height=417&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/XBPMZZ/'>CSS Grid components with variables and media queries</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## How do you want elements to behave?

Grid is often the right choice when you need to control the layout in two dimensions. That doesn’t make Grid a better choice for _everything_ though. With Grid you have tracks (rows and columns), cells, and grid areas (a group of more than one cell) and items must be placed in these cells or Grid areas.

Let’s say we have a layout like this:

We have a grid of nine items of equal width placed from left to right in rows of three, and a 20px gap between each item. We could build this with either Grid or flexbox. The Grid code is much simpler and cleaner:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 200px;
  /* Assuming we want our rows to be a fixed height – could be left as the default `auto` if we want the height to respond to the content */
  gap: 20px;
}
```

Items are then auto-placed without us having to do anything further. If we want to be really smart about it, we could use Grid’s _auto-fit()_ and _minmax()_ functions to give us a fully responsive layout without the need for media queries – try resizing this example and see what happens.

<iframe height="413" style="width: 100%;" scrolling="no" title="Grid auto-fit example" src="//codepen.io/michellebarker/embed/bzvGaE/?height=413&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/bzvGaE/'>Grid auto-fit example</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

I recommend watching Heydon Pickering’s video [Algorithmic Layouts](https://www.youtube.com/watch?v=qOUtkN6M52M) for an overview of this technique and more.

By contrast, if we were to create this layout with flexbox, we would need to style the actual _items_ as well as the grid container:

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  margin: -10px;
  width: calc(100% + 20px);
}

.item {
  width: calc((100% / 3) - 20px);
  flex: 0 0 auto;
  margin: 0 10px 20px 10px;
}
```

We need negative margins on the grid container to counteract the fact that the total width of the items would be larger than the container itself, and therefore wrap onto the next line. We also don’t get the same responsive behaviour out of the box and would likely need to use media queries.

<iframe height="419" style="width: 100%;" scrolling="no" title="Flexbox layout examples" src="//codepen.io/michellebarker/embed/VgXwRJ/?height=419&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/VgXwRJ/'>Flexbox layout examples</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

There are a few different ways to achieve this same layout with flexbox, but they all feel a bit hacky – and that’s because they are. We’re using flexbox for something it wasn’t really designed for – but that doesn’t mean it’s always the wrong choice.

Many modern CSS frameworks use some variation on this method for layouts. As a side note, if you do need to go down this route, I’m a big fan of [Susy](https://oddbird.net/susy/), which handles the maths for you.

So, which is the better choice here – Grid or flexbox? It would seem that Grid has some clear advantages here, but in order to answer this question we need to think about what should happen when we have more than nine items but fewer than 12 (the next multiple which would allow them to fill a row). Do we want the new items to simply sit at the start of the next row like the examples we’ve already seen? Or do we want them to behave differently? Perhaps if there is only one item on the next row we want it to take up all the available space in the row, like example A below. Or perhaps if there are two items then we want them to be centred, like the example B.

<figure>
  <img src="to-grid-or-to-flex-01.svg" alt="Two flexbox layout examples">
</figure>

Using Grid Layout and auto-placement, we only have the option of the last item being placed in the cell on the left as in the earlier examples – assuming the value of the [direction](https://developer.mozilla.org/en-US/docs/Web/CSS/direction) property is not set to `rtl` (in which case the placement of item will flow right-to-left, and last item will be placed in the cell on the right). The following items will be placed in the next available grid cells. Flexbox allows items to, well, _flex_. That means we can control the behaviour of those items using a combination of flex and alignment properties.

<iframe height="414" style="width: 100%;" scrolling="no" title="Flexbox layout examples" src="//codepen.io/michellebarker/embed/MLVYOq/?height=414&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/MLVYOq/'>Flexbox layout examples</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

So whether you choose Grid or flexbox for the layout above really comes down to how you want your grid items to behave – and there may be different answers for different situations.

## Are you trying to replace flexbox with Grid?

When I give talks I often get asked when I would use flexbox instead of Grid, and whether we even need flexbox anymore. As we’ve seen in the example above, Grid is not a replacement for flexbox. Both of them co-exist quite happily, and knowing when to use each of them gives even more power to your layouts!

<figure>
  <img src="to-grid-or-to-flex-02.jpg" alt="A component built using Grid">
</figure>

In the component above, I needed to control the placement of the text, image and heading on the column _and_ row axis, and control how they would interact with each other to an extent. The only way to do this satisfactorily would be to use Grid.

But I absolutely would use flexbox to build a desktop navigation menu:

<iframe height="314" style="width: 100%;" scrolling="no" title="Flexbox navigation" src="//codepen.io/michellebarker/embed/bzvNmL/?height=314&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/bzvNmL/'>Flexbox navigation</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Here I want to control the flow in a single dimension, and I want the items to be _flexible_ – which flexbox does really well. With flexbox we could opt to have those items wrap or not, and allow them to wrap gracefully if the space doesn’t allow for all items to be displayed on one line.

## How should the layout look in browsers that don’t support Grid?

If we’re using Grid, the other issue we need to take into account is browser support, and what we want to happen to our layout in browsers that do not support Grid (IE11 and below). My approach to is to use feature queries to cater for these cases. Often (but not always) I opt for a flexbox-based layout as a fallback for older browsers:

```css
.grid {
  display: flex;
  flex-wrap: wrap;
  /* Rest of the fallback layout code */
}

@supports (display: grid) {
  .grid {
    display: grid;
    /* Rest of the Grid code */
  }
}
```

However, if you find yourself spending hours trying to replicate the _exact same_ layout for browsers that don’t support Grid, then there’s probably not a lot of reason to use Grid in the first place. The great thing about Grid is it can do things that flexbox alone can’t do.

We’ve discussed some very simple, common layout examples here and how to implement them with Grid or flexbox. To see some more complex layout examples, have a look at the other articles on this blog, or stay tuned for more posts in the future.
