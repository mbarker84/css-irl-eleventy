---
title: 'Design Patterns that Encourage Junk Data'
date: '2024-02-20'
tags: ['post', 'web sustainability']
---

A post [from Remy](https://front-end.social/@rem/111957249492228263) on Mastodon recently got me thinking:

> Been picking up some of the jsbin archive work. Today, there's currently 62 millions bins stored. The last full copy archive I ran (which downloads the full html, js + css into a single page) holds 42 millions bins, consumes 130gb and the names alone (not even the urls) takes up 750mb.

That’s a lot of data, and I’d be willing to bet a fair amount of it is no longer needed.

Not long ago I read [World Wide Waste](https://gerrymcgovern.com/world-wide-waste/) by Gerry McGovern, which brings into sharp relief the physical and ecological impacts of our digital lives. One aspect of this is the huge amount of data we accumulate. It all has to be stored somewhere. And despite what we might like to believe — that “the cloud” is this magical, nebulous, (crucially) free storage space floating high above us — it’s actually stored in vast datacentres, hungry for water and electricity. The Guardian recently ran a story on [datacentres in Ireland](https://www.theguardian.com/world/2024/feb/15/power-grab-hidden-costs-of-ireland-datacentre-boom), which are estimated to consume 18% of the country’s electricity. And more are being built all the time, to satisfy our ever-growing appetite for data.

The thing is, we don’t really need all this storage. It’s estimated that [up to 88%](https://volume.lboro.ac.uk/digital-waste-polluting-the-planet) of the data stored in the cloud is ROT (Redundant, Obsolete or Trivial) data, or [“dark data”](https://www.gartner.com/en/information-technology/glossary/dark-data): data collected by companies in the course of their regular business activities, but which is not used for any other purpose. It all amounts to a lot of junk data that has no purpose, that will never be needed or looked at again. Think how many photos we snap away on our hi-res smartphones, instantly uploaded to the cloud and forgotten. Yet storing this data requires construction materials, rare metals, land and human labour to build the facilities to store it, as well as water and electricity to keep them powered and cooled. All so we can avoid the inconvenience of deleting stuff.

But it’s also really easy to create a whole lot of junk data unintentionally. Remy’s web app, JS Bin is incredibly useful when you just want to quickly test out some HTML, CSS or JS in the browser, without setting up a load of boilerplate and a local web server. I use it for exactly that. Sometimes I might send someone the link to refer to. I almost _never_ need to look at that demo ever again after that day. And yet that data is stored indefinitely. It rarely occurs to me to go back and delete it when I’m done.

This isn’t intended as a criticism of Remy’s excellent work. It’s a fantastic service, and there are no doubt many people who use JS Bin very differently, who value the ability to revisit their bins much later. It’s just one of many, many apps that make it very easy for us to create data that lives (virtually) forever. Does it need to? I’m not sure. But we’ve come to expect that in all of our online services, and that’s not sustainable.

## What does a better model look like?

The question is, how do we design our products and services so that it’s easier and more convenient for users to delete junk data, or even better, to avoid creating it in the first place?

One possibility is to introduce more friction into the process. For example, requiring a user to create an account before their work is saved would almost certainly reduce the amount of data created in the case of apps like JS Bin. But it would also remove a big chunk of what’s appealing about it: the fact that you don’t _need_ to go through the time-consuming process of creating an account. So is there another happy medium, such as time-limited storage for data not tied to a user account? It’s certainly becoming a more pressing question, as the need for limitless digital storage bumps up against the very real physical limits of our planet.

This is where I think design needs to step up. Take email. Most of us have thousands of old emails languishing in our inboxes, stored indefinitely. After a certain point, the thought of going through and deleting them becomes too arduous. Email clients could be designed in a way that encourages (or even requires) users to configure settings for automatic deletion after a certain time period, with a “safe list” for important ones. I’m sure that with more than half an hour’s thought, even better solutions could be found.

When companies make it so easy for us to create junk data at virtually no cost, while making huge profits themselves, they shouldn’t be permitted to pass the cost of cleaning it up onto the individual. They need to take responsibility for their own sprawling data problem, and its planetary impact.

## Resources

- [Power grab: the hidden costs of Ireland’s datacentre boom](https://www.theguardian.com/world/2024/feb/15/power-grab-hidden-costs-of-ireland-datacentre-boom) (The Guardian)
- [How digital waste is polluting the planet](https://volume.lboro.ac.uk/digital-waste-polluting-the-planet)
- [‘Dark data’ is killing the planet – we need digital decarbonisation](https://theconversation.com/dark-data-is-killing-the-planet-we-need-digital-decarbonisation-190423) (The Conversation)
- [Digital Decarbonisation](https://digitaldecarb.org/)
