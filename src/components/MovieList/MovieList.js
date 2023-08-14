import React, { Component } from 'react';
import { Space, Spin } from 'antd';

import MovieCard from '../MovieCard';
import './movieList.css';
import AlertAlarm from '../AlertAlarm';

export default class MovieList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      loading: true,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      errorInfo: info,
    });
  }

  componentDidMount() {
    this.setState(() => {
      return {
        loading: false,
      };
    });
    const { query, page, updatePage } = this.props;
    updatePage(query, page);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tab !== this.props.tab) {
      const { query, page, updatePage } = this.props;
      updatePage(query, page);
    }

    if (prevProps.query !== this.props.query) {
      const { query, page, updatePage } = this.props;
      updatePage(query, page);
    }

    if (prevProps.page !== this.props.page) {
      const { query, page, updatePage } = this.props;
      updatePage(query, page);
    }
  }

  renderCards = (movieArray) => {
    const { rateMovie } = this.props;
    if (!movieArray.results) return;
    return movieArray.results.map(
      ({ id, original_title, release_date, genre_ids, overview, poster_path, vote_average, rating }) => {
        return (
          <MovieCard
            key={id}
            id={id}
            original_title={original_title}
            release_date={release_date}
            genre_ids={genre_ids}
            overview={overview}
            poster_path={poster_path}
            rateMovie={rateMovie}
            vote_average={vote_average}
            rating={rating}
          />
        );
      }
    );
  };

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return <AlertAlarm error={error} errorInfo={errorInfo ? errorInfo : null} />;
    }

    const { loading } = this.props;

    const cardListPreloader = (
      <div className="cardList-preloader">
        <Space direction="vertical">
          <Space direction="horizontal">
            <Spin tip="Loading" />
          </Space>
        </Space>
      </div>
    );

    const { moviesList } = this.props;

    const cards = this.renderCards(moviesList);
    if (!loading & (typeof moviesList.results === 'object')) {
      if (moviesList.results.length === 0) {
        return <div>Something went wrong</div>;
      }
    }

    return (
      <div className={loading ? null : 'main'}>
        {loading ? cardListPreloader : null}
        {loading ? null : cards}
      </div>
    );
  }
}
