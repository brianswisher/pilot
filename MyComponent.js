'use strict';

var React = require('react');

var Redux = require('redux');

const { createStore } = Redux;

var styles = require('./MyComponent.css');

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }

  if (action.type === 'INCREMENT') {
    return state + 1;
  } else if (action.type === 'DECREMENT') {
    return state - 1;
  } else {
    return state;
  }
}

var CounterComponent = React.createClass({
  render: function(){
    return (
      <div>
        <h2>{this.props.value}</h2>
        <button onClick={this.props.onIncrement}>+</button>
        <button onClick={this.props.onDecrement}>-</button>
      </div>
    );
  }
});

var Root = React.createClass({
  componentWillMount: function(){
    this.setState({
      count: 0,
      store: createStore(counter)
    });
  },

  componentDidMount: function(){
    this.state.store.subscribe(this.update);
    this.update();
  },

  update: function(){
    this.setState({
      count: this.state.store.getState()
    });
  },

  handleIncrement: function(){
    this.state.store.dispatch({ type: 'INCREMENT' });
  },

  handleDecrement: function(){
    this.state.store.dispatch({ type: 'DECREMENT' });
  },

  render: function() {
    return (
      <div>
        <h1>CounterComponent (Redux)</h1>
        <CounterComponent
          value={this.state.store.getState()}
          onIncrement={this.handleIncrement}
          onDecrement={this.handleDecrement}
        />
      </div>
    );
  },
});

module.exports = Root;
