"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Badge } from "@/shared/components/ui/Badge"
import { Button } from "@/shared/components/ui/Button"
import { PencilIcon, EyeIcon } from "lucide-react"

export type Alumno = {
    id: number
    nombre: string
    curso: string
    nota: number
    aprobado: boolean
    fecha: string
}

export const columns: ColumnDef<Alumno>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "nombre",
        header: "ALUMNO",
    },
    {
        accessorKey: "curso",
        header: "CURSO",
    },
    {
        accessorKey: "nota",
        header: "NOTA",
        cell: ({ row }) => <span className="font-bold text-red-900">{row.original.nota}</span>
    },
    {
        accessorKey: "aprobado",
        header: "ESTADO",
        cell: ({ row }) => {
            const aprobado = row.original.aprobado
            return (
                <Badge variant={aprobado ? "success" : "danger"}>
                    {aprobado ? "APROBADO" : "DESAPROBADO"}
                </Badge>
            )
        }
    },

    {
        accessorKey: "fecha",
        header: "FECHA",
    },
    {
        id: "actions",
        header: "ACCIONES",
        cell: ({ row }) => (
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-900 hover:text-red-600">
                    <EyeIcon className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-900 hover:text-red-600">
                    <PencilIcon className="h-4 w-4" />
                </Button>
            </div>
        )
    }
]