---
title: 'How to Convince Your Team to Adopt CSS Grid'
date: '2019-03-09'
tags: ['post', 'css grid', 'workflow']
---

<figure>
  <img src="how-to-convince-your-team.svg" alt="A group of people talking and thinking about layouts">
</figure>

Are you keen to jump into CSS Grid Layout but having trouble convincing the rest of your team (whether your peers or your managers)? Someone asked me recently if I had any advice for convincing a skeptical team to adopt CSS Grid into their workflow. Although I haven’t faced any major barriers on this front myself, it’s a story I hear all too often. You’re ready to dive in and work with the latest modern layout techniques, only for the higher powers to put the brakes on.

Although frustrating, there is some rationality here. Let’s break that down.

As a side note, these thoughts come from my experience in a web agency. I’m not claiming to share everyone’s experience, and other environments may require different approaches. I do think there are _some_ suggestions here that are universally valid, however.

## Why do they need convincing?

### Browser support

The most common reason cited for _not_ adopting Grid is browser support. While Grid has around [85% browser support worldwide](https://caniuse.com/#search=css%20grid), it’s that other 15% that gives pause. A good proportion of these users are on IE, which actually supports CSS Grid’s older syntax since IE10. (I’ll leave the question of whether you want to support the old syntax for another day, but here’s a [good article](https://css-tricks.com/css-grid-in-ie-css-grid-and-the-new-autoprefixer/) to read if you want to go down that road.) Those users need a layout that is, at the very least, usable. That brings me onto the second concern...

### Time

If not all browsers support a CSS property, you need provide a suitable fallback. In the case of single properties used on their own (e.g. `mix-blend-mode`) it can be fairly trivial to write an extra line or two that enables users to still experience your content in a useful (if sub-optimal) way. That’s [progressive enhancement](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement).

With a whole specification like Grid, if you adopt it as your primary layout strategy, it is going to affect not just an element or two, but your entire web page. So it’s a slightly different story. You need to ensure you provide suitable fallbacks, whatever strategy you use to support older browsers. I’m not going to deny that that sometimes takes a bit of time.

If the rest of your team isn’t familiar with Grid yet, then there is also the time factor to consider when it comes to getting everyone up to speed with a new layout strategy. They might be nervous about investing in that training and taking everyone away from existing projects for a day or so.

### Maintainability

Some teams might be concerned that when it comes to someone else in your team picking up your project to work on, they will find it more difficult to maintain because you’re using unfamiliar CSS, rather than _X_ framework. Coupled with that, there are a lot of different ways to build a layout with Grid. If one person is using named grid lines while another is using `grid-template-areas`, for example, it can make for a pretty inconsistent codebase, and potentially a headache for anyone who needs to approach that project afresh.

All of these reasons boil down to time and money. What we need to do is convince your team that Grid can help with both.

## How can Grid help?

Now let’s look at how using Grid can help with the above concerns and more:

### Saving time on complex layouts

Grid vastly simplifies the process of building layouts that would previously have required a lot of hacks and polyfills. If you need to hack your way around a complex design using older layout methods then you’re going to be burning valuable time. Sure, you also need to provide a usable fallback for older browsers, but often this doesn’t need to take a significant amount of time.

If your team is writing their own grid framework using older layout techniques, that all requires time and effort too.

### Embracing creativity

If designers, developers and teams want to push the envelope and build truly creative, modern layouts that stand out from the crowd and embrace a [new era of web design thinking](https://www.zeldman.com/2018/05/02/transcript-intrinsic-web-design-with-jen-simmons-the-big-web-show/), then Grid is integral to that. Grid enables us to build layouts that haven’t been possible with CSS before.

### Better performance

Many projects import in large, unwieldy CSS frameworks for the grid system. Even the minimal ones can end up adding a lot of extra classes, which all add to the weight of your CSS file. For complex layouts that differ from the “standard” columns and rows you might need to turn to Javascript libraries. In my opinion, we almost certainly shouldn’t need to be shipping extra JS just to handle layout in 2019 (with very few exceptions). CSS Grid can handle many complex cases with very little code.

There is also some indication that [creating Grid designs with flexbox is less performant](https://blogs.igalia.com/jfernandez/2015/06/24/performance-on-grid-layout/) – although I’ve been unable to find further resources on this with quite the same level of detail.

### Better maintainability

Because Grid is just native CSS, there’s no risk that it’s going to break and you’ll have to refactor your project in a year’s time. It’s inherently stable. Browser support is only going to get stronger. Conversely, dependencies _do_ break projects. They need maintaining. You might have to revisit a project in a year or two, only to find that it uses an old grid framework that is no longer actively maintained, or the version you’re using is out-of-date and you can’t find the documentation. Well-known frameworks like Bootstrap are perhaps less likely to have this problem, but they come with the performance trade-offs.

Likewise, investing in your team learning Grid is a secure investment for the future. It’s not a framework that’s going to be obsolete in a few years, it’s foundational CSS that’s here to stay. Those skills are going to be useful for many years to come.

## So, how do you convince your team?

### Websites don’t have to look the same in all browsers

I believe the biggest barrier to widespread adoption of Grid is the common misconception that websites have to look the same in all browsers. Unfortunately, it can be the case that managers either believe this to be the case, or fail to communicate otherwise to the client. No one wants to be in a situation where your client opens your beautiful, shiny new website on their ancient, creaking machine running IE9 and is immediately flabbergasted that it fails to live up to the designs.

That means you need to put the case forward for progressive enhancement, and help ensure that that communication happens at higher levels. Make managers and designers aware of the limitations of older browsers, and the cost of implementing designs to look the same everywhere. This shouldn’t be on a project-by-project basis, but a strategy across the whole organisation.

I’m aware of how difficult it sounds to change the mindset of an entire organisation, and it is unlikely to happen overnight. One idea I have seen proposed is for designers to actually design a version of the site with a simplified layout to present to the client as a fallback alongside the fully-supported version, in the same way they would present mobile and tablet versions of the design. That way the client is aware that some browsers will be getting the simpler layout, and there’s no big surprise. Plus the designer can actually design it in a way that looks good, rather than relying on a developer’s interpretation. Although there will inevitably be a bit more design time involved, there could be great savings on the development side. I would love to see this approach become more widespread.

### Try it out

You don’t _have_ to go all-in with Grid – it’s doesn’t have to be an all-or-nothing approach. One of the best ways to introduce Grid is to start with smaller UI modules. That way you have a chance to visually showcase the benefits and hopefully educate – or at least pique the curiosity of – your other team members. It’s often better to show rather than tell.

There’s nothing wrong with using Grid alongside your existing layout system while people get comfortable with it. That gives you time for the next part...

### Plan a strategy

As I mentioned earlier, there are many ways to build a layout in Grid. You need to think through how you and your team will implement it to ensure that consistency and maintainability do not become issues. You might decide that once everyone has learnt the basics then they can use any approach they like for getting the job done, or you might decide to only used line numbers for placement and avoid `grid-template-areas`, for instance, to save confusion. You might decide to create a handful of utility classes for your most common layout needs, or your might decide to keep your grid code tightly coupled to components.

You’ll also need to think about your strategy for browser support. Should you use `@supports` and wrap all of your Grid code inside that, or only where it’s strictly required? Do your research and come up with a plan. It’s likely that your approach will evolve over time, but you need to demonstrate you’ve thought about it in order to provide the smoothest transition for your team.

### Present a proposal

Try and engineer an opportunity to present your proposal to your team and/or manager. If you can make others feel like they’re part of the discussion they’re more likely to come on board. Plus there might be some other pitfalls you haven’t thought of, which they can point out and you can overcome together.

It can often be hard to push for change within an organisation. Your best bet is to highlight the good stuff, make sure you consider any downsides, try to pre-empt questions. Lastly, get some allies! It’s much easier to promote change together!
