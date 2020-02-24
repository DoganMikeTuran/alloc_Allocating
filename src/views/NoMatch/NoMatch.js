import React, { Component } from 'react'
import apiFacade from "../../auth/apiFacade";
export default class NoMatch extends Component {
    constructor(props){
        super(props)
    }

    componentDidMount(){
        if (apiFacade.isAuthenticated() === false) this.props.history.push('/login')
        console.log("404")
    }


  render() {
    return (
      <div>
        404
      </div>
    )
  }
}
