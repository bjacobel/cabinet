import React, { Component } from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import StaticRouter from 'react-router/StaticRouter';

export default class UniversalRouter extends Component {
  render() {
    const { path } = this.props;

    if (typeof global.document === 'undefined') {
      return (
        <StaticRouter location={path} context={{}}>
          {this.props.children}
        </StaticRouter>
      );
    } else {
      return <BrowserRouter>{this.props.children}</BrowserRouter>;
    }
  }
}
