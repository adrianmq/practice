import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import ReduxCounter from '../components/Counter'
import { addOne, minusOne, minusOneAsync } from '../actions/ui'


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
