# Modern Quiz App

A web-based interactive quiz application that allows users to take quizzes with multiple-choice and open-ended questions, receive immediate feedback, and export results.

## Features

- **Quiz Loading**: Upload quiz data in JSON format
- **Multiple Question Types**: Support for multiple-choice and open-ended questions
- **Interactive Interface**: Clean, modern UI with responsive design
- **Immediate Feedback**: See correct answers after each question
- **Results Summary**: View your score and detailed feedback for each question
- **Export Options**: Download results as CSV or Anki flashcards
- **Flexible Navigation**: Restart the same quiz or import a new quiz file from the results page

## How to Use

1. Open `index.html` in a web browser
2. Click "Import Quiz File" and select a JSON file with quiz data
3. Click "Start Quiz" to begin
4. Answer each question and submit your response
5. View feedback for each question
6. After completing the quiz, view your results and export if desired
7. Choose to:
   - "Go Again" to restart the same quiz
   - "Import Another File" to load a different quiz
   - Export your results in CSV or Anki format

## Quiz JSON Format

The app expects quiz data in the following JSON format:

```json
[
  {
    "type": "multiple-choice",
    "question": "Question text here",
    "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
    "correctAnswer": 2  // Zero-based index of correct option
  },
  {
    "type": "open-ended",
    "question": "Open-ended question text here",
    "acceptedAnswers": ["Answer 1", "Alternative Answer"]  // Array of accepted answers
  }
]
```

A sample quiz file (`sample-quiz.json`) is included in this repository for testing.

## Browser Compatibility

The application is compatible with:
- Chrome 60+
- Firefox 55+
- Safari 10.1+
- Edge 79+

## Development

The application consists of three main files:
- `index.html`: HTML structure
- `styles.css`: CSS styling
- `script.js`: JavaScript functionality

To modify or extend the app, edit these files as needed.

## Future Improvements

Potential enhancements for future versions:
- Support for images in questions
- Additional question types
- Quiz timing options
- Progress indicator
- Local storage for saving quiz progress
- User accounts and quiz history

## License

This project is open source and available for personal and educational use. 