# Changelog

## 2025-03-02

- Updated background color when launching the app installed on your phone

  - Also, I found a strange bug where updating the app after it's installed on
    my phone fails to work until you close the app and start it again. I'm
    getting a plain white page saying the app needs JS to load. Please email me
    if you're seeing that on your phone too. And I'd like to know which OS
    version you're running (iOS 18, Android 15, etc.)

- Reducecd the page size to make the search run a little bit better (I was
  overzealous with the recent increase)

  - Personally, I rarely browse the Pokédex, I usually just search. I opted to
    give an information-dense view in the Pokédex so that searching doesn't
    require extra clicks to obtain information, but this information-dense view
    causes performance issues with trying to render a larger amount of data on
    screen. Contact me if you like to browser the Pokédex, as it would probably
    be useful for me to know how people are trying to use it.

- Fixed an issue where type names with spaces (e.g. `Giác Đấu` for `Fighting` in
  Vietnamese) couldn't be searched for.

  - Now you can search for `GiácĐấu` or even `giacdau` to find fighting types in
    Vietnamese.

## 2025-03-01

- The Pokédex now shows up to 3 Pokémon columns depending on screen size

- The Pokédex uses a consistent layout regardless of screen size

- The Pokédex stats bars have been redesigned

  - The colored background helps guide your eyes to the stats you want to see

  - The segmented appearance helps you compare the size of one bar to another

- Increased Pokédex page size from 20 to 42

- Removed the default "Normal" type selected on the defense screens

  - This should make setting up your team less annoying since you won't have to
    click an extra time to unselect "Normal" if setting up a single typed
    Pokémon

- Improved usability of the website when using an increased browser default font
  size

- Reduced the brightness of the header in light mode and night mode

- Increased the speed of the Pokédex search a little

- The Pokédex search now dims the results while a search is happening, so you
  know it's working

  - I know this section is slow, and increasing the page size made it slower.
    I'm still trying to come up with a way to make it faster. I've received
    requests to make the page size bigger, and the main reason I haven't done
    much with that is that the search gets really slow...

- Emphasized the stat numbers in the Pokédex instead of the stat labels

## 2025-02-22

- Added translations for the "Night" theme in German, French, Italian, Japanese,
  Portuguese (Brazil), and Portuguese (Portugal)

- Slightly increased the background brightness in the "Night" theme to avoid
  OLED blur when scrolling

## 2025-02-19

- Updated Spanish translation

## 2025-02-18

- Added new theme: Night

- Redesigned the Settings section of the More screen

- Reorganized the Translation section of the More screen

## 2025-02-16

- Updated Vietnamese translation

## 2025-02-15

- Updated French translation

## 2025-02-14

- Changed the "Defense" type selection to use a similar approach as the
  "Offense" type selection

  - You will still be limited to two types unless you select "Three types" in
    the "More" settings screen

  - This change is intended to reduce clicks and scrolling so that you can input
    types faster than before, and see all information on screen using less space

- Increased the size of the type color / checkbox area on the type selector
  buttons

- Fixed an issue where "Freeze-Dry" required selecting "Ice" in order to show
  its type matchups

- Fixed an issue where "Thousand Arrows" required selecting "Ground" in order to
  show its type matchups

- Removed "bounce" over scrolling when scrolling to the top or bottom of the
  page

## 2025-02-13

- Added "Flying Press"

- Moved "Special thanks" section to a separate page

## 2025-02-06

- Added Vietnamese translation

## 2025-01-17

- Updated Portuguese (Portugal) translation

## 2025-01-08

- Updated French translation

## 2025-01-05

- Added Terapagos Stellar Form to the Pokédex

## 2024-12-30

- Updated Korean translation

## 2024-11-21

- Improved error messages for failed CSV import

## 2024-11-12

- Updated Japanese translation

- Fixed an issue where the Japanese "Fairy" type line-wrapped

- Fixed an issue with incorrect font weight on CJK text

## 2024-11-09

- Updated Simplified Chinese translation

## 2024-10-24

- Upgraded images to maximum quality

- Fixed the placeholder image when a Pokémon doesn't have an image

## 2024-10-14

- Fixed incorrect header background color (slightly orange-ish red)

## 2024-10-12

- Updated Spanish translation

- Updated dark mode colors to not be blue tinted

## 2024-10-05

- Fixed Paras sprite (shiny and regular were swapped)

## 2024-08-12

- Updated French translation

## 2024-08-10

- Added Norwegian translation

## 2024-08-06

- Updated German translation

## 2024-07-23

- Fixed an issue where _Scrappy_ calculated damage incorrectly

- Removed _Scrappy_ and _Tinted Lens_ from the defense screen since they aren't
  useful there

## 2024-07-11

- Updated translations for Freeze-Dry, Thousand Arrows, Tinted Lens and Scrappy
  in mutiple languages

- Updated Japanese translation

- Updated Korean translation

- Prevent incomplete locales from being rounded up to 100% completion

## 2024-07-09

- Updated Simplified Chinese translation

- Updated Traditional Chinese translation

## 2024-06-26

- Updated Brazilian Portuguese translation

## 2024-06-23

- Updated French translation

## 2024-06-22

- Fixed a bug where selecting a third type for a Pokémon with their second type
  set to "None" would cause the page to crash

## 2024-06-15

- New "Offense" features

  - Added the special move "Freeze-Dry"

  - Added the special move "Thousand Arrows"

  - Added the offense ability "Tinted Lens"

  - Added the offense ability "Scrappy"

- Fixed a bug where iPhone and iPad would stretch the Pokéball icon to be
  non-circular

## 2024-06-13

- Updated Spanish translation

## 2024-06-12

- Fixed a layout issue on the Team Defense page when Type Count was set to 3

## 2024-06-11

- Updated Dutch translation

## 2024-06-06

- Fixed a bug where types could be selected more than once

  - e.g. Select Fire as second type, then select fire as the first type. The
    second type will be visually disabled, but the Pokémon will have two Fire
    types, leading to incorrect matchup information.

## 2024-05-25

- Updated translations for "Cry" in multiple languages

## 2024-05-23

- Updated Simplified Chinese translation

## 2024-05-11

- Fixed minor issues with the disabled type in the type selector

- "Offense" screen will avoid the 2-column layout on especially small screen
  sizes

- Fixed table sizing on the "Defense Team" screen

- Changed the "Defense Team" team layout and behavior a little bit

  - The Edit/Save button is now just an "Edit" toggle button

- Made the "More" page easier to browse

  - Collapsible headings don't have empty unclickable space

  - Most headings are open initially

    - I've only closed the really long ones

- Simplified the error page (hopefully you've never seen it before...)

- Updated Italian translations

## 2024-05-08

- Made the table easier to read on the Team Defense page

- Pokémon now uses four digit numbers in the Pokédex

- The Pokédex once again scrolls to the top when clicking pagination buttons at
  the bottom of the page

- Made the disabled Pokémon types on the defense page easier to read

- Reduced the height of Pokémon type labels by 2 pixels

- Increased the contrast of focus states

- Fixed the appearance of the "Tera Pokémon" badge

## 2024-05-03

- Switched from AAC to M4A as a fallback for browsers that don't support Ogg
  files (only Safari, as far as I know...)

- Removed delay when searching the Pokédex... please let me know if it seems
  laggy to you

  - I tested on my phone and my old (2015) MacBook Pro (13") and it seems fine
    for speed

  - If anything it feels faster since there's no delay in the search results

  - I don't think the typing delay is noticeable except on the 2015 laptop, and
    even then it's not enough to bother me

  - Maybe I'll try to make it faster in the future?

## 2024-05-01

- Shorten some Portuguese (Portugal) translations

- Updated German translations

## 2024-04-29

- Added a button to play Pokémon cries in the Pokédex

- Fixed mistakes in Traditional Chinese translation

- Updated French translation

- Fixed a bug where clicking a Pokémon's name in the Pokédex or type coverage
  list only worked correctly on the first page of the Pokédex

## 2024-04-28

- Added Portuguese (Portugal) translation

## 2024-04-20

- Added links from Pokémon in the type coverage pages to the Pokédex page

- Updated the Pokédex page to update more quickly when searching

- Updated Portuguese (Brazil) translation

- Updated capitalization in English and Portuguese (Brazil)

## 2024-04-14

- Removed "Starter Eevee" from the Pokédex

- Reduced the size of the Pokédex database by removing an unused field from each
  entry

## 2024-04-11

- Fixed an issue where changing from "three types" to "two types" mode would
  accidentally retain the third type on the defense pages

## 2024-04-06

- Fixed a bug where shiny Pokémon would do their bounce animation before the
  shiny sprite was loaded

- Added a subtle glow to Pokédex sprites, making dark Pokémon stand out better
  when using a dark theme

- Fixed Pokédex images to display at the correct size on desktop

- Optimized Pokédex images as WebP format to increase site loading speed

  - Images should load as WebP 512x512 on retina displays

  - Images should load as WebP 256x256 on non-retina displays

  - WebP images are encoded using `sharp` with the default settings (80% quality
    lossy compression, with 100% quality alpha compression)

  - PNG files still exist and are automatically served to browser that don't
    support WebP

  - If you want to download an image as PNG instead, just change the URL to end
    with `.png` instead of `.webp`

## 2024-04-05

- Upgraded to Pokémon Home images

  - They are much larger and higher detail

  - Many new shiny forms were added

  - Many sprite errors were corrected with this change

- Added the ability Tera Shell

- Fixed an issue with the Pokédex pagination buttons being too short on mobile

## 2024-04-03

- Fixed an issue where Pokédex images would load slower than they should

- Fixed an issue where buttons and select inputs were shorter than they should
  be

## 2024-04-01

- Made the Stellar type less visually distracting and easier to read

- Added the ability to click on Pokédex links to direct link to a Pokémon

- Simplified the Pokéball easter egg visual a little bit

- Removed the flash of white when loading the page in dark mode

- Fixed several French spelling and grammar mistakes

- Fixed a bug where clicking "Defense" from a Pokémon in the Pokédex didn't
  reset abilities and tera types to none

- The language selector is now clearly grouped and less visually confusing

- Clearing the search field in the Pokédex screen no longer focuses the text
  field

- Cleaned up messy URLs & added session storage support

  - You can copy a link to the current page if you want to share it with someone
    else

  - If you refresh the page or duplicate a tab, you'll notice that your current
    information is preserved (Pokédex search query, page number, offense types
    selected, defense types selected)

  - I also changed the defense team storage to be session based so you can look
    at different teams in different tabs

## 2024-03-30

- Improved the style of the easter egg when clicking the Pokéball in the header

- Added lots of missing shiny forms

  - The images are kind of low quality, but it's better than nothing!

- Fixed lack of line wrapping in Pokédex types in Russian

- Fixed Pokéball icon in the header being squished at certain screen sizes

- Removed "editCSVonline" from list of CSV apps

  - It doesn't handle items with commas correctly :(

## 2024-03-21

- Added the ability "Filter" which reduces super effective damage by 25%

- Added localized numeric formatting

  - "1,134" for "1134" in English

  - "0,25" for "0.25" in Spanish

  - Removed fractions like "1 / 2" in favor of decimal numbers like "0.5"

- Updated the app icons with a bit more shading

- Updated Japanese translation to include abilities

## 2024-03-19

- Updated the app icon for browser tabs and adding the app to your home screen,
  dock, or taskbar

## 2024-03-18

- Fixed a matchup bug: Stellar type doesn't replace the Pokémon's defensive
  types, unlike all other Tera types. Instead it just adds a 2x weakness to
  Stellar.

- Fixed an issue where team type selection was visually broken

- Reduced the size of the header and nav area

- Updated the logo and added an icon... Press it for a surprise!

- Switched from system fonts to "Roboto"

- Adjusted font sizes, font weights, and padding values

- Adjusted the header colors

- Updated German translation for the "Reset" button

- Updated Italian translation for the "Reset" button

## 2024-03-17

- Fixed Linux font issue

- Translates the "thanks" section into Spanish (zh-Hans, zh-Hant) and messages
  related to the tera types

## 2024-03-16

- Added support for the new Stellar type

- Added support for selecting Tera types for Solo and Team Defense modes

- Changed offense checkboxes and defense radio buttons to use dark mode when
  selected, so they're easier to see against the dark background

- Removed focus styles when not using keyboard

  - The website will look especially better on mobile now since there won't be
    as many distracting borders on buttons and links

- Changed some font size and padding values

## 2024-03-13

- Added Traditional Chinese translation

- Updated Italian translation

## 2024-03-04

- Updated Korean translation

- Replaced Bulbapedia link with Namu Wiki link for Korean translation

## 2024-03-01

- Updated Simplified Chinese translation

## 2024-02-26

- Updated Portuguese (Brazil) translations

## 2024-02-24

- Updated Spanish translations

## 2024-02-20

- Trying to fix a bug where Firefox won't download translation CSV files
  correctly

## 2024-02-16

- Updated Italian translation

- Updated French translations

## 2024-02-15

- Changed translation section formatting

- Clarified translation payment

## 2024-02-12

- Added Dutch translation

- Fixed translations percentage value for unofficial language translations

## 2024-02-11

- Added translation CSV file downloads

- Updated section about helping me translate the site

- Improved the translation table appearance on mobile

- Improved the readability of the translation sentence asking for CSV emails

- Added mention for LibreOffice Calc

## 2024-02-10

- Updated Portuguese (Brazil) translation

- Added section showing translation completion

  - Please help me translate this site!

## 2024-01-16

- iframe embedding is now blocked to prevent low-effort scam sites from
  profiting off of Pokémon Type Calculator

## 2024-01-08

- Fixed a bug where team abilities would have their order lost upon refreshing
  the page or opening a new tab

- Made arrow icons a little bit thinner

- Simplified the "missing image" image in the Pokédex

## 2023-12-28

- Enabled dark scrollbars in Chrome and Safari

## 2023-12-22

- Added new Pokémon from the The Indigo Disk DLC

- Added some missing images

## 2023-12-08

- Added support for reduced motion user preference

- Updated Firefox scrollbar colors in dark mode

## 2023-10-10

- Added French translations for offense abilities

## 2023-10-04

- Added the "Delta Stream" ability

## 2023-09-21

- Added The Teal Mask DLC Pokémon

## 2023-08-17

- Fixed a slight color mismatch between the page header and the app theme in
  dark mode

## 2023-06-11

- Updated Pokédex with latest PokéAPI data

- Updated generation 9 Pokémon sprites with latest PokéAPI data

## 2023-06-02

- Added Spanish translation for abilities dropdown

## 2023-05-29

- Added the "Wonder Guard" ability

## 2023-05-21

- Fixed an issue where multipliers greater than 8 or below 1/8 wouldn't appear

- Changed team offense matchups to round the multiplier to the nearest power of
  2 rather than omitting it entirely from the table

- Added Dry Skin's 1.25x weakness to Fire, which wasn't possible to represent
  before this update

## 2023-05-15

- Fixed an issue where all shiny sprites had been removed accidentally

## 2023-05-14

- Fixed an issue where abilities were counted more than once for Pokémon with
  multiple types

## 2023-05-13

- Added Pokémon abilities such as "Thick Fat" and "Volt Absorb" to the defense
  page for solo and team matchups

## 2023-05-08

- Fixed a bug where Pikachu showed up twice in the Pokédex

## 2023-05-04

- Updated Spanish translations

## 2023-04-19

- Fixed a bug where button animations disappeared

## 2023-04-18

- Pokémon bounce when entering their shiny form in the Pokédex

- Percentage bars on the offense page animate when changing now

## 2023-04-17

- Shiny link is now a toggle button in the top right of each Pokédex entry

- Hide shiny link for Scarlet/Violet Pokémon since we don't have shiny images
  for them

- Improve accessibility for Pokémon links so it's clearer

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

- Fixed wiki links for names with spaces
  ([@kittenchilly](https://github.com/kittenchilly))

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

- Improved pagination to show first and last Pokémon numbers in addition to page
  numbers

- Fixed Danish capitalization of "Flyvende"

## 2023-01-06

- Added Korean translation

## 2022-12-31

- Fixed an issue where auto-detect language wasn't respected for Pokémon names
  (https://github.com/wavebeem/pkmn.help/issues/192)

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

- Updated the logic for "normal" effectiveness coverage so that Pokémon aren't
  counted more than once across the three choices

## 2022-12-02

- Added "normal" effectiveness coverage to the offense page

## 2022-11-17

- Added generation 9 Pokémon

## 2022-09-22

- Added Danish translations

## 2022-05-07

- Added Russian & Kazakh translations

## 2022-04-21

- Added Portuguese (Brazil) translations

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

This is as far back as I bothered researching history. You can look at the
[git log](https://github.com/wavebeem/pkmn.help/commits/master/) if you want to
know more detail about what else I've changed since 2013.
