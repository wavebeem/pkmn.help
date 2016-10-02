#!/bin/bash

# dest=s3://mockbrian.com/pkmn/
dest=s3://dev.mockbrian.com/

files=(
  favicon.ico
  main.js
  index.html
  style.css
)

npm run css
rm -rf dist
mkdir dist
cp -v "${files[@]}" dist/
cd dist
s3cmd sync -P ./ "$dest"
