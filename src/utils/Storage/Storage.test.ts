import { getPhotoDataFromLS, setPhotoDataToLS } from './Storage';
import { STORAGE_MOCK_DATA, STORAGE_TEST_KEY } from './Storage.constants';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('returns data from localStorage if present', () => {
    localStorage.setItem(STORAGE_TEST_KEY, JSON.stringify(STORAGE_MOCK_DATA));
    const result = getPhotoDataFromLS(STORAGE_TEST_KEY);
    expect(result).toEqual(STORAGE_MOCK_DATA);
  });

  test('returns null if data is not in localStorage', () => {
    const result = getPhotoDataFromLS(STORAGE_TEST_KEY);
    expect(result).toBeNull();
  });

  test('sets data to localStorage correctly', () => {
    setPhotoDataToLS(STORAGE_TEST_KEY, STORAGE_MOCK_DATA);
    expect(localStorage.getItem(STORAGE_TEST_KEY)).toEqual(
      JSON.stringify(STORAGE_MOCK_DATA)
    );
  });
});
