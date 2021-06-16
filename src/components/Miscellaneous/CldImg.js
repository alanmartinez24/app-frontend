import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { Image, CloudinaryContext, Transformation, Placeholder } from 'cloudinary-react'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const ROOT_CLOUDINARY_URL = `https://res.cloudinary.com/yup-io/image/upload/`

const CldImg = ({ postid, src, ...restProps }) => {
  const isUploadedToCloud = src.startsWith(ROOT_CLOUDINARY_URL)
  console.log(`isUploadedToCloud`, isUploadedToCloud)
  return (
    <ErrorBoundary>
      <CloudinaryContext cloudName={process.env.CLOUDINARY_NAME}>
        <Image publicId={isUploadedToCloud ? postid : src}
          type={isUploadedToCloud ? 'upload' : 'fetch'}
          secure='true'
          loading='lazy'
          dpr='auto'
          responsive
          width='auto'
          {...restProps}
        >
          <Placeholder type='vectorize' />
          <Transformation quality='auto'
            fetchFormat='auto'
          />
        </Image>
      </CloudinaryContext>
    </ErrorBoundary>
  )
}

CldImg.propTypes = {
  postid: PropTypes.string,
  src: PropTypes.string
}

export default memo(CldImg)
