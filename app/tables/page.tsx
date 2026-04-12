'use client'
import { useState, useMemo } from 'react'
import { Card, Input, Select, Button, DataTable } from '@/shared/components/ui'
import { PlusIcon } from '@heroicons/react/24/outline'
import { columns } from './columns'

export default function TablesPage() {
    const [search, setSearch] = useState('')
    const [categoria, setCategoria] = useState('')

    const allData = [
        { id: 1, nombre: 'Juan Pérez', curso: 'Matemática', nota: 15, aprobado: true, fecha: '10/03/2026' },
        { id: 2, nombre: 'María López', curso: 'Comunicación', nota: 11, aprobado: true, fecha: '12/03/2026' },
        { id: 3, nombre: 'Carlos Ramos', curso: 'Historia', nota: 9, aprobado: false, fecha: '15/03/2026' },
        { id: 4, nombre: 'Ana Torres', curso: 'Matemática', nota: 18, aprobado: true, fecha: '18/03/2026' },
        { id: 5, nombre: 'Luis García', curso: 'Comunicación', nota: 7, aprobado: false, fecha: '20/03/2026' }
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
                    <PlusIcon className="h-5 w-5"/> Nuevo
                </Button>
            </div>

            <Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <Input
                        label="Filtro rápido"
                        placeholder="Buscar por ID o Nombre..."
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Select
                        label="Categoría"
                        placeholder="Todos los cursos"
                        options={[
                            { label: 'Matemática', value: 'Matemática' },
                            { label: 'Comunicación', value: 'Comunicación' },
                            { label: 'Historia', value: 'Historia' }
                        ]}
                        onChange={(e) => setCategoria(e.target.value)}
                    />
                </div>

                {/* Llamamos al motor con el diseño que pediste */}
                <DataTable
                    columns={columns}
                    data={filteredData}
                    pageSize={5}
                />
            </Card>
        </div>
    )
}