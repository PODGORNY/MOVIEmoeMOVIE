import React from 'react';
import { Space, Spin } from 'antd';
import PropTypes from 'prop-types';

import './FilmImage.css';
import noPoster from '../../store/no-poster.png';

export default class FilmImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  isLoaded = () => {
    this.setState({
      loading: false,
    });
  };

  render() {
    const { posterPath } = this.props;
    const { loading } = this.state;

    const image = (
      <img
        style={{ display: !loading ? 'flex' : 'none' }}
        onLoad={this.isLoaded}
        className={`card__poster${posterPath ? ' card__poster--loaded' : ''}`}
        alt="Film Image"
        src={posterPath ? `https://image.tmdb.org/t/p/w500${posterPath}` : noPoster}
      />
    );

    const spinner = loading ? (
      <Space className="card__poster" style={{ display: loading ? 'flex' : 'none' }}>
        <Spin className="card__spin" size="large" />
      </Space>
    ) : null;

    return (
      <React.Fragment>
        {spinner}
        {image}
      </React.Fragment>
    );
  }
}

FilmImage.defaultProps = {
  posterPath: null,
};

FilmImage.propTypes = {
  posterPath: PropTypes.string,
};
