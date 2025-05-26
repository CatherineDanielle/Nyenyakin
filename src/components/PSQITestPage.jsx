import React, { useState } from 'react';

const PSQITestPage = () => {
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

  const handleSubmit = () => {
    if (!validateInputs()) {
      alert('Please complete all required fields correctly.');
      return;
    }

    console.log('Form data to send:', formData);
    
    fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));
    
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
                className="px-12 py-3 bg-blue-500 text-white rounded-full font-medium hover:bg-blue-600 transition-all duration-300 hover:shadow-lg"
              >
                Check
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PSQITestPage;
