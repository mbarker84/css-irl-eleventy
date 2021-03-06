---
title: 'Tailwind Thoughts'
date: '2020-10-22'
tags: ['post', 'css', 'workflow', 'opinion', 'tailwind']
---

Although I use utility class framework [Tailwind CSS](https://tailwindcss.com/) for work, in some ways I am a reluctant user. I actively advocated for us to adopt it as a team, but there’s still something about it that doesn’t feel quite as good (for me) as writing “real” CSS. It has its limitations which, I believe, are worth considering before wholesale adoption. (I wrote about [my feelings towards it](https://css-irl.info/a-year-of-utility-classes/) some time ago.) Nevertheless, its many advantages – the speed which it allows for building components, the consistency it brings to projects that might have several different team members working on the front end, the clear documentation – make it a worthwhile choice for us at [Atomic Smash](https://www.atomicsmash.co.uk/).

Since I started using Tailwind more than two years ago, plenty of new features have been added that make it easier and more appealing to use. One of my gripes was that I frequently had to jump back into “real” CSS territory if I wanted to do anything remotely complex with CSS – working with complex grids, dealing with browser support issues via [feature queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@supports), etc – which often meant refactoring, and could be time-consuming. Happily, I’m finding that I need to do that less and less. I do still find it easier to work in a Sass partial for particularly complex styling, but this is less of an issue than before, as it’s usually quite isolated cases. These days Tailwind ships with a bunch of utility classes for CSS Grid, transforms, gradients and much more. It also bundles [PurgeCSS](https://purgecss.com/), so there’s no need to install this separately. Since this addition I’ve run into a lot fewer problems with incorrect styles being purged, which has made the whole process much smoother.

I’m also impressed by the Tailwind team’s commitment to tackling common styling issues. Little things like the `divide-*` classes, which apply [borders between elements](https://tailwindcss.com/docs/divide-width) by targeting the children of a container. These things aren’t difficult to do with CSS, but having those utility classes to hand can end up saving time.

## Custom property magic

I was interested to read recently, in an article by Tailwind’s creator [Adam Wathan](https://twitter.com/adamwathan), about [how the team uses custom properties (CSS variables)](https://adamwathan.me/composing-the-uncomposable-with-css-variables/) to compose various utility classes. It’s well worth reading about how they came up with some pretty creative solutions, such as deliberately using whitespace as a valid property value in order to compose shorthand properties. Interestingly, [Lea Verou](https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/) wrote about a similar technique [on her blog](https://lea.verou.me/2020/10/the-var-space-hack-to-toggle-multiple-values-with-one-custom-property/), so perhaps this is a technique that’ll gain consensus. (It’s worth noting Adam’s observation at the end of his piece about how most CSS minifiers will currently strip this out in production though.)

It’s refreshing to see how Tailwind has evolved, and interesting to see its creators leveraging modern CSS specifications to make it more powerful. I’m looking forward to seeing how it evolves in the future to support the increasingly mighty CSS landscape.
