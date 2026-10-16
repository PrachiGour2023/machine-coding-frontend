import React from "react";

interface ErrorState {
    hasError: boolean;
    errorMsg: string;
}

interface ErrorProp {
    children: React.ReactNode
}

export class ErrorBoundary extends React.Component<ErrorProp, ErrorState> {
    state: ErrorState = {
        hasError: false,
        errorMsg: ''
    }

    static getDerivedStateFromError(error: any): ErrorState {
        return { hasError: true, errorMsg: error.message };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.error("Error catched in Error Boundary", error, errorInfo);
    }

    render(): React.ReactNode {
        if (this.state.hasError) {
            return <h2>Somethis went wrong</h2>
        }
        return this.props.children
    }
}