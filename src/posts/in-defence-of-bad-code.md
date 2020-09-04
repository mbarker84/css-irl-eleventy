---
title: 'In Defence of Bad Code'
date: '2018-06-14'
tags: ['post', 'workflow']
---

I saw a tweet the other day from [Christian Heilmann](https://twitter.com/codepo8) of Microsoft (formerly of Mozilla), a big name in the web industry and tech conference circuit:

<blockquote class="twitter-tweet" data-lang="en"><p lang="en" dir="ltr">&lt;button class=&quot;button button--primary button--dark button--chromeless button--withIcon button--withSvgIcon u-padding12 u-borderRadius4 u-borderDarker&quot; data-action=&quot;play-audioPlayer&quot;&gt;<br><br>Somewhere along the path, we replaced CSS values with classes.</p>&mdash; Chris Heilmann (@codepo8) <a href="https://twitter.com/codepo8/status/1006765051116695552?ref_src=twsrc%5Etfw">June 13, 2018</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

It wasn’t the tweet itself that rankled – I myself have rolled my eyes at similar chunks of code on occasion, and Christian didn’t explicitly make any further comment on it. It was the replies in the thread below that got to me. Because they were nearly all (at the time of writing), along the lines of “Oh my god, that’s disgusting, how could someone write code like that”, and of course, the sanctimonious “I myself never saw the point in [utility classes, BEM, etc - insert here]”. People seemed to take vindication from the original tweet, as if it proved that they had been right all along, and that it was always inevitable that these new-fangled CSS methodologies were always going to lead straight to hell - and of course, they would never write code like that themselves.

Leaving aside for a moment the fact that we’re talking about A BUTTON – and users don’t give a crap how many classes a thing has, as long as it looks like a button and behaves like a button – it’s all too easy for me to imagine how this poor little element’s code could have got to this point. And I’m pretty sure I’m not the only one who can recall writing code like this at some time or another.

Picture the scene, if you will:

**Dev 1:** Hi, welcome to the team! We use BEM here. Anyway, here’s a UI to build.

**Dev 2:** Ok, cool. Well, I can see that this thing here is going to be a button, so I’m going to call it _button_. That way whenever someone uses it they’ll have a thing that looks like a button. Even when we want to style an anchor tag to look like a button (which happens a lot), we’ll be able to use this class.

_Later…_

**Dev 2:** This button needs an icon, which requires me to style the button a little differently, but I want to keep my code as DRY and reusable as possible, so I’m going to create a modifier class called _button--withIcon_.

_Still later…_

**Dev 2:** We’ve been using icon fonts everywhere, but it turns out this button’s icon needs to animate a little bit, so I’m going to use an SVG for that instead. I’ll add this class, _button--withSVGIcon_ so I can style the icon’s animations in my _\_button.scss_ file, since they’re specific to buttons only. I want to keep all the styles from _button--icon_ and just layer these animation styles on top, so I’ll leave both classes in there.

_Still later..._

**Designer:** We’ve got some feedback from the client, and this particular button’s going to be used on a light background, so we need to make the colour a bit darker here so it’s more user-friendly. We don’t want to affect any of the other places the button is going to be used on the site.

**Dev 2:** Ok, I’ll add a modifier class: _button--dark_ will give a darker variant of the button, for light backgrounds.

**Designer:** We also want to get rid of that chrome effect here, it’s not right for this particular button.

**Dev 2:** Great, _button--chromeless_ will be useful for when we want flat-style buttons.

_6 months later…_

**Dev 3:** Right I need to do some quick amends to this video component with the button here. I don’t want to mess with those existing classes as they’re probably being used elsewhere, but we’ve been taking a utility-first approach to CSS lately, so I’m just gonna add a couple of utility classes to add a few little styling tweaks to this one.

It’s too hard to imagine how that class list could get out of hand.

Any what’s so bad about this code, anyway? Do those classes solve the problems at hand? Probably. Do they hinder the user? Unlikely. The developer who has to maintain it is maybe inconvenienced, but on the other hand, those classes tell us more or less what that piece of the UI should look like and where we can find the corresponding CSS, and they’re reusable too, so maybe it’s not all bad.

How often do you go back to old projects and look at your code – any code – and think “Ugh, what was I thinking?”. For me anyway, it’s pretty often. Sure, you start every project with the best intentions of keeping your code super clean and tidy, and for a while maybe all goes to plan. But in an agency environment, before long you’re rushing to meet deadlines and get projects out the door. You have to weigh up time spent refactoring against adding a quick and dirty hack that solves the problem at hand. And quite often, that’s good enough. Don’t feel bad about it, move on and try to learn lessons for next time.

In a large, constantly evolving codebase that needs to be maintained then refactoring is probably worthwhile, but sometimes it’s not.

With the best will in the world, projects evolve, functionality needs to be bolted on, and often a quick fix with a utility class is preferable to 2+ hours of refactoring, especially when you know that a project doesn’t need to be maintained all that often. Since I first read the Twitter thread many people have added replies suggesting many different methodolgies for improving this button’s code. Which kind of proves my point.

So let’s not code-shame each other. Each project and each team has its own needs. Maybe you like BEM, or maybe you prefer SMACSS. Maybe you favour utility classes, perhaps as few classes as possible. Maybe CSS-in-JS is more your bag. All are perfectly valid, each has different strengths and weaknesses. As long as you try to stick with one and use it consistently (especially in a team) things will be fine, and if you have to throw in some hacky stuff every now and then the world probably won’t end. We have better tools than ever before to help us debug even the messiest code, and while you should always try to leave a codebase in a better state than you found it, even that is subjective.

And, if in doubt, always remember the golden rule: Comment The F\*\*\* Out Of It.

Thanks for reading this far. As a side-note, [this Twitter thread](https://twitter.com/rachsmithtweets/status/1007023291389784064) from [Rachel Smith](https://twitter.com/rachsmithtweets) says all this way more concisely.
