import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("UI error boundary caught:", error);
  }

  handleRetry = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6">
          <div className="surface-card p-8 max-w-md w-full text-center">
            <p className="text-xs uppercase tracking-[0.16em] text-red-300 mb-2">Something went wrong</p>
            <h2 className="text-2xl font-bold text-white mb-3">Unable to render this screen</h2>
            <p className="text-sm text-slate-300 mb-6">
              Try reloading this section. If this persists, contact your administrator.
            </p>
            <button
              type="button"
              className="px-5 py-2.5 rounded-xl bg-blue-500/20 border border-blue-400/40 text-blue-200 hover:bg-blue-500/30 transition-colors"
              onClick={this.handleRetry}
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
