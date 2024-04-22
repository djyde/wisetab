import { StorageKey, storage } from "~storage"
import { getDailyReviewList } from "~utils/readwise"

async function refreshDailyReview() {
  const dailyReviewList = await getDailyReviewList()
  // Save the daily review list to storage
  await storage.set(StorageKey.DailyReview, dailyReviewList)
}

async function main() {
  await refreshDailyReview()
  setInterval(async () => {
    await refreshDailyReview()
  }, 1000 * 60 * 60 * 1)
}

storage.watch({
  [StorageKey.ReadwiseToken]: async () => {
    await refreshDailyReview()
  }
})

main()