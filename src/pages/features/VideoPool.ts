export class VideoPool {
  private videos: HTMLVideoElement[] = [];

  constructor(files: File[], size: number) {
    const urls = files.map(f => URL.createObjectURL(f));
    for (let i = 0; i < size; i++) {
      const v = document.createElement("video"); v.src = urls[i % 
urls.length]; 
      v.loop = true; 
      v.muted = true; 
      v.playsInline = true; 
      v.crossOrigin = "anonymous";
      v.autoplay = true;    

      v.play();
      v.setAttribute("webkit-playsinline", "true");
      
      this.videos.push(v);
    }
  }

  get(i: number) {
    return this.videos[i % this.videos.length];
  }

  dispose() {
    this.videos.forEach(v => {
      URL.revokeObjectURL(v.src); v.pause();
    });
  }
}
