import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LifeQuotes from '../lifeQuotes';
import Toast from '../../Common/Toast';
import alarmSound from '../../../public/alarm.mp3';

const Pomodoro = () => {
    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [isWorking, setIsWorking] = useState(true);
    const timerRef = useRef(null);
    const audioRef = useRef(null);
    const circumference = 2 * Math.PI * 90;

    const [currentAnimation, setCurrentAnimation] = useState("👨‍💻 Working...");
    const [showFeedback, setShowFeedback] = useState(false);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const [toast, setToast] = useState(null);

    const playAlarm = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0;
            audioRef.current.play().catch(e => console.log("Audio play failed:", e));
        }
    };

    const stopAlarm = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };

    useEffect(() => {
        if (showFeedback) {
            playAlarm();
        }
    }, [showFeedback]);

    useEffect(() => {
        if (isActive) {
            timerRef.current = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds === 0) {
                        if (minutes === 0) {
                            clearInterval(timerRef.current);
                            setIsActive(false);
                            setShowFeedback(true);
                            return 0;
                        }
                        setMinutes(prevMinutes => prevMinutes - 1);
                        return 59;
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isActive, minutes]);

    useEffect(() => {
        let blinkInterval;
        const totalMinutes = minutes;

        if(totalMinutes==5){
            blinkInterval = setInterval(() => {
                setCurrentAnimation(prev => (prev === '' ? blinkMessage : ''));
            }, 900);
        }
        if (totalMinutes >= 5 && totalMinutes <= 30) {
            setCurrentAnimation("⏰ Time to work!");
        } else {
            setCurrentAnimation("☕ Time to break!");
        }
        return () => clearInterval(blinkInterval);
    }, [minutes]);

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(30);
        setSeconds(0);
        setIsWorking(true);
        setCurrentAnimation("⏰ Time to work!");
        setShowFeedback(false);
        setRating('');
        setReview('');
        stopAlarm();
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const getProgressColor = () => {
        if (minutes >= 25) return '#10B981';
        if (minutes >= 5) return '#3B82F6';
        return '#EF4444';
    };

    const getProgress = () => {
        const totalSeconds = minutes * 60 + seconds;
        const remainingPercentage = totalSeconds / (30 * 60);
        return circumference * (1 - remainingPercentage);
    };

    const getDashOffset = () => {
        const progress = getProgress();
        return progress > circumference ? circumference : progress;
    };

    const handleSubmitFeedback = () => {
        if (!rating || rating < 1 || rating > 10) {
            setToast({
                message: "Please enter a valid rating between 1 and 10.",
                type: "error"
            });
            return;
        }

        const now = new Date();
        const newEntry = {
            rating: parseInt(rating),
            date: now.toISOString().split('T')[0],
            time: now.toTimeString().split(' ')[0].slice(0, 5),
            message: review || 'No comments.',
        };

        const storedData = JSON.parse(localStorage.getItem('sessionFeedbacks')) || [];
        storedData.push(newEntry);
        localStorage.setItem('sessionFeedbacks', JSON.stringify(storedData));
        stopAlarm();
        setToast({
            message: "Thanks for your feedback!",
            type: "success"
        });

        setShowFeedback(false);
        setRating('');
        setReview('');
    };

    const closeToast = () => {
        setToast(null);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Pomodoro Timer</h1>
            {showFeedback && (
                <h1 className="text-3xl font-bold text-red-600 mb-4">⏰ Time's Up!</h1>
            )}

            <audio ref={audioRef} src={alarmSound} />

            <div className="relative w-64 h-64 mb-8">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="90" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                </svg>

                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        r="90"
                        fill="none"
                        stroke={getProgressColor()}
                        strokeWidth="10"
                        strokeDasharray={circumference}
                        strokeDashoffset={getDashOffset()}
                        strokeLinecap="round"
                        transform="rotate(-90 100 100)"
                        style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
                    />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <motion.div
                        key={currentAnimation}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-medium text-gray-600 mb-2 h-8"
                    >
                        {currentAnimation}
                    </motion.div>
                    <div className="text-4xl font-bold text-gray-800">
                        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                    </div>
                </div>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={toggleTimer}
                    className={`px-6 py-2 rounded-md font-medium ${isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'} text-white transition-colors`}
                >
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                    onClick={resetTimer}
                    className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md font-medium transition-colors"
                >
                    Reset
                </button>
            </div>

            {showFeedback && (
                <div className="mt-10 w-full max-w-md bg-white p-6 rounded-lg shadow">
                    <h2 className="text-xl font-semibold mb-4 text-gray-700">Session Feedback</h2>
                    <label className="block mb-2 text-gray-600">Rating (1-10)</label>
                    <input
                        type="number"
                        min="1"
                        max="10"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="w-full border rounded px-3 py-2 mb-4"
                    />

                    <label className="block mb-2 text-gray-600">Review Message</label>
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="w-full border rounded px-3 py-2 mb-4"
                        rows="3"
                    ></textarea>

                    <button
                        onClick={handleSubmitFeedback}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded"
                    >
                        Submit
                    </button>
                </div>
            )}

            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={closeToast}
                />
            )}

            <LifeQuotes />
        </div>
    );
};

export default Pomodoro;
