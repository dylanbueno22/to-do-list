const LoadingSpinner = ({ message = 'Carregando...' }) => {
  return (
    <div className="loading-container" style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      fontSize: '18px',
      color: '#6B7280'
    }}>
      {message}
    </div>
  )
}

export default LoadingSpinner
