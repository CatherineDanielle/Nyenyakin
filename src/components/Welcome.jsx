import React from 'react';

import Test from './pages/Test';

const Welcome = () => {
  const handleCheckHereClick = () => {
    // Navigate to test page
    window.location.href = '/test';
  };

  return (
    <section id="welcome-banner" className="flex items-center justify-between px-40 py-20 min-h-screen">
      {/* Left side - Text content */}
      <div className="flex-1 max-w-2xl">
        <h1 className="text-6xl font-bold text-white mb-6 leading-tight">
          How was your sleep?
        </h1>
        <p className="text-2xl text-white mb-8 font-medium">
          check your sleep quality now!
        </p>
        
        <button
          onClick={handleCheckHereClick}
          className="px-8 py-4 border-3 border-yellow-400 rounded-lg text-yellow-400 text-xl font-semibold hover:bg-yellow-400 hover:text-slate-700 transition-all duration-300 transform hover:scale-105"
        >
          check here
        </button>
      </div>

      {/* Right side - Decorative elements */}
      <div>
        {/* Large logo with decorative elements */}
        <div className="relative">
          <img 
            src="/logo.svg" 
            alt="Menyakin Logo" 
            className="w-100 h-100"
          />
          
        </div>
      </div>
    </section>
  );
};

export default Welcome;
