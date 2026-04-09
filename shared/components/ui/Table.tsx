'use client'

import React, { memo, useState } from 'react'
import { format } from 'date-fns'

type Column = {
    title: string
    data?: string
    width?: string
    align?: 'left' | 'center' | 'right'
    render?: (value: any, row: any) => React.ReactNode
}

type TableProps = {
    title?: string
    columns: Column[]
    data: any[]
    loading?: boolean
    searchable?: boolean
    onSearch?: (value: string) => void
    pagination?: boolean
    currentPage?: number
    totalPages?: number
    onNextPage?: () => void
    onPrevPage?: () => void
}

const Table = memo(({
                        title,
                        columns,
                        data,
                        loading = false,
                        searchable = false,
                        onSearch,
                        pagination = false,
                        currentPage = 1,
                        totalPages = 1,
                        onNextPage,
                        onPrevPage,
                    }: TableProps) => {

    const [search, setSearch] = useState('')

    const getValue = (row: any, key?: string) => {
        if (!key) return ''
        return row[key] ?? '-'
    }

    return (
        // CAMBIO: Fondo blanco, bordes zinc-200 y sombra suave
        <div className="bg-white border border-zinc-200 rounded-xl shadow-sm overflow-hidden">

            {/* HEADER */}
            {(title || searchable) && (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 p-5 border-b border-zinc-100">
                    {title && (
                        <h2 className="text-lg font-bold text-zinc-800">
                            {title}
                        </h2>
                    )}

                    {searchable && (
                        <input
                            type="text"
                            placeholder="Buscar registro..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value)
                                onSearch?.(e.target.value)
                            }}
                            // CAMBIO: Input claro con borde gris
                            className="px-3 py-2 rounded-lg bg-zinc-50 text-zinc-900 border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm"
                        />
                    )}
                </div>
            )}

            {/* TABLE */}
            <div className="overflow-auto">
                <table className="w-full text-sm text-left border-collapse">
                    {/* CAMBIO: Encabezado gris muy claro con texto zinc-500 */}
                    <thead className="bg-zinc-50/50 border-b border-zinc-200 text-zinc-500 uppercase text-[11px] font-bold">
                    <tr>
                        {columns.map((col, i) => (
                            <th
                                key={i}
                                className={`px-6 py-4 ${col.align === 'center' ? 'text-center' : col.align === 'right' ? 'text-right' : 'text-left'}`}
                                style={{ width: col.width }}
                            >
                                {col.title}
                            </th>
                        ))}
                    </tr>
                    </thead>

                    {/* CAMBIO: Divisiones entre filas zinc-100 */}
                    <tbody className="divide-y divide-zinc-100">
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-10 text-zinc-400">
                                Cargando información...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className="text-center py-10 text-zinc-400 font-medium">
                                No se encontraron registros
                            </td>
                        </tr>
                    ) : (
                        data.map((row, ri) => (
                            // CAMBIO: Hover suave en zinc-50
                            <tr key={ri} className="hover:bg-zinc-50/80 transition-colors group">
                                {columns.map((col, ci) => {
                                    const value = getValue(row, col.data)

                                    return (
                                        <td
                                            key={ci}
                                            className={`px-6 py-4 ${
                                                col.align === 'center'
                                                    ? 'text-center'
                                                    : col.align === 'right'
                                                        ? 'text-right'
                                                        : 'text-left'
                                            } text-zinc-600 font-medium`}
                                        >
                                            {col.render
                                                ? col.render(value, row)
                                                : typeof value === 'boolean'
                                                    ? (
                                                        <span
                                                            className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                                                                value
                                                                    ? 'bg-emerald-100 text-emerald-700'
                                                                    : 'bg-zinc-100 text-zinc-500'
                                                            }`}
                                                        >
                                                            {value ? 'Sí' : 'No'}
                                                        </span>
                                                    )
                                                    : value instanceof Date
                                                        ? format(value, 'dd/MM/yyyy')
                                                        : value
                                            }
                                        </td>
                                    )
                                })}
                            </tr>
                        ))
                    )}
                    </tbody>
                </table>
            </div>

            {/* PAGINATION */}
            {pagination && (
                <div className="flex justify-between items-center px-6 py-4 bg-zinc-50/30 border-t border-zinc-100">
                    <span className="text-zinc-500 text-xs font-medium">
                        Página <span className="text-zinc-900">{currentPage}</span> de <span className="text-zinc-900">{totalPages}</span>
                    </span>

                    <div className="flex gap-2">
                        <button
                            onClick={onPrevPage}
                            disabled={currentPage === 1}
                            className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Anterior
                        </button>

                        <button
                            onClick={onNextPage}
                            disabled={currentPage === totalPages}
                            className="px-4 py-1.5 text-xs font-semibold rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            Siguiente
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
})

export { Table }