import { Component, type ChangeEvent, type ReactNode } from 'react';
import logo from '../../assets/logo.png';
import {
  HEADER_CLASS,
  HEADER_IMAGE_CLASS,
  HEADER_INPUT_CLASS,
} from './Header.constant';

interface HeaderProps {
  clickHandle: (value: string) => void;
  value: string;
}

interface HeaderState {
  inputValue: string;
}

export class Header extends Component<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);
    this.state = { inputValue: this.props.value };
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ inputValue: event.target.value });
  };

  render(): ReactNode {
    return (
      <header className={HEADER_CLASS}>
        <img src={logo} alt="start wars logo" className={HEADER_IMAGE_CLASS} />
        <input
          type="text"
          className={HEADER_INPUT_CLASS}
          placeholder="Search character"
          onChange={this.handleChange}
          value={this.state.inputValue}
        />
        <button
          onClick={() => {
            this.props.clickHandle(this.state.inputValue.trim());
          }}
        >
          Search
        </button>
      </header>
    );
  }
}
