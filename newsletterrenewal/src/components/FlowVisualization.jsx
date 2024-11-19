import { ArrowRight } from 'lucide-react';
import React from 'react';
import { FLOW_STEPS } from '../utils/constant';

const FlowVisualization = ({ currentStep }) => (
  <div className="flex items-center justify-between mb-8 px-4">
    {FLOW_STEPS.map((step, index) => (
      <React.Fragment key={index}>
        <div className="flex flex-col items-center">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              currentStep > index
                ? 'bg-green-100'
                : currentStep === index
                ? 'bg-blue-100'
                : 'bg-gray-100'
            }`}
          >
          </div>
          <span className="text-sm mt-2">{step.label}</span>
        </div>
        {index < FLOW_STEPS.length - 1 && (
          <ArrowRight className="w-6 h-6 text-gray-400" />
        )}
      </React.Fragment>
    ))}
  </div>
);

export default FlowVisualization;
