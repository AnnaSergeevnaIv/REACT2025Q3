import { Component } from 'react';
import { MainPage } from './pages/main-page';
import { getPhotoData } from './services/network-requests';

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
    const data = await getPhotoData();
    this.setState({ photoData: data });
    console.log('data photo', data);
  }

  render() {
    return <MainPage photoData={this.state.photoData} />;
  }
}

export default App;
