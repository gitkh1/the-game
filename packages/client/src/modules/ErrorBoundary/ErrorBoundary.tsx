import { Component, ErrorInfo, PropsWithChildren } from "react";
import { ErrorPage } from "../../pages/ErrorPage";

type T_State = {
  hasError: boolean;
}

export class ErrorBoundary extends Component<PropsWithChildren, T_State> {
  constructor(props: PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
