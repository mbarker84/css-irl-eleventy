---
title: 'Part 3: Building Our Sass Architecture'
series: 'A Modern Front End Workflow'
date: '2019-10-28'
tags: ['post', 'workflow', 'tooling', 'css', 'sass']
---

<figure>
  <img src="/a-modern-front-end-workflow-03_01.png" alt="Sass logo on a pink gradient background">
</figure>

In the previous two articles we went through configuring a project starter repository using NPM scripts and [Parcel](https://parceljs.org/). I tend to employ more or less the same Sass architecture for every project, so I want my boilerplate to include the SCSS files and folders I need to get started writing code straight away. This is my preferred architecture, loosely based on [Harry Roberts’](https://csswizardry.com/) [ITCSS](https://www.hongkiat.com/blog/inverted-triangle-css-web-development/) (Inverted Triangle CSS), and our boilerplate at my previous agency, [Mud](https://ournameismud.co.uk/):

1. **Config** This typically contains three files: It’s where I define all the Sass variables, mixins and function for use throughout the project. I generally use a single file for my variables, covering breakpoints, colours, spacing and anything else. But there’s no reason the variables file couldn’t be broken up into several files, which might be a good idea for large projects.

2. **Base** Pretty much everything in here involves writing styles on element selectors, rather than classes. It includes any resets (e.g. `* { box-sizing: border-box; }`), and base styles for typography and form elements, some of which may be over-ridden at the component level later on.

3. **Objects** Any small, reusable pieces of UI, which could appear in multiple components, belong here. I start with a _buttons.scss_ file because, well, pretty much every project has buttons! But I only tend to add others when I need them.

4. **Globals** I like to keep any components that will be used on every page, such as the header and footer, in a separate folder from the rest of the components. I also add generic layout classes in here – if I have a grid that I want to use in a lot of places, for example. I prefer to use classes rather than mixins for those, as it’s one fewer level of abstraction.

5. **Components** This is for the larger chunks of UI, such as hero sections, cards, media objects and more. It’s where the bulk of my CSS will be written, but I leave it empty to begin with so that I can add individual component files as and when I need them.

6. **Utilities** This is for single-purpose, reuseable atomic (or utility) classes that could be applied to any element. E.g. The following could be used to set vertical padding on all elements that have this class applied:

```scss
.padding-v {
  padding-top: var(--pad);
  padding-bottom: var(--pad);
}
```

I tend not to use too many of these, so I’m going to leave this file empty until I need it.

So, to finish off our project starter, I’m going to add the following file structure to the _src/scss_ directory:

```
01-config
	_variables.scss
	_functions.scss
	_mixins.scss
02-base
	_resets.scss
	_typography.scss
	_forms.scss
03-objects
	_buttons.scss
04-globals
	_header.scss
	_footer.scss
	_layout.scss
05-components
06-utilities
```

You might notice each folder has a numerical prefix – this is so that when viewed in the file system the visual order will reflect the import order. This will make it much quicker and easier to find the file I want, and will help avoid any confusion.

It’s likely you’ll have your own preferred Sass architecture, so I would recommend adding at least a basic folder structure to your boilerplate – or feel free to tweak this one. Even if you use an atomic CSS framework (like [Tailwind](https://tailwindcss.com/)), the chances are you might need to write some CSS yourself, so having the architecture in place makes sense.

## Conclusion

This concludes the mini-series on A Modern Front-end Workflow. We’ve learnt about installing NPM packages, writing scripts to run tasks, using Parcel for easier automation, and adding a basic Sass architecture. [This starter repository](https://github.com/mbarker84/parcel-starter) includes everything we covered. Feel free to clone it or fork it – and add to it – for your own projects.

## See other articles in this series

- [Building a Project Starter with NPM Scripts](/a-modern-front-end-workflow-part-1/)
- [Module Bundling with Parcel](/a-modern-front-end-workflow-part-2/)
