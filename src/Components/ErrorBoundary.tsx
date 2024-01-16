import { Flex, Result } from "antd";
import React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  // You can define additional props if needed
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Flex vertical justify="center" align="center">
          <Result
            status="500"
            title="Something went wrong."
            subTitle="Please try again later."
          />
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
