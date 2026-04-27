'use client'

import { useState, useMemo } from 'react'
import { Card, Input, Select, Button, DataTable } from '@/shared/components/ui'
import { PlusIcon } from '@heroicons/react/24/outline'
import { columns, type Alumno } from '@/modules/tests/components'

export default function TablesPage() {
  const [search, setSearch] = useState('')
  const [categoria, setCategoria] = useState('')

  const allData = [
    { id: 1, nombre: 'Juan Perez', curso: 'Matematica', nota: 15, aprobado: true, fecha: '10/03/2026' },
    { id: 2, nombre: 'Maria Lopez', curso: 'Comunicacion', nota: 11, aprobado: true, fecha: '12/03/2026' },
    { id: 3, nombre: 'Carlos Ramos', curso: 'Historia', nota: 9, aprobado: false, fecha: '15/03/2026' },
    { id: 4, nombre: 'Ana Torres', curso: 'Matematica', nota: 18, aprobado: true, fecha: '18/03/2026' },
    { id: 5, nombre: 'Luis Garcia', curso: 'Comunicacion', nota: 7, aprobado: false, fecha: '20/03/2026' }
  ]

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchSearch =
        item.nombre.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toString().includes(search)
      const matchCategoria = !categoria || item.curso === categoria
      return matchSearch && matchCategoria
    })
  }, [search, categoria])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-zinc-900">Registros</h1>
        <Button className="bg-red-600 flex gap-2 font-bold">
          <PlusIcon className="h-5 w-5" /> Nuevo
        </Button>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Input
            placeholder="Buscar por ID o Nombre..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select
            placeholder="Todos los cursos"
            options={[
              { label: 'Matematica', value: 'Matematica' },
              { label: 'Comunicacion', value: 'Comunicacion' },
              { label: 'Historia', value: 'Historia' }
            ]}
            onChange={(_, selected) => {
              const selectedValue = Array.isArray(selected) ? '' : selected?.value
              setCategoria(selectedValue ? String(selectedValue) : '')
            }}
          />
        </div>

        <DataTable<Alumno> columns={columns} data={filteredData as Alumno[]} pageSize={5} />
      </Card>
    </div>
  )
}
