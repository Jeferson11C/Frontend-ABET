'use client'
import React from 'react'

interface TitleProps {
    title: string
    icon?: React.ReactNode
    className?: string
}

export const Title = ({ title, icon, className = "" }: TitleProps) => {
    return (
        <div className={`flex items-center gap-3 py-4 ${className}`}>
            {icon && <div className="text-red-600 shrink-0">{icon}</div>}
            <h1 className="text-3xl font-black text-zinc-900 tracking-tight uppercase">
                {title}
            </h1>
        </div>
    )
}

export const SubTitle = ({ title, icon, className = "" }: TitleProps) => {
    return (
        <div className={`flex items-center gap-2 py-2 ${className}`}>
            {icon && <div className="text-red-500 shrink-0">{icon}</div>}
            <h2 className="text-xl font-bold text-zinc-800 tracking-tight">
                {title}
            </h2>
        </div>
    )
}

