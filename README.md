# Vitecord

An offline Discord clone built with modern web technologies.

## Features

- Modern UI inspired by Discord
- Server and channel creation
- User authentication
- Responsive design (in progress)
- Customizable interface

## Tech Stack

- ⚡️ [Vite](https://vitejs.dev/) - Next generation frontend tooling
- 🟦 [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- 🐻 [Zustand](https://zustand-demo.pmnd.rs/) - State management
- 🎨 [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- 🛠️ [ShadCN](https://ui.shadcn.com/) - Unstyled, accessible UI components


## Project Structure

```
├── assets/          # Static assets
├── components/       # UI components
├── pages/            # Pages
├── types.ts            # TypeScript types
├── utils/            # Utility functions
├── vite.config.ts    # Vite configuration
├── index.html        # Entry point
├── main.ts           # Main application entry point
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
```
Each directory and file serves a specific purpose in the application architecture:
- **assets**: Contains static files used throughout the application
- **components**: Houses reusable UI components following component-based architecture
- **pages**: Contains the main views and routes of the application
- **types**: Central location for TypeScript type definitions
- **utils**: Shared utility functions and helpers
- **config files**: Configuration for Vite, Tailwind, and TypeScript
