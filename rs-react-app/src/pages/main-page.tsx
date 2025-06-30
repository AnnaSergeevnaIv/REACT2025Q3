import { Component, type ReactNode } from 'react';
import { Header } from '../components/header/header';
import { localStorageSearchKey } from '../constants/constants';

interface MainPageState {
  inputValue: string;
}

export class MainPage extends Component<{}, MainPageState> {
  constructor() {
    super({});
    const value = localStorage.getItem(localStorageSearchKey);
    this.state = { inputValue: value ?? '' };
  }

  handleClick = (value: string) => {
    console.log('Search was clicked', value);
    localStorage.setItem(localStorageSearchKey, value);
    this.setState({ inputValue: value });
  };

  render(): ReactNode {
    return (
      <div className="w-100%">
        <Header clickHandle={this.handleClick} value={this.state.inputValue} />
      </div>
    );
  }
}
