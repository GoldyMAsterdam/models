import { useEffect, useRef, useState, useCallback } from 'react';

if (window.innerWidth < 1016) {
    alert('This website is not made for smaller devices')
}

const SplineScene = ({ sceneUrl }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const appRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { offsetWidth, offsetHeight } = containerRef.current;
      setDimensions({ width: offsetWidth, height: offsetHeight });
    }
  }, []);

  const resizeCanvas = useCallback(() => {
    if (canvasRef.current && appRef.current) {
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
  }, []);

  useEffect(() => {
    updateDimensions();
    
    const handleResize = () => {
      updateDimensions();
      // Debounce resize to avoid too many calls
      setTimeout(resizeCanvas, 100);
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
  }, [updateDimensions, resizeCanvas]);

  useEffect(() => {
    let mounted = true;
    
    const loadSpline = async () => {
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

    if (canvasRef.current && dimensions.width > 0 && dimensions.height > 0) {
      loadSpline();
    }

    return () => {
      mounted = false;
      if (appRef.current) {
        appRef.current.dispose?.();
        appRef.current = null;
      }
    };
  }, [sceneUrl, dimensions, resizeCanvas]);

  return (
    <div 
      ref={containerRef}
      style={{ 
        width: '100%', 
        height: '100dvh',
        minHeight: '400px',
        maxHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
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
