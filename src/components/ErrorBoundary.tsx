import React from 'react';

type ErrorBoundaryState = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<React.PropsWithChildren, ErrorBoundaryState> {
  constructor(props: React.PropsWithChildren) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    const message = error instanceof Error ? error.message : 'Error inesperado';
    return { hasError: true, message };
  }

  componentDidCatch(error: unknown, info: unknown) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary atrapó un error', error, info);
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div style={{ color: '#fff', background: '#000', minHeight: '100vh', padding: '2rem' }}>
          <h2>Algo salió mal</h2>
          <p style={{ opacity: 0.85 }}>Por favor recarga la página. Detalle: {this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}


