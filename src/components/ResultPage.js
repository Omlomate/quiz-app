import { useEffect, useState } from 'react';
import './css/ResultPage.css'; // External CSS for styling

const ResultPage = () => {
    const [quizData, setQuizData] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const dataParam = params.get('data');
            const answersParam = params.get('answers');

            // Safely parse the data and answers
            if (dataParam && answersParam) {
                setQuizData(JSON.parse(decodeURIComponent(dataParam)));
                setUserAnswers(JSON.parse(decodeURIComponent(answersParam)));
            } else {
                setError('Missing quiz data or answers in the URL.');
            }
        } catch (err) {
            console.error('Error parsing URL parameters:', err);
            setError('Invalid data format.');
        }
    }, []);

    const calculateScore = () => {
        let score = 0;
        quizData.forEach((q, idx) => {
            if (q.correctAnswer === userAnswers[idx]) {
                score++;
            }
        });
        return score;
    };

    const totalScore = calculateScore();
    const totalQuestions = quizData.length;

    if (error) {
        return <p className="error-message">Error: {error}</p>;
    }

    if (quizData.length === 0 || userAnswers.length === 0) {
        return <p>Loading results...</p>;
    }

    return (
        <div className="result-page">
            <h1>Quiz Results</h1>
            <p className="score">
                You scored {totalScore} out of {totalQuestions}.
            </p>
            <div className="feedback">
                {totalScore === totalQuestions ? (
                    <p className="success-feedback">Perfect Score! 🎉</p>
                ) : totalScore >= totalQuestions / 2 ? (
                    <p className="good-feedback">Great job! Keep it up! 👍</p>
                ) : (
                    <p className="try-again-feedback">Better luck next time! 👏</p>
                )}
            </div>
            {quizData.map((q, idx) => (
                <div key={idx} className="result-item">
                    <p className="question">Q: {q.question}</p>
                    <p
                        className={`user-answer ${
                            userAnswers[idx] === q.correctAnswer
                                ? 'correct'
                                : 'incorrect'
                        }`}
                    >
                        Your Answer: {userAnswers[idx]}
                    </p>
                    <p className="correct-answer">Correct Answer: {q.correctAnswer}</p>
                </div>
            ))}
            <div className="navigation-buttons">
                <button onClick={() => window.history.back()} className="nav-button">
                    Go Back to Quiz
                </button>
                <button onClick={() => window.location.href = '/'} className="nav-button">
                    Go to Homepage
                </button>
            </div>
        </div>
    );
};

export default ResultPage;
