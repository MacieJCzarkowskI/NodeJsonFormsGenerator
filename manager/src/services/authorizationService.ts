import { User } from '@src/services/_api.types'

export interface Credentials {
  username: string
  password: string
}

export const authorizationService = {
  // TODO rxjs/ajax? axios?
  async login(credentials: Credentials): Promise<User> {
    return fetch('https://exampleApi/login/', {
      method: 'post',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json()
        }
        throw Error('Error')
      })
      .then((res) => res.data)
      .catch((error) => {
        throw error
      })
  },
}
