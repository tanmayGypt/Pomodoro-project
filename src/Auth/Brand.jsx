const Brand = () => {
    return (
        <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 flex items-center justify-center bg-gray-100 rounded-full mb-4">
                <svg viewBox="0 0 24 24" width="48" height="48" className="text-indigo-600">
                    <path fill="currentColor" d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.8L20 9v6l-8 4-8-4V9l8-4.2z" />
                    <path fill="currentColor" d="M12 11a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">AcmeAuth</h1>
        </div>
    );
};

export default Brand;