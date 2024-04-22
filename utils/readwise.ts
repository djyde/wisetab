import { StorageKey, storage } from "~storage"

export type DailyReview = {
  review_id: number,
  review_url: string,
  review_completed: boolean,
  highlights: {
    text: string,
    title: string,
    author: string,
    url: string,
    source_type: string,
    note: string,
    highlighted_at: string,
    image_url: string
    id: number
  }[]
}

export async function getDailyReviewList() {
  const token = await storage.get(StorageKey.ReadwiseToken)

  if (!token) {
    return null
  }

  const response = await fetch("https://readwise.io/api/v2/review/", {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`
    }
  })

  if (response.status === 401) {
    return null
  }

  const json = await response.json()
  return json as DailyReview
}