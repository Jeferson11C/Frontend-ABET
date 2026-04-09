'use client'
import { useState } from 'react'
import { Card, Input, Select, Button } from '@/shared/components/ui'
import { Table } from '@/shared/components/ui/Table'
import { PlusIcon } from '@heroicons/react/24/outline'

export default function TablesPage() {

    const [search, setSearch] = useState('')
    const [categoria, setCategoria] = useState('')

    const columns = [
        { title: 'ID', data: 'id', width: '80px' },
        { title: 'Alumno', data: 'nombre' },
        { title: 'Curso', data: 'curso' },
        { title: 'Nota', data: 'nota', align: 'center' },
        {
            title: 'Aprobado',
            data: 'aprobado',
            align: 'center'
        },
        {
            title: 'Fecha',
            data: 'fecha'
        }
    ]

    const allData = [
        { id: 1, nombre: 'Juan Pérez', curso: 'Matemática', nota: 15, aprobado: true, fecha: new Date(2026, 2, 10) },
        { id: 2, nombre: 'María López', curso: 'Comunicación', nota: 11, aprobado: true, fecha: new Date(2026, 2, 12) },
        { id: 3, nombre: 'Carlos Ramos', curso: 'Historia', nota: 9, aprobado: false, fecha: new Date(2026, 2, 15) },
        { id: 4, nombre: 'Ana Torres', curso: 'Matemática', nota: 18, aprobado: true, fecha: new Date(2026, 2, 18) },
        { id: 5, nombre: 'Luis García', curso: 'Comunicación', nota: 7, aprobado: false, fecha: new Date(2026, 2, 20) }
    ]

    const filteredData = allData.filter((item) => {
        const matchSearch =
            item.nombre.toLowerCase().includes(search.toLowerCase()) ||
            item.id.toString().includes(search)

        const matchCategoria =
            !categoria || item.curso === categoria

        return matchSearch && matchCategoria
    })

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-zinc-900">Registros</h1>
                <Button className="bg-red-600 flex gap-2">
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

                <Table
                    title="Listado de alumnos"
                    columns={columns}
                    data={filteredData}
                    searchable={false}
                />
            </Card>
        </div>
    )
}