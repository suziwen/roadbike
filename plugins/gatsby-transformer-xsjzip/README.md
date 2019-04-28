# gatsby-transformer-xsjzip

Parses xiaoshujiang's Markdown  zip files [Story Writer](http://markdown.xiaoshujiang.com/).

## Install

`npm install --save gatsby-transformer-xsjzip`

## How to use


1. In your gatsby-config.js

```javascript
// In your gatsby-config.js
plugins: [`gatsby-transformer-xsjzip`, {
    resolve: `gatsby-source-filesystem`,
    options: {
        path: `${__dirname}/src/xsjposts/blogs`,
        name: 'blogs',
    }
  }]
```

2. Creating a Fold at `src/xsjposts/blogs`
3. Putting xiaoshujiang's zip files at `src/xsjposts/blogs`

## Parsing algorithm

It recognizes files with the following extensions as Markdown:

- zip
- exporting from http://markdown.xiaoshujiang.com

Each Zip file is parsed into a node of type `StoryWriterMarkdown`.

All frontmatter fields are converted into GraphQL fields. TODO link to docs on
auto-inferring types/fields.

## How to query

A sample GraphQL query to get MarkdownRemark nodes:

```graphql
{
  allStoryWriterMarkdown {
    edges {
      node {
        html
        createDate
        updateDate
        title
        tags
        cover
        excerpt
        rawMarkdownBody
        toc
        slug
        zipPath
        docType
        customCss
        css
        meta {
          # Assumes you're using title in your frontmatter.
          title
          tags
        }
      }
    }
  }
}
```

