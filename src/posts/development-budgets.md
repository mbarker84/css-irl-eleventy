---
title: 'Development Budgets'
date: '2021-04-15'
tags: ['post', 'workflow', 'opinion']
---

Personally, I find that one of the hardest things to do as a developer is estimate how long a piece of work will take. At [Atomic Smash](https://atomicsmash.co.uk) we’ve developed some processes over time that enable us to estimate a lot of common development tasks with _some_ degree of accuracy:

- We invest a lot of time in planning.
- We break projects down granularly, so that we’re mostly estimating individual tasks rather that large bodies of work.
- We record our time, so that hopefully when another project comes around that needs similar functionality, we’ll be able to estimate even more accurately, with greater awareness of any potential stumbling blocks.

In addition, we have an in-house boilerplate, which is added to over time, to make the development process faster, as well as easier to estimate.

But in almost every project, there is always some piece of functionality that is difficult to plan and budget for accurately. On the front end, it’s nearly always a Javascript-heavy area of the site. In part, this is down to those parts being more complex in their requirements, and difficult to break down into granular tasks. These parts might also require a lot more research and experimentation: sometimes I have no idea how I’m going to build something until I’ve had some time to conduct the necessary research — and in those cases I have to be honest when it comes to my estimates and give a ballpark range with the caveat that it could vary wildly. I try to err on the side of caution with those type of estimates and give higher numbers, even when it’s not what the project manager wants to hear.

Another reson for the difficulty with estimating these JS-heavy tasks is the time that needs to be spent testing and debugging. Often a component that looks simple on paper throws up all sorts of edge cases when users interact with it in ways we don’t anticipate. In most cases it falls to the developer to consider all these possible scenarios. If we’re doing our jobs properly, we should be building accessible components and asking ourselves questions as we go: Can users who rely on keyboard navigation focus on links within this accordion? How does a screenreader user know there is additional content available by clicking on this icon button? How is this tooltip accessed when using a touch device, as opposed to a mouse? How do we accommodate users with motion sensitivity in a site with lots of animation?

However simple a component looks at the design stage, when I’m estimating I try to add 60–80% extra to budget for making it fully accessible and doing the necessary testing. How a component functions in its most basic form is just the tip of the iceberg: It’s relatively easy to build a tab component (for instance), but to build an _accessible_ tab component? That’s considerably harder — but should be non-negotiable.

That’s not to say my own estimates are always 100% accurate, and I don’t have all the answers on the best ways to estimate accurately. But recording front end estimates for each component in a design allows me to better consider the overall development budget (in terms of number of hours), and plan with the design team accordingly. If the designer or the client comes to me with a feature request on a project, I can assess its impact on the development budget and frame it as a trade-off. Many of our clients have fixed budgets, so adding a feature that requires a lot of work could mean having to simplify several other features in order to free up the necessary time. Sometimes this discussion results in a simplification of the design, and often I can work with the designer to suggest ways to make the feature more attainable within the budget.

Another advantage with taking a granular approach is that at any time in the project you can see how many estimated development hours are remaining. It becomes much easier for the project manager to see if a project is running behind and needs extra resources.

Estimates can never be perfect: there will inevitably be tasks that end up being more difficult and time-consuming than budgeted, in ways that cannot be foreseen. But much like managing personal finances, budgeting development work is a skill that’s worth working on, and can greatly reduce stress on a project.
