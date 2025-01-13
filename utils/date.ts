export const today = () => {
  const date = new Date();
  return `${date.getFullYear()}-${date.getUTCMonth().toLocaleString() + 1}-${date.getDate().toLocaleString()}`;
};
