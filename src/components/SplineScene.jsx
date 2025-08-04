import { useEffect, useRef, useState, useCallback } from 'react';

const SplineScene = ({ sceneUrl }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Check screen size
  const checkScreenSize = useCallback(() => {
    const isSmall = window.innerWidth < 1016;
    setIsSmallScreen(isSmall);
    return isSmall;
  }, []);

  const updateDimensions = useCallback(() => {
    if (containerRef.current && !isSmallScreen) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, [isSmallScreen]);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current && appRef.current && !isSmallScreen) {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      
      if (container) {
        const { offsetWidth, offsetHeight } = container;
        
        // Set canvas size
        canvas.width = offsetWidth;
        canvas.height = offsetHeight;
        canvas.style.width = `${offsetWidth}px`;
        canvas.style.height = `${offsetHeight}px`;
        
        // Trigger Spline resize if the method exists
        if (appRef.current.resize) {
          appRef.current.resize();
        }
        
        // Alternative: manually trigger a resize event
        if (appRef.current.setSize) {
          appRef.current.setSize(offsetWidth, offsetHeight);
        }
      }
    }
  }, [isSmallScreen]);

  useEffect(() => {
    // Initial screen size check
    checkScreenSize();
    updateDimensions();
    
    const handleResize = () => {
      const wasSmallScreen = isSmallScreen;
      const isNowSmallScreen = checkScreenSize();
      
      // If screen size category changed, update dimensions
      if (wasSmallScreen !== isNowSmallScreen) {
        updateDimensions();
      }
      
      if (!isNowSmallScreen) {
        updateDimensions();
        // Debounce resize to avoid too many calls
        setTimeout(resizeCanvas, 100);
      }
    };

    window.addEventListener('resize', handleResize);
    
    // Also listen for orientation changes on mobile
    window.addEventListener('orientationchange', () => {
      setTimeout(handleResize, 500); // Longer delay for orientation change
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [updateDimensions, resizeCanvas, checkScreenSize, isSmallScreen]);

  useEffect(() => {
    let mounted = true;
    
    const loadSpline = async () => {
      if (isSmallScreen) return; // Don't load Spline on small screens
      
      try {
        const { Application } = await import('@splinetool/runtime');
        
        if (!mounted || !canvasRef.current) return;
        
        const app = new Application(canvasRef.current);
        appRef.current = app;
        
        await app.load(sceneUrl);
        
        if (mounted) {
          // Initial resize after loading
          setTimeout(resizeCanvas, 100);
        }
      } catch (error) {
        console.error('Failed to load Spline scene:', error);
      }
    };

    if (canvasRef.current && dimensions.width > 0 && dimensions.height > 0 && !isSmallScreen) {
      loadSpline();
    }

    return () => {
      mounted = false;
      if (appRef.current) {
        appRef.current.dispose?.();
        appRef.current = null;
      }
    };
  }, [sceneUrl, dimensions, resizeCanvas, isSmallScreen]);

  // Render small screen message
  if (isSmallScreen) {
    return (
      <div 
        style={{ 
          width: '100%', 
          height: '100vh',
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          textAlign: 'center',
          padding: '2rem',
          boxSizing: 'border-box'
        }}
      >
          
          <h1 style={{ 
            fontSize: '1.5rem', 
            fontWeight: '600', 
            marginBottom: '1rem',
            lineHeight: '1.3'
          }}>
            Desktop Required
          </h1>
          
          <p style={{ 
            fontSize: '1rem', 
            opacity: 0.8, 
            marginBottom: '1.5rem',
            lineHeight: '1.5'
          }}>
            This website is incompatible with smaller devices, use a desktop or ipad instead. 
          </p>
          
          <p style={{ 
            fontSize: '0.875rem', 
            opacity: 0.6,
            marginBottom: '2rem' 
          }}>
            Current screen width: {window.innerWidth}px
          </p>
          </div>
    );
  }

  // Render normal Spline scene for larger screens
  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '100vh',
        minHeight: '400px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000'
      }}
    >
      <canvas 
        ref={canvasRef}
        style={{ 
          width: '100%',
          height: '100%',
          display: 'block',
          objectFit: 'cover',
          objectPosition: 'center',
        }} 
      />
    </div>
  );
};

export default SplineScene;
