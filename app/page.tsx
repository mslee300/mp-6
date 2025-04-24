export default function Home() {
  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center">
        <h1 className="text-2xl font-bold mb-1">OAuth Demo</h1>
        <p className="text-gray-600 mb-6">Sign in with Google</p>
        <a
          href="/api/auth/google"
          className="block w-full py-3 bg-teal-500 hover:bg-teal-600 text-white font-medium rounded-lg transition"
        >
          Sign in with Google
        </a>
      </div>
    </div>
  );
}
