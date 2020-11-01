const fs = require('fs');

let hash = Date.now()
hash = hash.toString()

fs.writeFile('hash.txt', hash, function (err) {
  if (err) return console.log(err);
  console.log(`${hash} > hash.txt`);
});

fs.writeFile('src/_data/cacheBusting.json', hash, function (err) {
  if (err) return console.log(err);
  console.log(`${hash} > src/_data/cacheBusting.json`);
});

fs.rename('dist/styles.css', `dist/styles${hash}.css`, function(err) {
  if ( err ) console.log('ERROR: ' + err);
  console.log(`dist/styles.css > dist/styles${hash}.css`);
});

fs.rename('dist/index.js', `dist/index${hash}.js`, function(err) {
  if ( err ) console.log('ERROR: ' + err);
  console.log(`dist/index.js > dist/index${hash}.js`);
});