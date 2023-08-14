import React, { Component } from 'react';
import { Pagination } from 'antd';

import './footer.css';

export default class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  // переключение страниц
  handlePaginationOnChange = (paginationPageNumber) => {
    const { updatePage, query } = this.props;
    updatePage(query, paginationPageNumber);
  };

  render() {
    const { page, total_results } = this.props;
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return (
      <div className="footer-wrapper">
        <Pagination
          defaultCurrent={1}
          total={total_results > 3000 ? 3000 : total_results}
          current={page}
          pageSize={6}
          onChange={this.handlePaginationOnChange}
          showSizeChanger={false}
          hideOnSinglePage={true}
        />
      </div>
    );
  }
}
