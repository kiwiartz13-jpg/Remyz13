export function playSound(src: string) {
  const audio = new Audio(src);
  void audio.play().catch(() => {});
}
