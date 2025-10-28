import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">404</h1>
        <p className="mt-4 text-xl text-gray-700">Oops! Page Not Found.</p>
        <Link
          to="/"
          className="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-2 text-white font-semibold hover:bg-indigo-500"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
