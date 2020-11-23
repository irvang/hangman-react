import axios from 'axios'
import { endpoints } from './endpoints'

export const word = {
  getWord: async ({ minLength, maxLength }) =>
    axios.get(`${endpoints.word}/${minLength}/${maxLength}`),
  compareLetter: async ({ letter }) => axios.post(`/api/word`, { letter })
}
