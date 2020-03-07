require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
})

const plugins = [
  {
    resolve: `gatsby-plugin-layout`,
    options: {
      component: require.resolve(`./src/layouts/index.js`),
    },
  },
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/data`,
          name: 'datas',
      },
  },
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/default_covers`,
          name: 'covers',
      },
  },
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/assets`,
          name: 'assets',
      },
  },
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/xsjposts/blogs`,
          name: 'blogs',
      },
  },
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/xsjposts/docs`,
          name: 'docs',
      },
  },
  {
      resolve: `gatsby-source-filesystem`,
      options: {
          path: `${__dirname}/src/xsjposts/logs`,
          name: 'logs',
      },
  },
  {
    resolve: `gatsby-transformer-csv`,
    options: {
      noheader: false,
    },
  },
  {
    resolve: `gatsby-transformer-xsjzip`,
    options: {
    }
  },
  {
    resolve: `gatsby-plugin-typography`,
    options: {
      pathToConfigModule: `src/utils/typography`,
    },
  },
  `gatsby-transformer-yaml`,
  {
    resolve: `gatsby-plugin-nprogress`,
    options: {
      color: `#9D7CBF`,
      showSpinner: false,
    },
  },
  `gatsby-plugin-emotion`,
  `gatsby-transformer-sharp`,
  `gatsby-plugin-sharp`,
  `gatsby-plugin-catch-links`,
  `gatsby-plugin-lodash`,
  {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `小书匠`,
      short_name: `小书匠`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#663399`,
      display: `minimal-ui`,
      icon: `src/assets/logo-icon.png`,
    },
  },
  `gatsby-plugin-react-helmet`,
  `gatsby-plugin-sitemap`,
  {
    resolve: `gatsby-plugin-feed`,
    options: {
      feeds: [
        {
          query: `
            {
              allStoryWriterMarkdown(
                sort: { order: DESC, fields: [createDate] }
                filter: {
                  docType: {eq: "blogs"}
                }
              ) {
                edges {
                  node {
                    excerpt
                    html
                    title
                    createDate
                    updateDate
                    tags
                    slug
                  }
                }
              }
            }
          `,
          output: `/blog/rss.xml`,
          setup: ({
            query: {
              site: { siteMetadata },
            },
          }) => {
            return {
              title: siteMetadata.title,
              description: siteMetadata.description,
              feed_url: siteMetadata.siteUrl + `/blog/rss.xml`,
              site_url: siteMetadata.siteUrl,
              generator: `StoryWriter`,
            }
          },
          serialize: ({ query: { site, allStoryWriterMarkdown } }) =>
            allStoryWriterMarkdown.edges.map(({ node }) => {
              return {
                title: node.title,
                description: node.excerpt,
                url: site.siteMetadata.siteUrl + node.slug,
                guid: site.siteMetadata.siteUrl + node.slug,
                custom_elements: [{ "content:encoded": node.html }],
              }
            }),
        },
      ],
    },
  },
];

if (process.env.XSJ_TONGJI == 'true') {
  plugins.push({
    resolve: `gatsby-plugin-baidu-analytics`,
    options: {
      siteId: "f0d1765f43b1c2f17048bf9ba63ae21a",
      // Put analytics script in the head instead of the body [default:false]
      head: false,
    },
  })
}

if (process.env.XSJ_SUBFONT == 'true') {
  plugins.push({
      resolve: `gatsby-plugin-subfont`,
      options: {
        silent: true,
        fallbacks: false,
        inlineCss: false,
        inlineFonts: false,
      },
    })
}

plugins.push("gatsby-plugin-offline")

module.exports = {
  siteMetadata: {
    title: `小书匠`,
    siteUrl: `http://www.xiaoshujiang.com`,
    description: `一款让你爱不释手的写作软件`,
  },
  plugins: plugins,
}
