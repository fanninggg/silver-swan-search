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
    rotation: 0,
    left: 0,
    originalOffset: 0,
    velocity: 0,
    timeOfLastDragEvent: 0,
    touchStartX: 0,
    prevTouchX: 0,
    beingTouched: false,
    intervalId: null,
  }

  animateSlidingToZero() {
    let {left, velocity, beingTouched, originalOffset, rotation} = this.state;
    if (!beingTouched && left <= originalOffset) {
      velocity += 10 * 0.033;
      left += velocity;
      rotation += left * 360;
      if (left < -300) {
        window.clearInterval(this.state.intervalId);
      }
      this.setState({left, velocity, rotation});
    // } else if (!beingTouched && left >= originalOffset){
    //   // velocity += 10 * 0.033;
    //   left -= velocity;
    //   rotation = 0;
    //   if (left > 350) {
    //     window.clearInterval(this.state.intervalId);
    //   }
    //   this.setState({left, velocity, rotation});
    } else if (!beingTouched) {
      velocity += 10 * 0.033;
      left = 0;
      window.clearInterval(this.state.intervalId);
      this.setState({left, velocity, intervalId: null, originalOffset: 0});
    }
    console.log(left, rotation)
  }

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
      if (deltaX < -300) {

        // Ben this is the trigger point for Disliking a job
        console.log('Ben this is the trigger point for Disliking a job')

      } else if (deltaX > 300) {

        // Ben this is the trigger point for Liking a job
        console.log('Ben this is the trigger point for Liking a job')

      }
      this.setState({
        left: deltaX,
        rotation: deltaX * 0.10,
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
      intervalId: window.setInterval(this.animateSlidingToZero.bind(this), 15)
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

  render() {
    return (
      <li
        className="swipeItem"
        style={{transition: 'height 250ms ease-in-out'}}
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
          style={{transform: `rotate(${this.state.rotation}deg)`, left: this.state.left + 'px'}}
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

  render() {
    var cardsIndexElement = document.getElementById('variable-props-test')
    var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
    var authenticityToken =  cardsIndexElement.dataset.authenticitytoken
    return (
      <ul className="swipeList">
        {jobs.map(job =>
          <SwipeItem jobsProp={job} key={`swipeItem-${job.id}`} >
          </SwipeItem>
        )}
      </ul>
    );
  }
}

export default CardList;
