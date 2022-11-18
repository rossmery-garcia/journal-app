import axios from 'axios'
import 'setimmediate';
import cloudinary from 'cloudinary'
import uploadImage from '@/modules/daybook/helpers/uploadImage'

cloudinary.config({
  cloud_name: process.env.VUE_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VUE_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.VUE_APP_CLOUDINARY_API_SECRET
})

describe('uploadImage method', () => {

  test('Should load a file and return the URL', async () => {

    const { data } = await axios.get(process.env.VUE_APP_URL_TEST_IMAGE, {
      responseType: 'arraybuffer'
    })

    const file = new File([ data ], 'image.jpg')
    const url = await uploadImage( file )

    expect( typeof url ).toBe('string')

    const segments = url.split('/')
    const imageId = segments[ segments.length - 1 ].replace('.jpg', '')

    await cloudinary.v2.api.delete_resources( imageId )
  }, 10000)
})

