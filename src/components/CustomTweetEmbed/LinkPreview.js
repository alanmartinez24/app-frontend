import React from 'react'
import PropTypes from 'prop-types'

const LinkPreview = ({ description, image, title, url, caption, classes, size }) => {
 const cutEnd = (str) => {
  let newString = ''
  let lastFour = []
  let count = 0
  for (let i = 0; i < str.length - 3; i++) {
     let f = str[i]
     let s = str[i + 1]
     let t = str[i + 2]
     let fourth = str[i + 3]

     if (count === 4) {
       count = 0
       lastFour = []
     } else {
       lastFour[0] = f
        lastFour[1] = s
        lastFour[2] = t
        lastFour[3] = fourth
        if (
            (lastFour[0] === '.') && (lastFour[1] === 'c') && (lastFour[2] === 'o') && (lastFour[3] === 'm')
            ) {
          return `${newString}.com`
        }
        count += 1
     }
      newString += str[i]
    }
  }

  const cutHttp = (str = '') => {
    let parsed
    if (str && str.includes(`http:`)) {
        const re = /http:\/\//
        parsed = str.replace(re, '')
        return parsed
    } else if (str && str.includes(`https:`)) {
        const re = /https:\/\//
        parsed = str.replace(re, '')
        return parsed
    }
  }

  const trimUrl = (str) => {
    let first
    let second
    if (str.length > 0) {
      first = cutEnd(str)
      second = cutHttp(first)
    }

    return second
  }

  return (
    <div className={size === 'large' ? classes.LinkPreviewMainLarge : classes.LinkPreviewMain}>
      <a className={classes.LinkPreviewAnchor}
        href={url}
        target='_blank'
      >
        <div className={classes.LinkPreviewImageContainer}>
          <img className={size === 'large' ? classes.LinkPreviewImageLarge : classes.LinkPreviewImage}
            src={image}
            alt=''
          />
        </div>
      </a>
      <a className={classes.LinkPreviewAnchor}
        href={url}
        target='_blank'
      >
        <div className={size === 'large' ? classes.LinkPreviewContentLarge : classes.LinkPreviewContent}>
          <div className={classes.LinkPreviewTitle}>{title}</div>
          <div className={classes.LinkPreviewText}>{`${description && description.substring(0, 50)}...` || `${caption && caption.substring(0, 50)}...`} </div>
          <div className={classes.LinkPreviewURL}>{url && trimUrl(url)}</div>
        </div>
      </a>
    </div>
  )
}

LinkPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  caption: PropTypes.string,
  title: PropTypes.string
}

export default LinkPreview
