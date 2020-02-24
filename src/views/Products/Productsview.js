import React, { Component } from 'react'
import Products from '../Products/Products'
import Product from '../Products/Product'
import { Switch, Route } from "react-router-dom";

export default class Productsview extends Component {
  render() {
    return (
      <div>
         <React.Fragment>
        <Switch>
          <Route exact path='/products' render={(props)=> <Products {...props} />} />
          <Route  path='/products/:id' render={(props)=> <Product {...props} />} />  
        </Switch>
      </React.Fragment>
      </div>
    )
  }
}
