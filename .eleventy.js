const pluginRss = require('@11ty/eleventy-plugin-rss')
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
const embedYouTube = require('eleventy-plugin-youtube-embed')
const Webmentions = require('eleventy-plugin-webmentions')
const dotenv = require('dotenv')
const markdownIt = require('markdown-it')

const getPostCount = (tag, posts) => {
  return posts.filter((post) => post.data.tags.includes(tag)).length
}

const arrayIncludesTag = (tag, arr) => {
  return arr.some((item) => item.title === tag.title)
}

const getTags = (item) => {
  return item.data.tags.filter(function (item) {
    switch (item) {
      // this list should match the `filter` list in tags.njk
      case 'all':
      case 'nav':
      case 'post':
      case 'posts':
      case 'page':
        return false
    }

    return true
  })
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setFreezeReservedData(false)
  eleventyConfig.addWatchTarget('./src/css/')
  eleventyConfig.addWatchTarget('./src/js/')

  eleventyConfig.addCollection('postPaginated', function (collectionApi) {
    return collectionApi.getFilteredByTag('post').reverse()
  })

  /* Articles */
  eleventyConfig.addCollection('article', (collectionApi) => {
    return collectionApi
      .getFilteredByTag('post')
      .reverse()
      .filter((item) => {
        return (
          !item.data.tags.includes('note') &&
          !item.data.tags.includes('quick tip') &&
          !item.data.tags.includes('demo')
        )
      })
  })

  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        const tags = getTags(item)

        for (const tag of tags) {
          tagSet.add(tag)
        }
      }
    })

    return [...tagSet]
  })

  eleventyConfig.addCollection('allTags', function (collection) {
    let tagSet = new Set()

    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        const tags = getTags(item)

        for (const tag of tags) {
          tagSet.add({
            title: tag,
            postCount: getPostCount(tag, collection.getFilteredByTag('post')),
          })
        }
      }
    })

    const arr = []
    const sortedTags = [...tagSet]
      .sort((a, b) => a.postCount - b.postCount)
      .reverse()

    sortedTags.forEach((tag) => {
      if (arrayIncludesTag(tag, arr)) return
      arr.push(tag)
    })

    return arr
  })

  eleventyConfig.addCollection('homepageTags', function (collection) {
    let tagSet = new Set()

    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        const tags = getTags(item)

        for (const tag of tags) {
          tagSet.add({
            title: tag,
            postCount: getPostCount(tag, collection.getFilteredByTag('post')),
          })
        }
      }
    })

    // returning an array in addCollection works in Eleventy 0.5.3
    const arr = []
    const sortedTags = [...tagSet]
      .sort((a, b) => a.postCount - b.postCount)
      .reverse()

    sortedTags.forEach((tag) => {
      if (arrayIncludesTag(tag, arr)) return
      arr.push(tag)
    })

    return arr.slice(0, 15)
  })

  eleventyConfig.setFrontMatterParsingOptions({
    excerpt: true,
    // Optional, default is "---"
    excerpt_separator: '<!--excerpt-->',
  })

  /* Shortcodes */
  eleventyConfig.addShortcode('hotlink', (url, title, target = '_blank') => {
    return `<a class="o-hotlink" href="${url}" target=${target}>${title}</a>`
  })

  eleventyConfig.addShortcode('lastEdited', (lastEdited) => {
    if (!lastEdited) return 'No date last edited'
    const date = new Date(lastEdited)
    return `Last edited: ${date.toString().split(' ').slice(0, 3).join(' ')}`
  })

  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`)

  eleventyConfig.addPairedShortcode('element', (slotContent, el, className) => {
    return `<${el} class="${className}">${slotContent}</${el}>`
  })

  eleventyConfig.addPlugin(pluginRss)
  eleventyConfig.addPlugin(syntaxHighlight)
  eleventyConfig.addPlugin(embedYouTube, {
    lite: {},
    lazy: true,
    modestBranding: true,
    recommendSelfOnly: true,
  })

  dotenv.config()
  eleventyConfig.addPlugin(Webmentions, {
    domain: 'css-irl.info',
    token: process.env.WEBMENTIONS_TOKEN,
  })

  eleventyConfig.addPassthroughCopy({ 'src/robots.txt': '/robots.txt' })
  eleventyConfig.addPassthroughCopy('src/media')
  eleventyConfig.addPassthroughCopy('src/favicon')
  eleventyConfig.addPassthroughCopy({
    'src/_includes/partials/sprite.svg': '/sprite.svg',
  })

  eleventyConfig.addFilter('trimmedExcerpt', (content = '') => {
    const md = markdownIt({ html: true })
    const trimmedContent = content.split(' ').slice(0, 50)
    const lastWord = trimmedContent[trimmedContent.length - 1]
    trimmedContent[trimmedContent.length - 1] = lastWord + '...'

    return md.render(trimmedContent.join(' '))
  })

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
  }
}
