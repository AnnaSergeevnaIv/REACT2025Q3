import { Component } from 'react';
import { MainPage } from './pages/main-page';
import { getPhotoData } from './services/network-requests';
import { localStoragePhotoKey } from './constants/constants';
import { ErrorBoundary } from './services/error-boundary';
import { getPhotoDataFromLS, setPhotoDataToLS } from './utils/storage';

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
    const photoData = getPhotoDataFromLS(localStoragePhotoKey);
    if (photoData) {
      this.setState({ photoData });
    } else {
      const photoData = await getPhotoData();
      this.setState({ photoData });
      setPhotoDataToLS(localStoragePhotoKey, photoData);
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
