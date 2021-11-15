import React from 'react'
import PropTypes from 'prop-types'

const LinkPreview = ({ description, image, title, url, caption, classes, size }) => {
  const getDomain = (str) => {
      let a = document.createElement('a')
      a.href = str
      return a.hostname
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
            alt={description}
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
          <div className={classes.LinkPreviewURL}>{url && getDomain(url)}</div>
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
  title: PropTypes.string,
  size: PropTypes.string,
  url: PropTypes.string
}

export default LinkPreview
