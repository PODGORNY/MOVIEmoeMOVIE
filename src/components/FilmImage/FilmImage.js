import React from 'react';
import { Space, Spin } from 'antd';
import PropTypes from 'prop-types';
import './FilmImage.css';

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
        src={
          posterPath
            ? `https://image.tmdb.org/t/p/w500${posterPath}`
            : 'https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg'
        }
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
