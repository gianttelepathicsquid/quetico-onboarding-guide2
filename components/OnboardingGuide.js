import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Store, Package, Truck, Settings, Box,
  Check, Warehouse, Globe, Archive, DollarSign,
  Info, ArrowRight, ArrowLeft, CheckCircle
} from 'lucide-react';

const onboardingSteps = [
  {
    id: 'integrate',
    title: "1. Store Integration",
    icon: <Store size={24} color="#38bdf8" />,
    description: "Connect your ecommerce platform or set up manual ordering",
    content: {
      options: [
        {
          title: "Automated Integration",
          items: [
            "Shopify",
            "WooCommerce",
            "Magento",
            "Amazon",
            "Custom API Integration"
          ]
        },
        {
          title: "Manual Setup",
          items: [
            "Excel upload tool",
            "Manual order creation",
            "Custom shipping rules",
            "Special project handling"
          ]
        }
      ]
    }
  },
  {
    id: 'products',
    title: "2. Product Setup",
    icon: <Package size={24} color="#38bdf8" />,
    description: "Configure your products and preferences",
    content: {
      options: [
        {
          title: "Product Information",
          items: [
            "Product dimensions & weights",
            "Barcodes and SKUs",
            "Reorder points",
            "Storage requirements"
          ]
        },
        {
          title: "Shipping Settings",
          items: [
            "Packaging preferences",
            "Special handling instructions",
            "International requirements",
            "Custom packaging options"
          ]
        }
      ]
    }
  },
  {
    id: 'shipping',
    title: "3. Shipping Preferences",
    icon: <Truck size={24} color="#38bdf8" />,
    description: "Set up your shipping and delivery options",
    content: {
      options: [
        {
          title: "Shipping Methods",
          items: [
            "Standard shipping (3-5 days)",
            "Express shipping options",
            "International shipping",
            "Custom carrier selection"
          ]
        },
        {
          title: "Packaging Options",
          items: [
            "Standard boxes",
            "Poly mailers",
            "Bubble mailers",
            "Custom packaging"
          ]
        }
      ]
    }
  },
  {
    id: 'facilities',
    title: "4. Facility Selection",
    icon: <Warehouse size={24} color="#38bdf8" />,
    description: "Choose your fulfillment locations",
    content: {
      options: [
        {
          title: "Available Facilities",
          items: [
            "Ontario, CA - West Coast Hub",
            "Chino, CA - Specialty Handling",
            "Additional locations coming soon"
          ]
        },
        {
          title: "Storage Options",
          items: [
            "Bin storage for small items",
            "Shelf storage for medium items",
            "Pallet storage for bulk items",
            "Climate-controlled areas"
          ]
        }
      ]
    }
  },
  {
    id: 'receiving',
    title: "5. Receiving Process",
    icon: <Archive size={24} color="#38bdf8" />,
    description: "Learn about our WRO process and requirements",
    content: {
      options: [
        {
          title: "WRO Requirements",
          items: [
            "Create Warehouse Receiving Order",
            "Print and affix WRO labels",
            "Schedule delivery appointment",
            "Track receiving status"
          ]
        },
        {
          title: "Cost Structure",
          items: [
            "$25 for first 2 hours receiving",
            "$35/hour for additional time",
            "Special handling fees may apply",
            "Volume discounts available"
          ]
        }
      ]
    }
  }
];

const OnboardingGuide = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);
  const [progress, setProgress] = useState(0);

  const updateProgress = (step) => {
    setProgress(((step + 1) / onboardingSteps.length) * 100);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '2rem' }}>
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        style={{ maxWidth: '1024px', margin: '0 auto' }}
      >
        {/* Header */}
        <div style={{ 
          backgroundColor: '#1e293b',
          padding: '1.5rem',
          borderRadius: '0.5rem',
          marginBottom: '2rem'
        }}>
          <h1 style={{ 
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
          }}>
            Quetico 3PL Onboarding Guide
          </h1>
          <p style={{ color: '#94a3b8' }}>
            Complete these steps to set up your account
          </p>
        </div>

        {/* Progress Bar */}
        <div style={{ 
          backgroundColor: '#1e293b',
          height: '0.5rem',
          borderRadius: '9999px',
          marginBottom: '2rem'
        }}>
          <motion.div 
            style={{ 
              backgroundColor: '#38bdf8',
              height: '100%',
              borderRadius: '9999px',
              width: `${progress}%`
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Steps Navigation */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '2rem'
        }}>
          {onboardingSteps.map((step, index) => (
            <motion.button
              key={step.id}
              onClick={() => {
                setCurrentStep(index);
                updateProgress(index);
              }}
              style={{
                backgroundColor: currentStep === index ? '#38bdf8' : '#1e293b',
                padding: '1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                minWidth: '3rem',
                position: 'relative'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div style={{ color: 'white' }}>
                {index + 1}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Current Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: '#1e293b',
            padding: '2rem',
            borderRadius: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            marginBottom: '1.5rem'
          }}>
            <div style={{ marginRight: '1rem' }}>
              {onboardingSteps[currentStep].icon}
            </div>
            <div>
              <h2 style={{ 
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'white',
                marginBottom: '0.5rem'
              }}>
                {onboardingSteps[currentStep].title}
              </h2>
              <p style={{ color: '#94a3b8' }}>
                {onboardingSteps[currentStep].description}
              </p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            {onboardingSteps[currentStep].content.options.map((option, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: '#0f172a',
                  padding: '1.5rem',
                  borderRadius: '0.5rem'
                }}
              >
                <h3 style={{ 
                  fontSize: '1.25rem',
                  fontWeight: 'bold',
                  color: 'white',
                  marginBottom: '1rem'
                }}>
                  {option.title}
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {option.items.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        color: '#94a3b8',
                        padding: '0.5rem',
                        backgroundColor: '#1e293b',
                        borderRadius: '0.25rem'
                      }}
                    >
                      <Check size={16} style={{ color: '#38bdf8', marginRight: '0.5rem' }} />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Navigation Buttons */}
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between'
        }}>
          <button
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(prev => prev - 1);
                updateProgress(currentStep - 1);
              }
            }}
            style={{
              backgroundColor: currentStep > 0 ? '#38bdf8' : '#1e293b',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: currentStep > 0 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            disabled={currentStep === 0}
          >
            <ArrowLeft size={20} />
            Previous
          </button>
          <button
            onClick={() => {
              if (currentStep < onboardingSteps.length - 1) {
                setCurrentStep(prev => prev + 1);
                updateProgress(currentStep + 1);
              }
            }}
            style={{
              backgroundColor: currentStep < onboardingSteps.length - 1 ? '#38bdf8' : '#1e293b',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: currentStep < onboardingSteps.length - 1 ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
            disabled={currentStep === onboardingSteps.length - 1}
          >
            Next
            <ArrowRight size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingGuide;
