import React, { useState } from 'react';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton
} from '@chakra-ui/react';

type AlertBannerProps = {
  message: string;
  onClosed: () => void; // Callback to inform parent component
};

const AlertBanner: React.FC<AlertBannerProps> = ({ message, onClosed }) => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
    onClosed(); // Notify parent component
  };

  if (!isVisible) return null; // Do not render if not visible

  return (
    <Box position="fixed" top="10" left="50%" transform="translateX(-50%)" width="60%" zIndex="banner">
      <Alert status="info" borderRadius="md" boxShadow="md" maxWidth="md">
        <AlertIcon />
        <AlertTitle mr={2}>{message}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" onClick={handleClose} />
      </Alert>
    </Box>
  );
};

export default AlertBanner;
