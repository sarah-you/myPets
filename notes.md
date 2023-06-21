#### Database Data

- hardcoded each individual property (17 columns) for each product item (total 46 sample products) and imported to database via sql file
- pulled data from chewy.com
  (PLEASE NOTE: ALL PRODUCTS ARE SAMPLED FROM CHEWY.COM FOR EDUCATIONAL PURPOSES. NOTHING FOR SALE)

#### Server

```
 // Implementation note for:

 app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

 * When the final project is deployed, this Express server becomes responsible
 * for serving the React files. (In development, the Create React App server does this.)
 * When navigating in the client, if the user refreshes the page, the browser will send
 * the URL to this Express server instead of to React Router.
 * Catching everything that doesn't match a route and serving index.html allows
 * React Router to manage the routing.
```

#### HTML

      manifest.json provides metadata used when your web app is installed on a
      user's mobile device or desktop. See https://developers.google.com/web/fundamentals/web-app-manifest/

      Notice the use of %PUBLIC_URL% in the tags above.
      It will be replaced with the URL of the `public` folder during the build.
      Only files inside the `public` folder can be referenced from the HTML.

      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will
      work correctly both with client-side routing and a non-root public URL.
      Learn how to configure a non-root public URL by running `npm run build`.

      This index.html file is a template.
      If you open it directly in the browser, you will see an empty page.

      You can add webfonts, meta tags, or analytics to this file.
      The build step will place the bundled scripts into the <body> tag.

      To begin the development, run `npm start` or `yarn start`.
      To create a production bundle, use `npm run build` or `yarn build`.
