import React, { PropTypes } from 'react';

const Rating = React.createClass({
  propTypes: {
    onClick: PropTypes.func,
    className: PropTypes.string,
    star: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  },

  getInitialState() {
    return {
      star: this.props.star || null,
      tempStar: null,
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({ star: nextProps.star });
  },

  handleClick(e, rating) {
    e.preventDefault();

    const ratingVal = rating + 1;

    if (this.props.onClick) {
      this.props.onClick(ratingVal);
    }

    this.setState({
      star: rating,
      tempStar: rating,
    });
  },

  starOver(e, rating) {
    this.state.tempStar = this.state.star;
    this.state.star = rating;

    this.setState({
      star: this.state.star,
      tempStar: this.state.tempStar,
    });
  },

  starOut() {
    this.state.star = this.state.tempStar;

    this.setState({ star: this.state.star });
  },

  render() {
    const stars = [];

    for (let i = 0; i < 5; i += 1) {
      let starClass = 'star-rating__star';

      if (this.state.star >= i && this.state.star !== null) {
        starClass += ' is-selected';
      }

      stars.push(
        <button
          key={i}
          className={starClass}
          onClick={e => this.handleClick(e, i)}
          onMouseOver={e => this.starOver(e, i)}
          onMouseOut={this.starOut}
        >
          ★
        </button>,
      );
    }

    return (
      <div className={this.props.className || ''}>
        {stars}
      </div>
    );
  },
});

export default Rating;
