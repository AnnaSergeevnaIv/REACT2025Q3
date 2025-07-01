import { Component, type ReactNode } from 'react';
import { Header } from '../components/header/header';
import { localStorageSearchKey } from '../constants/constants';
import type { PhotoCharacterData } from '../App';
import { getCharacters } from '../services/network-requests';
import { CardsLayout } from '../components/cards-layout/cards-layout';
import { type CharacterData } from '../services/network-requests';

interface MainPageState {
  inputValue: string;
  data: CharacterData[];
}
interface MainProps {
  photoData: PhotoCharacterData[];
}

export class MainPage extends Component<MainProps, MainPageState> {
  constructor(props: MainProps) {
    super(props);
    const value = localStorage.getItem(localStorageSearchKey);
    this.state = { inputValue: value ?? '', data: [] };
  }
  async componentDidMount() {
    await this.getData();
  }

  componentDidUpdate(prevProps: MainProps) {
    if (
      prevProps.photoData !== this.props.photoData &&
      this.state.data.length > 0
    ) {
      this.setState({ data: this.mapData(this.state.data) });
    }
  }

  async getData(value: string = this.state.inputValue) {
    const data = await getCharacters(value);
    this.setState({ data: this.mapData(data) });
  }

  handleClick = (value: string) => {
    localStorage.setItem(localStorageSearchKey, value);
    this.setState({ inputValue: value });
    this.getData(value);
  };

  mapData(data: CharacterData[]): CharacterData[] {
    return data.map((character) => {
      character.image = this.props.photoData.find(
        (elem) => elem.name === character.name
      )?.image;
      console.log(character.image);
      return character;
    });
  }

  render(): ReactNode {
    console.log('MainPage render, photoData:', this.props.photoData);
    return (
      <div className="w-100%">
        <Header clickHandle={this.handleClick} value={this.state.inputValue} />
        <CardsLayout characters={this.state.data} />
      </div>
    );
  }
}
