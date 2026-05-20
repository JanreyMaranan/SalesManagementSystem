import { useEffect } from 'react'

function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  const colors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
    info: 'bg-blue-600',
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${colors[type]} text-white text-sm font-medium px-5 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-bounce`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white font-bold text-lg leading-none">×</button>
    </div>
  )
}

export default Toast