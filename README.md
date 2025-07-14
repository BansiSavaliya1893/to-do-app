# React Todo App

A modern React.js version of the original vanilla JavaScript todo app with the same functionality and styling.

## Features

- ✅ Add tasks with title, description, and priority
- ✅ Edit existing tasks
- ✅ Delete tasks
- ✅ Mark tasks as completed
- ✅ Local storage persistence
- ✅ Responsive design
- ✅ Same beautiful UI as the original

## Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

3. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

```
src/
├── components/
│   ├── TodoForm.js      # Form component for adding/editing tasks
│   ├── TodoList.js      # Table component that displays all tasks
│   └── TodoItem.js      # Individual task row component
├── App.js               # Main app component with state management
├── index.js             # React app entry point
└── index.css            # Styles (same as original)
```

## How it Works

The app uses React hooks for state management:
- `useState` for managing tasks, editing state, and form inputs
- `useEffect` for loading/saving to localStorage
- Props for passing data and functions between components

The functionality is identical to the original vanilla JavaScript version, but now uses React's component-based architecture for better maintainability and reusability.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm run build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (not recommended) 