import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReduxCounter from '../components/ReduxCounter'
import { ADD_ONE, MINUS_ONE } from '../actions/type'
import { addOne, minusOne, minusOneAsync } from '../actions'


class ReduxCounterContainer extends React.Component {
  render() {
    return (
      <ReduxCounter {...this.props} />
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter
})

const mapDispatchToProps = (dispatch) => {
  return {
    // addOne: () => dispatch({ type: ADD_ONE }),
    addOne: () => dispatch(addOne),
    // minusOne: () => dispatch(minusOne)
    minusOne: () => minusOneAsync(dispatch)
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReduxCounterContainer))
