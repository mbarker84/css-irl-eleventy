module.exports = function (eleventyConfig) {
  eleventyConfig.addCollection('tagList', function (collection) {
    let tagSet = new Set()
    collection.getAll().forEach(function (item) {
      if ('tags' in item.data) {
        let tags = item.data.tags

        tags = tags.filter(function (item) {
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

        for (const tag of tags) {
          tagSet.add(tag)
        }
      }
    })

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet]
  })

  eleventyConfig.addShortcode('excerpt', (article) => extractExcerpt(article))

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },
    templateFormats: ['html', 'md', 'njk'],
    passthroughFileCopy: true,
  }
}

/*
  Extract excerpt from post:
  https://keepinguptodate.com/pages/2019/06/creating-blog-with-eleventy/
*/
function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn(
      'Failed to extract excerpt: Document has no property "templateContent".'
    )
    return null
  }

  let excerpt = null
  const content = article.templateContent

  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' },
  ]

  separatorsList.some((separators) => {
    const startPosition = content.indexOf(separators.start)
    const endPosition = content.indexOf(separators.end)

    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content
        .substring(startPosition + separators.start.length, endPosition)
        .trim()
      return true // Exit out of array loop on first match
    }
  })

  return excerpt
}
