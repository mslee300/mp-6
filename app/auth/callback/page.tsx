'use client'
import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

type Profile = {
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  id: string
}

export default function CallbackPage() {
  const params = useSearchParams()
  const code = params.get('code')
  const [profile, setProfile] = useState<Profile | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!code) {
      setError('No code in URL')
      return
    }
    // call your JSON-returning API route:
    fetch(`/api/auth/google/callback?code=${code}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) setError(JSON.stringify(data))
        else setProfile(data)
      })
      .catch((e) => setError(e.message))
  }, [code])

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>
  if (!profile) return <div className="p-4">Loading…</div>

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Your Information</h2>
        <div className="flex items-center">
          <img
            src={profile.picture}
            alt={profile.name}
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <p className="font-bold text-lg">{profile.name}</p>
            <p className="font-mono">@{profile.id}</p>
            <p className="text-gray-700">{profile.email}</p>
            <p className="mt-2 text-sm text-gray-500">Signed in with: Google</p>
          </div>
        </div>
        <a
          href="/"
          className="mt-6 inline-block px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
        >
          Sign out
        </a>
      </div>
    </div>
  )
}
