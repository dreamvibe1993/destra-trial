export const fontResizer = (i) => {
  if (typeof i !== "number") return 100;
  const size = 100 / (i.toString().length / 4);
  if (size > 100) return 100;
  return size;
};
