## How to Run the Project

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** (v6 or higher)

### Steps to Run

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/sajalparua/doctor_appointment_app.git
   cd doctor_appointment_app
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Development Server**:
   ```bash
   npm start
   ```

   The app will be available at `http://localhost:3000`.

4. **Run Tests (Optional)**:
   ```bash
   npm test
   ```

5. **Build for Production (Optional)**:
   ```bash
   npm run build
   ```

---

## Folder Structure

```
doctor_appointment_app/
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   ├── context/           # Context API for state management
│   ├── App.js             # Main application file
│   ├── index.js           # Entry point
│   ├── index.css          # Global styles
│   └── setupTests.js      # Test setup
├── package.json           # Project metadata and dependencies
├── README.md              # Project documentation
└── .gitignore             # Ignored files
```

---

## Features Implemented

### Components
- **Calendar Grid**: Displays the monthly calendar with appointments.
- **Booking Modal**: Popup for booking new appointments.
- **Appointment Strip**: Displays individual appointment details.
- **Sidebar**: Navigation menu for the app.
- **Toggle Switch**: Switch between patient and doctor views (doctor functionality not yet implemented).

### Context API
- **State Management**: Used to manage global states like appointments and popup visibility.

---

## Future Enhancements
- **Doctor Functionality**: Add features for doctors to view and manage their schedules.
- **Improved UI/UX**: Enhance the design for better user experience.
- **Backend Integration**: Connect to a backend API for persistent data storage.
- **Notifications**: Add reminders for upcoming appointments.
- **Authentication**: Implement user login and registration.

---

## License

This project is licensed under the **MIT License**.
