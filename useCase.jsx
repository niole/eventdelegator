import React, {PropTypes} from 'react';
import { render } from 'react-dom';
import EventDelegator from './EventDelegator';

const { object } = PropTypes;

const containerPropTypes = {
  style: object
};

const containerDefaultProps = {
  style: {
    border: "1px black solid",
    height: 500,
    width: 500
  }
};

const littleContainerPropTypes = {
  style: object
};

const littleContainerDefaultProps = {
  style: {
    border: "1px red solid",
    height: 200,
    width: 200
  }
};

class LittleContainer extends React.Component {
  constructor() {
    super();
    this.backgrounds = ["whitesmoke", "purple", "orangered", "green"];
    this.state = this.getState();
  }

  componentDidMount() {
    const {
      addCallback,
      updateWhiteList
    } = this.props.delegator;

    addCallback("little-container", () => {
      if (this.state.background !== "white") {
        this.setState({ background: "white" });
      }
    });

    updateWhiteList("clicking-here-does-nothing");
  }

  componentWillUnmount() {
    this.props.delegator.unmountAll();
  }

  getState() {
    return { background: this.getRandomColor() };
  }

  getRandomColor() {
    return this.backgrounds[Math.floor(Math.random()*this.backgrounds.length)];
  }

  updateBackground() {
    this.setState(this.getState());
  }

  render() {
    const { style } = this.props;
    return (
      <div className="little-container" onClick={ this.updateBackground } style={ style }>
        <div className="clicking-here-does-nothing" style={{ background: "white", height: 50, width: 50 }}/>
      </div>
    );
  }
}

class Container extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { style } = this.props;

    return (
      <div style={ style }>
        <LittleContainer/>
      </div>
    );
  }
}

class Env extends React.Component {
  constructor() {
    super();
  }

  render() {
    const { style } = this.props;

    return (
      <EventDelegator>
        <Container/>
      </EventDelegator>
    );
  }
}

render(<Env/>, document.body);

Container.propTypes = containerPropTypes;
Container.defaultProps = containerDefaultProps

LittleContainer.propTypes = littleContainerPropTypes
LittleContainer.defaultProps = littleContainerDefaultProps;
