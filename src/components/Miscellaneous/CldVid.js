import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { CloudinaryContext, Transformation, Video } from 'cloudinary-react'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const ROOT_CLOUDINARY_URL = `https://res.cloudinary.com/yup-io/video/upload/`

const CldVid = ({ postid, src, ...restProps }) => {
  const isUploadedToCloud = src.startsWith(ROOT_CLOUDINARY_URL)
  return (
    <ErrorBoundary>
      <CloudinaryContext cloudName={process.env.CLOUDINARY_NAME}>
        <Video publicId={isUploadedToCloud ? postid : src}
          type={isUploadedToCloud ? undefined : 'fetch'}
          secure='true'
          controls='false'
          loop='true'
          dpr='auto'
          responsive
          autoplay='true'
          muted='true'
          width='auto'
          {...restProps}
        >
          <Transformation quality='auto'
            fetchFormat='auto'
          />
        </Video>
      </CloudinaryContext>
    </ErrorBoundary>
  )
}

CldVid.propTypes = {
  postid: PropTypes.string,
  src: PropTypes.string
}

export default memo(CldVid)
