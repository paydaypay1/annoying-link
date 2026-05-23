import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CONFIG } from "./config";
import { useGyro } from "./useGyro";
import { VideoPool } from "./VideoPool";
import { createAtlas, drawTile } from "./atlas";

export default function SphereViewer() {
  const ref = useRef<HTMLDivElement>(null);
  const { orientation, requestPermission } = useGyro();

  useEffect(() => {
    if (!ref.current) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    ref.current.appendChild(renderer.domElement);

    // =========================
    // ADAPTIVE STATE
    // =========================

    const quality = {
      tileCap: CONFIG.TILE_CAP,
      updateBatch: CONFIG.UPDATE_BATCH,
      atlasScale: 1,
    };

    let thermalMode = false;
    let lowFpsStreak = 0;

    let frameSkip = 1;
    let frameCounter = 0;

    let fps = 60;
    let fpsSmoothed = 60;
    let lastTime = performance.now();
    let rrIndex = 0;

    // =========================
    // ATLAS
    // =========================

    const { ctx, texture } = createAtlas(1);

    const visibility = new Float32Array(64).fill(0);
    const tilePriority = new Float32Array(64).fill(0);

    // =========================
    // SHADER
    // =========================

    const material = new THREE.ShaderMaterial({
      uniforms: {
        atlas: { value: texture },
        tilesX: { value: CONFIG.TILE_X },
        tilesY: { value: CONFIG.TILE_Y },
        visibility: { value: visibility },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D atlas;
        uniform float tilesX;
        uniform float tilesY;
        uniform float visibility[64];

        varying vec2 vUv;

        void main() {
          float tx = floor(vUv.x * tilesX);
          float ty = floor(vUv.y * tilesY);

          int index = int(ty * tilesX + tx);

          if (visibility[index] < 0.5) discard;

          vec2 tileUV = fract(vec2(vUv.x * tilesX, vUv.y * tilesY));

          vec2 atlasUV = vec2(
            (tx + tileUV.x) / tilesX,
            (ty + tileUV.y) / tilesY
          );

          gl_FragColor = texture2D(atlas, atlasUV);
        }
      `,
    });

    const geo = new THREE.SphereGeometry(50, 64, 64);
    geo.scale(-1, 1, 1);

    scene.add(new THREE.Mesh(geo, material));

    // =========================
    // VIDEO POOL
    // =========================

    const videoPool = new VideoPool(
      ["/videos/video0.mp4", "/videos/video1.mp4", "/videos/video2.mp4"],
      CONFIG.VIDEO_POOL_SIZE
    );

    // =========================
    // TILE DIRECTIONS
    // =========================

    const tileDirs: THREE.Vector3[] = [];

    for (let i = 0; i < CONFIG.TILE_CAP; i++) {
      const u = (i % CONFIG.TILE_X) / CONFIG.TILE_X;
      const v = Math.floor(i / CONFIG.TILE_X) / CONFIG.TILE_Y;

      const theta = u * Math.PI * 2;
      const phi = v * Math.PI;

      tileDirs.push(
        new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta)
        ).normalize()
      );
    }

    const camDir = new THREE.Vector3();

    // =========================
    // QUALITY CONTROL
    // =========================

    function applyThermalLogic() {
      if (fps < 28) lowFpsStreak++;
      else lowFpsStreak = Math.max(0, lowFpsStreak - 1);

      if (lowFpsStreak > 5) thermalMode = true;
      if (fps > 50 && lowFpsStreak === 0) thermalMode = false;

      if (thermalMode) {
        frameSkip = 3;
        quality.tileCap = 16;
        quality.updateBatch = 2;
        quality.atlasScale = 0.5;
      } else {
        frameSkip = fps < 45 ? 2 : 1;
        quality.tileCap = Math.min(CONFIG.TILE_CAP, quality.tileCap + 1);
        quality.updateBatch = Math.min(CONFIG.UPDATE_BATCH, quality.updateBatch + 1);
        quality.atlasScale = 1;
      }
    }

    // =========================
    // UPDATE LOOP
    // =========================

    const animate = () => {
      requestAnimationFrame(animate);

      // FPS tracking
      const now = performance.now();
      if (now - lastTime >= 1000) {
        fps = fpsSmoothed * 0.8 + (1000 / (now - lastTime)) * 0.2;
        fpsSmoothed = fps;
        lastTime = now;

        applyThermalLogic();
      }

      frameCounter++;
      if (frameCounter % frameSkip !== 0) {
        renderer.render(scene, camera);
        return;
      }

      // gyro
      if (orientation) {
        camera.rotation.set(
          THREE.MathUtils.degToRad(orientation.beta || 0),
          THREE.MathUtils.degToRad(orientation.alpha || 0),
          THREE.MathUtils.degToRad(-(orientation.gamma || 0))
        );
      }

      camera.getWorldDirection(camDir);

      const cap = quality.tileCap;

      // visibility + priority
      for (let i = 0; i < cap; i++) {
        const dot = camDir.dot(tileDirs[i]);
        visibility[i] = dot > CONFIG.VISIBILITY_DOT ? 1 : 0;
        tilePriority[i] = Math.max(0, dot);
      }

      // sort indices by priority (center first)
      const sorted = Array.from({ length: cap }, (_, i) => i)
        .sort((a, b) => tilePriority[b] - tilePriority[a]);

      // round robin + priority hybrid update
      for (let j = 0; j < quality.updateBatch; j++) {
        const i = sorted[(rrIndex + j) % cap];

        if (visibility[i] < 0.5) continue;

        const video = videoPool.get(i);

        if (video.paused) video.play();

        drawTile(ctx, video, i, CONFIG.ATLAS_TILE_SIZE);
      }

      rrIndex = (rrIndex + quality.updateBatch) % cap;

      texture.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      ref.current?.removeChild(renderer.domElement);
    };
  }, [orientation]);

  return (
    <>
      <button onClick={requestPermission} style={{ position: "absolute", zIndex: 10 }}>
        Enable Gyro
      </button>
      <div ref={ref} style={{ width: "100vw", height: "100vh" }} />
    </>
  );
}