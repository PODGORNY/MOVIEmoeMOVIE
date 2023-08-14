import React, { Component } from 'react';
import { Space, Spin, Typography, Image } from 'antd';
import { parseISO, format } from 'date-fns';

import './movieCard.css';
import AlertAlarm from '../AlertAlarm';
import MovieGenre from '../MovieGenre';
import Rating from '../Rating';

const { Title, Text, Paragraph } = Typography;

export default class MovieCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      loading: true,
    };

    this.imgUrl = 'https://image.tmdb.org/t/p/w500';
  }

  onRatingChange = (e) => {
    const { id, rateMovie } = this.props;
    rateMovie(id, e);
  };

  dateConvert(release_date) {
    if (release_date) {
      try {
        return format(parseISO(release_date), 'MMMM dd, yyyy');
      } catch (err) {
        this.setState({ hasError: true });
        throw new Error(`Incorrent date format "${err}"`);
      }
    }
    return null;
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      errorInfo: info,
    });
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState(() => {
        return {
          loading: false,
        };
      });
    }, 150);
  }

  render() {
    const { id, original_title, release_date, genre_ids, overview, poster_path, vote_average, rateMovie, rating } =
      this.props;

    const { loading } = this.state;

    const posterPreloader = (
      <div className="card-preloader">
        <Space direction="vertical">
          <Space direction="horizontal">
            <Spin tip="Loading" />
          </Space>
        </Space>
      </div>
    );

    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return <AlertAlarm error={error ? error : 'Error!'} errorInfo={errorInfo ? errorInfo : null} />;
    }

    let borderColor;
    if (vote_average >= 0 && vote_average < 3) {
      borderColor = '#E90000';
    } else if (vote_average >= 3 && vote_average < 5) {
      borderColor = '#E97E00';
    } else if (vote_average >= 5 && vote_average < 7) {
      borderColor = '#E9D100';
    } else if (vote_average >= 7) {
      borderColor = '#66E900';
    }

    return (
      <section className="card">
        <div className="cardImage">
          {loading ? posterPreloader : <Image src={poster_path ? `${this.imgUrl}${poster_path}` : '/no_image.png'} />}
        </div>
        <div className="cardTitleContainer">
          <Title level={2} className="cardTitle" ellipsis={{ ellipsis: false, expandable: false, rows: 2 }}>
            {original_title}
            <div className="VoteAverage" style={{ border: `2px solid ${borderColor}` }}>
              {vote_average.toFixed(1)}
            </div>
          </Title>
          <Text type="secondary">{release_date ? this.dateConvert(release_date) : null}</Text>
          <MovieGenre id={id} genre_ids={genre_ids} className="MovieGenre" />
        </div>
        <div className="cardDescription">
          <React.Fragment>
            <Paragraph className="description" ellipsis={{ ellipsis: false, expandable: false, rows: 5 }}>
              {overview}
            </Paragraph>
          </React.Fragment>
        </div>
        <div className="cardRating">
          <Rating id={id} rateMovie={rateMovie} rating={rating} allowClear={false} />
        </div>
      </section>
    );
  }
}
