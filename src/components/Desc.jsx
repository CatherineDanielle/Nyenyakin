import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Desc = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleLearnMoreClick = () => {
    // Navigate to about PSQI page or show more information
    window.location.href = '/about';
  };

  return (
    <section className="px-6 py-16 max-w-4xl mx-auto">
      <div className="text-center">
        <p className="text-white text-lg leading-relaxed mb-8">
          The Pittsburgh Sleep Quality Index (PSQI) is a test designed to evaluate your sleep quality 
          based on your sleep experience over the past month. By taking this test, you'll receive a total 
          score along with insights into various aspects of your sleep, such as duration, disturbances, 
          and daytime function. Your results will help determine whether you have good sleep quality or 
          if improvements are needed, and you'll be directed to personalized sleep tips based on your 
          condition.
        </p>
        
        <button
          onClick={handleLearnMoreClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="text-yellow-400 text-lg font-medium relative transition-colors duration-200 hover:text-yellow-300"
        >
          Learn more about PSQI
          <div 
            className={`absolute -bottom-1 left-0 h-0.5 bg-yellow-400 transition-all duration-300 ${
              isHovered ? 'w-full' : 'w-0'
            }`}
          ></div>
        </button>
      </div>
    </section>
  );
};

export default Desc;
