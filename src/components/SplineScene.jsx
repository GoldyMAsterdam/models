import { useEffect, useRef } from 'react';

const SplineScene = ({ sceneUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    let app;
    
    const loadSpline = async () => {
      const { Application } = await import('@splinetool/runtime');
      app = new Application(canvasRef.current);
      await app.load(sceneUrl);
    };

    if (canvasRef.current) {
      loadSpline();
    }

    return () => {
      if (app) {
        app.dispose?.();
      }
    };
  }, [sceneUrl]);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100%', 
        height: '100dvh', 
        minHeight: '400px', 
        maxHeight: '100vh'
      }} 
    />
  );
};

export default SplineScene;
