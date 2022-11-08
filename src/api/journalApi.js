import axios from 'axios'

const journalApi = axios.create({
  baseURL: process.env.VUE_APP_FIREBASE_API_BASE_URL,
})

export default journalApi