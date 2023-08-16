import React from 'react';
import PropTypes from 'prop-types';
import './RateCircle.css';

function RateCircle({ percent }) {
  const color = () => {
    const className = 'rate-circle';
    if (percent < 3) return `${className} ${className}__red`;
    if (percent < 5) return `${className} ${className}__orange`;
    if (percent < 7) return `${className} ${className}__yellow`;
    return `${className} ${className}__green`;
  };

  return (
    <div className={color()}>
      <span>{percent.toFixed(1)}</span>
    </div>
  );
}

export default RateCircle;

RateCircle.propTypes = {
  percent: PropTypes.number.isRequired,
};
