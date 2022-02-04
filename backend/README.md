# mern-auth

![Final App](https://i.postimg.cc/tybZb8dL/final-MERNAuth.gif)
Minimal full-stack MERN app with authentication using passport and JWTs.

This project uses the following technologies:

- [React](https://reactjs.org) and [React Router](https://reacttraining.com/react-router/) for frontend
- [Express](http://expressjs.com/) and [Node](https://nodejs.org/en/) for the backend
- [MongoDB](https://www.mongodb.com/) for the database
- [Redux](https://redux.js.org/basics/usagewithreact) for state management between React components

## Medium Series

- [Build a Login/Auth App with the MERN Stack — Part 1 (Backend)](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-1-c405048e3669)
- [Build a Login/Auth App with the MERN Stack — Part 2 (Frontend & Redux Setup)](https://blog.bitsrc.io/build-a-login-auth-app-with-mern-stack-part-2-frontend-6eac4e38ee82)
- [Build a Login/Auth App with the MERN Stack — Part 3 (Linking Redux with React Components)](https://blog.bitsrc.io/build-a-login-auth-app-with-the-mern-stack-part-3-react-components-88190f8db718)

## Configuration

- project
.  frontend
.  backend

- set your wallet's private key to frontend/.secret file
This wallet will become to a wallet for admin.

## installation

- hardhat install // can install hardhat to frontend.
npm install --save-dev hardhat
npx hardhat
- installing npm differently for frontend and backend
npm install.

## Quick Start

- compile and deploy smart contracts
npx hardhat compile
npx hardhat run --network bsctestnet scripts/deploy.js

- setting addresses for deployed contracts into frontend/src/config.js
marketplace address and nft address.

- run frontend
npm start  // client on http://localhost:3000

- run backend
npm start  // Server runs on http://localhost:5000