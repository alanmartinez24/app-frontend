import React from 'react'
import PropTypes from 'prop-types'
import { AdvancedImage, lazyload, responsive, placeholder } from '@cloudinary/react'
import { format, quality } from '@cloudinary/base/actions/delivery'
import { auto } from '@cloudinary/base/qualifiers/format'
import { auto as qAuto } from '@cloudinary/base/qualifiers/quality'
import cld from '../../utils/cloudinary'
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary'

const CldImg = ({ postid, src, ...restProps }) => {
  const img = cld.image(postid)
  img.delivery(format(auto())).delivery(quality(qAuto()))

  return (
    <ErrorBoundary>
      <AdvancedImage cldImg={img}
        plugins={[lazyload(), responsive(400), placeholder()]}
        {...restProps}
      />
    </ErrorBoundary>
  )
}

CldImg.propTypes = {
  postid: PropTypes.string,
  src: PropTypes.string
}

export default CldImg
