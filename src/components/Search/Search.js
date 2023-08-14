import { Component } from 'react';
import { Input } from 'antd';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  render() {
    const { handleSubmit, handleChange } = this.props;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="input-wrapper">
        <form onSubmit={handleSubmit}>
          <Input placeholder="Type to search" onChange={handleChange} />
        </form>
      </div>
    );
  }
}

Search.propTypes = {};

Search.defaultProps = {};
