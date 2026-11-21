import { Component, type ErrorInfo, type ReactNode } from 'react';

export interface ModelErrorBoundaryProps {
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  children: ReactNode;
}

interface ModelErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * ModelErrorBoundary — Catches 3D model asset fetch or parse failures
 * Prevents a single missing or broken asset from crashing the React Three Fiber Canvas.
 */
export class ModelErrorBoundary extends Component<
  ModelErrorBoundaryProps,
  ModelErrorBoundaryState
> {
  public override state: ModelErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): ModelErrorBoundaryState {
    return { hasError: true, error };
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.warn(`[ModelLoader] Failed to load 3D asset:`, error.message);
    this.props.onError?.(error, errorInfo);
  }

  public override render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }
    return this.props.children;
  }
}
