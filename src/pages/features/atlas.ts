import * as THREE from "three";
import { CONFIG } from "./config";

export function createAtlas(scale = 1) {
  const tileSize = Math.floor(CONFIG.ATLAS_TILE_SIZE * scale);

  const canvas = document.createElement("canvas");
  canvas.width = tileSize * CONFIG.TILE_X;
  canvas.height = tileSize * CONFIG.TILE_Y;

  const ctx = canvas.getContext("2d")!;
  const texture = new THREE.CanvasTexture(canvas);

  return { canvas, ctx, texture, tileSize };
}

export function drawTile(
  ctx: CanvasRenderingContext2D,
  video: HTMLVideoElement,
  i: number,
  tileSize: number
) {
  const x = (i % CONFIG.TILE_X) * tileSize;
  const y = Math.floor(i / CONFIG.TILE_X) * tileSize;

  ctx.drawImage(video, x, y, tileSize, tileSize);
}