import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import "bootstrap";
import "./test_react";
import "./silver_swan_button";
import "./switch";
import '../components/age_slider'

// ********************Tinder Cards*******************************************************

import CardIndex from "./cards_index";

var cardsIndexElement = document.getElementById('variable-props-test')
var jobs = JSON.parse(cardsIndexElement.dataset.jobs);


if (cardsIndexElement) {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <CardIndex />,
      cardsIndexElement.appendChild(document.createElement('div')),
    )
  })
}

// ********************Switch*******************************************************

// import Switch from "./switch";

// var switchId = document.getElementById('switch')

// if (switchId) {
//   document.addEventListener('DOMContentLoaded', () => {
//     ReactDOM.render(
//       <Switch />,
//       switchId.appendChild(document.createElement('div')),
//     )
//   })
// }

// ************************Old Cards Index Component*************************************


// import CardsIndexComponent from "./cards_index";

// var cardsIndexElement = document.getElementById('variable-props-test')
// var jobs = JSON.parse(cardsIndexElement.dataset.jobs);


// if (cardsIndexElement) {
//   document.addEventListener('DOMContentLoaded', () => {
//     ReactDOM.render(
//       <CardsIndexComponent jobsProp={jobs} />,
//       cardsIndexElement.appendChild(document.createElement('div')),
//     )
//   })
// }
