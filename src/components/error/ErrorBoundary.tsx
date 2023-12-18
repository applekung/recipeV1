import React, { Component, ErrorInfo, ReactElement } from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component<{ children: ReactElement }> {
  state = { hasError: false, error: null }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('에러 발생', error, info)
  }

  render() {
    if (this.state.hasError && this.state.error) {
      return (
        <h2>
          {this.state.error.toString()}
          잠시 후 다시 시도해주세요.
          <Link to="/">
            <div className="w-100 h-50 text-blue-500 text-lg font-bold">
              홈으로 이동하기
            </div>
          </Link>
        </h2>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
