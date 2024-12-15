
# Dynamic Event Calendar Application


This is a dynamic and interactive Event Calendar application built using React.js with modern UI components from shadcn. It allows users to manage events efficiently while offering a clean and intuitive user experience.


## Demo
Live Link:
https://calender-event-project-wz62.vercel.app/


## Features

### Calendar View
- Displays the current month as a grid with all days properly aligned.
- Navigation buttons ("Previous" and "Next") allow seamless switching between months.
- Highlights the current day and selected day visually.
### Event Management
- Add Events: Click on a day to add a new event.
- Edit Events: Modify an existing event's details.
- Delete Events: Remove events as needed.
- Each event includes:
  - Event Name
  - Start Time & End Time
  - Optional Description
### Event List
- Events for the selected day are displayed in a modern modal panel.
- Also we can drag and drop event 
### Data Persistence
- Events are saved to localStorage for persistence between page refreshes.



## Technology Used

- React.js (Functional Components & Hooks)
- shadcn for modern UI components
- localStorage for data persistence
- CSS and Tailwind for custom styling


## Run Locally

1.Clone the project

```bash
  git clone https://github.com/arijitbouri0/CalenderEventProject

```

2.Navigate to the Directory
```bash
  cd CalenderEventProject
```

3.Install dependencies
```bash
  npm install
```

4.Start the development server
```bash
  npm run dev
```

5.Open the app in your browser
```bash
  http://localhost:5172
```

### Setup Frontend

1.Navigate to the client folder:
```bash
cd ../client
```

3.Create a .env file and add:
```bash
BACKEND_SERVER='http://localhost:8000'
```

Install frontend dependencies:
```bash
npm install
```

Run the React App
```
npm run dev
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Support

For support, email arijitbouri0@gmail.com .

