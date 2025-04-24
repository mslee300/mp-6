// Force dynamic so Next.js doesn’t try to prerender and balk at client hooks
export const dynamic = 'force-dynamic';

import CallbackClient from './CallbackClient'

export default function CallbackPage() {
  return <CallbackClient />
}
