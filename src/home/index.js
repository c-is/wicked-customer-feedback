import React, { PropTypes } from 'react';
import update from 'react-addons-update';
import cx from 'classnames';

import Chart from '../../components/Chart';
import Rating from '../../components/Rating';
import Header from '../../components/Header';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import Layout from '../../components/Layout';
import s from './styles.css';

import SvgComment from '../../svg/comment.svg';

class HomePage extends React.Component {

  static propTypes = {
    data: PropTypes.shape({
      ratings: PropTypes.arrayOf(PropTypes.object).isRequired,
    }),
  };

  state = {
    data: this.props.data.ratings.reverse(),
    name: { val: '' },
    email: { val: '' },
    comment: { val: '' },
    rating: { val: null },
  }

  addValue(e, tar) {
    const newVal = e.target.value;
    const obj = {
      val: newVal,
      valid: 'is-valid',
    };

    this.setState({ [tar]: obj });
  }

  addRatingValue(ratingVal) {
    this.setState({
      rating: {
        val: ratingVal,
        valid: 'is-valid',
      },
    });
  }

  clearFormData() {
    return {
      name: { val: '' },
      email: { val: '' },
      comment: { val: '' },
      rating: { val: null },
    };
  }

  formSubmit(e) {
    e.preventDefault();

    const { name, email, comment, rating } = this.state;
    const array = { name, email, comment, rating };
    const emailValid = email.val.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);

    for (const key in array) {
      if (key === 'email' && !emailValid) {
        this.setState({
          email: update(this.state.email, { valid: { $set: 'is-invalid' } }),
        });

        return false;
      }

      if (!array[key].valid) {
        this.setState({
          [key]: update(this.state[key], { valid: { $set: 'is-invalid' } }),
        });

        return false;
      }
    }

    const newData = {
      name: name.val,
      email: email.val,
      comment: comment.val,
      rating: rating.val,
    };

    this.setState({
      ...this.clearFormData(),
      data: update(this.state.data, { $unshift: [newData] }),
    });

    return true;
  }

  render() {
    const ratingData = this.state.data;

    return (
      <Layout className={s.content}>
        <main className={s.main} id="main" role="main">
          <article className={s.content} id="content">
            <form className={s.form}>
              <h5 className={s.formTitle}>Rate now!</h5>

              <div className={s.formInputContainer}>
                <input
                  className={cx(
                    s.formInput,
                    (this.state.name.valid === 'is-invalid' ? `${s.formInputInvalid}` : ''),
                  )}
                  type="text"
                  value={this.state.name.val}
                  placeholder="Name"
                  onChange={e => this.addValue(e, 'name')}
                />
              </div>

              <div className={s.formInputContainer}>
                <input
                  className={cx(
                    s.formInput,
                    (this.state.email.valid === 'is-invalid' ? `${s.formInputInvalid}` : ''),
                  )}
                  type="Email"
                  value={this.state.email.val}
                  placeholder="Email"
                  onChange={e => this.addValue(e, 'email')}
                />
              </div>

              <div className={s.formInputContainer}>
                <textarea
                  className={cx(
                    s.formTextarea,
                    (this.state.comment.valid === 'is-invalid' ? `${s.formTextareaInvalid}` : ''),
                  )}
                  value={this.state.comment.val}
                  placeholder="Your comment"
                  onChange={e => this.addValue(e, 'comment')}
                />
              </div>

              <div className={cx(s.formInputContainer, s.formInputContainerRating)}>
                <span className={s.formRatingHead}>Rating</span>

                <Rating
                  className={s.formRating}
                  star={(this.state.rating.val) ? this.state.rating.val - 1 : null}
                  onClick={e => this.addRatingValue(e)}
                />
              </div>

              <div className={s.formButtonContainer}>
                <button className={s.buttonSubmit} onClick={e => this.formSubmit(e)}>Submit</button>
              </div>
            </form>

            <div className={s.data}>
              <Header />

              <div className={s.dataGraphContainer}>
                <Chart datasets={ratingData} />
              </div>

              <div className={s.dataCommentContainer}>
                <h5 className={s.dataCommentTitle}>
                  <i
                    className={cx(s.icon, s.iconComment)}
                    style={{ backgroundImage: `url(${SvgComment})` }}
                  />
                  Comments
                </h5>

                <div className={s.dataCommentList}>
                  {ratingData.map(el =>
                    <div className={s.dataCommentItem} key={el.name}>
                      <p className={s.dataComment}>{el.comment}</p>
                      <p className={s.dataName}>- {el.name}</p>
                    </div>,
                  )}
                </div>
              </div>
            </div>
          </article>
        </main>
      </Layout>
    );
  }

}

export default HomePage;
