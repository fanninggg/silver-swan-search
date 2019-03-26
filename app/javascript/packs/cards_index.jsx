import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

class Switch extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div >
        <p className="switch-tag">VIEW</p>
        <div className="switch-holder">
          <div className="switch-oval" onClick={this.props.handleClick} style={this.props.viewProp ? {backgroundColor: '#6B2022'} : {backgroundColor: '#fff'}}>
            <div id="switch-circle" className="switch-circle" onClick={this.props.handleClick} style={this.props.viewProp ? {right: '1px'} : {left: '1px'}} />
          </div>
        </div>
      </div>
    )
  }
}

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
    triggered: false
  }

  animateSlidingToZero() {
    let {left, velocity, beingTouched, originalOffset, rotation} = this.state;
    if (!beingTouched && left < originalOffset) {
      console.log(originalOffset)
      velocity += 10 * 0.033;
      left += velocity;
      // left = 0
      rotation = left * 0.1;
      if (left < -300) {
        window.clearInterval(this.state.intervalId);
      }
      this.setState({left, velocity, rotation});
    // } else if (!beingTouched && left > originalOffset){
    //   // console.log(originalOffset)
    //   velocity += 10 * 0.033;
    //   left -= velocity;
    //   // left = 0;
    //   rotation = left * .05;
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
    // console.log(left, rotation)
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
      if (deltaX < -300 && !this.state.triggered) {
        this.setState({ triggered: true })

        // Ben this is the trigger point for Disliking a job
        axios.post(`/jobs/${this.props.jobsProp.id}/rejections`, {},{ headers: { 'X-CSRF-Token': this.props.authenticityTokenProp } })
          .then(response => console.log(response.data.response))
          .catch(err => console.log(err.response.data.response))

      } else if (deltaX > 300 && !this.state.triggered) {
        this.setState({ triggered: true })
        // Ben this is the trigger point for Liking a job
        axios.post(`/jobs/${this.props.jobsProp.id}/likes`, {},{ headers: { 'X-CSRF-Token': this.props.authenticityTokenProp } })
          .then(response => console.log(response.data.response))
          .catch(err => console.log(err.response.data.response))
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
    this.handleStart(mouseDownEvent.clientX);
  }

  handleMouseMove(mouseMoveEvent) {
    this.handleMove(mouseMoveEvent.clientX);
  }

  handleMouseUp() {
    this.handleEnd();
  }

  handleMouseLeave() {
    this.handleMouseUp();
  }

  like() {
    console.log("I am liked :)")
    axios.post(`/jobs/${this.props.jobsProp.id}/likes`, {},{ headers: { 'X-CSRF-Token': this.props.authenticityTokenProp } })
          .then(response => console.log(response.data.response))
          .catch(err => console.log(err.response.data.response))
  }

  dislike() {
    console.log("I am disliked :(")
    axios.post(`/jobs/${this.props.jobsProp.id}/rejections`, {},{ headers: { 'X-CSRF-Token': this.props.authenticityTokenProp } })
      .then(response => console.log(response.data.response))
      .catch(err => console.log(err.response.data.response))
  }

  render() {
    return (
      <li
        className="tinder-card"
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
          className="tinder-card-inner"
          key={this.props.jobsProp.id}
          style={{transform: `rotate(${this.state.rotation}deg)`, left: this.state.left + 'px'}}
        >
          <img className="tinder-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
          <div className="tinder-info">
            <h1 className="title-text grey roboto bold">{this.props.jobsProp.title}</h1>
            <h2 className="title-text roboto lighter">Le Manoir, Morzine</h2>
            <div className="tinder-salary">
              <div className="salary-icon"></div>
              <p className="small-grey-text">{this.props.jobsProp.salary} {this.props.jobsProp.salary_type}</p>
              <a href={`/jobs/${this.props.jobIdProp}`} className="grey underline more-info-link">More Information</a>
            </div>
            <div className="tinder-buttons">
              <a onClick={this.dislike.bind(this)}>
                <div className="dislike-button"></div>
              </a>
              <a className="silver-swan-buttonlink" onClick={
                () => {
                    axios.post(`/jobs/${this.props.jobsProp.id}/applications`, {},{ headers: { 'X-CSRF-Token': this.props.authenticityTokenProp } })
                      .then(response => console.log(response.data.response))
                      .catch(err => console.log(err.response.data.response))
                  }
                }
              >
                <div className="silver-swan-button small-silver-swan-button">Apply Now</div>
              </a>
              <a onClick={this.like.bind(this)}>
                <div className="like-button"></div>
              </a>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

class ListItem extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="list-card-holder" key={this.props.jobsProp.id} id={this.props.counterProp} >
        <div className="list-card">
          <img className="list-photo" src="https://images.pexels.com/photos/722681/white-snow-forest-winter-722681.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />
          <div className="list-info">
            <h1 className="small-text roboto light-grey no-margin">{this.props.jobsProp.title}</h1>
            <h2 className="small-text roboto lighter light-grey no-margin">Le Manoir, Morzine</h2>
            <p className="small-text grey no-margin">{this.props.jobsProp.salary} {this.props.jobsProp.salary_type}</p>
          </div>
          <div className="list-more-info">
            <a className="tiny-text grey underline no-margin" href={`/jobs/${this.props.jobIdProp}`}>More Information</a>
          </div>
        </div>
      </div>
    )
  }
}


class CardList extends React.Component {
  constructor(props) {
    super(props)
  }

  tinderOrList() {
    var cardsIndexElement = document.getElementById('variable-props-test')
    var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
    var authenticityToken =  cardsIndexElement.dataset.authenticitytoken
    if(jobs.length > 0 ) {
      if(this.props.viewProp) {
        return (
          <ul className="tinderCards">
            {jobs.map(job =>
              <SwipeItem jobsProp={job} key={`swipeItem-${job.id}`} jobIdProp={job.id} authenticityTokenProp={authenticityToken} >
              </SwipeItem>
            )}
          </ul>
        )
      } else {
      var counter = 0;
        return (
          <ul className="list-cards">
            {jobs.map(job =>
              <ListItem jobsProp={job} key={`swipeItem-${job.id}`} counterProp={counter +=1} jobIdProp={job.id} authenticityTokenProp={authenticityToken}>
              </ListItem>
            )}
          </ul>
        )
      }
    } else {
      return (
        <div className="no-jobs-container">
          <div className="quarter-screen grey-background">
            <h5 className="maroon bold">There are no more jobs which match your criteria</h5>
          </div>
          <div className="quarter-screen">
            <div>
              <p className="grey small-text">To see more results, please edit your filters,</p>
              <img src="/assets/images/filters2.png" alt=""/>
            </div>
          </div>
          <div className="quarter-screen grey-background">
            <div>
              <p className="grey small-text">refresh your results,</p>
              <img src="/assets/images/refresh.png" alt=""/>
            </div>
          </div>
          <div className="quarter-screen">
            <div>
              <p className="grey small-text">or see a random job</p>
              <img src="/assets/images/shuffle.png" alt=""/>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    return (
      <div>
        {this.tinderOrList()}
      </div>
    );
  }
}


class CardIndex extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    view: true
  }

  toggleView = () => {
    this.setState({ view: !this.state.view})
  }

  swicthOrNah() {
    var cardsIndexElement = document.getElementById('variable-props-test')
    var jobs = JSON.parse(cardsIndexElement.dataset.jobs);
    if(jobs.length > 0 ) {
      return(
        <Switch handleClick={this.toggleView.bind(this)} viewProp={this.state.view}/>
      )
    }
  }

  render() {
    return(
      <div>
        {this.swicthOrNah()}
        <CardList viewProp={this.state.view} />
      </div>
    )
  }
}

export default CardIndex;
