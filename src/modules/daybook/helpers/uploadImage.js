import cloudinaryApi from '@/api/cloudinaryApi'

const uploadImage = async (file) => {

  if( !file ) return

  try {
    const formData = new FormData()
    formData.append('upload_preset', process.env.VUE_APP_CLOUDINARY_UPLOAD_PRESET)
    formData.append('file', file)

    const { data } = await cloudinaryApi.post('/image/upload', formData)

    return data.secure_url

  } catch (error) {
    console.log('Error al cargar la imagen', error)
    return null
  }
}

export default uploadImage