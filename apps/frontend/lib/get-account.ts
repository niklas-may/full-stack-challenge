import axios from 'axios'

export const getAccount = (accountId: string) => {
  return axios.get(`http://localhost:4000/accounts/${accountId}`)
}
