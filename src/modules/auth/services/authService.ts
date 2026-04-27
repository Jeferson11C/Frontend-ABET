import type { LoginPayload } from '@/shared/types'

const fakeToken = 'eyJhbGciOiFAKE_TOKEN'

export const loginMock = (payload: LoginPayload): Promise<{ accessToken: string; user: any }> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const isDemo = payload.codigo === 'demo' && payload.password === 'demo'
      const isTemporary = payload.codigo === 'Admi' && payload.password === 'abet123'

      if (isDemo || isTemporary) {
        resolve({
          accessToken: fakeToken,
          user: { sub: payload.codigo, name: 'Usuario Demo', college: payload.escuela },
        })
      } else {
        reject(new Error('Credenciales inválidas'))
      }
    }, 700)
  })
}
