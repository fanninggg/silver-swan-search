
import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const Hello = props => (
  <div>Hello {props.name}! I am a test component, do I work?</div>
)

var homeReact = document.getElementById('home-react')

if (homeReact) {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <Hello name="React" />,
      homeReact.appendChild(document.createElement('div')),
    )
  })
}
