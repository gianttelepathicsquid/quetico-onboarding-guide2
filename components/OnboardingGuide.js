import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, Package, Truck, Settings, Box,
  Check, Warehouse, Globe, Archive,
  Info, ArrowRight, ArrowLeft
} from 'lucide-react';

// Define steps array first
const steps = [
  {
    id: 'integrate',
    title: "Store Integration",
    icon: <Store size={24} />,
    description: "Connect your ecommerce platform"
  },
  {
    id: 'products',
    title: "Product Setup",
    icon: <Package size={24} />,
    description: "Configure your products"
  },
  {
    id: 'shipping',
    title: "Shipping Setup",
    icon: <Truck size={24} />,
    description: "Set up shipping preferences"
  }
];

const OnboardingGuide = () => {
  // Initialize state
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">
          Quetico Onboarding Guide
        </h1>
        
        {/* Progress indicator */}
        <div className="mb-8 bg-slate-800 h-2 rounded-full">
          <div 
            className="bg-sky-500 h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                currentStep === index ? 'bg-slate-700' : 'bg-slate-800'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className="flex items-center">
                <div className={`p-2 rounded-lg ${
                  currentStep === index ? 'bg-sky-500' : 'bg-slate-700'
                }`}>
                  {step.icon}
                </div>
                <div className="ml-4">
                  <h2 className="text-lg font-semibold text-white">
                    {step.title}
                  </h2>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            className={`px-4 py-2 rounded ${
              currentStep > 0 ? 'bg-sky-500 text-white' : 'bg-slate-700 text-gray-400'
            }`}
            disabled={currentStep === 0}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setCurrentStep(prev => Math.min(steps.length - 1, prev + 1));
              setProgress(((currentStep + 1) / steps.length) * 100);
            }}
            className="px-4 py-2 rounded bg-sky-500 text-white"
            disabled={currentStep === steps.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OnboardingGuide;
                    </div>
                  </motion.div>
                </motion.div>
              )}
