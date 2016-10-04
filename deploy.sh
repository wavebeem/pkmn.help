#!/bin/bash
set -e

# dest=s3://mockbrian.com/pkmn/
dest=s3://dev.mockbrian.com/

files=(
  favicon.ico
  bundle.js
  bundle.css
  index.html
)

npm run build:js
npm run build:css
rm -rf dist
mkdir dist
cp -v "${files[@]}" dist/
cd dist
s3cmd sync -P ./ "$dest"
