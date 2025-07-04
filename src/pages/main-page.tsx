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
  loading: boolean;
  error: boolean;
  requestError: string;
}
export interface MainProps {
  photoData: PhotoCharacterData[];
}

export class MainPage extends Component<MainProps, MainPageState> {
  constructor(props: MainProps) {
    super(props);
    const value = localStorage.getItem(localStorageSearchKey);
    this.state = {
      inputValue: value ?? '',
      data: [],
      loading: true,
      error: false,
      requestError: '',
    };
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
    if (this.state.error) throw new Error('Test error from button!');
  }

  async getData(value: string = this.state.inputValue) {
    const data = await getCharacters(value);
    if (typeof data !== 'string') {
      this.setState({
        data: this.mapData(data),
        loading: false,
        requestError: '',
      });
    } else {
      this.setState({ requestError: data, loading: false });
    }
  }

  handleClick = (value: string) => {
    localStorage.setItem(localStorageSearchKey, value);
    this.setState({ inputValue: value, loading: true });
    this.getData(value);
  };

  mapData(data: CharacterData[]): CharacterData[] {
    return data.map((character) => {
      character.image = this.props.photoData.find(
        (elem) => elem.name === character.name
      )?.image;
      return character;
    });
  }

  handleClickErrorButton() {
    this.setState({ error: true });
  }

  render(): ReactNode {
    return (
      <div className="w-100%">
        <Header clickHandle={this.handleClick} value={this.state.inputValue} />
        {this.state.loading ? (
          <h1>Loading...</h1>
        ) : this.state.requestError ? (
          <h1 className="mb-7">{this.state.requestError}</h1>
        ) : (
          <CardsLayout characters={this.state.data} />
        )}
        <button onClick={this.handleClickErrorButton.bind(this)}>
          Throw error
        </button>
      </div>
    );
  }
}
