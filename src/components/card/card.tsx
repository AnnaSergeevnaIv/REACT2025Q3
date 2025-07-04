import { Component, type ReactNode } from 'react';
import { type CharacterData } from '../../services/network-requests';
import placeholder from '../../assets/placeholder.png';

export class Card extends Component<CharacterData, CharacterData> {
  render(): ReactNode {
    console.log(this.props);
    return (
      <div
        className="w-50 h-90 flex-col items-center rounded-2xl overflow-hidden shadow-md"
        data-testid="card"
      >
        <img
          src={this.props.image ? this.props.image : placeholder}
          alt={this.props.name + ' image'}
          className="w-50 h-65 object-cover object-top mb-2"
        />
        <h3 className="font-bold text-white">{this.props.name}</h3>
        <p>{`Height: ${this.props.height}`}</p>
        <p>{`Eye color: ${this.props.eye_color}`}</p>
      </div>
    );
  }
}
