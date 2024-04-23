import { StorageKey, storage } from "~storage"
import { getDailyReviewList } from "~utils/readwise"

async function refreshDailyReview() {
  const dailyReviewList = await getDailyReviewList()
  // Save the daily review list to storage
  await storage.set(StorageKey.DailyReview, dailyReviewList)
}

const alarmName = 'refreshDailyReview'

chrome.runtime.onInstalled.addListener(async () => {
  console.log('set alarm')
  await chrome.alarms.create(alarmName, { periodInMinutes: 60 })
})


chrome.alarms.onAlarm.addListener(async (alarm) => {
  if (alarm.name === alarmName) {
    await refreshDailyReview()
  }
})

storage.watch({
  [StorageKey.ReadwiseToken]: async () => {
    await refreshDailyReview()
  }
})
