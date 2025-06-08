import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const How = () => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  const handleTakeTestClick = () => {
    setIsButtonPressed(true);
    // Small delay to show the fill effect before navigation
    setTimeout(() => {
      window.location.href = '/test';
    }, 150);
  };

  const steps = [
    {
      number: "1.",
      title: "Take the Sleep Test",
      description: "Answer a few quick questions about your sleep habits over the past month. It takes just 2–3 minutes and requires no login or signup."
    },
    {
      number: "2.",
      title: "Get Your Result: Good or Bad",
      description: "Instantly discover whether your sleep is in a healthy range—or if it may be impacting your energy, focus, or mood.",
      subtitle: "No medical jargon. Just a clear, simple answer."
    },
    {
      number: "3.",
      title: "Receive Tailored Tips",
      description: "Based on your result — Good or Bad — you'll get a set of recommended articles to match your sleep condition.",
      bulletPoints: [
        "If your result is Good, you'll receive tips to maintain and strengthen your healthy sleep habits.",
        "If your result is Bad, we'll guide you to articles that help you fix the issues and start improving tonight."
      ]
    }
  ];

  return (
    <section className="px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          How It Works — and What You'll Get
        </h2>

        {/* Steps */}
        <div className="space-y-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start space-x-6">
              {/* Step Number */}
              <div className="text-6xl font-bold text-white flex-shrink-0 mt-4">
                {step.number}
              </div>

              {/* Step Content */}
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-yellow-400 mb-4">
                  {step.title}
                </h3>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                  <p className="text-white text-lg leading-relaxed mb-2">
                    {step.description}
                  </p>
                  
                  {step.subtitle && (
                    <p className="text-white text-lg leading-relaxed">
                      {step.subtitle}
                    </p>
                  )}
                  
                  {step.bulletPoints && (
                    <ul className="mt-4 space-y-2">
                      {step.bulletPoints.map((point, pointIndex) => (
                        <li key={pointIndex} className="text-white text-lg leading-relaxed">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Quote and CTA */}
        <div className="text-center">
          <p className="text-white text-xl italic mb-8 max-w-3xl mx-auto">
            "You'll receive a clear, no-fluff result—and focused advice to help you sleep better starting tonight."
          </p>
          
          <button
            onClick={handleTakeTestClick}
            onMouseDown={() => setIsButtonPressed(true)}
            onMouseUp={() => setIsButtonPressed(false)}
            onMouseLeave={() => setIsButtonPressed(false)}
            className={`px-8 py-4 border-3 border-yellow-400 rounded-lg text-xl font-semibold transition-all duration-150 transform hover:scale-105 ${
              isButtonPressed 
                ? 'bg-yellow-400 text-slate-700' 
                : 'text-yellow-400 hover:bg-yellow-400 hover:text-slate-700'
            }`}
          >
            Take the Test Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default How;
