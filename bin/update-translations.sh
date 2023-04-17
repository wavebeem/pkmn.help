#!/usr/bin/env bash
set -eu

# Small jq wrapper script to remove fields from translation files that are no
# longer needed...

for file in public/locales/*-translation.json; do
  echo "Processing $file"
  jq '
    del(
      .pokedex.wiki,
      .pokedex.offense.label,
      .pokedex.defense.label
    )
  ' < "$file" > tmp.json
  mv tmp.json "$file"
done
