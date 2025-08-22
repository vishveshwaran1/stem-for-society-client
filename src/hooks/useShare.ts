import { useState } from 'react';

interface UseShareReturn {
  isShowing: boolean;
  handleShare: () => void;
}

export const useShare = (): UseShareReturn => {
  const [isShowing, setIsShowing] = useState(false);

  const handleShare = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      
      // Show popup
      setIsShowing(true);
      
      // Hide popup after 2 seconds
      setTimeout(() => {
        setIsShowing(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy link:', error);
      // Fallback for older browsers
      try {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        setIsShowing(true);
        setTimeout(() => {
          setIsShowing(false);
        }, 2000);
      } catch (fallbackError) {
        console.error('Fallback copy failed:', fallbackError);
      }
    }
  };

  return {
    isShowing,
    handleShare,
  };
};
