import { Component, type ChangeEvent, type ReactNode } from 'react';
import logo from '../../assets/logo.png';

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
      <header className="w-full flex flex-row items-center justify-end gap-10">
        <img src={logo} alt="start wars logo" className="size-50 mr-auto" />
        <input
          type="text"
          className="h-100%"
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
