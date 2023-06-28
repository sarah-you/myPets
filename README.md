# myPets

## A full-stack e-commerce web application for pet owners who want to purchase pet goods.

As a cat owner and pet enthusiast, I understand the panic that arises when your pets’ favorite products run out. That’s why I’ve created a one-stop online store with monthly subscriptions, ensuring you never have to worry about running out of essentials again. Browse through the curated selection of high-quality pet products and enjoy a seamless shopping journey.

### Link to myPets

https://mypets.azurewebsites.net/

### Tech Stack

- React, Node, Express, postgreSQL
- HTML5, CSS3/Bootstrap, JavaScript ES6

**Tools:** Azure, Git, GitHub, Webpack, Babel, Figma, Chrome DevTools, VS Code

**Project Management:** GitHub, Slack, [Notion](https://www.notion.so/Final-Project-Brain-Dump-c8a3062a6d74414a8e16b833811f2bc4)

**Other Resources:** React Icons, Favicon, Pexels, Behance, Pinterest

### Features

- User can browse product pages based on pet types or all products
- User can click on each product listing and see detailed information
- User can subscribe by registering via pop-up modal or Account tab on navigation bar
- User can sign in or sign out after registering
- User can add items to wishlist/cart after signing in
- User can click through the images in product details page to see each image for the products
- User can use the footer to quickly navigate to pages without scrolling back up
- User can interact with the app on mobile, tablet, or desktop devices

#### Landing Page -- Carousel, Pop-Up CTA

![myPets-overview gif 1](/client/public/images/myPets-overview-1.gif)

#### Signed In Account > WishList > Product Details > Add to Cart > Remove Item from Cart

![myPets-overview gif 2](/client/public/images/myPets-overview-2.gif)

#### Stretch Features

- Search bar to search products
- Stripe Payment for full transaction

---

### System requirements for local development

Start `postgreSQL` database (make sure to `stop` after completing updates)

```
sudo service postgresql start
```

Start server `Node.js` (`ctrl C` to quit)

```
npm run dev
```

**push/merge everything!**

#### Go to `Azure` tab > Azure subscription 1 > App Services > myPets (right click) > deploy web app
