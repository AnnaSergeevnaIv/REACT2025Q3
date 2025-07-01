import { Component } from 'react';
import { MainPage } from './pages/main-page';
import { getPhotoData } from './services/network-requests';
import { localStoragePhotoKey } from './constants/constants';

export interface PhotoCharacterData {
  name: string;
  image: string;
}

interface AppState {
  photoData: PhotoCharacterData[];
}
type AppProps = { props: unknown };

export class App extends Component<AppProps, AppState> {
  constructor() {
    super({ props: {} });
    this.state = { photoData: [] };
  }

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
    return <MainPage photoData={this.state.photoData} />;
  }
}

export default App;
