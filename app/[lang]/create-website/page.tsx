// English version of lag-nettside page
// This is the same content but with English URL slug

import { redirect } from 'next/navigation'

export default async function CreateWebsitePage({ params }: { params: { lang: string } }) {
  // Redirect to the existing lag-nettside page
  // This ensures we don't duplicate content while supporting English URLs
  redirect(`/${params.lang}/lag-nettside`)
}