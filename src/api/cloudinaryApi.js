import axios from 'axios'

const cloudinaryApi = axios.create({
  baseURL: `${ process.env.VUE_APP_CLOUDINARY_API_BASE_URL }/${ process.env.VUE_APP_CLOUDINARY_CLOUD_NAME }`,
})

export default cloudinaryApi