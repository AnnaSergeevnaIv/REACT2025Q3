import type { Mock } from 'vitest';
import {
  APIServiceCharacters,
  APIServiceCharactersPhoto,
} from '../api-service';
import {
  mockCharactersData,
  mockFullCharacterData,
  mockPhotoCharacterData,
} from '../../test-utils/mocks';
import { getCharacter, getCharacters, getPhotoData } from './network-requests';

vi.mock('../api-service', () => ({
  APIServiceCharacters: { get: vi.fn() },
  APIServiceCharactersPhoto: { get: vi.fn() },
}));

describe('network-request tests', () => {
  test('returns characters on successful API call', async () => {
    const mockResponse = {
      data: {
        results: mockCharactersData,
        previous: undefined,
        next: '',
      },
    };
    (APIServiceCharacters.get as Mock).mockResolvedValueOnce(mockResponse);
    const result = await getCharacters('Luke', 1);
    expect(result).toEqual({ error: undefined, ...mockResponse });
  });

  test('returns error on unsuccessful API characters call', async () => {
    const error = new Error('Request failed');
    (APIServiceCharacters.get as Mock).mockRejectedValueOnce(error);
    const result = await getCharacters('Luke', 1);
    expect(result).toEqual({ error: error.message, data: undefined });
  });

  test('returns character on successful API call', async () => {
    const mockResponse = {
      data: mockFullCharacterData,
    };
    (APIServiceCharacters.get as Mock).mockResolvedValueOnce(mockResponse);
    const result = await getCharacter('1');
    expect(result).toEqual({ error: undefined, ...mockResponse });
  });

  test('returns error on unsuccessful API character call', async () => {
    const error = new Error('Request failed');
    (APIServiceCharacters.get as Mock).mockRejectedValueOnce(error);
    const result = await getCharacter('1');
    expect(result).toEqual({ error: error.message, data: undefined });
  });

  test('returns photoData on successful API call', async () => {
    const mockResponse = {
      data: mockPhotoCharacterData,
    };
    (APIServiceCharactersPhoto.get as Mock).mockResolvedValueOnce(mockResponse);
    const result = await getPhotoData();
    expect(result).toEqual(mockPhotoCharacterData);
  });
});
