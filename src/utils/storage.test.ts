import { getPhotoDataFromLS, setPhotoDataToLS } from './storage';

describe('storage utils', () => {
  const mockData = {
    name: 'Rick',
    id: 1,
  };
  const key = 'test-key';

  beforeEach(() => {
    localStorage.clear();
  });

  test('returns data from localStorage if present', () => {
    const key = 'test-key';
    localStorage.setItem(key, JSON.stringify(mockData));
    const result = getPhotoDataFromLS(key);
    expect(result).toEqual(mockData);
  });

  test('returns null if data is not in localStorage', () => {
    const result = getPhotoDataFromLS(key);
    expect(result).toBeNull();
  });

  test('sets data to localStorage correctly', () => {
    setPhotoDataToLS(key, mockData);
    expect(localStorage.getItem(key)).toEqual(JSON.stringify(mockData));
  });
});
