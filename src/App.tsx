import { Component } from 'react';
import { MainPage } from './pages/main-page';
import { getPhotoData } from './services/network-requests';
import { localStoragePhotoKey } from './constants/constants';
import { ErrorBoundary } from './services/error-boundary';

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
    const photoData = localStorage.getItem(localStoragePhotoKey);
    if (photoData) {
      this.setState({ photoData: JSON.parse(photoData) });
    } else {
      const data = await getPhotoData();
      this.setState({ photoData: data });
      localStorage.setItem(localStoragePhotoKey, JSON.stringify(data));
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
