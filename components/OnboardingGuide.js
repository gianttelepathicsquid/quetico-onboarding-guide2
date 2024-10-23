// First, make sure to install framer-motion for animations:
// npm install framer-motion lucide-react

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Store, Package, Truck, Settings, Box, BarChart,
  ArrowRight, ArrowLeft, Check, Warehouse, Globe,
  ShoppingBag, Archive, Clock, AlertCircle, 
  ChevronDown, ChevronUp, Info
} from 'lucide-react';

// First, our step definitions (as shown in previous code)
const onboardingSteps = [/* ... previous steps array ... */];

export function OnboardingGuide() {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [showTooltip, setShowTooltip] = useState(null);
  const [progress, setProgress] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [completedSteps, setCompletedSteps] = useState([]);

  // Handle step completion
  const completeStep = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
      setProgress((completedSteps.length + 1) * (100 / onboardingSteps.length));
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  // Render progress bar
  const ProgressBar = () => (
    <motion.div 
      className="relative w-full h-2 bg-slate-700 rounded-full mb-8"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute h-full bg-sky-500 rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  );

  // Render step indicator
  const StepIndicator = ({ step, index }) => (
    <motion.div
      variants={itemVariants}
      className={`flex items-center ${
        index === currentStep ? 'text-sky-500' : 'text-gray-400'
      }`}
    >
      <div className="relative">
        <motion.div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            completedSteps.includes(index) 
              ? 'bg-green-500' 
              : index === currentStep 
                ? 'bg-sky-500' 
                : 'bg-slate-700'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setCurrentStep(index)}
        >
          {completedSteps.includes(index) ? (
            <Check className="text-white" size={20} />
          ) : (
            step.icon
          )}
        </motion.div>
        {showTooltip === index && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded text-sm whitespace-nowrap"
          >
            {step.title}
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  // Render information panel
  const InfoPanel = ({ content }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={() => setShowInfo(false)}
    >
      <motion.div
        className="bg-slate-800 rounded-lg p-6 max-w-2xl w-full"
        onClick={e => e.stopPropagation()}
      >
        {content}
      </motion.div>
    </motion.div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
        <header className="mb-8">
          <motion.h1 
            className="text-3xl font-bold text-white mb-2"
            variants={itemVariants}
          >
            Quetico 3PL Onboarding
          </motion.h1>
          <motion.p 
            className="text-gray-400"
            variants={itemVariants}
          >
            Complete these steps to set up your account
          </motion.p>
        </header>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Step Indicators */}
        <div className="flex justify-between mb-8">
          {onboardingSteps.map((step, index) => (
            <StepIndicator key={step.id} step={step} index={index} />
          ))}
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800 rounded-lg p-6"
          >
            {/* Step content continues in Part 2... */}
{/* Current Step Content */}
            <div className="mb-8">
              <motion.div 
                className="flex items-center mb-6"
                variants={itemVariants}
              >
                <div className="bg-sky-500 p-3 rounded-lg mr-4">
                  {onboardingSteps[currentStep].icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    {onboardingSteps[currentStep].title}
                  </h2>
                  <p className="text-gray-400">
                    {onboardingSteps[currentStep].description}
                  </p>
                </div>
              </motion.div>

              {/* Step-specific content */}
              {currentStep === 0 && (
                <motion.div 
                  className="space-y-4"
                  variants={containerVariants}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div 
                      className="bg-slate-700 p-6 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Automated Integration
                      </h3>
                      <div className="space-y-3">
                        {onboardingSteps[0].subSteps[0].platforms.map((platform, index) => (
                          <motion.div
                            key={platform}
                            className="flex items-center p-3 bg-slate-600 rounded"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Store size={20} className="text-sky-400 mr-3" />
                            <span className="text-white">{platform}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-slate-700 p-6 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Manual Setup
                      </h3>
                      <div className="space-y-3">
                        {onboardingSteps[0].subSteps[1].features.map((feature, index) => (
                          <motion.div
                            key={feature}
                            className="flex items-center p-3 bg-slate-600 rounded"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Check size={20} className="text-green-400 mr-3" />
                            <span className="text-white">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {currentStep === 1 && (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  {onboardingSteps[1].subSteps.map((subStep, index) => (
                    <motion.div
                      key={subStep.title}
                      className="bg-slate-700 p-6 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">
                        {subStep.title}
                      </h3>
                      <p className="text-gray-400 mb-4">{subStep.content}</p>
                      <div className="grid grid-cols-2 gap-4">
                        {(subStep.methods || subStep.details).map((item, i) => (
                          <motion.div
                            key={item}
                            className="flex items-center p-3 bg-slate-600 rounded"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Package size={20} className="text-sky-400 mr-3" />
                            <span className="text-white">{item}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  <div className="grid grid-cols-2 gap-6">
                    <motion.div 
                      className="bg-slate-700 p-6 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Shipping Options
                      </h3>
                      <div className="space-y-3">
                        {onboardingSteps[2].subSteps[0].options.map((option, index) => (
                          <motion.div
                            key={option}
                            className="flex items-center p-3 bg-slate-600 rounded"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Truck size={20} className="text-sky-400 mr-3" />
                            <span className="text-white">{option}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    <motion.div 
                      className="bg-slate-700 p-6 rounded-lg"
                      whileHover={{ scale: 1.02 }}
                    >
                      <h3 className="text-xl font-semibold text-white mb-4">
                        Packaging Types
                      </h3>
                      <div className="space-y-3">
                        {onboardingSteps[2].subSteps[1].types.map((type, index) => (
                          <motion.div
                            key={type}
                            className="flex items-center p-3 bg-slate-600 rounded"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Box size={20} className="text-sky-400 mr-3" />
                            <span className="text-white">{type}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}

              {/* Continue with steps 3, 4, and 5... */}

            </div>

            {/* Navigation Controls */}
            <motion.div 
              className="flex justify-between items-center"
              variants={containerVariants}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-6 py-3 rounded-lg ${
                  currentStep > 0 ? 'bg-sky-500 text-white' : 'bg-slate-700 text-gray-400'
                }`}
                onClick={() => currentStep > 0 && setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 0}
              >
                <ArrowLeft className="mr-2" size={20} />
                Previous
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-6 py-3 rounded-lg ${
                  currentStep < onboardingSteps.length - 1 
                    ? 'bg-sky-500 text-white'
                    : 'bg-green-500 text-white'
                }`}
                onClick={() => {
                  if (currentStep < onboardingSteps.length - 1) {
                    setCurrentStep(prev => prev + 1);
                    completeStep(currentStep);
                  } else {
                    completeStep(currentStep);
                    // Handle completion
                  }
                }}
              >
                {currentStep < onboardingSteps.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2" size={20} />
                  </>
                ) : (
                  <>
                    Complete
                    <Check className="ml-2" size={20} />
                  </>
                )}
              </motion.button>
            </motion.div>

          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default OnboardingGuide;
{/* Step 3 - Facilities */}
              {currentStep === 3 && (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="bg-slate-700 p-6 rounded-lg mb-6"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Warehouse className="mr-2 text-sky-400" />
                      Facility Locations
                    </h3>
                    <div className="grid grid-cols-2 gap-6">
                      {onboardingSteps[3].locations.map((location, index) => (
                        <motion.div
                          key={location.name}
                          className="bg-slate-600 p-4 rounded-lg"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {location.name}
                          </h4>
                          <p className="text-gray-400 mb-2">Region: {location.region}</p>
                          <div className="space-y-2">
                            {location.specialties.map((specialty, i) => (
                              <div key={i} className="flex items-center text-sky-400">
                                <Check size={16} className="mr-2" />
                                <span>{specialty}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    className="bg-slate-700 p-6 rounded-lg"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Archive className="mr-2 text-sky-400" />
                      Storage Solutions
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {onboardingSteps[3].storageTypes.map((storage, index) => (
                        <motion.div
                          key={storage.type}
                          className="bg-slate-600 p-4 rounded-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.2 }}
                          whileHover={{ y: -5 }}
                        >
                          <h4 className="text-lg font-semibold text-white mb-2">
                            {storage.type}
                          </h4>
                          <p className="text-gray-400">{storage.details}</p>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 4 - Inventory Receipt (WRO Process) */}
              {currentStep === 4 && (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  {/* WRO Process Steps */}
                  <motion.div 
                    className="bg-slate-700 p-6 rounded-lg mb-6"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Archive className="mr-2 text-sky-400" />
                      WRO Process Steps
                    </h3>
                    <div className="relative">
                      {/* Progress Line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-600" />
                      
                      {onboardingSteps[4].process.map((processStep, index) => (
                        <motion.div
                          key={processStep.step}
                          className="relative flex items-start mb-6 last:mb-0"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.2 }}
                        >
                          {/* Step Number Circle */}
                          <div className="absolute left-0 w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          {/* Step Content */}
                          <div className="ml-16">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {processStep.step}
                            </h4>
                            <p className="text-gray-400">{processStep.details}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Costs and Fees */}
                  <motion.div 
                    className="bg-slate-700 p-6 rounded-lg"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <DollarSign className="mr-2 text-sky-400" />
                      Receiving Costs
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <motion.div
                        className="bg-slate-600 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">Standard Rate</h4>
                        <p className="text-2xl font-bold text-sky-400 mb-2">$25</p>
                        <p className="text-gray-400">For first 2 hours of receiving</p>
                      </motion.div>
                      <motion.div
                        className="bg-slate-600 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">Additional Time</h4>
                        <p className="text-2xl font-bold text-sky-400 mb-2">$35</p>
                        <p className="text-gray-400">Per additional hour</p>
                      </motion.div>
                      <motion.div
                        className="bg-slate-600 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ y: -5 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">Missing WRO Fee</h4>
                        <p className="text-2xl font-bold text-sky-400 mb-2">$25</p>
                        <p className="text-gray-400">Per day until resolved</p>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Best Practices */}
                  <motion.div 
                    className="bg-slate-700 p-6 rounded-lg mt-6"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <CheckCircle className="mr-2 text-sky-400" />
                      Best Practices
                    </h3>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex items-start p-3 bg-slate-600 rounded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                      >
                        <Check size={20} className="text-green-400 mr-3 mt-1" />
                        <div>
                          <p className="text-white font-medium">Affix WRO Labels</p>
                          <p className="text-gray-400">Ensure all boxes and pallets have WRO labels properly attached</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start p-3 bg-slate-600 rounded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <Check size={20} className="text-green-400 mr-3 mt-1" />
                        <div>
                          <p className="text-white font-medium">Schedule Delivery</p>
                          <p className="text-gray-400">Book dock time for pallet deliveries in advance</p>
                        </div>
                      </motion.div>
                      <motion.div 
                        className="flex items-start p-3 bg-slate-600 rounded"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Check size={20} className="text-green-400 mr-3 mt-1" />
                        <div>
                          <p className="text-white font-medium">Track Shipments</p>
                          <p className="text-gray-400">Add tracking numbers to WRO summary for visibility</p>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}

              {/* Step 5 - Final Setup */}
              {currentStep === 5 && (
                <motion.div 
                  className="space-y-6"
                  variants={containerVariants}
                >
                  <motion.div 
                    className="bg-slate-700 p-6 rounded-lg"
                    whileHover={{ scale: 1.01 }}
                  >
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center">
                      <Check className="mr-2 text-sky-400" />
                      Setup Complete!
                    </h3>
                    <p className="text-gray-400 mb-6">
                      Congratulations! You've completed the initial setup process. Here's what happens next:
                    </p>
                    <div className="grid grid-cols-2 gap-6">
                      <motion.div
                        className="bg-slate-600 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">Next Steps</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-400">
                            <ArrowRight size={16} className="mr-2 text-sky-400" />
                            Review order processing workflows
                          </li>
                          <li className="flex items-center text-gray-400">
                            <ArrowRight size={16} className="mr-2 text-sky-400" />
                            Set up tracking notifications
                          </li>
                          <li className="flex items-center text-gray-400">
                            <ArrowRight size={16} className="mr-2 text-sky-400" />
                            Configure return policies
                          </li>
                        </ul>
                      </motion.div>
                      <motion.div
                        className="bg-slate-600 p-4 rounded-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">Support Resources</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center text-gray-400">
                            <Info size={16} className="mr-2 text-sky-400" />
                            Access help documentation
                          </li>
                          <li className="flex items-center text-gray-400">
                            <Info size={16} className="mr-2 text-sky-400" />
                            Contact your account manager
                          </li>
                          <li className="flex items-center text-gray-400">
                            <Info size={16} className="mr-2 text-sky-400" />
                            Schedule onboarding call
                          </li>
                        </ul>
                      </motion.div>
                    </div>
                  </motion.div>
                </motion.div>
              )}
