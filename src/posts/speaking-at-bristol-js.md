---
title: 'Speaking at Bristol JS on Super-powered Layouts'
date: '2018-07-02'
tags: ['post', 'events']
---

Last Wednesday I had the honour of presenting a new talk at [Bristol JS](https://www.meetup.com/BristolJS/) meetup group, alongside veteran speaker, JS whizz and web audio pioneer (also a friend of mine!) [Ruth John](https://ruthjohn.com/). Ruth gave a amazing talk on Web Workers and Worklets – complete with lemmings and [lots of demos](https://codepen.io/Rumyra/full/PaBXdX/), which made me excited to learn more about [CSS Houdini](https://developers.google.com/web/updates/2016/05/houdini) and the CSS Paint API.

I’ve only done a handful of talks previously so I was a little nervous about giving my talk, Super-powered Layouts with CSS Grid and CSS Variables ([slides here](https://noti.st/mbarker84/G3yvAE/super-powered-layouts-with-css-grid-and-css-variables)), not least about presenting a very CSS-orientated talk at a JS meetup! However, I needn’t have worried. The Bristol JS audience were fantastic – warm, welcoming and asking lots of insightful questions about CSS Grid and CSS variables.

My talk was loosly based on [this article](https://codepen.io/michellebarker/post/super-powered-layouts-with-css-variables-css-gr) I wrote a couple of months ago about the power of CSS variables combined with Grid. However, in the talk I gave a lot more time to the basics of Grid, as I was aware plenty of people might not be using it yet.

Interestingly, only around a third of the audience had tried (or were currently using) CSS Grid – a similar proportion to those of us developers using it at [Mud](https://ournameismud.co.uk). I’d love to get more of an insight into the reasons why so many people aren’t using it yet, despite around 88% browser support worldwide. My impression from talking to people is that two reasons play a big part:

1.  Concern about supporting IE11< – still a big issue for some organisations.
2.  It’s such a huge spec that people feel there’s so much to learn, and want to set aside a solid amount of time to sit down and tackle it properly.

I get the issues around IE support, and sometimes when you’re working to a deadline there’s a tradeoff between getting something done quickly with the technology you know (such as flexbox or floats) and doing something new that will ultimately benefit your layout (and your learning) but which you need to spend more time providing fallbacks for non-supporting browsers. I do believe that learning Grid is a great investment in skills though, and the more you use it the quicker you become at building Grid layouts, as you become accustomed to familiar patterns. In the Mud pattern library, which we use to quickly build common components, I now keep some regular grid CSS patterns that I frequently find myself reaching for. This not only helps me build layouts quicker (as it includes things like the `@supports` rules that I need), it can also help the developers who are less familiar with Grid pick it up and start using it in their builds.

This brings me to the second point: many people feel a little daunted by the Grid spec and fear information overload. It’s certainly a large spec because there’s so much you can do with it, but it’s actually not very difficult to start building a very simple grid. As a bare minimum you’ll just need two lines of CSS, something like:

```
.grid {
  display: grid;
  grid-template-columns: repeat(6, 200px);
}
```

That already gives you a grid of 4 columns, each one 200px wide. Any children of that `.grid` element will be auto-placed – that is, they’ll each span one column width, and wrap into a new row when each row is filled up.

There is of course so much more you can do with Grid, but don’t let it discourage you. You don’t need to learn it all at once. Each new property you discover gives you a little more power to your layouts. It can still be used in conjunction with other properties, like flexbox – if fact, Grid and flexbox work really well together. You don’t have to choose between one thing or another.

## Is Grid the silver bullet?

One of the questions I was asked at the end of my talk is whether Grid is the silver bullet for layout that we’ve all been looking for. My answer is yes and no. Grid can’t do _everything_ yet. Subgrid, which will allow the grid parameters to be passed down to the grid children, is under consideration for [Level 2](https://www.w3.org/TR/css-grid-2/), with every indication that it will be implemented in some way. But there’s still no sign of a true masonry layout implementation in CSS, which would be extremely useful. However, CSS is gaining new super powers constantly, and I’m confident that in time we’ll see all our layout conundrums solved with CSS. Not only that, but CSS Grid, couple with clip-path(), [Shapes](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Shapes) and more, is sure to usher in a new era of creativity on the web, allowing us to build previously unimaginable layouts.

In the words of Ruth (on that very day):

> Everybody get on the CSS train!
