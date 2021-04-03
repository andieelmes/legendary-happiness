const path = require('path');
const readFilePromise = require('fs-readfile-promise');
const { getPixelsCSS } = require('@plaiceholder/css');

async function getBackgroundGradient(imagePath) {
  const image = await readFilePromise(imagePath);
  return getPixelsCSS(image);
}

function stylesToString(style) {
  return Object.keys(style).reduce((acc, cur) => (
    `${acc}${cur.split(/(?=[A-Z])/).join('-').toLowerCase()}:${style[cur]};`
  ), '');
}

function plaiceholderify(state) {
  const { inputPath } = state.env.page;
  const rootPath = inputPath.split('/').slice(0, -1).join('/');

  state.tokens.forEach(async (token) => {
    if (token.type === 'inline' && token.children && token.children[0].tag === 'img') {
      const image = token.children[0];
      const imageSrc = image.attrGet('src');
      const imagePath = path.resolve(rootPath, imageSrc);

      // const style = await getBackgroundGradient(imagePath);
      image.attrPush(['style', 'margin: 0;background-image: linear-gradient(45deg, black, transparent);']);
      // console.log(image, stylesToString(style));
    }
  });
}

module.exports = (md) => {
  md.core.ruler.after('implicit_figures', 'plaiceholder_images', plaiceholderify);
};
