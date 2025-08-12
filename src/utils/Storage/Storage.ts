export const getPhotoDataFromLS = (key: string) => {
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const setPhotoDataToLS = (key: string, data: unknown) => {
  localStorage.setItem(key, JSON.stringify(data));
};
