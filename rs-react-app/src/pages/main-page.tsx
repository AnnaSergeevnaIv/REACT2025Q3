import { Component, type ReactNode } from 'react';
import { Header } from '../components/header/header';
import { localStorageSearchKey } from '../constants/constants';
import type { PhotoCharacterData } from '../App';
import { getCharacters } from '../services/network-requests';

interface MainPageState {
  inputValue: string;
}
interface MainProps {
  photoData: PhotoCharacterData[];
}

export class MainPage extends Component<MainProps, MainPageState> {
  constructor(props: MainProps) {
    super(props);
    const value = localStorage.getItem(localStorageSearchKey);
    this.state = { inputValue: value ?? '' };
  }
  async componentDidMount() {
    await this.getData();
  }

  async getData() {
    const data = await getCharacters(this.state.inputValue);
    console.log('data', data);
  }

  handleClick = (value: string) => {
    console.log('Search was clicked', value);
    localStorage.setItem(localStorageSearchKey, value);
    this.setState({ inputValue: value });
  };

  render(): ReactNode {
    console.log('MainPage render, photoData:', this.props.photoData);
    return (
      <div className="w-100%">
        <Header clickHandle={this.handleClick} value={this.state.inputValue} />
      </div>
    );
  }
}
