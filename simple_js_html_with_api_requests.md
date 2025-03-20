# Building Secure Web Applications with HTML, JavaScript, and APIs

This tutorial will guide you through building web applications that interact with external APIs while following security best practices. We'll cover everything from basic setup to deployment considerations.

## Table of Contents
- [Building Secure Web Applications with HTML, JavaScript, and APIs](#building-secure-web-applications-with-html-javascript-and-apis)
  - [Table of Contents](#table-of-contents)
  - [Project Structure](#project-structure)
  - [Setting Up the Development Environment](#setting-up-the-development-environment)
  - [Security Best Practices](#security-best-practices)
    - [1. Never Expose API Keys in Frontend Code](#1-never-expose-api-keys-in-frontend-code)
    - [2. Use Environment Variables](#2-use-environment-variables)
  - [Building the Frontend](#building-the-frontend)
  - [Creating a Secure Backend](#creating-a-secure-backend)
  - [Environment Variables](#environment-variables)
  - [API Integration](#api-integration)
    - [Frontend API Calls](#frontend-api-calls)
    - [Backend Proxy Endpoints](#backend-proxy-endpoints)
  - [Deployment Considerations](#deployment-considerations)
  - [Conclusion](#conclusion)
  - [Additional Resources](#additional-resources)

## Project Structure

A well-organized project structure is essential for maintainability: 

## Setting Up the Development Environment

1. Initialize a new Node.js project:
```bash
npm init -y
```

2. Install necessary dependencies:
```bash
npm install express dotenv node-fetch
```

3. Create a `.gitignore` file:
```
node_modules/
.env
.DS_Store
```

## Security Best Practices

### 1. Never Expose API Keys in Frontend Code
❌ Bad Practice:
```javascript
const apiKey = "your-api-key-here";
fetch(`https://api.example.com/data?key=${apiKey}`);
```

✅ Good Practice:
- Store API keys in environment variables
- Create backend proxy endpoints
- Never expose sensitive data in client-side code

### 2. Use Environment Variables
Create a `.env` file:
```
API_KEY=your_api_key_here
PORT=3000
```

Load variables in server.js:
```javascript
require('dotenv').config();
const apiKey = process.env.API_KEY;
```

## Building the Frontend

Your index.html should focus on UI and user interaction:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Your App</title>
</head>
<body>
    <div id="app">
        <!-- Your app content -->
    </div>
    <script>
        // Frontend JavaScript
        // Make requests to your backend proxy endpoints
        fetch('/api/data')
            .then(response => response.json())
            .then(data => {
                // Handle data
            });
    </script>
</body>
</html>
```

## Creating a Secure Backend

Create a server.js file to proxy API requests:

```javascript
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files
app.use(express.static(__dirname));

// Proxy endpoint example
app.get('/api/data', async (req, res) => {
    try {
        const response = await fetch(
            `https://api.example.com/data?key=${process.env.API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
```

## Environment Variables

1. Create a `.env.example` file as a template (safe to commit):
```
API_KEY=your_api_key_here
PORT=3000
```

2. Create actual `.env` file (never commit this):
```
API_KEY=actual_api_key_here
PORT=3000
```

## API Integration

### Frontend API Calls
Make requests to your backend proxy endpoints instead of directly to external APIs:

```javascript
// ❌ Bad Practice: Direct API calls with exposed keys
fetch(`https://api.example.com/data?key=${apiKey}`);

// ✅ Good Practice: Use backend proxy
fetch('/api/data')
    .then(response => response.json())
    .then(data => {
        // Handle data
    })
    .catch(error => {
        // Handle error
    });
```

### Backend Proxy Endpoints
Create separate endpoints for different API functionalities:

```javascript
// Weather API endpoint
app.get('/api/weather', async (req, res) => {
    try {
        const { lat, lon } = req.query;
        const response = await fetch(
            `https://api.weather.com/data?lat=${lat}&lon=${lon}&key=${process.env.WEATHER_API_KEY}`
        );
        const data = await response.json();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});
```

## Deployment Considerations

1. **Environment Variables**
   - Use platform-specific environment variable configuration
   - Never commit .env files
   - Keep a .env.example template

2. **Security Headers**
   - Consider adding security headers:
```javascript
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    next();
});
```

3. **Error Handling**
   - Implement proper error handling
   - Don't expose sensitive information in error messages
   - Log errors securely

4. **HTTPS**
   - Always use HTTPS in production
   - Redirect HTTP to HTTPS
   - Implement proper SSL/TLS configuration

## Conclusion

Following these best practices will help you build secure and maintainable web applications. Remember:
- Never expose API keys in frontend code
- Use environment variables for configuration
- Implement backend proxy endpoints
- Follow security best practices
- Handle errors appropriately
- Use HTTPS in production

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Dotenv Documentation](https://github.com/motdotla/dotenv)
- [Web Security Best Practices](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://nodejs.org/en/security/)