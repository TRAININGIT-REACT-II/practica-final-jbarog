import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      error: false
    };
  }

  static getDerivedStateFromError() {
    return {
      error: true
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  onClick() {
    this.props.onReset();
    this.setState({ error: false });
  }

  render() {
    if (this.state.error === true) {
      return (
        <section>
          <h1>{this.props.message}</h1>
          <button onClick={this.onClick}>Try again</button>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
