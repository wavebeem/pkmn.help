#!/bin/bash
set -e

dest="s3://pkmn.help/"
# dest="s3://dev.mockbrian.com/"

files=(
  "favicon.ico"
  "bundle.js"
  "bundle.min.css"
  "index.html"
)

npm run build:js
npm run build:css
rm -rf dist
mkdir dist
cp -v "${files[@]}" dist/
cd dist
s3cmd sync -P ./ "$dest"
