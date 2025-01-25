# SwissNote Assignment Frontend

This is the frontend for the **SwissNote Assignment**, a project designed to provide users with a platform to manage events efficiently. It includes features such as user authentication, event management, and a profile page with CRUD operations for events.

## Deployed Link

You can access the live application here:  
[SwissNote Frontend](https://swissnote-ass-frontend.vercel.app/)

## Features

### 1. **Authentication**
- **Register:** Users can create a new account to start using the platform.
- **Login:** Users can securely log in using their credentials.
- **Logout:** Users can log out of the application when they are done.

### 2. **Event Management**
- **List of Events:** Once logged in, users can view a list of available events.
- **Booked Events:** Users can see the events they have already booked.

### 3. **Profile Page**
- **CRUD Operations on Events:**
  - **Create:** Add new events directly from the profile page.
  - **Read:** View the details of all events.
  - **Update:** Modify existing event details.
  - **Delete:** Remove events that are no longer required.

## Tech Stack
- **Frontend:** React.js
- **State Management:** Context API
- **Styling:** CSS/TailwindCSS
- **Deployment:** Vercel

## Prerequisites
- Node.js (v14 or later)
- npm or yarn

## How to Run Locally
1. Clone the repository:
   ```bash
   git clone https://github.com/Rohit-huta-p/swissnote_ass_frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd swissnote_ass_frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```
   REACT_APP_API_URL=your_backend_api_url
   ```

5. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

6. Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

## Building for Production
```bash
npm run build
# or
yarn build
```

## Running Tests
```bash
npm test
# or
yarn test
```

## Deployment
The project is set up for easy deployment on Vercel. Simply connect your GitHub repository to Vercel, and it will automatically deploy on push to the main branch.



Project Link: [https://github.com/Rohit-huta-p/swissnote_ass_frontend](https://github.com/Rohit-huta-p/swissnote_ass_frontend)
