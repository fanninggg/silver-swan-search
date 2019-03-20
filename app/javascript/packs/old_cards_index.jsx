import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

class CardsIndexComponent extends React.Component {
  constructor(props) {
    super(props);

    var cardsIndexElement = document.getElementById('variable-props-test')
    var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
    var authenticityToken =  cardsIndexElement.dataset.authenticitytoken
  }

  state = {
    view: true
  }

  toggleView = () => {
    this.setState({ view: !this.state.view})
  }

  makeSwitch() {
    return (
      <div >
        <p className="switch-tag">VIEW</p>
        <div className="switch-holder">

          <div className="switch-oval" onClick={this.toggleView} style={this.state.view ? {backgroundColor: '#6B2022'} : {backgroundColor: '#fff'}}>
            <div id="switch-circle" className="switch-circle" onClick={this.toggleView} style={this.state.view ? {right: '1px'} : {left: '1px'}} />
          </div>
        </div>
      </div>
    )
  }

  makeCards(props) {
    if(this.state.view == true) {
      var cards = this.makeTinderCards(props)
    } else {
      var cards = this.makeSmallCards(props)
    }
    return cards
  }


  makeTinderCards(props) {
    var cardArray = props.jobsProp.map(function(job) {
      return(
        <div className="job-index-tinder-card" key={job.id}>
          <img className="job-index-tinder-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
          <div className="job-index-tinder-info">
            <h1 className="title-text grey roboto bold">{job.title}</h1>
            <h2 className="title-text roboto regular">Le Manoir, Morzine</h2>
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
        </div>
      )
    })
    return cardArray
  }

  makeSmallCards(props) {
    var counter = 0
    var cardArray = props.jobsProp.map(function(job) {
      return(
        <div className="job-index-list-card-holder" key={job.id} id={counter +=1} >
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

  render() {
    console.log(this.props.img1)
    return(
      <div>
        {this.makeSwitch()}
        {this.makeCards(this.props)}
      </div>
    )
  }

}

export default CardsIndexComponent;

import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

class SwipeItem extends React.Component {
  constructor(props) {
    super(props);

    var cardsIndexElement = document.getElementById('variable-props-test')
    var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
    var authenticityToken =  cardsIndexElement.dataset.authenticitytoken
  }

  state = {
    // view: true,
    left: 0,
    originalOffset: 0,
    velocity: 0,
    timeOfLastDragEvent: 0,
    touchStartX: 0,
    prevTouchX: 0,
    beingTouched: false,
    // height: 0,
    intervalId: null
  }

  animateSlidingToZero() {
    let {left, velocity, beingTouched} = this.state;
    if (!beingTouched && left < -0.01) {
      velocity += 10 * 0.033;
      left += velocity;
      if (left < -350) {
        window.clearInterval(this.state.intervalId);
        // this.handleRemoveSelf();
      }
      this.setState({left, velocity});
    } else if (!beingTouched) {
      left = 0;
      velocity = 0;
      window.clearInterval(this.state.intervalId);
      this.setState({left, velocity, intervalId: null, originalOffset: 0});
    }
  }

  // handleRemoveSelf() {
  //   this.setState({height: 0});
  //   window.setTimeout(() => this.props.onRemoval(), 250);
  // }

  handleStart(clientX) {
    if (this.state.intervalId !== null) {
      window.clearInterval(this.state.intervalId);
    }
    this.setState({
      originalOffset: this.state.left,
      velocity: 0,
      timeOfLastDragEvent: Date.now(),
      touchStartX: clientX,
      beingTouched: true,
      intervalId: null
    });
  }

  handleMove(clientX) {
    if (this.state.beingTouched) {
      const touchX = clientX;
      const currTime = Date.now();
      const elapsed = currTime - this.state.timeOfLastDragEvent;
      const velocity = 20 * (touchX - this.state.prevTouchX) / elapsed;
      let deltaX = touchX - this.state.touchStartX + this.state.originalOffset;
      if (deltaX < -350) {
        // this.handleRemoveSelf();
      } else if (deltaX > 0) {
        deltaX = 0;
      }
      this.setState({
        left: deltaX,
        velocity,
        timeOfLastDragEvent: currTime,
        prevTouchX: touchX
      });
    }
  }

  handleEnd() {
    this.setState({
      velocity: this.state.velocity,
      touchStartX: 0,
      beingTouched: false,
      intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 33)
    });
  }

  handleTouchStart(touchStartEvent) {
    this.handleStart(touchStartEvent.targetTouches[0].clientX);
  }

  handleTouchMove(touchMoveEvent) {
    this.handleMove(touchMoveEvent.targetTouches[0].clientX);
  }

  handleTouchEnd() {
    this.handleEnd();
  }

  handleMouseDown(mouseDownEvent) {
    console.log(mouseDownEvent)
    this.handleStart(mouseDownEvent.clientX);
  }

  handleMouseMove(mouseMoveEvent) {
    console.log(mouseMoveEvent)
    this.handleMove(mouseMoveEvent.clientX);
  }

  handleMouseUp() {
    this.handleEnd();
  }

  handleMouseLeave() {
    this.handleMouseUp();
  }

  // toggleView = () => {
  //   this.setState({ view: !this.state.view})
  // }

  // makeSwitch() {
  //   return (
  //     <div >
  //       <p className="switch-tag">VIEW</p>
  //       <div className="switch-holder">

  //         <div className="switch-oval" onClick={this.toggleView} style={this.state.view ? {backgroundColor: '#6B2022'} : {backgroundColor: '#fff'}}>
  //           <div id="switch-circle" className="switch-circle" onClick={this.toggleView} style={this.state.view ? {right: '1px'} : {left: '1px'}} />
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // makeCards(props) {
  //   if(this.state.view == true) {
  //     var cards = this.makeTinderCards(props)
  //   } else {
  //     var cards = this.makeSmallCards(props)
  //   }
  //   return cards
  // }

  // makeTinderCards(props) {
  //   var context = this
  //   var cardArray = props.jobsProp.map(function(job) {
  //     return(
  //       <div
  //         className="job-index-tinder-card"
  //         key={job.id}
  //         // onTouchStart={touchStartEvent => context.handleTouchStart(touchStartEvent)}
  //         // onTouchMove={touchMoveEvent => context.handleTouchMove(touchMoveEvent)}
  //         // onTouchEnd={() => context.handleTouchEnd()}
  //         // onMouseDown={mouseDownEvent => context.handleMouseDown(mouseDownEvent)}
  //         // onMouseMove={mouseMoveEvent => context.handleMouseMove(mouseMoveEvent)}
  //         // onMouseUp={() => context.handleMouseUp()}
  //         // onMouseLeave={() => context.handleMouseLeave()}
  //       >
  //         <img className="job-index-tinder-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
  //         <div className="job-index-tinder-info">
  //           <h1 className="title-text grey roboto bold">{job.title}</h1>
  //           <h2 className="title-text roboto regular">Le Manoir, Morzine</h2>
  //           <div className="job-index-tinder-salary">
  //             <div className="salary-icon"></div>
  //             <p className="small-grey-text">£25,000 per annum</p>
  //           </div>
  //           <div className="job-index-tinder-buttons">
  //             <button onClick={
  //               () => {
  //                   axios.post(`/jobs/${job.id}/applications`, {},{ headers: { 'X-CSRF-Token': authenticityToken } })
  //                     .then(response => console.log(response.data.response))
  //                 }
  //               }
  //             >
  //               APPLY FOR AMAZING JOB
  //             </button>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   })
  //   return cardArray
  // }

  // makeSmallCards(props) {
  //   var counter = 0
  //   var cardArray = props.jobsProp.map(function(job) {
  //     return(
  //       <div className="job-index-list-card-holder" key={job.id} id={counter +=1} >
  //         <div className="job-index-list-card">
  //           <img className="job-index-list-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
  //           <div className="job-index-list-info">
  //             <h1 className="small-text roboto light-grey no-margin">{job.title}</h1>
  //             <h2 className="small-text roboto regular light-grey no-margin">Le Manoir, Morzine</h2>
  //             <p className="small-text grey no-margin">£25,000 p/a</p>
  //           </div>
  //           <div className="job-index-list-more-info">
  //             <p className="tiny-text grey underline no-margin">More info</p>
  //           </div>
  //         </div>
  //       </div>
  //     )
  //   })
  //   return cardArray
  // }

  render() {
    return (
      <li
        className="swipeItem"
        style={{height: this.state.height + 'px', transition: 'height 250ms ease-in-out'}}
        onTouchStart={touchStartEvent => this.handleTouchStart(touchStartEvent)}
        onTouchMove={touchMoveEvent => this.handleTouchMove(touchMoveEvent)}
        onTouchEnd={() => this.handleTouchEnd()}
        onMouseDown={mouseDownEvent => this.handleMouseDown(mouseDownEvent)}
        onMouseMove={mouseMoveEvent => this.handleMouseMove(mouseMoveEvent)}
        onMouseUp={() => this.handleMouseUp()}
        onMouseLeave={() => this.handleMouseLeave()}
      >
        <div
          className="job-index-tinder-card"
          key={this.props.jobsProp.id}
          style={{left: this.state.left + 'px'}}
        >
          <img className="job-index-tinder-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
          <div className="job-index-tinder-info">
            <h1 className="title-text grey roboto bold">{this.props.jobsProp.title}</h1>
            <h2 className="title-text roboto regular">Le Manoir, Morzine</h2>
            <div className="job-index-tinder-salary">
              <div className="salary-icon"></div>
              <p className="small-grey-text">£25,000 per annum</p>
            </div>
            <div className="job-index-tinder-buttons">
              <button onClick={
                () => {
                    axios.post(`/jobs/${this.props.jobsProp.id}/applications`, {},{ headers: { 'X-CSRF-Token': authenticityToken } })
                      .then(response => console.log(response.data.response))
                  }
                }
              >
                APPLY FOR AMAZING JOB
              </button>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

//   render() {
//     return(
//       <div>
//         {this.makeSwitch()}
//         {this.makeCards(this.props)}
//       </div>
//     )
//   }
// }

class CardList extends React.Component {
  constructor(props) {
    super(props)

    var cardsIndexElement = document.getElementById('variable-props-test')
    var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
    var authenticityToken =  cardsIndexElement.dataset.authenticitytoken

    this.state = {
      counter: 1,
    };
  }

  // removeItem(keyOfItemToRemove) {
  //   let nextItems = {};
  //   Object.keys(this.state.items).forEach(itemKey => {
  //     if (itemKey !== keyOfItemToRemove) {
  //       nextItems[itemKey] = this.state.items[itemKey];
  //     }
  //   });

  //   this.setState({items: nextItems});
  // }

  render() {
    var cardsIndexElement = document.getElementById('variable-props-test')
    var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
    var authenticityToken =  cardsIndexElement.dataset.authenticitytoken
    console.log(jobs)
    return (
      <ul className="swipeList">
        {jobs.map(job =>
          <SwipeItem jobsProp={jobs} key={`swipeItem-${job.id}`} >
          </SwipeItem>
        )}
      </ul>
    );
  }


}

export default CardList;



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

