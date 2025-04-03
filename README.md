# Todo List Application Documentation

## Overview
A modern, responsive Todo List application built with HTML, CSS, and JavaScript. Features include task categorization, due dates, filtering, and local storage persistence.

## File Structure

### 1. index.html
Main HTML file that defines the structure of the application.

#### Key Components:
- Task input form with category and date selection
- Task filtering system (All, Active, Completed)
- Select All functionality with Delete All option
- Responsive layout for all screen sizes

### 2. style.css
Handles all styling and animations for the application.

#### Key Styles:
- Responsive design with media queries
- Animations for adding/removing tasks
- Category color coding
- Custom styling for form elements
- SweetAlert2 customization
- Mobile-friendly adjustments

### 3. script.js
Manages all application functionality and data management.

#### Key Features:
- Local Storage Integration
  - Saves tasks automatically
  - Persists data between sessions
  - Loads saved tasks on startup

- Task Management
  - Add new tasks
  - Delete individual tasks
  - Mark tasks as complete
  - Bulk delete with confirmation
  - Category assignment
  - Due date tracking

- UI Interactions
  - Filter tasks by status
  - Select all tasks
  - Delete all selected tasks
  - Responsive notifications
  - Form validation

## Features

### Task Management
- Add tasks with descriptions
- Assign categories (Personal, Work, Shopping, Other)
- Set due dates
- Mark tasks as complete
- Delete individual tasks
- Bulk delete functionality

### Categories
- Personal (Blue)
- Work (Pink)
- Shopping (Green)
- Other (Orange)

### Filtering
- All tasks
- Active tasks
- Completed tasks

### Data Persistence
- Tasks saved in localStorage
- Automatic saving on all changes
- Data persists between browser sessions

### UI/UX Features
- Responsive design
- Smooth animations
- Interactive notifications
- Confirmation dialogs
- Mobile-friendly interface

## Technical Implementation

### Local Storage
```javascript
// Save tasks
localStorage.setItem('todos', JSON.stringify(todos));

// Load tasks
todos = JSON.parse(localStorage.getItem('todos')) || [];
```

### Task Structure
```javascript
{
    text: "Task description",
    completed: false,
    category: "personal",
    dueDate: "2024-01-01"
}
```

### Responsive Breakpoints
- Mobile: < 576px
- Tablet: < 768px
- Desktop: ≥ 768px

## Dependencies
- Bootstrap 5.3.0
- Font Awesome 6.0.0
- SweetAlert2
- Animate.css

