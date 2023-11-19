---
title: 'A Fun CSS Text Effect'
date: '2023-11-19'
tags: ['post', 'note', 'National Blog Posting Month', 'css']
intro: 'Day 19 of National Blog Posting Month #NaBloPoMo'
---

Today’s post is a quick one, but (hopefully!) a fun one! It’s a demo featuring a fun text effect, using `background-clip: text` and `text-stroke`. It’s not a new technique, but worth remembering.

It looks like the text has been clipped out of the black translucent background, but in fact the `<h1>` just has the same background as the body. I’m making sure they line up with each other by setting the `background-position` to `center`.

<p class="codepen" data-height="400" data-default-tab="result" data-slug-hash="MWLQomX" data-user="michellebarker" style="height: 400px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/michellebarker/pen/MWLQomX">
  Background text fill</a> by Michelle Barker (<a href="https://codepen.io/michellebarker">@michellebarker</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

It’s interesting to see how browsers handle the different properties. `-webkit-text-stroke` (it has to be prefixed to work cross-browser) seems to render unevenly in Firefox with this particular font. I also think it looks pretty cool without the text stroke.

The other trick here is using the `filter` property to create the shadow. The text colour has to be set to `transparent` in order to see the background “through” the text, so `text-shadow` doesn’t work as it hides the text. I’m also using some of these techniques for the hero text effect on my [personal site](https://michellebarker.co.uk/).
