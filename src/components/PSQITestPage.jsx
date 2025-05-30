import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Good from '../pages/Goodpage';
import Bad from '../pages/Badpage';


const PSQITestPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    height: '',
    weight: '',
    electronicsUsage: '',
    coffeeIntake: '',
    teaIntake: '',
    maritalStatus: '',
    neckPain: '',
    headache: ''
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    const numberFields = ['age', 'height', 'weight', 'electronicsUsage', 'coffeeIntake', 'teaIntake'];
    const requiredRadioFields = ['gender', 'maritalStatus', 'neckPain', 'headache'];

    numberFields.forEach((field) => {
      const value = formData[field];
      if (!value) {
        newErrors[field] = 'This field is required.';
      } else if (!/^\d+$/.test(value)) {
        newErrors[field] = 'Must be a positive integer.';
      }
    });

    requiredRadioFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = 'Please make a selection.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) {
      alert('Please complete all required fields correctly.');
      return;
    }

    setIsLoading(true);

    try {
      console.log('Form data to send:', formData);
      
      const response = await fetch('nyenyakin-production.up.railway.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Backend response:', data);

      // Check if there's an error in the response
      if (data.error) {
        throw new Error(data.error);
      }

      // Navigate based on the result from backend
      if (data.result) {
        console.log('Navigating based on result:', data.result);
        if (data.result.toLowerCase() === 'good') {
          console.log('Navigating to /good');
          navigate('/good');
          return; // Important: return to prevent further execution
        } else if (data.result.toLowerCase() === 'bad') {
          console.log('Navigating to /bad');
          navigate('/bad');
          return;
        }
      } 
      
      if (data.prediction !== undefined) {
        console.log('Navigating based on prediction:', data.prediction);
        if (data.prediction === '0') {
          console.log('Navigating to /good (prediction 0)');
          navigate('/good');
          return;
        } else {
          console.log('Navigating to /bad (prediction 1)');
          navigate('/bad');
          return;
        }
      }

      //debuging 
      console.warn('No valid result found in response:', data);
      alert('Test completed, but unable to determine result. Please try again.');

    } catch (error) {
      console.error('Error details:', error);
      alert(`Error: ${error.message}. Please check the console for details.`);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (name) =>
    `w-full py-2 px-4 rounded-full bg-transparent border-2 ${
      errors[name] ? 'border-red-500' : 'border-yellow-400'
    } text-white placeholder-gray-400 focus:outline-none`;

  const radioClass = (field, value) =>
    `flex-1 py-2 px-4 rounded-full border-2 transition-all ${
      formData[field] === value
        ? 'bg-yellow-400 border-yellow-400 text-slate-700'
        : errors[field]
          ? 'border-red-500 text-red-400'
          : 'bg-transparent border-yellow-400 text-yellow-400'
    }`;

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center py-8">
        <div className="w-full max-w-md px-4">
          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <img src="/logo.svg" alt="Logo" />
            </div>
          </div>

          <div className="space-y-6">
            {/* Gender */}
            <div>
              <p className="text-white text-center mb-2">Gender</p>
              <div className="flex gap-4">
                {['Female', 'Male'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => handleRadioChange('gender', gender)}
                    className={radioClass('gender', gender)}
                    disabled={isLoading}
                  >
                    {gender}
                  </button>
                ))}
              </div>
              {errors.gender && <p className="text-red-400 text-sm mt-1 text-center">{errors.gender}</p>}
            </div>

            {/* Numeric Inputs */}
            {[
              { label: 'Age', name: 'age', unit: '' },
              { label: 'Height', name: 'height', unit: 'in cm' },
              { label: 'Weight', name: 'weight', unit: 'in kg' },
              { label: 'Electronics Usage', name: 'electronicsUsage', unit: 'Hours per day' },
              { label: 'Coffee Intake', name: 'coffeeIntake', unit: 'Cups per day' },
              { label: 'Tea Intake', name: 'teaIntake', unit: 'Cups per day' }
            ].map(({ label, name, unit }) => (
              <div key={name}>
                <p className="text-white text-center mb-1">{label}</p>
                {unit && <p className="text-white text-center text-xs mb-2">{unit}</p>}
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleInputChange}
                  placeholder={`Enter ${label.toLowerCase()}`}
                  className={inputClass(name)}
                  disabled={isLoading}
                />
                {errors[name] && <p className="text-red-400 text-sm mt-1 text-center">{errors[name]}</p>}
              </div>
            ))}

            {/* Marital Status */}
            <div>
              <p className="text-white text-center mb-2">Marital Status</p>
              <div className="flex gap-4">
                {['Married', 'Single'].map((status) => (
                  <button
                    key={status}
                    onClick={() => handleRadioChange('maritalStatus', status)}
                    className={radioClass('maritalStatus', status)}
                    disabled={isLoading}
                  >
                    {status}
                  </button>
                ))}
              </div>
              {errors.maritalStatus && <p className="text-red-400 text-sm mt-1 text-center">{errors.maritalStatus}</p>}
            </div>

            {/* Neck Pain */}
            <div>
              <p className="text-white text-center mb-2">Do you have neck pain?</p>
              <div className="flex gap-4">
                {['Yes', 'No'].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleRadioChange('neckPain', val)}
                    className={radioClass('neckPain', val)}
                    disabled={isLoading}
                  >
                    {val}
                  </button>
                ))}
              </div>
              {errors.neckPain && <p className="text-red-400 text-sm mt-1 text-center">{errors.neckPain}</p>}
            </div>

            {/* Headache */}
            <div>
              <p className="text-white text-center mb-2">Do you have headache?</p>
              <div className="flex gap-4">
                {['Yes', 'No'].map((val) => (
                  <button
                    key={val}
                    onClick={() => handleRadioChange('headache', val)}
                    className={radioClass('headache', val)}
                    disabled={isLoading}
                  >
                    {val}
                  </button>
                ))}
              </div>
              {errors.headache && <p className="text-red-400 text-sm mt-1 text-center">{errors.headache}</p>}
            </div>

            {/* Submit */}
            <div className="flex justify-center pt-4">
              <button
                onClick={handleSubmit}
                disabled={isLoading}
                className={`px-12 py-3 rounded-full font-medium transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-500 text-gray-300 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600 hover:shadow-lg'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Processing...</span>
                  </div>
                ) : (
                  'Check'
                )}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PSQITestPage;
