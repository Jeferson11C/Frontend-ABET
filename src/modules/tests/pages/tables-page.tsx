'use client'

import { useMemo, useState } from 'react'
import { Card, DataTable } from '@/shared/components'
import { PlusIcon } from '@heroicons/react/24/outline'
import { columns, type Alumno } from '@/modules/tests/components'

export default function TablesPage() {
  const [categoria, setCategoria] = useState('')

  const handleNew = () => {}

  const allData = [
    { id: 1, nombre: 'Juan Perez', curso: 'Matematica', nota: 15, aprobado: true, fecha: '10/03/2026' },
    { id: 2, nombre: 'Maria Lopez', curso: 'Comunicacion', nota: 11, aprobado: true, fecha: '12/03/2026' },
    { id: 3, nombre: 'Carlos Ramos', curso: 'Historia', nota: 9, aprobado: false, fecha: '15/03/2026' },
    { id: 4, nombre: 'Ana Torres', curso: 'Matematica', nota: 18, aprobado: true, fecha: '18/03/2026' },
    { id: 5, nombre: 'Luis Garcia', curso: 'Comunicacion', nota: 7, aprobado: false, fecha: '20/03/2026' }
  ]

  const filteredData = useMemo(() => {
    return allData.filter((item) => {
      const matchCategoria = !categoria || item.curso === categoria
      return matchCategoria
    })
  }, [categoria])

  return (
    <div className="space-y-6">

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        </div>

        <DataTable<Alumno>
          columns={columns}
          data={filteredData as Alumno[]}
          pageSize={5}
          searchPlaceholder="Buscar por ID, alumno o curso..."
          actions={[
            {
              label: 'Nuevo',
              onClick: handleNew,
              icon: <PlusIcon className="h-4 w-4" />,
              buttonProps: {
                className: 'bg-red-600 text-white hover:bg-red-700 h-10 px-4',
              },
            },
          ]}
        />
      </Card>
    </div>
  )
}
