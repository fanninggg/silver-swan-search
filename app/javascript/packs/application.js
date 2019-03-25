import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
// import "bootstrap";
import "./test_react";
import "./silver_swan_button";
import '../components/age_slider'

// ********************Tinder Cards*******************************************************

import CardIndex from "./cards_index";

var cardsIndexElement = document.getElementById('variable-props-test')

if (cardsIndexElement) {
  var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <CardIndex />,
      cardsIndexElement.appendChild(document.createElement('div')),
    )
  })
}


