import React, { useState } from "react";

const RadioGroup = ({
  label = "Jenis Kelamin",
  value,
  onChange,
  required = false,
  disabled = false,
  errorMessage = "",
  options = [],
  showLabel = true,
  className = ""
}) => {
  const [error, setError] = useState(errorMessage);

  const handleChange = (val) => {
    onChange(val);
    setError(""); // Reset error on change
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && <label className="block text-sm font-medium text-gray-900 mb-2">{label}</label>}
      <div className="inline-flex">
        {options.map((option, index) => {
          console.log(value === option.value,value,option.value)
          
          return (
            <React.Fragment key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="radio-group"
                value={option.value}
                disabled={disabled}
                checked={value === option.value}
                onChange={() => handleChange(option.value)}
                className={`hidden peer/${option.id}`}
              />
              <label
                htmlFor={option.id}
                className={`bg-gray-300 text-gray-800 hover:bg-purple-400 hover:text-white peer-checked/${option.id}:bg-purple-500 peer-checked/${option.id}:text-white font-semibold py-2 px-4 cursor-pointer ${
                  index === 0 ? "rounded-l" : index === options.length - 1 ? "rounded-r" : ""
                }`}
              >
                {option.label}
              </label>
            </React.Fragment>
          )
        })}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default RadioGroup;
