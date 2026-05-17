import { useEffect, useState } from "react";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: any;
  }
}

const extractVideoId = (url: string) => {
  const match = url.match(/(?:youtube\.com\/.*v=|youtu\.be\/)([^&]+)/i);
  return match ? match[1] : "";
};

type Deck = {
  player: any;
  url: string;
  playing: boolean;
};

export default function WebDJ() {
  const [ready, setReady] = useState(false);
  const [portrait, setPortrait] = useState(false);

  const [deckA, setDeckA] = useState<Deck>({ player: null, url: "", playing: false });
  const [deckB, setDeckB] = useState<Deck>({ player: null, url: "", playing: false });

  const [crossfader, setCrossfader] = useState(0.5);

  // Load API
  useEffect(() => {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.body.appendChild(tag);

    window.onYouTubeIframeAPIReady = () => setReady(true);
  }, []);

  // Orientation detection
  useEffect(() => {
    const check = () => setPortrait(window.innerHeight > window.innerWidth);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Init players
  useEffect(() => {
    if (!ready) return;

    const makePlayer = (id: string, setter: any) => {
      const player = new window.YT.Player(id, {
        videoId: "",
        playerVars: { controls: 0 },
        events: {
          onStateChange: (e: any) => {
            setter((prev: Deck) => ({
              ...prev,
              playing: e.data === 1,
            }));
          },
        },
      });

      setter((prev: Deck) => ({ ...prev, player }));
    };

    makePlayer("deckA", setDeckA);
    makePlayer("deckB", setDeckB);
  }, [ready]);

  // Crossfader
  useEffect(() => {
    if (!deckA.player || !deckB.player) return;
    deckA.player.setVolume((1 - crossfader) * 100);
    deckB.player.setVolume(crossfader * 100);
  }, [crossfader, deckA.player, deckB.player]);

  const load = (deck: Deck) => {
    const id = extractVideoId(deck.url);
    deck.player?.loadVideoById(id);
  };

  return (
    <div className="app">
      {portrait && (
        <div className="overlay">
          Rotate device to landscape
        </div>
      )}

      <div className="deck-container">
        {/* Deck A */}
        <div className="deck">
          <div className={`platter ${deckA.playing ? "spin" : ""}`}>
            <div className="vinyl">
              <div className="label" />
              <div id="deckA" className="iframe" />
            </div>
          </div>

          <input
            placeholder="YouTube URL"
            value={deckA.url}
            onChange={(e) => setDeckA({ ...deckA, url: e.target.value })}
          />
          <button onClick={() => load(deckA)}>Load</button>
          <button onClick={() => deckA.player?.playVideo()}>Play</button>
          <button onClick={() => deckA.player?.pauseVideo()}>Pause</button>
        </div>

        {/* Deck B */}
        <div className="deck">
          <div className={`platter ${deckB.playing ? "spin" : ""}`}>
            <div className="vinyl">
              <div className="label" />
              <div id="deckB" className="iframe" />
            </div>
          </div>

          <input
            placeholder="YouTube URL"
            value={deckB.url}
            onChange={(e) => setDeckB({ ...deckB, url: e.target.value })}
          />
          <button onClick={() => load(deckB)}>Load</button>
          <button onClick={() => deckB.player?.playVideo()}>Play</button>
          <button onClick={() => deckB.player?.pauseVideo()}>Pause</button>
        </div>
      </div>

      {/* Crossfader */}
      <div className="mixer">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={crossfader}
          onChange={(e) => setCrossfader(+e.target.value)}
        />
      </div>

      <style>{`
        .app {
          background: #111;
          color: #eee;
          height: 100vh;
          width: 100vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          font-family: sans-serif;
        }

        .deck-container {
          display: flex;
          flex: 1;
        }

        .deck {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        .platter {
          width: 80%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(#222, #000);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .vinyl {
          width: 90%;
          height: 90%;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          box-shadow: inset 0 0 20px #000;
        }

        .iframe {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          pointer-events: none;
        }

        .label {
          position: absolute;
          width: 25%;
          height: 25%;
          background: #c33;
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 2;
        }

        .spin {
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .mixer {
          padding: 10px;
          background: #000;
        }

        input, button {
          margin: 5px;
          background: #222;
          color: #eee;
          border: 1px solid #444;
          padding: 5px;
        }

        .overlay {
          position: fixed;
          inset: 0;
          background: #000;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2em;
          z-index: 999;
        }
      `}</style>
    </div>
  );
}