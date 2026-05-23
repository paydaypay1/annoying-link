export class VideoPool {
  private videos: HTMLVideoElement[] = [];

  constructor(srcs: string[], size: number) {
    for (let i = 0; i < size; i++) {
      const v = document.createElement("video");
      v.src = srcs[i % srcs.length];
      v.loop = true;
      v.muted = true;
      v.playsInline = true;
      v.crossOrigin = "anonymous";

      v.width = 1280;
      v.height = 720;

      this.videos.push(v);
    }
  }

  get(i: number) {
    return this.videos[i % this.videos.length];
  }
}