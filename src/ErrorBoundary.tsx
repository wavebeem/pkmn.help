import * as React from "react";

interface ErrorBoundaryProps {
  render: (error: Error) => React.ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
}

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
