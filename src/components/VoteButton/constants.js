export const dislikeRatingConversion = {
  1: 2,
  2: 1
}

export const likeRatingConversion = {
  1: 3,
  2: 4,
  3: 5
}

export const labels = {
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5'
}

export const quantileToRating = {
  first: 5,
  second: 4,
  third: 3,
  fourth: 2,
  fifth: 1
}

export const ratingToQuantile = {
  5: 'first',
  4: 'second',
  3: 'third',
  2: 'fourth',
  1: 'fifth'
}

const ICONS = process.env.ICONS.split(',')

export const CAT_ICONS = {
  popularity: ICONS[0],
  intelligence: ICONS[1],
  funny: ICONS[2],
  useful: ICONS[3],
  knowledgeable: ICONS[4],
  interesting: ICONS[5],
  expensive: ICONS[6],
  engaging: ICONS[7],
  easy: ICONS[8],
  chill: ICONS[9],
  beautiful: ICONS[10],
  affordable: ICONS[11],
  trustworthy: ICONS[12],
  wouldelect: ICONS[13],
  agreewith: ICONS[14],
  original: ICONS[15],
  fire: ICONS[16]
}

export const ratingConversion = {
  1: 2,
  2: 1,
  3: 1,
  4: 2,
  5: 3
}

export const DEFAULT_WAIT_AND_RETRY = [
  250,
  250,
  250,
  250,
  250,
  300,
  350,
  400,
  400,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500,
  500
]

export const CREATE_VOTE_LIMIT = 20

export const CAT_DESC = {
  easy:
    'Easy: can do well without extra effort; generous grading, minimal time',
  interesting: 'Interesting: compelling subject matter, makes you think',
  useful: 'Useful: has important knowledge for your field/career',
  knowledgeable:
    "Knowledgeable: knows what they're talking about, expert in subject",
  engaging:
    'Engaging: captures your attention, makes concepts easy to understand',
  chill: 'Chill: cool, laidback, a vibe',
  popularity: 'like',
  intelligence: 'smart',
  trustworthy: 'most trustworthy',
  wouldelect: 'most electable',
  agreewith: 'most agreed with',
  fire: 'Fire: really good, amazing'
}
