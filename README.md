# E-Shop eCommerce Platform

> eCommerce platform built with the React + Typescript & NodeJs + Typescript & Redux.

![screenshot](https://e-shop-commerce-app.herokuapp.com/images/E-commerce-shop-Capture.PNG)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

### ES Modules in Node

I have used Ecmasript 6 with typescript in the backend in this project. Be sure to have at least Node v14.6+ .

### Env Variables

Create a .env file in the root of the project and add the following

```
NODE_ENV = development
PORT = 5000
DATABASE_URL = your mongodb uri
JWT_SECRET_KEY = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
CLOUDINARY_NAME=Your cloudnary name
CLOUDINARY_API_KEY=Your cloudainary api_key
CLOUDINARY_SECRET=Your cloudinary secret
REACT_APP_BASE_URL= it isn't required for the purpose because i already have a proxy on the frontend 
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```
# Run frontend (:3000) & backend (:4000)
yarn dev:client

# Run backend only
yarn dev:backend
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
yarn run build
```

There is a Heroku postbuild script, so if you push to Heroku, no need to build manually for deployment to Heroku

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
yarn run data:import

# Destroy data
yarn run data:destroy
```

```
Sample User Logins

admin@test.fr (Admin)
123456

john@test.fr (Customer)
123456

jane@test.fr (Customer)
123456
```


## License

The MIT License

