# Building Your First Web App

This tutorial will guide you through creating your first web application using HTML and JavaScript, with AI assistance from Claude and Cursor.

## Prerequisites
- Cursor IDE installed
- Claude account
- Basic understanding of HTML/CSS/JavaScript

## Step 1: Planning Your App

1. **Define Your Goal**
   - Start with a simple, clear objective
   - Example: "I want to create a basic todo list"

2. **Ask Claude for Help**
   ```
   Prompt: "I want to create a simple todo list web app. 
   What would be the basic features and structure?"
   ```

3. **Create a Basic Specification**
   - List of tasks
   - Add/Remove functionality
   - Local storage for persistence
   - Simple styling

## Step 2: Setting Up Your Project

1. **Create Project Structure**
   ```
   my-first-app/
   ├── index.html
   ├── styles.css
   └── script.js
   ```

2. **Initialize HTML Template**
   ```html
   <!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <title>My First App</title>
       <link rel="stylesheet" href="styles.css">
   </head>
   <body>
       <div id="app"></div>
       <script src="script.js"></script>
   </body>
   </html>
   ```

## Step 3: Development with AI Assistance

1. **Using Cursor's AI Features**
   - Press `Cmd/Ctrl + K` to open AI command
   - Describe what you want to build
   - Review and modify suggested code

2. **Common AI Prompts**
   ```
   "Create a function to add new todos"
   "Add local storage functionality"
   "Style the todo list with CSS"
   ```

## Step 4: Testing and Refinement

1. **Manual Testing**
   - Add items
   - Remove items
   - Refresh page to test persistence

2. **AI-Assisted Debugging**
   - Ask Claude to review your code
   - Use Cursor's inline AI help for errors

## Best Practices

1. **Code Organization**
   - Keep functions small and focused
   - Use meaningful variable names
   - Add comments for clarity

2. **Error Handling**
   - Validate user input
   - Provide feedback to users
   - Handle edge cases

3. **User Experience**
   - Clear interface
   - Responsive design
   - Intuitive interactions

## Next Steps

- Add more features (due dates, categories)
- Improve styling
- Implement data validation
- Add offline support

## Resources
- [MDN Web Docs](https://developer.mozilla.org/)
- [Cursor Documentation](https://docs.cursor.com/)
- [Claude Documentation](https://docs.anthropic.com/claude/) 