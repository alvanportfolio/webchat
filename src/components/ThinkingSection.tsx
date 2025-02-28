'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MarkdownRenderer from './MarkdownRenderer';

interface ThinkingSectionProps {
  content: string;
  isStreaming?: boolean;
}

export default function ThinkingSection({ content, isStreaming = false }: ThinkingSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPulse, setShowPulse] = useState(true);
  const [wordCount, setWordCount] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Define the theme color - a cyan/teal shade
  const themeColor = '#0FDBF0'; // Bright cyan color
  const themeColorDim = 'rgba(15, 219, 240, 0.4)'; // Dimmed version for subtle effects

  // Auto-expand when streaming is active
  useEffect(() => {
    if (isStreaming) {
      setIsExpanded(true);
      setShowPulse(true);
    } else {
      setShowPulse(false);
    }
  }, [isStreaming]);

  // Calculate word count for the badge
  useEffect(() => {
    if (content) {
      const words = content.split(/\s+/).filter(word => word.length > 0);
      setWordCount(words.length);
    }
  }, [content]);

  // Auto-scroll to bottom when streaming
  useEffect(() => {
    if (isStreaming && contentRef.current) {
      const element = contentRef.current;
      element.scrollTop = element.scrollHeight;
    }
  }, [content, isStreaming]);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  // Variants for text animation
  const thinkingTextVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0.6 },
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        repeat: Infinity,
        duration: 1.5,
      },
    },
  };

  // Creating the typing animation for "Thinking"
  const thinkingText = "Thinking";
  
  return (
    <div className="mb-4">
      <button
        onClick={toggleExpand}
        className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-gray-300 transition-colors p-2.5 rounded-lg hover:bg-gray-800/40 w-auto"
      >
        <div className="flex items-center justify-center relative">
          {/* Fixed circular glow for bulb */}
          {isExpanded && (
            <div className="absolute" style={{ width: '18px', height: '18px', left: '0px', top: '0px' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0.4, 0.7, 0.4]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ 
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  backgroundColor: themeColorDim,
                  filter: 'blur(2px)',
                  transform: 'scale(1.3)'
                }}
              />
            </div>
          )}
          
          {/* Lightbulb icon with enhanced cyan glow */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ 
              scale: isExpanded ? 1.1 : 1,
              opacity: isExpanded ? 1 : 0.8
            }}
            transition={{ 
              duration: 0.3,
              scale: {
                type: "spring",
                stiffness: 300,
                damping: 10
              }
            }}
            style={{ color: isExpanded ? themeColor : '#a3a3a3' }}
            className="relative z-10"
          >
            <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path>
            <path d="M9 18h6"></path>
            <path d="M10 22h4"></path>
          </motion.svg>
          
          {/* Arrow indicator */}
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="ml-1.5"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </motion.svg>
        </div>
        
        <div className="flex flex-col items-start">
          <span className="flex items-center font-medium text-gray-300">
            {/* Animated "Thinking" text with typing effect */}
            <motion.span
              variants={thinkingTextVariants}
              initial="initial"
              animate="animate"
              className="flex"
            >
              {thinkingText.split('').map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  style={{ 
                    color: isExpanded ? themeColor : '#d1d5db',
                    transition: 'color 0.3s ease'
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.span>
            
            {/* Word count badge */}
            <motion.span 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 0.9, scale: 1 }}
              className="ml-1.5 text-xs bg-gray-800/80 text-gray-400 px-1.5 py-0.5 rounded-full text-[10px] flex items-center"
            >
              {wordCount}
            </motion.span>
            
            {/* Pulsing indicator with theme color */}
            {showPulse && (
              <motion.span
                initial={{ opacity: 0.5, scale: 0.8 }}
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                style={{ backgroundColor: themeColor }}
                className="ml-2 w-2 h-2 rounded-full"
              ></motion.span>
            )}
            
            {isStreaming && (
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "auto" }}
                style={{ color: themeColorDim }}
                className="ml-2 text-xs"
              >
                streaming...
              </motion.span>
            )}
          </span>
          <span className="text-gray-500 text-xs">Expand for details</span>
        </div>
      </button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            {/* Container with cyan glow effect */}
            <div className="relative mt-2 rounded-md overflow-hidden">
              {/* Custom container glow using explicit cyan color */}
              <div 
                className="absolute inset-0 rounded-md z-0"
                style={{ 
                  borderRadius: '6px',
                  overflow: 'hidden'
                }}
              >
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  style={{ 
                    position: 'absolute',
                    inset: '-1px',
                    background: 'transparent',
                    boxShadow: `0 0 2px 1px ${themeColorDim}, inset 0 0 2px 1px ${themeColorDim}`,
                    borderRadius: 'inherit'
                  }}
                />
              </div>
              
              {/* Main content container */}
              <div className="relative p-4 bg-[#1a1a1a] rounded-md border border-gray-700/30 shadow-lg text-gray-300 text-sm z-10">
                <div 
                  ref={contentRef}
                  className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2"
                >
                  <div className="font-light text-gray-300 relative">
                    {/* Top fade effect for scrolling */}
                    <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-[#1a1a1a] to-transparent pointer-events-none z-10"></div>
                    
                    <MarkdownRenderer content={content} isStreaming={isStreaming} />
                    
                    {/* Bottom fade effect for scrolling */}
                    <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-10"></div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}