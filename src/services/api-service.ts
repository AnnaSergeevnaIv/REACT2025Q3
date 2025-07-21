import axios from 'axios';
import {
  baseURLCharacters,
  baseURLCharactersPhotos,
} from '../constants/constants';

export const APIServiceCharacters = axios.create({
  baseURL: baseURLCharacters,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const APIServiceCharactersPhoto = axios.create({
  baseURL: baseURLCharactersPhotos,
  headers: {
    'Content-Type': 'application/json',
  },
});
