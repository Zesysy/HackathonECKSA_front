import React, { Component } from 'react';
import { Card, ListGroup, Row } from 'react-bootstrap';

import { connect } from 'react-redux';

import { fetchMatches } from '../Actions/matchesAction';
import MatchDual from './MatchDualComponent';

import styles from './MatchDualComponent.module.css';

class MatchesContainer extends Component {
  componentDidMount() {
    this.props.fetchMatches();
  }
  render() {
    const { error, isLoading, data } = this.props;
    if (error) {
      return <div>Error! {error.message}</div>;
    } else if (isLoading) {
      return <div>Loading ...</div>;
    } else {
      return (
        <>
          <Row>
            <Card bg="light" className="col-5 m-3">
              <Card.Body className={styles.titleColumn}>Domicile</Card.Body>
            </Card>
            <Card bg="light" className="col-5 m-3">
              <Card.Body className={styles.titleColumn}>Visiteur</Card.Body>
            </Card>
          </Row>
          <div>
            {data.map((result, index) => {
              return <MatchDual {...result} key={index} />;
            })}
          </div>
        </>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.fetchReducer.data,
    loading: state.fetchReducer.isLoading,
    error: state.fetchReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMatches: () => {
      dispatch(fetchMatches());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MatchesContainer);
