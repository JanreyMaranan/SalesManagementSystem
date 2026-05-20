function DeleteSaleDialog({ sale, onClose }) {
  const handleConfirm = () => {
    alert(`Transaction ${sale.transNo} soft-deleted! (will connect to Supabase later)`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">

        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mx-auto mb-4">
          <span className="text-red-600 text-2xl">⚠️</span>
        </div>

        {/* Message */}
        <h3 className="text-lg font-bold text-gray-700 text-center mb-2">Confirm Delete</h3>
        <p className="text-sm text-gray-500 text-center mb-6">
          Are you sure you want to delete transaction{' '}
          <span className="font-semibold text-blue-600">{sale.transNo}</span>?
          <br />
          All its line items will also be deleted.
        </p>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-300 text-gray-600 hover:bg-gray-50 font-medium py-2 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
          >
            Yes, Delete
          </button>
        </div>

      </div>
    </div>
  )
}

export default DeleteSaleDialog