import React from 'react'
import PropTypes from 'prop-types'

const LinkPreview = ({ description, image, title, url, caption, classes, size }) => {
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
