import React, { useEffect, useState } from 'react';
import Timer from './Timer';
import QuestionNavigation from './QuestionNavigation';
import axios from 'axios';
import './css/QuizPage.css'; // Add external CSS for styling

const QuizPage = ({ quizData, setQuizData, userAnswers, setUserAnswers }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [timeUp, setTimeUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuizData = async () => {
            try {
                const response = await axios.get('https://opentdb.com/api.php?amount=15');
                const fetchedData = response.data.results.map((q) => ({
                    question: q.question,
                    options: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5),
                    correctAnswer: q.correct_answer,
                }));
                setQuizData(fetchedData);
                setLoading(false);
            } catch (error) {
                if (error.response?.status === 429) {
                    console.error("Rate limit exceeded. Retrying in 2 seconds...");
                    setTimeout(fetchQuizData, 2000); // Retry after 2 seconds
                } else {
                    console.error("Error fetching quiz data:", error.message);
                    setError("Unable to load quiz. Please try again later.");
                    setLoading(false);
                }
            }
        };

        fetchQuizData();
    }, [setQuizData]);

    // Handle answer selection
    const handleAnswer = (answer) => {
        const updatedAnswers = [...userAnswers];
        updatedAnswers[currentQuestion] = answer;  // Update the answer for the current question
        setUserAnswers(updatedAnswers);
    };

    // Move to next question
    const goToNextQuestion = () => {
        if (currentQuestion < quizData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    // Move to previous question
    const goToPreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    // Submit quiz and navigate to results page
    const submitQuiz = () => {
        alert('Quiz Submitted');
        const encodedData = encodeURIComponent(JSON.stringify(quizData));
        const encodedAnswers = encodeURIComponent(JSON.stringify(userAnswers));
        window.location.href = `/result?data=${encodedData}&answers=${encodedAnswers}`;
    };

    // Loading and error states
    if (loading) {
        return <p>Loading quiz data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="quiz-page">
            <Timer timeUp={setTimeUp} onSubmit={submitQuiz} />
            <div className="question-container">
                <h2>{quizData[currentQuestion]?.question}</h2>
                <div className="options-container">
                    {quizData[currentQuestion]?.options.map((option, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(option)}  // Update answer when option is clicked
                            className={`option-button ${userAnswers[currentQuestion] === option ? 'selected' : ''}`} // Highlight selected option
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <div className="navigation-container">
                <button onClick={goToPreviousQuestion} className="nav-button">Previous</button>
                <button onClick={goToNextQuestion} className="nav-button">Next</button>
            </div>
            <div className="footer-container">
                <button onClick={submitQuiz} className="submit-button">Submit Quiz</button>
            </div>
            <QuestionNavigation
                totalQuestions={quizData.length}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                userAnswers={userAnswers}
            />
        </div>
    );
};

export default QuizPage;
