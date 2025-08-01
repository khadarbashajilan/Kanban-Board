# Kanban-Board

A modern Kanban board application built with React, Redux Toolkit, and TypeScript. This project allows users to create boards, add and manage cards (tasks) within each board, and visually organize their workflow using a drag-and-drop interface. The UI is responsive and styled with Tailwind CSS for a clean, modern look.

## Features

- Create, view, and delete boards
- Add, edit, and delete cards (tasks) within boards
- Drag and drop cards between columns (To Do, In Progress, Done)
- View and edit card details
- Responsive design for desktop and mobile
- Modern, accessible UI

## Technologies Used

### Core Technologies
- React 19
- TypeScript
- Vite 7
- Redux Toolkit
- React Redux
- React Router DOM 7

### Styling & UI
- Tailwind CSS 4
- Lucide React (for icons)

### Development Tools
- ESLint
- TypeScript ESLint

## How It Works

### Application Structure

The application is organized into several key directories:
- `pages` – Main screens: Boards list, Board details, Card details, Not Found page
- `layouts` – Layout wrapper for consistent page structure
- `store` – Redux Toolkit slices and store configuration
- `types` – TypeScript type definitions

### Data Flow

1. **State Management**
   - Uses Redux Toolkit for global state management
   - The `boards` slice manages all boards and their cards
   - Actions include creating/deleting boards, and adding/updating/deleting cards

2. **Board and Card Operations**
   - Users can create a new board from the boards list page
   - Each board contains an array of cards (tasks), each with a status (`todo`, `inprogress`, `done`)
   - Cards can be added, edited, deleted, and moved between columns via drag-and-drop

3. **Navigation Flow**
   - `/boards` – Lists all boards
   - `/boards/:boardId` – Shows details and cards for a specific board
   - `/boards/:boardId/card/:cardId` – Shows and edits details for a specific card

4. **UI and Interaction**
   - The UI is built with Tailwind CSS for rapid styling and responsiveness
   - Lucide React provides modern icons
   - All state changes are handled via Redux actions and reducers

5. **Routing**
   - React Router DOM manages navigation between boards, board details, and card details
   - Not Found page handles invalid routes

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Start the development server: `npm run dev`
4. Access the application at `http://localhost:5173`

---

Enjoy organizing your tasks