import React from 'react';

class EventDelegator extends React.Component {
  constructor() {
    super();

    this.DOMControlledCallbacks = [];
    this.watching = [];
    this.whiteList = [];
  }

  unmountAll() {
    this.DOMControlledCallbacks = [];
    this.watching = [];
    this.whiteList = [];
  }

  callAllExcept(that = "") {
    this.watching.forEach(cb => {
      if (that !== cb.className) {
        cb.f()
      }
    });
  }

  updateWhiteList(className) {
    if (this.whiteList.indexOf(className) === -1) {
      this.whiteList.push(className);
    }
  }

  addCallback(className, callback) {
    if (this.watching.indexOf(className) === -1) {
      this.DOMControlledCallbacks.push({
        f: callback,
        className
      });

      this.watching.push(className);
    }
  }

  topLevelListener(event) {
    event.preventDefault();

    const { className } = event.target;
    const isWatched = this.watching.some(cls => cls.indexOf(className) > -1 || className.indexOf(cls));
    if (typeof className === "string" && !!isWatched && this.whiteList.indexOf(className) === -1) {
      this.callAllExcept(isWatched);
    } else {
      this.callAllExcept();
    }
  }

  getApi() {
    return {
      unmountAll: this.unmountAll
      addCallback: this.addCallback,
      updateWhiteList: this.updateWhiteList
    };
  }

  render() {
    return <div onClick={ this.topLevelListener }>
      { React.Children.Map(this.props.children, child => {
        //pass api in as props however you do that
        child.props.delegator = this.getApi();
        return child;
      }}

    </div>;
  }
}

export default EventDelegator;
