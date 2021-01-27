import * as React from "react";
import useRollbar from "./hooks/useRollbar.js";

export default class ErrorBoundary extends React.Component {
  state = {
    rollbar: useRollbar(),
  };

  componentDidCatch(error) {
    // You can also log the error to an error reporting service
    this.state.rollbar.critical(error);
  }

  render() {
    return this.props.children;
  }
}
