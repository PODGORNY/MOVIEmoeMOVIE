import React from 'react';
import { Pagination, Space, Spin } from 'antd';
import PropTypes from 'prop-types';

import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import FilmCard from '../FilmCard/FilmCard';
import './FilmList.css';

export default class FilmList extends React.Component {
  renderList = () => {
    const { filmList, apiSearchFilm, onChangeRate, ratedFilms } = this.props;

    if (filmList.length === 0 && apiSearchFilm !== '') {
      return <ErrorIndicator text={'Фильмов не найдено, но вы держитесь'} />;
    }

    if (!filmList) {
      return (
        <Space className="film-list__spin" size="middle">
          <Spin className="film-list__spin" size="large" />
        </Space>
      );
    }

    return filmList.map((film) => (
      <FilmCard
        key={film.id}
        film={film}
        id={film.id}
        onChangeRate={(rate) => onChangeRate(rate, film.id)}
        reset={() => this.forceUpdate()}
        rating={Number(ratedFilms.get(film.id)) || Number(localStorage.getItem(film.id)) || 0}
      />
    ));
  };

  render() {
    const { totalResults, onChangePage, currentPage } = this.props;
    return (
      <React.Fragment>
        <ul className="film-list">{this.renderList()}</ul>
        <Pagination
          className="pagination"
          current={currentPage}
          onChange={onChangePage}
          pageSize={20}
          showSizeChanger={false}
          total={totalResults}
        />
      </React.Fragment>
    );
  }
}

FilmList.defaultProps = {
  filmList: null,
  totalResults: 0,
};

FilmList.propTypes = {
  filmList: PropTypes.arrayOf(PropTypes.shape({})),
  totalResults: PropTypes.number,
  currentPage: PropTypes.number.isRequired,
  onChangeRate: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,
  ratedFilms: PropTypes.any.isRequired,
};
