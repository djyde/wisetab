import { Storage } from "@plasmohq/storage";

export const storage = new Storage({
  area: 'local'
})

export enum StorageKey {
  ReadwiseToken = 'readwise_token',
  DailyReview = 'daily_review',
  ReviewCursor = 'review_cursor',
}