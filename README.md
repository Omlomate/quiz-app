
# Quiz Application

## Overview

This is a simple quiz application where users can answer questions, view their results, and get feedback based on their performance. The app provides an interactive experience with the ability to navigate through quiz questions, view answers, and assess the user's score at the end.

### Approach:

The application is built using **React** for the frontend, leveraging **React hooks** (`useState`, `useEffect`) for state management. We dynamically fetch quiz questions and options from a URL parameter, allowing flexibility to embed the quiz in different contexts.

- **Quiz Page**: Displays questions and options, allowing users to select answers and submit them.
- **Result Page**: After the quiz is completed, it displays the user’s results, correct answers, and feedback based on the score.

### Components:

- **QuizPage**: 
  - Renders the questions with options.
  - Manages user selections and stores answers.
  - Moves through questions via navigation buttons.
  
- **ResultPage**: 
  - Displays the quiz results, showing the user's score and feedback.
  - Highlights correct and incorrect answers.
  - Provides navigation buttons to return to the quiz or homepage.

---

## Setup and Installation Instructions

### Prerequisites:

- **Node.js** and **npm** (or **Yarn**) are required to run this application.

### Steps to Run:

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```
   Or, if you are using Yarn:
   ```bash
   yarn install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```
   This will run the app on [http://localhost:3000](http://localhost:3000).

4. Open the application in your browser and start interacting with the quiz.

---

## Assumptions

- The quiz questions and answers are passed as query parameters in the URL in JSON format.
- The format of the URL parameters is assumed to be correctly formatted and safe to decode.

---

## Challenges Faced and How I Overcame Them

1. **Dynamic Data Handling**:
   Initially, parsing data from URL parameters caused issues with ensuring it was properly decoded and rendered. I overcame this by using **`URLSearchParams`** to extract and decode the parameters safely and implemented error handling to display informative messages when data is missing or improperly formatted.

2. **State Management**:
   Managing user answers and feedback required a thoughtful approach to ensure the data was kept consistent throughout the navigation of the quiz. By using **React hooks**, I could efficiently track the user's progress and store answers until the quiz completion.

3. **Styling for Interactivity**:
   I wanted to ensure the result page was engaging. I used dynamic CSS classes to change the color of answers based on correctness. This was challenging as I had to ensure that the correct answer was matched properly and dynamically applied the right styles to give a visually appealing and easy-to-understand result page.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
