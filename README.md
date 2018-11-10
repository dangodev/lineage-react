# Lineage 2017 Site

# Setup

```
npm i
```

# Development

Start the development server with

```
npm run start
```

and it will be available at `localhost:8080`, with mock data.

#### Debugging

If on VSCode and using [Debugger for
Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome),
open a new Terminal tab and run the following to allow breakpoints in VSCode:

```
npm run debug
```

_Note: it’s configured for Chrome Canary. Remove `\\ Canary` in `launch.json`
to configure for Chrome (stable)._

# Deploy

Easy deployment is made possible via the [Shopify Theme
Kit](https://shopify.github.io/themekit/). Install that and generate a
[private API key in Shopify
admin](https://help.shopify.com/manual/apps/private-apps#generate-credentials-from-the-shopify-admin)
with **Read and write** access to theme templates and theme assets. Copy
`config.yml.example` to `config.yml` and fill in the missing details. Then
run:

```
npm run deploy
```
