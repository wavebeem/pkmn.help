import { ReactNode, Component } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
  render: (error: Error) => ReactNode;
}

interface ErrorBoundaryState {
  error?: Error;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {};
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render(): ReactNode {
    if (this.state.error) {
      return this.props.render(this.state.error);
    }
    return this.props.children;
  }
}
