'use client'

import React, { Component, ErrorInfo, ReactNode } from 'react'

interface Props {
    children?: ReactNode
    fallback?: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return this.props.fallback || (
                <div className="h-[400px] w-full bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
                    <div className="text-center p-6">
                        <p className="text-gray-500 font-bold mb-2">Something went wrong loading the map.</p>
                        <button
                            onClick={() => this.setState({ hasError: false })}
                            className="text-sm text-danholt-gold hover:underline"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}

export default ErrorBoundary
