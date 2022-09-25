import { Button } from "components/Elements/Button";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter as Router } from "react-router-dom";

const ErrorFallback = () => {
  return (
    <div className="error-fallback" role="alert">
      <h2 className="error-fallback__title">Ooops, something went wrong :( </h2>
      <Button
        className="error-fallback__button"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Router>{children}</Router>
      </ErrorBoundary>
    </React.Suspense>
  );
};
