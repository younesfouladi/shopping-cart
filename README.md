<div align="center">
<img src="public/images/favicon.webp" alt="YOFI Logo" width="100"/>
<h1>YOFI Shopping Cart</h1>
<p>
A modern, feature-rich e-commerce shopping cart application built with React, TypeScript, and Vite.
</p>
<p>
<a href="https://www.google.com/search?q=https://github.com/younesfouladi/shopping-cart"><strong>Explore the docs »</strong></a>
<br />
<br />
<a href="https://www.google.com/search?q=https://github.com/younesfouladi/shopping-cart/issues">Report Bug</a>
·
<a href="https://www.google.com/search?q=https://github.com/younesfouladi/shopping-cart/issues">Request Feature</a>
</p>
</div>
About The Project

YOFI Shopping Cart is a responsive and stylish e-commerce frontend application. It provides a seamless user experience for browsing products, managing a shopping cart and wishlist, and checking out. The project is built with a modern tech stack, ensuring high performance and maintainability. It fetches product data from the Fake Store API.
Key Features

    Responsive Design: A beautiful UI that works on all devices, from mobile phones to desktops.

    Product Exploration: Users can view all products, see detailed product pages, and view items by category.

    Wishlist: Add and remove favorite items to a personal wishlist.

    Shopping Cart: A fully functional cart to add, remove, and change the quantity of items.

    Real-time Search: Instantly search for products with a responsive search bar.

    Dark Mode: Switch between light and dark themes for a better viewing experience.

    Smooth Animations: Engaging animations and transitions using GSAP and Framer Motion.

    Notifications: Users receive feedback on actions like successful checkouts using sonner.

🛠️ Built With

This project is built with a modern and powerful set of technologies.
Core Technologies

    React - A JavaScript library for building user interfaces.

    TypeScript - A typed superset of JavaScript that compiles to plain JavaScript.

    Vite - A next-generation frontend tooling that is incredibly fast.

Styling & UI

    Tailwind CSS - A utility-first CSS framework for rapid UI development.

    Flowbite React - An open-source library of UI components built with Tailwind CSS and React.

    shadcn/ui (Tooltip) - Re-usable components built using Radix UI and Tailwind CSS.

    Lucide React - A beautiful and consistent icon toolkit.

    GSAP (GreenSock Animation Platform) - A professional-grade animation library for the modern web.

    Framer Motion - A production-ready motion library for React.

    Sonner - An opinionated toast component for React.

Routing & State Management

    React Router - For declarative routing in React applications.

    React Context API - For managing global state like products, cart, and wishlist.

Development & Testing

    Vitest - A blazing fast unit test framework powered by Vite.

    React Testing Library - Simple and complete React DOM testing utilities that encourage good testing practices.

    ESLint - For identifying and reporting on patterns found in ECMAScript/JavaScript code.

    TypeScript ESLint - Tooling which enables ESLint to support TypeScript.

🚀 Getting Started

To get a local copy up and running, follow these simple steps.
Prerequisites

You need to have Node.js and npm (or yarn/pnpm) installed on your machine.

    npm

    npm install npm@latest -g

Installation

    Clone the repo

    git clone [https://github.com/younesfouladi/shopping-cart.git](https://github.com/younesfouladi/shopping-cart.git)

    Install NPM packages

    npm install

    Start the development server

    npm run dev

    Your application should now be running on http://localhost:5173/ (or another port if 5173 is busy).

Running Tests

To run the tests, use the following command:

npm run test

For a more interactive testing experience with a UI, you can run:

npm run test:ui

📂 Project Structure

The project follows a standard React application structure:

/
├── __tests__/         # Test files for components and logic
├── public/             # Static assets like images and fonts
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── cart/
│   │   ├── explorePage/
│   │   ├── homePage/
│   │   ├── navbar/
│   │   ├── productDetails/
│   │   └── ui/
│   ├── context/        # React Context for state management
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── routes/         # Routing configuration
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   ├── App.tsx         # Main application component
│   └── main.tsx        # Application entry point
├── .eslintrc.js        # ESLint configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── vite.config.ts      # Vite configuration

Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

    Fork the Project

    Create your Feature Branch (git checkout -b feature/AmazingFeature)

    Commit your Changes (git commit -m 'Add some AmazingFeature')

    Push to the Branch (git push origin feature/AmazingFeature)

    Open a Pull Request

License

Distributed under the MIT License. See LICENSE for more information.
Contact

Younes Fouladi - younesfouladi.github.io - younes.fouladi@gmail.com

Project Link: https://github.com/younesfouladi/shopping-cart
