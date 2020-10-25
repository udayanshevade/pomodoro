export const isNotMetaKey = (e: KeyboardEvent) => {
  return !['Meta', 'Shift', 'Alt', 'Ctrl', 'Escape'].includes(e.key);
};
