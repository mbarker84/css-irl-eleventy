---
title: CSS Masonry Layout Syntax
date: '2024-10-31'
tags: ['post', 'note', 'css', 'layout']
---

Ahmad Shadeed has published a great article digging into the proposed [CSS masonry layout syntax](https://ishadeed.com/article/css-grid-masonry/). In case you’re unaware, the term “masonry” for layout is used to describe the kind of grid layout where instead of items of various heights being aligned in neat horizontal rows, they are shifted to fill the leftover space, effectively creating a brickwork effect. It was popularised by the website Pinterest some years ago, and became a widespread UI design trend for a while.

<!--excerpt-->

<figure>
  <img src="/masonry-syntax_1400.webp" alt="Screenshot of photo grid with masonry layout" width="1600" height="900" srcset="/masonry-syntax_1400.webp 1400w, /masonry-syntax_900.webp 900w" sizes="(min-width: 1086px) 75vw, (min-width: 1264px) 930px, 90vw">
  <figcaption>Masonry example from the Webkit blog</figcaption>
</figure>

As it has always been impossible to build a **true** masonry layout in CSS, developers have traditionally reached for Javascript libraries to fill the gap. These libraries come with a performance cost though, and I would argue we really shouldn’t be using JS for layout in 2024. Although this type of layout has fallen out of fashion in recent years, it’s still popular enough that it’s worth considering how we could implement this in CSS. To me, it feels like this would plug one of the final holes and would mean we could throw away JS layout dependencies for good.

Jen Simmons’ [post on the Webkit blog](https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3) includes some really nice examples of different layouts for a photo grid that could be created with the new masonry proposal, and perhaps we’ll see a resurgence in these kind of designs once they become easier for developers to build.

At the moment where exactly masonry fits into CSS layout as a whole is a hotly contested topic. The two options alighted upon by the working group essentially boil down to:

1. Part of Grid (with `grid-template-rows: masonry`, for example)
2. Its own thing (e.g. `display: masonry`)

Of course, it’s not nearly as simple as that, as there are a whole host of other issues to consider. Partly this question arises because a masonry layout is effectively a grid, but in **one direction**. Making it part of Grid opens up a can of worms regarding how Grid’s other features should work alongside it. But is it really worthy of its own layout method?

Ahmad makes a great point about [the name](https://ishadeed.com/article/css-grid-masonry/#the-name) “masonry” too, arguing that it’s too analogous to the real world compared to other CSS properties. If we were talking about something entirely new here I would tend to agree, but “masonry” as a layout method has been around for a long while now, even though we couldn’t do it in CSS. It feels to me like it’s become somewhat divorced from its original meaning and is now common parlance for describing a particular type of web layout. (After all, the term “masonry” describes construction with brick or stone, which are generally staggered in the horizontal direction, unlike what we think of as masonry on the web, which tends more often to be vertically staggered.)

It’s well worth reading Ahmad’s full article, which is packed with examples and useful demos.

{% hotlink 'https://ishadeed.com/article/css-grid-masonry', 'Read the article' %}
