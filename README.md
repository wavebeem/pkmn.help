[![Netlify Status](https://api.netlify.com/api/v1/badges/1673960f-312c-45ac-9e23-43caabe3b5bb/deploy-status)](https://app.netlify.com/sites/pkmn-help/deploys)

**👉 <https://www.pkmn.help>**

# Pokémon Type Calculator

Your premier Pokémon companion

- Check type matchups

- Check type coverage against the Pokédex

- Plan your team

- View the Pokédex

  - See HD Pokémon Home art

  - Listen to Pokémon cry sound effects

  - See shiny forms

  - View stats

- Translated into many languages

## Development

```
$ npm install
$ npm start
```

## Updating Pokédex data

Make sure to delete all the images in `public/img` before running this command
or all existing images will be kept

```
$ npm run update-pokedex
```

or if you just want to update images without updating the Pokédex

```
$ npm run update-pokedex fast
```
