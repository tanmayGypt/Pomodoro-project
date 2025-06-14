import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LifeQuotes from '../lifeQuotes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import "./alarm.mp3"
const Pomodoro = () => {
    const totalTime = 30 * 60;
    const radius = 90;
    const circumference = 2 * Math.PI * radius;

    const [minutes, setMinutes] = useState(30);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [currentAnimation, setCurrentAnimation] = useState("👨‍💻 Working...");
    const [showFeedback, setShowFeedback] = useState(false);
    const [rating, setRating] = useState('');
    const [review, setReview] = useState('');
    const audioRef = useRef(null);

    useEffect(() => {
        if (!isActive) return;

        if (minutes <= 5 && seconds > 0) {
            if (minutes === 5 && seconds === 59) {
                setCurrentAnimation("🎉 Break is coming");
                toast.info("Break time is coming, well done!");
            } else {
                setCurrentAnimation("🎉 Break Time!!!!!");
            }
        }

        if (minutes === 0 && seconds === 0) {
            handleSessionEnd();
            return;
        }

        const timer = setTimeout(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            } else {
                setMinutes((prev) => prev - 1);
                setSeconds(59);
            }
            setElapsed((prev) => prev + 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isActive, minutes, seconds]);

    const handleSessionEnd = () => {
        toast.success("🎉 Congratulations! Session Complete.");
        setIsActive(false);
        setShowFeedback(true);
        setCurrentAnimation("✅ Session Complete!");
        playAlarm();
    };

    const toggleTimer = () => {
        setIsActive((prev) => !prev);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(30);
        setSeconds(0);
        setElapsed(0);
        setCurrentAnimation("👨‍💻 Working...");
        setShowFeedback(false);
        stopAlarm();
    };

    const handleSubmitFeedback = () => {
        if (!rating) {
            toast.error("Please enter a rating between 1 and 10.");
            return;
        }

        const existing = JSON.parse(localStorage.getItem("sessionFeedbacks")) || [];
        const now = new Date();

        const formattedDate = now.toISOString().split('T')[0];
        const formattedTime = now.toTimeString().split(':').slice(0, 2).join(':');

        existing.push({
            rating: parseInt(rating),
            date: formattedDate,
            time: formattedTime,
            message: review
        });

        localStorage.setItem("sessionFeedbacks", JSON.stringify(existing));
        toast.success("✅ Thank you for your feedback!");
        setRating('');
        setReview('');
        setShowFeedback(false);
        resetTimer();
    };

    const getProgressColor = () => (!isActive ? '#10B981' : '#3B82F6');

    const getDashOffset = () => {
        const progress = elapsed / totalTime;
        return circumference * (1 - progress);
    };

    const playAlarm = () => {
        try {
            if (audioRef.current) {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
            }
        } catch (e) {
            console.error("Audio playback failed:", e);
        }
    };

    const stopAlarm = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Pomodoro Timer</h1>

            <audio ref={audioRef} src="/alarm.mp3" />

            <div className="relative w-64 h-64 mb-8">
                <svg className="w-full h-full" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="10" />
                </svg>

                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 200 200">
                    <circle
                        cx="100"
                        cy="100"
                        r={radius}
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

            <ToastContainer />
            <LifeQuotes />
        </div>
    );
};

export default Pomodoro;
