import React, { useEffect, useRef, useState } from "react";

type Settings = {
  showPanel: boolean;
  enableAnimations: boolean;
  animationSpeed: number;
  enableSound: boolean;
  scale: number;
  opacity: number;
};

const DEFAULT_SETTINGS: Settings = {
  showPanel: true,
  enableAnimations: true,
  animationSpeed: 300,
  enableSound: false,
  scale: 1,
  opacity: 1,
};

// --- Cookie Helpers ---
const setCookie = (name: string, value: string, days = 365) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 86400000);
  document.cookie = `${name}=${value};expires=${d.toUTCString()};path=/`;
};

const getCookie = (name: string) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

// --- Main Component ---
const BrowserLab: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [url, setUrl] = useState("https://wikipedia.com");
  const [inputUrl, setInputUrl] = useState(url);

  const [history, setHistory] = useState<string[]>([url]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  // --- Load settings from cookie ---
  useEffect(() => {
    const saved = getCookie("browserlab_settings");
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // --- Persist settings ---
  useEffect(() => {
    setCookie("browserlab_settings", JSON.stringify(settings));
  }, [settings]);

  // --- Navigation ---
  const navigate = (newUrl: string) => {
    let formatted = newUrl.trim();
    if (!formatted.startsWith("http")) {
      formatted = "https://" + formatted;
    }

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(formatted);

    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setUrl(formatted);

    if (settings.enableSound) {
      playClick();
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const reload = () => {
    setUrl((prev) => prev);
  };

  // --- Sound ---
  const playClick = () => {
    const audio = new Audio(
      "https://actions.google.com/sounds/v1/ui/click.ogg"
    );
    audio.play();
  };

  // --- Styles ---
  const iframeStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    border: "none",
    transform: `scale(${settings.scale})`,
    opacity: settings.opacity,
    transition: settings.enableAnimations
      ? `all ${settings.animationSpeed}ms ease`
      : "none",
  };

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* --- Side Panel --- */}
      {settings.showPanel && (
        <div
          style={{
            width: 280,
            background: "#111",
            color: "#fff",
            padding: 16,
            overflowY: "auto",
          }}
        >
          <h3>Settings</h3>

          <label>
            <input
              type="checkbox"
              checked={settings.enableAnimations}
              onChange={(e) =>
                setSettings({ ...settings, enableAnimations: e.target.checked })
              }
            />
            Animations
          </label>

          <br />

          <label>
            Speed:
            <input
              type="range"
              min={0}
              max={1000}
              value={settings.animationSpeed}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  animationSpeed: Number(e.target.value),
                })
              }
            />
          </label>

          <br />

          <label>
            <input
              type="checkbox"
              checked={settings.enableSound}
              onChange={(e) =>
                setSettings({ ...settings, enableSound: e.target.checked })
              }
            />
            Sound
          </label>

          <br />

          <label>
            Scale:
            <input
              type="range"
              min={0.5}
              max={1.5}
              step={0.1}
              value={settings.scale}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  scale: Number(e.target.value),
                })
              }
            />
          </label>

          <br />

          <label>
            Opacity:
            <input
              type="range"
              min={0.3}
              max={1}
              step={0.1}
              value={settings.opacity}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  opacity: Number(e.target.value),
                })
              }
            />
          </label>

          <br />

          <button
            onClick={() =>
              setSettings({ ...settings, showPanel: false })
            }
          >
            Hide Panel
          </button>
        </div>
      )}

      {/* --- Main Area --- */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Toolbar */}
        <div
          style={{
            display: "flex",
            padding: 8,
            background: "#222",
            gap: 8,
          }}
        >
          <button onClick={goBack}>◀</button>
          <button onClick={goForward}>▶</button>
          <button onClick={reload}>⟳</button>

          <input
            style={{ flex: 1 }}
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") navigate(inputUrl);
            }}
          />

          <button onClick={() => navigate(inputUrl)}>Go</button>

          {!settings.showPanel && (
            <button
              onClick={() =>
                setSettings({ ...settings, showPanel: true })
              }
            >
              ⚙
            </button>
          )}
        </div>

        {/* Iframe */}
        <div style={{ flex: 1 }}>
          <iframe ref={iframeRef} src={url} style={iframeStyle} />
        </div>
      </div>
    </div>
  );
};

export default BrowserLab;