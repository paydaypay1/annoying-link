import { useEffect, useState } from 'react';

const [soundEffects, setSoundEffects] = useState(false)

useEffect(() => {
  setSoundEffects(confirm("Enable sound effects?"))
})

// --- Sound ---
const playClick = () => {
  const audio = new Audio(
    "https://actions.google.com/sounds/v1/ui/click.ogg"
  );
  audio.play();
};

function GlobalActivityListener() {
  /*useEffect(() => {
    const handleUserActivity = (event) => {
      console.log('User activity detected:', event.type)
      soundEffects && playClick()
      
      // if (event.type === 'keydown') {
      //   console.log(`Key pressed: ${event.key}`);
      // } else {
      //   console.log(`Mouse moved/clicked at: ${event.clientX}, ${event.clientY}`);
      // }
    };
    window.addEventListener('keydown', handleUserActivity);
    window.addEventListener('mousedown', handleUserActivity);
    window.addEventListener('mousemove', handleUserActivity);

    return () => {
      window.removeEventListener('keydown', handleUserActivity);
      window.removeEventListener('mousedown', handleUserActivity);
      window.removeEventListener('mousemove', handleUserActivity);
    };
  }, []);*/

  return null;
}

export default GlobalActivityListener;
