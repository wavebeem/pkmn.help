import * as React from "react";

type ErrorBoundaryProps = {
  render: (error: Error) => React.ReactNode;
};

type ErrorBoundaryState = {
  error?: Error;
};

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static displayName = "ErrorBoundary";
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return this.props.render(this.state.error);
    }
    return this.props.children;
  }
}
