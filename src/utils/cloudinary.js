import { Cloudinary } from '@cloudinary/base'

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.CLOUDINARY_NAME
  }
})

export default cld
