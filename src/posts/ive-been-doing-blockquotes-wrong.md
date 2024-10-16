---
title: I’ve Been Doing Blockquotes Wrong
date: '2024-10-16'
tags: ['post', 'html', 'accessibility']
---

True to form, Heydon Pickering has written another blistering account of one of the most ubiquitous HTML elements, [the `<blockquote>`](https://heydonworks.com/article/the-blockquote-element/). You’ve probably used a `<blockquote>` when writing HTML. I know I’ve used literally hundreds of them. What I didn’t know is that I’ve been using them wrong all these years.

To pilfer a few choice quotes from said article:

> In HTML5, `<blockquote>` content “must be quoted from another source”. So that’s pull quotes completely out of the window, then.

Heydon rightly makes the distinction between block quotes, which (supposedly) quote another source, and pull-quotes, which highlight excerpts from the article you’re reading. I was surprised to learn that `<blockquote>` elements should **not** be used for pull-quotes. I’ve been using them all over the place. Whoops.

> ...the term “block quotation” precedes the `<blockquote>` element and the concept of block-level HTML elements. The Chicago Manual Of Style recommends block quotations are over 100 words in length, for example.

Once again, I’m doing block quotes wrong. I don’t think I’ve knowingly _ever_ included a quote over 100 words long on a web page. Does anyone ever read that many words on the web? You’ll notice neither of the block quotes so far in this article are over 100 words in length. (To be fair, this isn’t part of the HTML spec. But might well influence how you define a “blockquote”.)

<aside>
<p>I’m slightly annoyingly choosing to write “blockquote” in different ways throughout this article. There’s the HTML element `blockquote` (all one word), then there’s the writing concept of a “block quote” or “block quotation”, which seems best written as two words, otherwise my text editor gets angry at me.</p>
</aside>

> Different versions of different specifications agree the citation cannot be inside the `<blockquote>` element.

Oh dear. I’ve been putting a `<cite>` inside a `<blockquote>` for years. I distinctly remember reading that this was a good idea at some point in the last 10 years, and haven’t checked back since. I’m sure in part it relates to this idea (also from the article):

> Related elements should generally be programmatically grouped so its clear what belongs to what.

Heydon suggests using a `<figure>` and `<figcaption>` to invoke this grouping, which seems the most sensible option.

I also learnt about the `<q>` element for the first time in this article:

> For inline (or “text-level”) quotations, there is `<q>` instead.

OK. So...is it not enough to put **actual quote marks** in the text (“like this”, which I’ll wager is what happens in 99.999% of cases)? I mean, it has a `cite` attribute, but given that according to Heydon, “The `<blockquote>` cite attribute is generally useless since it’s invisible and most screen readers also ignore it”, I can’t see any real use cases. It it just a styling thing? In which case, wouldn’t a `<span>` suffice? I’ll eagerly await Heydon’s `<q>` article to find out.

## HTML is Hard

All of which is to say, HTML is hard. Probably the hardest part of my job. In all the years I’ve been writing articles, I’ve received far more complaints/corrections about HTML than anything else, and I consider myself pretty OK at HTML. And despite writing it for years, I don’t feel like I really know it well (see above).

Conversely, it’s pretty easy to write bad HTML, because for most developers there are **no consequences**. If you write some bad Javascript, your application will probably crash and you or your users will get a horrible error message. It’s like a flashing light above your head telling the world you’ve done something bad. At the very least you’ll feel like a prize chump. HTML fails silently. Write bad HTML and maybe it means someone who doesn’t browse the web in exactly the same way as you do doesn’t get access to the information they need. But maybe you still get your pay rise and bonus.

So it’s frustrating to see the importance of learning HTML dismissed time and time again. Sorry to end on a bad note, but that’s where we’re at right now.

I recommend reading Heydon’s article, and the others from the series on HTML elements, which is far more comprehensive (and, I dare say, better written) than this one, despite the fact that I’ve lifted a load of quotes from it verbatim. And by the end of the series, hopefully we’ll all be experts in HTML.
