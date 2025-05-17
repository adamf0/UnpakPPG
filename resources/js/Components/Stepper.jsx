import React from 'react';
import clsx from 'clsx';

const Stepper = ({ steps, currentStep, onClick=null }) => {
  return (
    <ol className="items-center w-full space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isActive = step === currentStep;

        return (
          <a href="#" onClick={()=>onClick(step)}>
            <li
              key={stepNumber}
              className={clsx(
                'flex items-center space-x-2.5',
                isActive? 'text-purple-600' : 'text-gray-500',
                onClick!=null? 'hover:text-purple-400':''
              )}
            >
              <span
                className={clsx(
                  'flex items-center justify-center w-8 h-8 border rounded-full shrink-0',
                  isActive? 'border-purple-600' : 'border-gray-500',
                  onClick!=null? 'hover:text-purple-400':''
                )}
              >
                {stepNumber}
              </span>
              <span>
                <h3 className="font-medium leading-tight">{step}</h3>
              </span>
            </li>
          </a>
        );
      })}
    </ol>
  );
};

export default Stepper;
