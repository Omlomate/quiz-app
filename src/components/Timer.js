import React, { useEffect, useState } from 'react';

const Timer = ({ timeUp, onSubmit }) => {
    const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

    useEffect(() => {
        if (timeLeft <= 0) {
            timeUp(true);
            onSubmit();
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, onSubmit, timeUp]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return <div className="timer">{formatTime(timeLeft)}</div>;
};

export default Timer;
