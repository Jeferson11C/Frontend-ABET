'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Select, Button, LoadingDialog } from '@/shared/components/ui'
import { LoginPayload } from '@/shared/types'
import { loginMock } from '@/modules/auth/services'

const schoolOptions = [
  { id: 'EISCC', label: 'ESCUELA DE INGENIERÍA DE SOFTWARE Y CIENCIAS DE LA COMPUTACIÓN' },
  { id: 'EISCB', label: 'ESCUELA DE INGENIERÍA DE SISTEMAS Y CIBER SEGURIDAD' },
  { id: 'INGGMI', label: 'ESCUELA DE INGENIERÍA DE GESTIÓN MINERA' },
  { id: 'INGGEM', label: 'ESCUELA DE INGENIERÍA DE GESTIÓN EMPRESARIAL' },
  { id: 'ESCEL', label: 'ESCUELA DE INGENIERÍA ELECTRONICA, MECATRONICA Y REDES' },
  { id: 'INGAMB', label: 'ESCUELA DE INGENIERÍA AMBIENTAL' },
  { id: 'INGBIO', label: 'ESCUELA DE INGENIERÍA BIOMEDICA' },
  { id: 'INGCIV', label: 'ESCUELA DE INGENIERÍA CIVIL' },
  { id: 'INGIND', label: 'ESCUELA DE INGENIERÍA INDUSTRIAL' },
]

export default function LoginForm() {
  const [escuela, setEscuela] = useState('')
  const [codigo, setCodigo] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setError(null)

    if (!escuela || !codigo || !password) {
      setError('Todos los campos son obligatorios')
      return
    }

    const payload: LoginPayload = { escuela, codigo, password }
    setLoading(true)
    try {
      const res = await loginMock(payload)
      localStorage.setItem('bearerToken', JSON.stringify(res.accessToken))
      localStorage.setItem('token', JSON.stringify(res.user))
      localStorage.setItem('escuela', JSON.stringify(escuela))
      router.push('/')
      // aquí podrías setear auth en contexto si existe
    } catch (err: any) {
      setError(err?.message || 'Error durante el login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        {error && <div className="text-sm text-red-600">{error}</div>}

        <div>
          <Select
            name="escuela"
            value={escuela ? { label: escuela, value: escuela } : null}
            onChange={(_, v) => setEscuela((v as any)?.value || '')}
            options={schoolOptions}
            placeholder="Selecciona escuela"
          />
        </div>

        <div>
          <Input id="codigo" value={codigo} onChange={(e: any) => setCodigo(e.target.value)} placeholder="Usuario" />
        </div>

        <div>
          <Input id="password" type="password" value={password} onChange={(e: any) => setPassword(e.target.value)} placeholder="Contraseña" />
        </div>
      </div>

      <div className="flex items-center">
        <label className="flex items-center text-sm">
          <input type="checkbox" className="mr-2" /> Recuerdame
        </label>
      </div>

      <div className="space-y-3">
        <Button type="submit" className="w-full">Iniciar sesión</Button>
        <div className="text-center">
          <a href="#" className="text-sm text-red-600">¿Olvidaste la contraseña?</a>
        </div>
      </div>

      {loading && <LoadingDialog isOpen={loading} label="Iniciando sesión..." />}
    </form>
  )
}
