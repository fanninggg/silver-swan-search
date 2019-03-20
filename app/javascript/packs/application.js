import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import "bootstrap";
import "./test_react";
import "./home_react";
import "./silver_swan_button";
import '../components/age_slider'

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

// ********************Tinder Cards*******************************************************

import CardList from "./cards_index";

var cardsIndexElement = document.getElementById('variable-props-test')
var jobs = JSON.parse(cardsIndexElement.dataset.jobs);


if (cardsIndexElement) {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <CardList />,
      cardsIndexElement.appendChild(document.createElement('div')),
    )
  })
}
