import Loading from "../components/Loading"
import ErrorBoundary from "../components/ErrorBoundary"

function Sales() {

  const loading = false
  const error = false

  if (loading) return <Loading />
  if (error) return <ErrorBoundary />

  return (
    <div>
      <h1>Sales Page</h1>
    </div>
  )
}

export default Sales