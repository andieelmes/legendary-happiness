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

  // https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
  eleventyConfig.addFilter('htmlDateString', (dateObj) => format(dateObj, 'yyyy-LL-dd'));

  // Get the first `n` elements of a collection.
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
            // this list should match the `filter` list in tags.njk
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

    // returning an array in addCollection works in Eleventy 0.5.3
    return [...tagSet];
  });

  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    // Eleventy 1.0+: use this.inputPath and this.outputPath instead
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

  /* Markdown Overrides */
  const markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
    typographer: true,
    quotes: '«»„“',
  }).use(markdownItAttrs).use(implicitFigures);
  eleventyConfig.setLibrary('md', markdownLibrary);

  eleventyConfig.setServerOptions();

  return {
    templateFormats: [
      'md',
      'njk',
      'html',
      'liquid',
    ],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about those.

    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for link URLs (it does not affect your file structure)
    // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

    // You can also pass this in on the command line using `--pathprefix`
    // pathPrefix: "/",

    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    // These are all optional, defaults are shown:
    dir: {
      input: '.',
      includes: 'includes',
      data: 'data',
      output: 'public',
    },
  };
};
