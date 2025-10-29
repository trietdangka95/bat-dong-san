"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Có lỗi xảy ra
              </h1>
              <p className="text-gray-600 mb-6">
                Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.
              </p>
              <button
                onClick={reset}
                className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Thử lại
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}

