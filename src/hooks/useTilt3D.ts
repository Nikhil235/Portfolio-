import { useState, useCallback, MouseEvent } from 'react';

interface TiltState {
  rotateX: number;
  rotateY: number;
  spotX: number;
  spotY: number;
  isHovered: boolean;
}

export function useTilt3D(maxTilt: number = 6) {
  const [tilt, setTilt] = useState<TiltState>({
    rotateX: 0,
    rotateY: 0,
    spotX: 50,
    spotY: 50,
    isHovered: false,
  });

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const normX = mouseX / width - 0.5;
      const normY = mouseY / height - 0.5;

      setTilt({
        rotateX: -normY * maxTilt * 2,
        rotateY: normX * maxTilt * 2,
        spotX: (mouseX / width) * 100,
        spotY: (mouseY / height) * 100,
        isHovered: true,
      });
    },
    [maxTilt]
  );

  const handleMouseLeave = useCallback(() => {
    setTilt((prev) => ({
      ...prev,
      rotateX: 0,
      rotateY: 0,
      isHovered: false,
    }));
  }, []);

  return {
    tilt,
    handleMouseMove,
    handleMouseLeave,
  };
}
