import { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const typeStyles = {
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500'
    };

    return (
        <div className={`fixed top-5 right-5 p-4 rounded-md text-white flex items-center justify-between min-w-[250px] shadow-lg z-50 animate-slide-in ${typeStyles[type]}`}>
            <div className="mr-4">{message}</div>
            <button
                className="text-white text-xl cursor-pointer"
                onClick={onClose}
            >
                &times;
            </button>
        </div>
    );
};

export default Toast;