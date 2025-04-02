import React from 'react';

const NotFound = () => {
    return (
        <div className="relative min-h-[70vh] flex items-center justify-center">
            <div className="max-w-3xl text-center shadow-md rounded-lg p-8">
                <div className="flex gap-4 justify-center text-4xl text-white">
                    <span>404</span>
                    <span>|</span>
                    <span>Page Not Found</span>
                </div>
                <h2 className="text-xl font-semibold mt-2 text-gray-600">
                    The page you are looking for <span className="text-green-600">may exist</span>
                    or <span className="text-red-500">maybe it does not!</span>
                </h2>
                <p className="text-gray-600 mt-4">
                    Either way, you can always go back to the homepage.
                </p>
            </div>
        </div>
    );
};

export default NotFound;