const ErrorBanner = ({ error }) => {
  if (!error) return null

  return (
    <div className="error-banner" style={{
      backgroundColor: '#FEE2E2',
      color: '#DC2626',
      padding: '10px',
      textAlign: 'center',
      borderBottom: '1px solid #FCA5A5'
    }}>
      {error}
    </div>
  )
}

export default ErrorBanner
