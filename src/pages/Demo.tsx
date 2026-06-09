import { rainbowBackground } from '../shared/BackgroundHueFader'
import { useEffect, useRef } from "react";
import './Demo.css'
import 'animate.css'

export default function Demo() {
  const colorElement = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (colorElement.current) {
      rainbowBackground(colorElement.current);
    }
  }, []);
  return (
    <div className="home">
      <center>
        <h1>Demo Page</h1>
        <hr/>
        <iframe src="https://www.youtube.com/embed/z62JgZUaZ8I?si=wI6pE9zUNkI5Z_D8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        <hr/>
        <div ref={colorElement}>
          <h2 class="animate__animated animate__infinite animate__pulse">
            rule 1. Never alienate anyone<br />
            rule 2. Go as hard as you can <br />
            rule 3. Go Harder <br />
            rule4. Show love and be patient <br />
            rule 5. Do not live by submission<br />
            rule 6. Speak rarely and candidly<br />
            rule 7. Change the world<br />
          </h2>
        </div>
      </center>
    </div>
  )
}