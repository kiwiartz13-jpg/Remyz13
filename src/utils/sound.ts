export function playSound(src: string) {
  const audio = new Audio(src);
  audio.volume = 0.5;
  void audio.play().catch(() => {});
  return audio;
}
