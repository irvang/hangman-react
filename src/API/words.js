import axios from 'axios'
import { endpoints } from './endpoints'

export const words = {
  getWord: async ({ minLength, maxLength }) =>
    axios.get(`${endpoints.words}/${minLength}/${maxLength}`),

  compareLetter: async ({ letter }) => axios.post(endpoints.words, { letter }),
  // metadata: async () => axios.get(`${endpoints.word}/metadata`) // unused at the moment
}
