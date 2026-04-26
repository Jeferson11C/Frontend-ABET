'use client'
import * as React from "react"
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { cn } from "@/shared/lib/utils"
import { Button } from "./Button"

function Table({ className, ...props }: React.ComponentProps<"table">) {
    return (
        <div data-slot="table-container" className="relative w-full overflow-x-auto rounded-xl border border-zinc-200 bg-white shadow-sm">
            <table
                data-slot="table"
                className={cn("w-full caption-bottom text-sm border-collapse", className)}
                {...props}
            />
        </div>
    )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
    return (
        <thead
            data-slot="table-header"
            className={cn("bg-zinc-50/50 [&_tr]:border-b border-zinc-200", className)}
            {...props}
        />
    )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
    return (
        <tbody
            data-slot="table-body"
            className={cn("[&_tr:last-child]:border-0 [&_tr:hover]:bg-zinc-200/60", className)}
            {...props}
        />
    )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return (
        <tr
            data-slot="table-row"
            className={cn(
                "bg-zinc-50/60 border-b border-zinc-100 transition-colors data-[state=selected]:bg-zinc-100",
                className
            )}
            {...props}
        />
    )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                "h-12 px-6 text-left align-middle font-bold text-zinc-500 uppercase text-[13px] tracking-wider whitespace-nowrap",
                className
            )}
            {...props}
        />
    )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                "px-6 py-4 align-middle whitespace-nowrap text-[12px] text-zinc-600 font-medium break-words max-w-md",
                className
            )}
            {...props}
        />
    )
}

// MOTOR DATA TABLE ---

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    pageSize?: number
    title?: string
    dataPage?: {
        page: number
        totalPages: number
    }
}

export function DataTable<TData, TValue>({
                                             columns,
                                             data,
                                             pageSize = 10,
                                             title,
                                             dataPage
                                         }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize } }
    })

    return (
        <div className="space-y-4">
            {title && <h3 className="text-lg font-bold text-zinc-800 px-1 uppercase tracking-tight">{title}</h3>}

            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-32 text-center text-zinc-400 font-medium italic">
                                No se encontraron resultados disponibles.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* PAGINACIÓN */}
            <div className="flex items-center justify-center gap-4 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="rounded-md bg-red-50 px-4 py-2 text-sm font-bold text-red-600 border-none hover:bg-red-100 disabled:bg-zinc-100 disabled:text-zinc-400 transition-all"
                >
                    Anterior
                </Button>

                <div className="text-[10px] font-black uppercase text-zinc-500 tracking-widest bg-zinc-100 px-3 py-1 rounded-full">
                    Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="rounded-md bg-red-50 px-4 py-2 text-sm font-bold text-red-600 border-none hover:bg-red-100 disabled:bg-zinc-100 disabled:text-zinc-400 transition-all"
                >
                    Siguiente
                </Button>
            </div>
        </div>
    )
}

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }