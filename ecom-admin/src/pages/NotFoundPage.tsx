import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export const NotFoundPage: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center px-6">
      <h1 className="text-8xl font-extrabold text-indigo-600 tracking-tight">404</h1>
      <p className="text-2xl font-semibold text-slate-800 mt-4">Page not found</p>
      <p className="text-slate-500 mt-2 max-w-md mx-auto">
        Sorry, the page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
      >
        <Home className="w-5 h-5" />
        Back to Dashboard
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
