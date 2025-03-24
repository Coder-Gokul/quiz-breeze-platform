
// This is a simulated security utility for the testing platform
// In a real application, you would implement more sophisticated measures

/**
 * Detects if the browser is in fullscreen mode
 */
export const isInFullscreen = (): boolean => {
  return !!(
    document.fullscreenElement ||
    // @ts-ignore - Safari
    document.webkitFullscreenElement ||
    // @ts-ignore - Firefox
    document.mozFullScreenElement ||
    // @ts-ignore - IE/Edge
    document.msFullscreenElement
  );
};

/**
 * Requests fullscreen for the provided element
 */
export const requestFullscreen = async (element: HTMLElement): Promise<void> => {
  try {
    if (element.requestFullscreen) {
      await element.requestFullscreen();
    // @ts-ignore - Safari
    } else if (element.webkitRequestFullscreen) {
      // @ts-ignore - Safari
      await element.webkitRequestFullscreen();
    // @ts-ignore - Firefox
    } else if (element.mozRequestFullScreen) {
      // @ts-ignore - Firefox
      await element.mozRequestFullScreen();
    // @ts-ignore - IE/Edge
    } else if (element.msRequestFullscreen) {
      // @ts-ignore - IE/Edge
      await element.msRequestFullscreen();
    }
  } catch (error) {
    console.error('Failed to enter fullscreen mode:', error);
    throw new Error('Failed to enter fullscreen mode');
  }
};

/**
 * Exits fullscreen mode
 */
export const exitFullscreen = async (): Promise<void> => {
  try {
    if (document.exitFullscreen) {
      await document.exitFullscreen();
    // @ts-ignore - Safari
    } else if (document.webkitExitFullscreen) {
      // @ts-ignore - Safari
      await document.webkitExitFullscreen();
    // @ts-ignore - Firefox
    } else if (document.mozCancelFullScreen) {
      // @ts-ignore - Firefox
      await document.mozCancelFullScreen();
    // @ts-ignore - IE/Edge
    } else if (document.msExitFullscreen) {
      // @ts-ignore - IE/Edge
      await document.msExitFullscreen();
    }
  } catch (error) {
    console.error('Failed to exit fullscreen mode:', error);
  }
};

/**
 * Prevents common keyboard shortcuts that could be used to cheat
 */
export const preventKeyboardShortcuts = (event: KeyboardEvent): void => {
  // Prevent Alt+Tab (Alt + 9)
  if (event.altKey && event.keyCode === 9) {
    event.preventDefault();
    return;
  }
  
  // Prevent taking screenshots (usually PrintScreen key)
  if (event.key === 'PrintScreen') {
    event.preventDefault();
    return;
  }
  
  // Prevent opening developer tools (F12 or Ctrl+Shift+I/J/C)
  if (
    event.key === 'F12' ||
    (event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'J' || event.key === 'C'))
  ) {
    event.preventDefault();
    return;
  }
  
  // Prevent browser search (Ctrl+F/G)
  if (event.ctrlKey && (event.key === 'f' || event.key === 'g')) {
    event.preventDefault();
    return;
  }
};

/**
 * Checks if the user has switched tabs or windows
 */
export const detectVisibilityChange = (callback: (isHidden: boolean) => void): () => void => {
  const handleVisibilityChange = () => {
    callback(document.hidden);
  };
  
  document.addEventListener('visibilitychange', handleVisibilityChange);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('visibilitychange', handleVisibilityChange);
  };
};

/**
 * Sets up event listeners for all security measures
 */
export const setupSecurityMeasures = (
  warningCallback: () => void,
  element: HTMLElement
): (() => void) => {
  // Set up fullscreen detection
  const fullscreenChangeHandler = () => {
    if (!isInFullscreen()) {
      warningCallback();
    }
  };
  
  // Set up tab/window change detection
  const visibilityCleanup = detectVisibilityChange((isHidden) => {
    if (isHidden) {
      warningCallback();
    }
  });
  
  // Set up keyboard shortcut prevention
  const keydownHandler = (e: KeyboardEvent) => {
    preventKeyboardShortcuts(e);
  };
  
  // Set up right-click prevention
  const contextMenuHandler = (e: MouseEvent) => {
    e.preventDefault();
    return false;
  };
  
  // Add event listeners
  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
  document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);
  
  document.addEventListener('keydown', keydownHandler);
  element.addEventListener('contextmenu', contextMenuHandler);
  
  // Return cleanup function
  return () => {
    document.removeEventListener('fullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('webkitfullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('mozfullscreenchange', fullscreenChangeHandler);
    document.removeEventListener('MSFullscreenChange', fullscreenChangeHandler);
    
    document.removeEventListener('keydown', keydownHandler);
    element.removeEventListener('contextmenu', contextMenuHandler);
    
    visibilityCleanup();
  };
};

export default {
  isInFullscreen,
  requestFullscreen,
  exitFullscreen,
  preventKeyboardShortcuts,
  detectVisibilityChange,
  setupSecurityMeasures,
};
