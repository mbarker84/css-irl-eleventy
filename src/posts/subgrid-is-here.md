---
title: 'Subgrid is here'
date: '2019-05-26'
tags: ['post', 'css grid', 'layout']
---

<figure>
  <img src="/subgrid-is-here.png" alt="An example grid layout with 4 large and 4 small items">
</figure>

Support for [subgrid](https://www.w3.org/TR/css-grid-2/#subgrids) (part of the CSS Grid Level 2 specification) has just landed in Firefox Nightly! To start experimenting with it you’ll need to enable the feature by going to [about:config](about:config) in the browser, then searching for _subgrid_. Toggle _layout.css.grid-template-subgrid-value.enabled_ and _subgrid_ to _true_.

It’s still very early days, but just a couple hours of trying it out have got me really excited about the layout possibilities that this will bring. Once subgrid is more widely supported I think it will open the door for some really interesting, creative layouts.

Here’s a quick demo I’ve been playing around with today:

<iframe height="404" style="width: 100%;" scrolling="no" title="Subgrid test" src="//codepen.io/michellebarker/embed/gJzxBW/?height=404&theme-id=0&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true">
  See the Pen <a href='https://codepen.io/michellebarker/pen/gJzxBW/'>Subgrid test</a> by Michelle Barker
  (<a href='https://codepen.io/michellebarker'>@michellebarker</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Creating a subgrid is pretty simple. A child of a parent grid needs `display: grid`, and either `grid-template-columns: subgrid` or `grid-template-rows: subgrid`. The subgrid can be on the row axis, the column axis or both. The CSS for a very basic example might look something like this:

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 200px);
}

.grid-item {
  display: grid;
  grid-template-columns: subgrid;
  grid-column: 1 / span 2;
}

.subgrid-item {
  grid-column: 2 / 3;
}
```

There are already some [docs on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Subgrid) written by [Rachel Andrew](https://rachelandrew.co.uk/) if you’re keen to get started.

I’m looking forward to spending a lot more time experimenting and building some creative layouts – and I’ll definitely be writing more about it soon!
