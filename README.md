# JS Frameworks CA – eCom Store

<img src="src/images/project-home.png">

This project is a React-based eCommerce application built as part of the Noroff Front-End Frameworks course assignment.

The application demonstrates usage of React with routing, API integration, global state management, form validation, and styled-components.

## Live demo

[Netlify Website](https://noroff-react-ca.netlify.app/)

## Features

- Product listing fetched from Noroff API
- Look-ahead search on products
- Individual product detail pages
- Shopping cart with add/remove functionality
- Checkout flow with success page and cart reset
- Contact form with validation
- Global layout with header and footer
- Styled using styled-components

## Project structure

- `src/api` - API requests
- `src/components` - Reusable UI and layout components
- `src/pages` - Application pages
- `src/context` - Global state management (cart)
- `src/utils` - Helper function (price formatting)

## Tech stack

- **React** (Create React App)
- **React Router**
- **styled-components**
- **Context API + useReducer**
- **Noroff Online Shop API**

## API

Products are fetched from the [Noroff API](https://v2.api.noroff.dev/online-shop)

## Getting started locally

1. Clone the repository.
2. Install dependencies and start the development server:

```bash
npm install
npm start
```
The app will be available at: http://localhost:3000
