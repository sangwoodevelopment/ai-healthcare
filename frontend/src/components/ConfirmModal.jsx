function ConfirmModal({
                          open,
                          title,
                          message,
                          onConfirm,
                          onCancel,
                      }) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl w-[400px] p-6">

                <h2 className="text-xl font-bold mb-3">
                    {title}
                </h2>

                <p className="text-slate-600 mb-8">
                    {message}
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        onClick={onCancel}
                        className="px-5 py-2 rounded-xl border hover:bg-slate-100"
                    >
                        취소
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600"
                    >
                        삭제
                    </button>

                </div>
            </div>
        </div>
    );
}

export default ConfirmModal;