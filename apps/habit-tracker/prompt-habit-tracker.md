# Claude Chat URL

- https://claude.ai/share/b84c0f9c-c35c-4079-890a-2cc1ef053179

# Prompt Core

Objective:
Generate a pure HTML and JavaScript habit tracker app without any frameworks (e.g., React, Vue) or external libraries (e.g., jQuery). The app should store data using localStorage for persistence and provide an intuitive UI for tracking daily habits.

Features:
User Interface:

A clean and minimal dashboard where users can add and track habits.
A table or grid layout showing daily progress for each habit.
A button-based interaction to mark a habit as completed for the day.
Adding & Removing Habits:

An input field to add new habits with a name.
A button to remove a habit if no longer needed.
Tracking Progress:

A grid-based system (like a calendar) where users can toggle completion for each day.
Clicking on a day should toggle between completed and not completed states.
A simple visual cue (e.g., green for completed, gray for not completed).
Persistence with localStorage:

Habit names and their completion states should persist even after refreshing the page.
The data should be stored efficiently using JSON format inside localStorage.
Responsive Design:

The UI should be mobile-friendly with flexible grid layouts.
On smaller screens, ensure that buttons and text are touch-friendly.
Extra Enhancements (if possible):

A streak counter showing how many consecutive days a habit has been completed.
A simple progress bar for each habit to show overall adherence.
Dark mode support (toggle button to switch themes).
Code Structure:
HTML:

Contains a simple form for adding habits.
Displays a dynamically generated habit table/grid.
Includes a button for each habit to mark completion per day.
JavaScript:

Uses localStorage to store and retrieve habits.
Provides functions to add, remove, and update habit progress.
Uses event listeners to handle UI interactions.
Encapsulates logic into functions for easy maintenance.
Example Usage:
User adds "Read 10 pages" habit → It appears in the list.
User clicks on today's cell → It toggles between done (✔️) and not done (❌).
User refreshes the page → Data persists in localStorage.
User removes a habit → It disappears from the list.
Output Format:
Generate a single self-contained HTML file with embedded JavaScript that includes all functionality. Ensure the script is cleanly commented to explain logic and make it easy to extend.

Constraints:
No external libraries or frameworks (Vanilla JavaScript only).
No backend (Everything must run in-browser).
Must use localStorage for persistence.
Must be mobile-friendly with responsive design.
Expected Output:
A single index.html file that runs as a habit tracker in a browser, with functionality for adding, tracking, and removing habits.

# Follow-up Prompt

1. Improve the overall app experience making it functionally useful
2. Add an option to import progress from .json or .csv
3. Add an option to export the progress as .json or .csv