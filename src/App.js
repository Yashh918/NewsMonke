import React, { Component } from 'react'

export default class App extends Component {
  name = 'yashh';
  render() {
    return (
      <div>
        Hello my first class based component! 
        <br />
        made by {this.name}
      </div>
    )
  }
}


