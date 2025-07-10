import { Component, type ReactNode } from 'react';
import { type CharacterData } from '../../services/network-requests';
import placeholder from '../../assets/placeholder.png';
import { CARD_CONTAINER_CLASS, CARD_IMAGE_CLASS } from './Card.constants';

export class Card extends Component<CharacterData> {
  render(): ReactNode {
    return (
      <div className={CARD_CONTAINER_CLASS}>
        <img
          src={this.props.image ? this.props.image : placeholder}
          alt={`${this.props.name} image`}
          className={CARD_IMAGE_CLASS}
        />
        <h3 className="font-bold text-white">{this.props.name}</h3>
        <p>{`Height: ${this.props.height}`}</p>
        <p>{`Eye color: ${this.props.eye_color}`}</p>
      </div>
    );
  }
}
