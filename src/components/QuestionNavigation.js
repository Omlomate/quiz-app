import React from 'react';

const QuizNavigation = ({ totalQuestions, currentQuestion, setCurrentQuestion, userAnswers }) => {
    const getQuestionStatus = (index) => {
        if (userAnswers[index]) return 'attempted'; // If the question has been answered
        if (index === currentQuestion) return 'current'; // If the question is currently selected
        return 'unvisited'; // If the question hasn't been visited
    };

    return (
        <div className="quiz-navigation">
            <h3>Navigation</h3>
            <div className="navigation-buttons">
                {Array.from({ length: totalQuestions }, (_, index) => (
                    <button
                        key={index}
                        className={`nav-button ${getQuestionStatus(index)}`}
                        onClick={() => setCurrentQuestion(index)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
            <style>{`
                .quiz-navigation {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    margin-top: 20px;
                }
                .navigation-buttons {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }
                .nav-button {
                    width: 40px;
                    height: 40px;
                    border: none;
                    border-radius: 50%;
                    font-size: 14px;
                    cursor: pointer;
                    background-color: #f0f0f0;
                    transition: transform 0.2s, background-color 0.3s;
                }
                .nav-button:hover {
                    transform: scale(1.1);
                }
                .nav-button.current {
                    background-color: #f39c12; /* Highlight current question */
                    color: white;
                }
                .nav-button.attempted {
                    background-color: #27ae60; /* Green for attempted questions */
                    color: white;
                }
                .nav-button.unvisited {
                    background-color: #bdc3c7; /* Gray for unvisited questions */
                    color: white;
                }
            `}</style>
        </div>
    );
};

export default QuizNavigation;
