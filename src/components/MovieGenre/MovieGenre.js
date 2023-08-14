import { Component } from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

import './movieGenre.css';
import Context from '../Context/Context.js';

export default class MovieGenre extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = Context;

  render() {
    const { genre_ids } = this.props;

    const { genres } = this.context;
    const genreNames = genres.map((element) => {
      for (const genreId of genre_ids) {
        if (element.id === genreId) {
          return (
            <Text code key={element.name} className="MovieGenre">
              {element.name}
            </Text>
          );
        }
      }
    });

    return <div className="MovieGenresContainer">{genreNames}</div>;
  }
}
