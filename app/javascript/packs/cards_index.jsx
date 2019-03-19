import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

var cardsIndexElement = document.getElementById('variable-props-test')
var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
var authenticityToken =  cardsIndexElement.dataset.authenticitytoken

function makeCards(props) {
  if(1 == 1) {
    var cards = makeTinderCards(props)
  } else {
    var cards = makeSmallCards(props)
  }
  return cards
}

function makeTinderCards(props) {
  var cardArray = props.jobsProp.map(function(job) {
    return(
      <div className="job-index-tinder-card" key={job.id}>
        <img className="job-index-tinder-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
        <div className="job-index-tinder-info">
          <h1 className="job-index-tinder-title grey roboto bold">{job.title}</h1>
          <h2 className="job-index-tinder-location roboto regular">Le Manoir, Morzine</h2>
          <div className="job-index-tinder-salary">
            <div className="salary-icon"></div>
            <p className="small-grey-text">£25,000 per annum</p>
          </div>
          <div className="job-index-tinder-buttons">
            <button onClick={
              () => {
                  axios.post(`/jobs/${job.id}/applications`, {},{ headers: { 'X-CSRF-Token': authenticityToken } })
                    .then(response => console.log(response.data.response))
                }
              }
            >
              APPLY FOR AMAZING JOB
            </button>
          </div>
        </div>
        <div className="job-index-tinder-buttons">
        </div>
        </div>
    )
  })
  return cardArray
}

function makeSmallCards(props) {
  var cardArray = props.jobsProp.map(function(job) {
    return(
      <div className="job-index-list-card-holder" key={job.id}>
        <div className="job-index-list-card">
          <img className="job-index-list-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
          <div className="job-index-list-info">
            <h1 className="small-text roboto light-grey no-margin">{job.title}</h1>
            <h2 className="small-text roboto regular light-grey no-margin">Le Manoir, Morzine</h2>
            <p className="small-text grey no-margin">£25,000 p/a</p>
          </div>
          <div className="job-index-list-more-info">
            <p className="tiny-text grey underline no-margin">More info</p>
          </div>
        </div>
      </div>
    )
  })
  return cardArray
}

const CardsIndexComponent = props => (
  makeCards(props)
)

if (cardsIndexElement) {
  document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      <CardsIndexComponent jobsProp={jobs}/>,
      cardsIndexElement.appendChild(document.createElement('div')),
    )
  })
}
