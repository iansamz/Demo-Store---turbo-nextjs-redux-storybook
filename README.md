# Turbo NextJs Redux Storybook

### Overview

This project is a basic storefront built using the [Fake Store API](https://fakestoreapi.com). It fetches all products and displays them as cards on a page, with the ability to add items to a cart.

### Utilities

Tools used by this repo:

- [Turbo](https://turbo.build/) - for incremental bundling
- [Next.js](https://nextjs.org/) - a React framework for server-side rendering and static site generation
- [Storybook](https://storybook.js.org/) - for building UI in isolation
- [Redux](https://redux.js.org/) - for state management and data fetching
- [Tailwind CSS](https://tailwindcss.com/) for styles
- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Features Implemented

- **Global State Management**: Utilized Redux for state management, including handling cart operations and user authentication.
  - See [`cart-slice.ts`](apps/test-store/src/lib/store/slices/cart-slice.ts) for cart state management.
  - See [`auth.ts`](apps/test-store/src/lib/store/services/auth.ts) for authentication services.
- **Routing**: Implemented multiple routes using Next.js.
- **TypeScript**: Ensured type safety across the application.
- **Semantic HTML**: Used semantic HTML elements for better accessibility.
- **CSS**: Styled components using Tailwind CSS for a polished look.

### How to Run

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm  install
   ```
3. Run the development server:
4. Open http://localhost:3000 to view the application.
5. Open http://localhost:6006 to view the application storybook.

### Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for linting errors.
- `npm run format`: Runs Prettier to format the code.

### Breakdown of Work Done

1. Project Setup:

- Initialized the project with Next.js and TypeScript.
- Configured ESLint and Prettier for code quality and consistency.
- Set up Tailwind CSS for styling.

2. State Management:

- Implemented Redux for global state management.
- Created slices for handling cart operations and user authentication.
- Used Redux persist to save cart data on local storage
- Used cookies to store user token

3. Routing:

- Set up multiple routes using Next.js.
- Created pages for product listing and cart.

4. API Integration:

- Integrated with the Fake Store API to fetch product data.
- Implemented data fetching using Redux Toolkit's RTK Query.

5. UI Components:

- Built reusable UI components using React.
- Styled components with Tailwind CSS.
- Used Storybook to develop and test components in isolation.

6. TypeScript:

- Ensured type safety across the application.
- Defined types for API responses and application state.

7. Semantic HTML:

- Used semantic HTML elements to improve accessibility.

## Future Improvements

- Enhance responsiveness for better mobile experience.
- Add more unit tests for critical components and functions.
- Improve error handling and user feedback mechanisms.
