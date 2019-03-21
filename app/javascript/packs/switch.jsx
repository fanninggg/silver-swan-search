import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Switch extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    view: true
  }

  toggleView = () => {
    this.setState({ view: !this.state.view})
  }

  render() {
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
}

export default Switch;





