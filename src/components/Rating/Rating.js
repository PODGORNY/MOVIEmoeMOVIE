import { Component } from 'react';
import { Rate } from 'antd';

export default class Rating extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      rating: this.props.rating,
      rating_state: 0,
    };
  }

  onRatingChange = (e) => {
    const { id, rateMovie } = this.props;
    rateMovie(id, e);
    this.setState(() => {
      return {
        rating_state: e,
      };
    });
  };

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    const { rating } = this.props;
    const { rating_state } = this.state;

    return (
      <Rate
        allowHalf
        count={10}
        onChange={this.onRatingChange}
        value={rating_state ? rating_state : rating}
        allowClear={false}
      />
    );
  }
}
