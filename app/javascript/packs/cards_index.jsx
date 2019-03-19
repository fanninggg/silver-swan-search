import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

const CardsIndexComponent = props => (
  console.log(props.jobsProp),
  <div className="job-index-container">
    <div className="job-index-tinder-card">
      <img className="job-index-tinder-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
      <div className="job-index-tinder-info">
        <h1 className="job-index-tinder-title grey roboto bold">Chalet Host</h1>
        <h2 className="job-index-tinder-location roboto regular">Le Manoir, Morzine</h2>
        <div className="job-index-tinder-salary">
          <div className="salary-icon"></div>
          <p className="small-grey-text">£25,000 per annum</p>
        </div>
        <div className="job-index-tinder-more-info">
          <div className="more-info-icon"></div>
          <p className="small-grey-text underline">More information</p>
        </div>
      </div>
      <div className="job-index-tinder-buttons">
      </div>
    </div>
  </div>
)

  var cardsIndexElement = document.getElementById('variable-props-test')
  var jobs = JSON.parse(cardsIndexElement.dataset.jobs);

if (cardsIndexElement) {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <CardsIndexComponent jobsProp={jobs}/>,
      cardsIndexElement.appendChild(document.createElement('div')),
    )
  })
}
