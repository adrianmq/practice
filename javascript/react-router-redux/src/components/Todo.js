import React from 'react'
import PropTypes from 'prop-types'


const todoStyle = {
  cursor: 'pointer',
  fontSize: '1.5rem',
  textDecoration: 'completed',
  height: '50px',
  color: 'blue'
}

const Todo = ({ onClick, index, completed, text }) => {
  const appliedStyle = completed
    ? todoStyle
    : Object.assign({}, todoStyle, { color: 'red', textDecoration: 'none' })
  return (
    <li
      onClick={onClick}
      style={appliedStyle}
      index={index}
    >
      {text}
    </li>
  )
}

Todo.propTypes = {
  onClick: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired
}

export default Todo