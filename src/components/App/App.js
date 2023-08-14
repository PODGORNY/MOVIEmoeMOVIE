import React, { Component } from 'react';
import { debounce } from 'lodash';
import { Tabs } from 'antd';

import './app.css';
import MovieList from '../MovieList/MovieList';
import Footer from '../Footer';
import MovieService from '../../Service/MovieService';
import Context from '../Context/Context';
import Search from '../Search/Search';
import AlertAlarm from '../AlertAlarm';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.api = new MovieService();

    this.state = {
      hasError: false,
      loading: true,
      tab: 'search',
      query: '',
      page: 1,
      genres: '',
      moviesList: [],
      total_pages: '',
      total_results: '',
      items: [
        {
          key: 'search',
          label: 'Search',
        },
        {
          key: 'rated',
          label: 'Rated',
        },
      ],
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
  };

  handleChange = ({ target }) => {
    const queryFromKeyBoard = target.value.trim();
    this.setState((prevState) => ({
      query: target.value.trim(),
      page: prevState.query === queryFromKeyBoard ? prevState.page : 1,
    }));
  };

  onTabChange = (key) => {
    this.setState(() => {
      return {
        tab: key,
        page: 1,
      };
    });
  };

  updateGenres = async () => {
    this.api.getGenres().then(this.onGenresLoaded).catch(this.onError);
  };

  onGenresLoaded = (genres) => {
    this.setState(() => {
      return {
        genres,
        loading: false,
        hasError: false,
      };
    });
  };

  onMoviesLoaded = (moviesData) => {
    const { page, total_pages, total_results } = moviesData;
    this.setState(() => {
      return {
        page,
        moviesList: moviesData,
        total_pages,
        total_results,
        loading: false,
        hasError: false,
      };
    });
  };

  onError = (err) => {
    this.setState({
      hasError: true,
      error: err.name,
      errorInfo: err.message,
    });
  };

  updatePage = (query = '', pageNumber = 1) => {
    this.setState({
      loading: true,
    });

    const { tab = 'search' } = this.state;

    if (tab === 'rated') {
      this.setState({
        query: '',
      });
      this.api.fetchAllRatedMovies(pageNumber).then(this.onMoviesLoaded).catch(this.onError);
    } else if (query) {
      const data = this.api.fetchSearchedMoviesAndRatingArrays(pageNumber, query);
      this.api.getMoviesWithRating(data).then(this.onMoviesLoaded).catch(this.onError);
    } else if (!query) {
      const data = this.api.fetchPopularMoviesAndRatingArrays(pageNumber);
      this.api.getMoviesWithRating(data).then(this.onMoviesLoaded).catch(this.onError);
    }
  };

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      errorInfo: info,
    });
  }

  componentDidMount() {
    this.api.createNewGuestSession();
    this.updateGenres();
    this.setState({
      loading: false,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.query !== prevState.query) {
      const { query, page } = this.state;
      this.updatePage(query, page);
    }
  }

  render() {
    if (this.state.hasError) {
      const { error, errorInfo } = this.state;
      return <AlertAlarm error={error} errorInfo={errorInfo ? errorInfo : null} />;
    }

    let { genres } = this.state;
    const rateMovie = this.api.rateMovie;
    const { moviesList, query, page, total_results, loading, vote_average, tab } = this.state;
    const debounced = debounce(this.handleChange, 500);

    return (
      <div className="wrapper">
        <section className="app">
          <header className="header">
            <Tabs centered defaultActiveKey="1" items={this.state.items} onChange={this.onTabChange} />
            {tab === 'search' ? <Search handleSubmit={this.handleSubmit} handleChange={debounced} /> : null}
          </header>
          <div className="CardList">
            <Context.Provider value={genres}>
              <MovieList
                moviesList={moviesList}
                query={query}
                page={page}
                loading={loading}
                updatePage={this.updatePage}
                rateMovie={rateMovie}
                vote_average={vote_average}
                tab={tab}
              />
            </Context.Provider>
          </div>

          <div className="footer-wrapper">
            <Footer query={query} page={page} total_results={total_results} updatePage={this.updatePage} />
          </div>
        </section>
      </div>
    );
  }
}
