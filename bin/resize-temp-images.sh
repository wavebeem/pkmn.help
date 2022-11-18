#!/usr/bin/env bash
set -eu

cd public/img

for img in *.tmp.png; do
  name=${img%%.tmp.png}.png
  echo "$name ..."
  magick "$img" -resize '96x96' "$name"
  # magick \
  #   "$img" \
  #   -resize '96x96' \
  #   -background transparent \
  #   -gravity 'center' \
  #   -extent '96x96' \
  #   "$name"
done
