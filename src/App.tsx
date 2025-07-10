import { Component } from 'react';
import { getPhotoData } from './services/network-requests';
import { localStoragePhotoKey } from './constants/constants';
import { ErrorBoundary } from './services/error-boundary';
import { getPhotoDataFromLS, setPhotoDataToLS } from './utils/storage';
import { MainPage } from './pages/MainPage';

export interface PhotoCharacterData {
  name: string;
  image: string;
}

interface AppState {
  photoData: PhotoCharacterData[];
}

export class App extends Component<Record<string, never>, AppState> {
  state = { photoData: [] };

  async componentDidMount() {
    await this.getPhotos();
  }

  async getPhotos() {
    try {
      const photoData = getPhotoDataFromLS(localStoragePhotoKey);
      if (photoData) {
        this.setState({ photoData });
      } else {
        const photoData = await getPhotoData();
        this.setState({ photoData });
        setPhotoDataToLS(localStoragePhotoKey, photoData);
      }
    } catch (error) {
      console.error('Failed to get photo data', error);
    }
  }

  render() {
    return (
      <ErrorBoundary
        fallback={<h1>Something went wrong. Please refresh the page </h1>}
      >
        <MainPage photoData={this.state.photoData} />
      </ErrorBoundary>
    );
  }
}

export default App;
