function AuthCallbackPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center gap-4">
      
      {/* Spinner */}
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      
      {/* Message */}
      <p className="text-gray-600 text-sm font-medium">Signing you in, please wait...</p>
      
    </div>
  )
}

export default AuthCallbackPage