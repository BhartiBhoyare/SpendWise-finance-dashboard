export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-[90%] max-w-sm shadow-lg">

        <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
          Delete Transaction
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mb-5">
          Are you sure you want to delete this transaction?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
          >
            Delete
          </button>
        </div>

      </div>
    </div>
  );
}