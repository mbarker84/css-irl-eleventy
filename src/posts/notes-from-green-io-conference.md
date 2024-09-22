---
title: Notes From Green IO Conference
date: '2024-09-22'
tags: ['post', 'events', 'web sustainability']
related:
  [
    { title: 'Building a Greener Web', url: '/building-a-greener-web' },
    {
      title: 'Video: Building a Greener Web (Smashing Meets Goes Green)',
      url: '/video-building-a-greener-web-smashing-meets',
    },
  ]
---

Last week I attended [Green IO](https://greenio.tech//conference/9/london-2024-september-green-it), a conference in London all about sustainability in digital technology, organised by Gaël Duez (who also hosts the [Green IO podcast](https://podcasts.castplus.fm/greenio/)). It was a fantastic conference, and amazing to see so many people who are passionate about this stuff all in one room!

I’m not great at taking notes during talks, but there were so many great takeaways I wanted to sum up a few while it’s fresh.

## Consensus is key

Chris Adams of the [Green Web Foundation](https://www.thegreenwebfoundation.org/) gave the opening talk of the day, which set the tone for the conference: Digital sustainability relies on consensus, much like the internet itself.

> The idea that practical, working systems that can be quickly implemented are a better starting point than waiting for the perfect design.

{% hotlink 'https://docs.google.com/presentation/d/1fgOwhjZDOTgD9JpkCH_yQ55wtjjK3vXLnNAyFS2XxdM/mobilepresent#slide=id.p1', 'View Chris’s slides' %}

## So is working together

Working together to make change happen was another prevalent theme of the day (and arguably the conference itself was a prime example of this!). Alex Dawson gave an overview of the [Sustainable Web Design Guidelines](https://w3c.github.io/sustyweb/) proposal, which he has been instrumental in drafting, along with members of the W3C [Sustainably Web Design Community Group](https://www.w3.org/community/sustyweb/). These are a practical set of guidelines for web designers and developers to build greener websites. Alex pointed out that they can be implemented incrementally, allowing for gradual adoption.

The plan is for the community group to become to become a working group, and to push for the guidelines to be increasingly adopted by tech companies and the community as a whole. This is an example of how a group of people can come together to weald greater influence than working individually.

There’s a more [user-friendly version of the guidelines](https://sustainablewebdesign.org/guidelines/) on the Sustainable Web Design website.

## Measuring is important, but not everything

Chris Adams also talked about the evolution of the Sustainable Web Design (SWD) model used for measuring the CO2e emissions of digital services, and how our understanding has evolved. Quantifying carbon emissions is important, and can be useful, but we don’t have to wait for perfect data (which may never arrive) before taking action.

## Greenwashing is prevalent in Big Tech

Big tech companies’ reporting of emissions data and claims of “Net Zero” emissions cannot be trusted. Speakers highlighted the difference between companies’ reported figures, which are market-adjusted, and their location-based emissions, which are far higher and growing — particularly as a result of the AI boom. (A recent [Guardian article](https://www.theguardian.com/technology/2024/sep/15/data-center-gas-emissions-tech) puts the spotlight on tech firms’ “creative accounting” practices when it comes to reporting on carbon emissions.)

Cloud services are not necessarily greener than on-premises servers, and the claims of the big players (such and Amazon and Microsoft) came under scrutiny at this conference, particularly in Mark Butcher’s excellent talk, which pulled no punches. Where servers are located matters — in countries with a high proportion of fossil fuels, the electricity generated will be “dirtier”.

## Efficiency isn’t enough (Jevon’s paradox)

More than one speaker mentioned [Jevon’s paradox](https://en.wikipedia.org/wiki/Jevons_paradox) — the idea that increasing efficiency leads to increasing demand. Making our tech more efficient often results in increased usage rather than an overall reduction in energy use, much like building an extra lane on a highway doesn’t actually lead to a decrease in congestion: it simply leads to more cars on the road. This means that improving the efficiency of our tech isn’t enough alone.

## More than carbon

Another common thread was that we need to think beyond carbon emissions. Although emissions are perhaps the most obvious impact of our digital tech — due to the clear link between energy demand and fossil fuels — they’re just one part of the story. We need to consider the entire lifecycle of our tech, which includes resource consumption — water use (a growing concern, exacerbated by the AI boom) and mining for the raw materials needed for digital devices — as well as pollution of the local environment (e.g. where data centres are located), disposal of hardware at the end of its useful life, and exploitation of labour, which underpins many aspects of the digital realm, just as in other industries. There can be **no sustainability without equity**.

## The AI boom is (mostly) bad for the planet

It’s clear that the compute power required by AI is accelerating the demand for energy. We’re even seeing old fossil fuel plants brought back online to serve this increased demand. In the afternoon panel discussion with Chris Adams, Anne Currie, Maxime Fazilleau, Sandra Pallier it felt like there was a broad consensus that Generative AI doesn’t align well with sustainability.

It’s not all about model training either. According to James Martin from Scaleway, the inference (i.e. usage) phase of an LLM such as GPT4 can be **“200 times more impactful than training“**. A Google search with AI, for example, uses far more energy than a conventional search. AI can have _some_ uses, including helping avoid waste and making certain processes more efficient. But many of the uses that Generative AI is being put to do more harm than good.

## But if you have to use AI, make it as green as possible

There are certainly ways to make using AI greener, such as using more efficient models, and using servers located in countries with a higher proportion of green electricity. Anne Currie from Strategically Green shared a few tips during the panel, and she has also [written a book](https://www.oreilly.com/library/view/building-green-software/9781098150617/) on the subject.

## Device use accounts for the most CO2e emissions

Streaming video is an area that unsurprisingly accounts for a great deal of energy use. Benjamin Schwartz shared insights from from [Greening of Streaming](https://www.greeningofstreaming.org/)’s three-year initiative exploring the end-to-end carbon impact of video streaming. This is a subject I don’t have much knowledge of, so it was great to hear that there are people working on (for example) more efficient ways to encode video. Most of the energy consumption happens on the end user’s device, so we should really question whether everything needs to be streamed in HD.

## Greener defaults

Following Benjamin’s talk, a question from an audience member prompted a discussion on whether lower resolution should be the default for streaming platforms such as Netflix. As Benjamin pointed out, a button saying “click for a greener experience” looks pretty bad because it shows the default isn’t green. But a greener experience as a default, with a button to upgrade to enhanced experience (perhaps if you have friends round to watch a movie together) is better. For many people, streaming in standard definition will be no big deal.

This applies to many other aspects of web design too. In Thorsten Jonas’s talk on designing sustainable digital products (probably my favourite talk of the day) he emphasised that **greener doesn’t have to mean inferior**. You don’t have to remove all the images from your webpage, but replacing a background video with a static image will deliver huge savings, while likely making your website faster for users too.

## Think beyond UX

I loved how Thorsten’s talk encouraged us to think beyond our products’ end users and take a **humanity and environmental centred** approach. Our digital products have an impact far wider than just the people who use them. As well as who we’re building for, we should think about _what_ we’re building, _how_ and _why_. We should start thinking of the planet as a key stakeholder in our product designs. There were so many quote-worthy moments in this presentation, but to single out one of Thorsten’s slides (a quote from Toby Fry):

> Does what we create justify what we destroy?

## Green measures lead to cost savings – but sustainability is a bigger motivator

Despite a lot of consensus on sustainability in tech, it can be difficult to convince others in an organisation to implement change. Unfortunately I forgot which presentation this was from (I’m bad at taking notes during conferences!), but one speaker referenced a study where teams were given different performance metrics. One team was given the target of only reducing cost, the other team was told to focus on sustainability. Surprisingly, the team with the sustainability focus succeeded in not only improving sustainability, but reducing costs too, and by an even greater amount than the one focused purely on costs. It demonstrated how much of a powerful motivator sustainability can be — and one we can all benefit from.
