import { useEffect, useState } from "react";

export function useGyro() {
  const [orientation, setOrientation] = useState<DeviceOrientationEvent | null>(null);
  const [enabled, setEnabled] = useState(false);

  const requestPermission = async () => {
    // iOS permission gate
    // @ts-ignore
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      // @ts-ignore
      const res = await DeviceOrientationEvent.requestPermission();
      if (res === "granted") setEnabled(true);
    } else {
      setEnabled(true);
    }
  };

  useEffect(() => {
    if (!enabled) return;

    const handler = (e: DeviceOrientationEvent) => {
      setOrientation(e);
    };

    window.addEventListener("deviceorientation", handler);
    return () => window.removeEventListener("deviceorientation", handler);
  }, [enabled]);

  return { orientation, requestPermission };
}