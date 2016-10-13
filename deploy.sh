#!/bin/bash
set -e

cf_distro="E3U8PXS6FWX8U8"
prod="s3://pkmn.help/"
dev="s3://dev.mockbrian.com/"

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
if [[ $1 = "-p" ]]; then
  aws s3 sync --acl public-read ./ "$prod"
  aws cloudfront create-invalidation \
    --distribution-id "$cf_distro" \
    --paths "/*"
else
  aws s3 sync --acl public-read ./ "$dev"
fi
