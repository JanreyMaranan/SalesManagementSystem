function LoadingSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden animate-pulse">
      <div className="px-4 py-3 space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-200 rounded w-full" />
        ))}
      </div>
    </div>
  )
}

export default LoadingSkeleton