import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const SSButton = props => (
  <a href={props.linkTarget} className="silver-swan-button">{props.linkText}</a>
)

var buttonElement = document.getElementById('silver-swan-button')

if (buttonElement) {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <SSButton linkTarget={buttonElement.dataset.linktarget} linkText={buttonElement.dataset.linktext} />,
      buttonElement.appendChild(document.createElement('div')),
    )
  })
}
