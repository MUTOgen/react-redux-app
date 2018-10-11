import React, { Component } from 'react'
import baffle from 'baffle'

export default class Home extends Component {
  componentDidMount() {
    let b = baffle('.home-phrase', {
      characters: '█▓▒░█▓▒░█▓▒░<>/',
      speed: 20,
    }).start()
    b.reveal(5000)
  }

  render() {
    return <div className="home-phrase">Hello world! This is Homepage</div>
  }
}
