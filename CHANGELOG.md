# Changelog

## 2023-05-29

- Added the "Wonder Guard" ability

## 2023-05-21

- Fixed an issue where multipliers greater than 8 or below 1/8 wouldn't appear
- Changed team offense matchups to round the multiplier to the nearest power of 2 rather than omitting it entirely from the table
- Added Dry Skin's 1.25x weakness to Fire, which wasn't possible to represent before this update

## 2023-05-15

- Fixed an issue where all shiny sprites had been removed accidentally

## 2023-05-14

- Fixed an issue where abilities were counted more than once for Pokémon with multiple types

## 2023-05-13

- Added Pokémon abilities such as "Thick Fat" and "Volt Absorb" to the defense page for solo and team matchups

## 2023-05-08

- Fixed a bug where Pikachu showed up twice in the Pokédex

## 2023-05-04

- Updated Spanish translations

## 2023-04-19

- Fixed a bug where button animations disappeared

## 2023-04-18

- Pokemon bounce when entering their shiny form in the Pokédex
- Percentage bars on the offense page animate when changing now

## 2023-04-17

- Shiny link is now a toggle button in the top right of each Pokédex entry
- Hide shiny link for Scarlet/Violet Pokemon since we don't have shiny images for them
- Improve accessibility for Pokemon links so it's clearer

## 2023-04-14

- Checkboxes on the Offense page type selector are now filled with "X" when
  checked rather than a square, to make them look more different from the radio
  buttons on the Defense page

## 2023-04-12

- OK, hopefully this is the last grid layout update for a while
  - Getting the grid sizing to look good on Windows + macOS in 14 languages
    while supporting custom font sizes is quite challenging
  - Now every language except Polish and Russian can fit 4 columns of types on a
    desktop monitor
    - Polish and Russian only fit 3, sorry

## 2023-04-11

- Added Iron Leaves and Walking Wake
- Maushold's sprite is now Maushold (4) not Maushold (3)
- Fixed a layout bug for the type grid in matchups
- Fixed wiki links for names with spaces ([@kittenchilly](https://github.com/kittenchilly))
- Better fill available space with grid layouts
  - Some languages have longer words for types and will not fit as many columns
    on screen
- Updated to Scarlet/Violet color palette for types
- Increased scrollbar contrast in Firefox
- Tweaked header color in dark mode
- Fixed rainbow colors for types to be in the right order

## 2023-04-09

- Fixed a bug where search queries with zero results crashed the page

## 2023-04-08

- Fixed layout issues for browser default font sizes greater than 16px
- Improved pagination to show first and last Pokemon numbers in addition to page numbers
- Fixed Danish capitalization of "Flyvende"

## 2023-01-06

- Added Korean translation

## 2022-12-31

- Fixed an issue where auto-detect language wasn't respected for Pokemon names (https://github.com/wavebeem/pkmn.help/issues/192)

## 2022-12-29

- Simplified selected state for types so that they aren't truncated in certain
  languages

## 2022-12-26

- Added support for shiny sprites

## 2022-12-11

- Store the previous defense team even if you close the page

## 2022-12-04

- Added Polish translations

## 2022-12-03

- Updated the logic for "normal" effectiveness coverage so that Pokémon aren't counted more than once across the three choices

## 2022-12-02

- Added "normal" effectiveness coverage to the offense page

## 2022-11-17

- Added generation 9 Pokémon

## 2022-09-22

- Added Danish translations

## 2022-05-07

- Added Russian & Kazakh translations

## 2022-04-21

- Added Brazilian Portuguese translations

## 2022-04-17

- Added Chinese (Simplified) translations

## 2022-04-11

- Added French translations

## 2022-04-12

- Added Romanian translations

## 2022-04-03

- Added Spanish translations

## 2022-03-17

- Added Italian translations

## 2022-03-04

- Type colors are more accessible now

## 2021-06-27

- Added search by type

## 2021-06-23

- Switched from Bulbapedia to PokéAPI

## 2020-12-29

- Switched from Google Analytics to Plausible Analytics

## The distant past

This is as far back as I bothered researching history. You can look at the git log if you want to know more detail about what else I've changed since 2013.
