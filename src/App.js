import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';

const App = () => {
    const [email, setEmail] = useState('');
    const [quizData, setQuizData] = useState([]);
    const [userAnswers, setUserAnswers] = useState([]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<StartPage setEmail={setEmail} />} />
                <Route
                    path="/quiz"
                    element={<QuizPage quizData={quizData} setQuizData={setQuizData} userAnswers={userAnswers} setUserAnswers={setUserAnswers} />}
                />
                <Route
                    path="/result"
                    element={<ResultPage quizData={quizData} userAnswers={userAnswers} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
