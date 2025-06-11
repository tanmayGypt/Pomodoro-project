import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const lifeQuotes = [
    "Life is what happens when you're busy making other plans. – John Lennon",
    "Get busy living or get busy dying. – Stephen King",
    "The purpose of our lives is to be happy. – Dalai Lama",
    "You only live once, but if you do it right, once is enough. – Mae West",
    "In the end, we only regret the chances we didn’t take. – Lewis Carroll",
    "Life is short, and it’s up to you to make it sweet. – Sarah Louise Delany",
    "Life isn’t about finding yourself. It’s about creating yourself. – George Bernard Shaw",
    "Live as if you were to die tomorrow. Learn as if you were to live forever. – Mahatma Gandhi",
    "Life is really simple, but we insist on making it complicated. – Confucius",
    "Difficulties in life are intended to make us better, not bitter. – Dan Reeves",
    "Keep smiling, because life is a beautiful thing and there’s so much to smile about. – Marilyn Monroe",
    "Success is not the key to happiness. Happiness is the key to success. – Albert Schweitzer",
    "Do not go where the path may lead, go instead where there is no path and leave a trail. – Ralph Waldo Emerson",
    "The good life is one inspired by love and guided by knowledge. – Bertrand Russell",
    "Life is either a daring adventure or nothing at all. – Helen Keller"
];

const LifeQuotesCycle = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % lifeQuotes.length);
        }, 4000); // 4 seconds per quote
        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence mode="wait" className="mt-4">
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 1 }}
                className="max-w-xl p-6 text-center text-lg font-medium "
            >
                {lifeQuotes[index]}
            </motion.div>
        </AnimatePresence>

    );
};

export default LifeQuotesCycle;
