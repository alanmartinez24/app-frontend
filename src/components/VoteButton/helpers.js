import { dislikeRatingConversion, likeRatingConversion } from './constants'

export const convertRating = (like, rating) =>
  like ? likeRatingConversion[rating] : dislikeRatingConversion[rating]
