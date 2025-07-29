import type { Mock } from 'vitest';
import { APIServiceCharacters } from '../api-service';
import { mockFullCharacterData } from '../../test-utils/mocks';
import { getCharacter } from './network-requests';

vi.mock('../api-service', () => ({
  APIServiceCharacters: { get: vi.fn() },
  APIServiceCharactersPhoto: { get: vi.fn() },
}));

describe('network-request tests', () => {
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
});
