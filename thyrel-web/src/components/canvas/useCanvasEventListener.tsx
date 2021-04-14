import React from 'react';

type UseCanvasEventListenerProps = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isPainting?: boolean;
  onMouseUp: (event: MouseEvent) => void;
  onMouseEnter: (event: MouseEvent) => void;
  onMouseMove: (event: MouseEvent) => void;
  onMouseDown: (event: MouseEvent) => void;
};

export default function useCanvasEventListener({
  canvasRef,
  isPainting,
  onMouseMove,
  onMouseEnter,
  onMouseDown,
  onMouseUp,
}: UseCanvasEventListenerProps) {
  React.useEffect(() => {
    if (!isPainting) return;

    function touchMove(event: TouchEvent) {
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      });
      onMouseMove(mouseEvent);
    }

    window.document.addEventListener('mousemove', onMouseMove);
    window.document.addEventListener('touchmove', touchMove);
    return () => {
      window.document.removeEventListener('mousemove', onMouseMove);
      window.document.removeEventListener('touchmove', touchMove);
    };
  }, [isPainting, onMouseMove]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    canvas.addEventListener('mouseenter', onMouseEnter);
    return () => {
      canvas.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [canvasRef, onMouseEnter]);

  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;

    function touchStart(event: TouchEvent) {
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: event.touches[0].clientX,
        clientY: event.touches[0].clientY,
      });
      onMouseDown(mouseEvent);
    }

    canvas.addEventListener('mousedown', onMouseDown);
    canvas.addEventListener('touchstart', touchStart);
    window.document.addEventListener('mouseup', onMouseUp);
    return () => {
      canvas.removeEventListener('mousedown', onMouseDown);
      canvas.removeEventListener('touchstart', touchStart);
      window.document.removeEventListener('mouseup', onMouseUp);
    };
  }, [canvasRef, onMouseDown, onMouseUp]);
}