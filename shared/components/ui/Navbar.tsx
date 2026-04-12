'use client'
import React from 'react'
import {
    BellIcon,
    UserCircleIcon,
    Bars3BottomLeftIcon,
    MagnifyingGlassIcon
} from '@heroicons/react/24/outline'

export function Navbar() {
    return (
        <nav className="h-16 border-b border-zinc-200 bg-white px-8 flex items-center justify-between sticky top-0 z-30">

            {/* Lado Izquierdo: Buscador o Migas de Pan */}
            <div className="flex items-center gap-4 w-1/3">

            </div>

            {/* Lado Derecho: Acciones y Perfil */}
            <div className="flex items-center gap-6">
                <div className="h-8 w-[1px] bg-zinc-200" /> {/* Separador */}

                {/* Perfil de Usuario */}
                <div className="flex items-center gap-3 cursor-pointer group">
                    <div className="flex flex-col text-right">
            <span className="text-sm font-bold text-zinc-800 leading-none group-hover:text-red-600 transition-colors">
              Usuario ABET
            </span></div>
                </div>

            </div>
        </nav>
    )
}

export default Navbar
