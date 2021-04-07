import { motion } from 'framer-motion';
import React from 'react';
import { store } from './Store';

const RecordingSpinner = () => {
  const { isRecording } = store;

  return isRecording ? (
    <motion.div
      style={{
        width: '10px',
        height: '10px',
        backgroundColor: 'rgb(255, 51, 51)',
      }}
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 270, 270, 0],
        borderRadius: ['20%', '20%', '50%', '50%', '20%'],
      }}
      transition={{
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.5, 0.8, 1],
        repeatType: 'loop',
        repeat: Infinity,
      }}
    />
  ) : null;
};

export default RecordingSpinner;
