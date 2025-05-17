# BrainBook - Note Taking App

BrainBook is a web-based note-taking application that allows users to create, edit, and manage personal notes securely. It features user authentication, flash messaging, and a modern, responsive UI built with Bootstrap and EJS.

## Features

- User registration and login (with Passport.js)
- Create, edit, and delete notes
- Notes are private to each user
- Flash messages for feedback
- Responsive design with Bootstrap 5
- MongoDB for persistent storage

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- Passport.js (Local Strategy)
- EJS & ejs-mate
- Bootstrap 5
- connect-flash
- express-session

## Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/sujeetkumar-29/Brainbook-notetaking-app
   cd brainbook
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory with the following:
   ```
   ATLASDB_URL=your_mongodb_connection_string
   SECRET=your_session_secret
   ```

4. (Optional) Initialize sample notes:
   ```sh
   node init/index.js
   ```

5. Start the server:
   ```sh
   node index.js
   ```

6. Open your browser and go to [http://localhost:5500/notes](http://localhost:5500/notes)

## Project Structure

```
.env
index.js
middleware.js
models/
routes/
public/
utils/
views/
init/
```

- `models/` - Mongoose schemas for User and Note
- `routes/` - Express route handlers for users and notes
- `public/` - Static assets (CSS, JS, SVG)
- `views/` - EJS templates
- `utils/` - Utility functions and error classes
- `init/` - Sample data and DB initializer

## License

This project is licensed under the ISC License.

---

Made with ❤️ for learning and productivity!