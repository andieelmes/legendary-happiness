const fs = require('fs');
const pluginNavigation = require('@11ty/eleventy-navigation');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const implicitFigures = require('markdown-it-implicit-figures');
const markdownIt = require('markdown-it');
const markdownItAttrs = require('markdown-it-attrs');
const embedYouTube = require('eleventy-plugin-youtube-embed');
const tinyCSS = require('@greyskullrocks/eleventy-plugin-tinycss');
const htmlmin = require('html-minifier');
const format = require('date-fns/format');
const ru = require('date-fns/locale/ru');
const placeholder = require('./helpers/placeholder');

module.exports = (eleventyConfig) => {
  eleventyConfig.addPlugin(pluginRss);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(embedYouTube, {
    lazy: true,
    noCookie: false,
  });

  eleventyConfig.setDataDeepMerge(true);

  eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');

  eleventyConfig.addFilter('readableDate', (dateObj) => format(dateObj, 'd MMMM yyyy', { locale: ru }));

  eleventyConfig.addFilter('htmlDateString', (dateObj) => format(dateObj, 'yyyy-LL-dd'));

  eleventyConfig.addFilter('head', (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }

    return array.slice(0, n);
  });

  eleventyConfig.addFilter('min', (...numbers) => Math.min.apply(null, numbers));

  eleventyConfig.addFilter('trim', (string) => string.trim());

  eleventyConfig.addCollection('tagList', (collection) => {
    const tagSet = new Set();
    collection.getAll().forEach((item) => {
      if ('tags' in item.data) {
        let { tags } = item.data;

        tags = tags.filter((tagItem) => {
          switch (tagItem) {
            case 'all':
            case 'nav':
            case 'post':
            case 'posts':
              return false;
            default:
              return true;
          }
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });

    return [...tagSet];
  });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }

    return content;
  });

  eleventyConfig.addWatchTarget('css/*.scss');
  eleventyConfig.addPlugin(tinyCSS, {
    output: 'public',
  });

  eleventyConfig.addPassthroughCopy('img');
  eleventyConfig.addPassthroughCopy('posts/**/*.(jpg|png|webp)');
  eleventyConfig.addPassthroughCopy('robots.txt');
  eleventyConfig.addPassthroughCopy('.htaccess');
  eleventyConfig.addPassthroughCopy('android-chrome-192x192.png');
  eleventyConfig.addPassthroughCopy('apple-touch-icon.png');
  eleventyConfig.addPassthroughCopy('browserconfig.xml');
  eleventyConfig.addPassthroughCopy('favicon-16x16.png');
  eleventyConfig.addPassthroughCopy('favicon-32x32.png');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('manifest.json');
  eleventyConfig.addPassthroughCopy('mstile-150x150.png');
  eleventyConfig.addPassthroughCopy('favicon.ico');
  eleventyConfig.addPassthroughCopy('safari-pinned-tab.svg');

  const markdownItConfig = {
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: '«»„“',
  }

  const markdownLibrary = markdownIt(markdownItConfig)
    .use(markdownItAttrs)
    .use(implicitFigures)
    .use(placeholder);

  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready(err, browserSync) {
        const content404 = fs.readFileSync('public/404.html');

        browserSync.addMiddleware('*', (req, res) => {
          // Provides the 404 content without redirect.
          res.write(content404);
          res.end();
        });
      },
    },
    ui: false,
    ghostMode: false,
  });

  return {
    templateFormats: [
      'md',
      'njk',
      'html',
      'liquid',
    ],
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    dir: {
      input: '.',
      includes: 'includes',
      data: 'data',
      output: 'public',
    },
  };
};
