'use client'
import React, { useState } from 'react'
import { Bars3BottomLeftIcon } from '@heroicons/react/24/outline'
import { useSidebar, Button, LanguageSwitcher } from '@/shared/components'
import { useI18n } from '@/providers'
import { useScreen } from '@/shared/hooks'

type ProgramOption = {
    value: string
    label: string
}

type NavbarProps = {
    cycleLabel?: string
    schoolName?: string
    programType?: string
    programOptions?: ProgramOption[]
    userName?: string
    userRole?: string
    userInitials?: string
}

function Navbar({
                    cycleLabel = '2026-02',
                    schoolName = 'Ingenieria',
                    programType = 'pregrado',
                    programOptions = [
                        { value: 'pregrado', label: 'Regular' },
                        { value: 'epe', label: 'EPE' },
                    ],
                    userName = 'Usuario ABET',
                    userRole = 'Administrador',
                    userInitials = 'UA',
                }: NavbarProps) {
    const { toggle, isMobile: isSidebarMobile } = useSidebar()
    const { t } = useI18n()
    const { isMobile, isTablet } = useScreen()

    const [selectedProgram, setSelectedProgram] = useState(programType)

    const navStyle = {
        background: '#f8f8f9',
        borderBottom: '1px solid #e5e5e8',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }

    const toggleButton = isSidebarMobile ? (
        <Button
            type="button"
            onClick={toggle}
            aria-label={t('navbar.openMenu')}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
        >
            <Bars3BottomLeftIcon className="h-5 w-5" />
        </Button>
    ) : null

    const PillSwitcher = () => (
        <div
            className="flex items-center gap-[3px] p-[3px] rounded-lg"
            style={{ background: '#ececee', border: '1px solid #e0e0e3' }}
        >
            {programOptions.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => setSelectedProgram(opt.value)}
                    className="px-4 py-[7px] rounded-md text-[12px] font-semibold transition-all duration-200 cursor-pointer border-none"
                    style={
                        selectedProgram === opt.value
                            ? { background: '#fff', color: '#18181b', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }
                            : { background: 'transparent', color: '#8a8a90' }
                    }
                >
                    {opt.label}
                </button>
            ))}
        </div>
    )

    const SchoolBlock = () => (
        <div className="flex flex-col gap-[2px]">
            <span className="text-[9px] font-bold uppercase tracking-[0.13em] leading-none" style={{ color: '#C8102E' }}>
                Escuela
            </span>
            <span className="text-[13.5px] font-bold text-zinc-800 leading-none" style={{ letterSpacing: '-0.01em' }}>
                {schoolName}
            </span>
        </div>
    )

    const CycleBlock = () => (
        <div
            className="flex flex-col gap-[2px] px-3 py-2 rounded-lg"
            style={{ background: '#f0f0f2', border: '1px solid #e2e2e6' }}
        >
            <span className="text-[9px] font-bold uppercase tracking-[0.13em] leading-none text-zinc-400">Ciclo</span>
            <span className="text-[13px] font-bold text-zinc-700 leading-none tabular-nums">{cycleLabel}</span>
        </div>
    )

    const UserBlock = ({ compact = false }: { compact?: boolean }) => (
        <div className="flex items-center gap-2.5 cursor-pointer group">
            <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 transition-transform group-hover:scale-105"
                style={{
                    background: 'linear-gradient(135deg, #C8102E 0%, #E03348 100%)',
                    boxShadow: '0 2px 8px rgba(200,16,46,0.22)',
                }}
            >
                {userInitials}
            </div>
            {!compact && (
                <div className="flex flex-col leading-none gap-[3px]">
                    <span className="text-[12.5px] font-semibold text-zinc-800 truncate max-w-[160px]">{userName}</span>
                    <span className="text-[10px] text-zinc-400 truncate max-w-[160px]">{userRole}</span>
                </div>
            )}
        </div>
    )

    const Sep = () => <div className="w-px h-8 bg-zinc-200 flex-shrink-0" />

    /* ─── Mobile ─── */
    if (isMobile) {
        return (
            <nav className="w-full sticky top-0 z-30 flex flex-col gap-2.5 px-4 py-3" style={navStyle}>
                {/* Row 1: toggle · language · user */}
                <div className="flex items-center justify-between">
                    <div>{toggleButton}</div>
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <div className="w-px h-6 bg-zinc-200" />
                        <UserBlock />
                    </div>
                </div>
                {/* Row 2: school · cycle · pills */}
                <div className="flex items-center gap-3">
                    <SchoolBlock />
                    <div className="w-px h-7 bg-zinc-200 flex-shrink-0" />
                    <CycleBlock />
                    <div className="w-px h-7 bg-zinc-200 flex-shrink-0" />
                    <PillSwitcher />
                </div>
            </nav>
        )
    }

    /* ─── Tablet ─── */
    if (isTablet) {
        return (
            <nav className="w-full h-[68px] flex items-center justify-between px-5 sticky top-0 z-30" style={navStyle}>
                <div>{toggleButton}</div>
                <div className="flex items-center gap-4 ml-auto">
                    <SchoolBlock />
                    <Sep />
                    <CycleBlock />
                    <Sep />
                    <PillSwitcher />
                    <Sep />
                    <LanguageSwitcher />
                    <Sep />
                    <UserBlock compact />
                </div>
            </nav>
        )
    }

    /* ─── Desktop ─── */
    return (
        <nav className="w-full h-[68px] flex items-center justify-between px-6 sticky top-0 z-30" style={navStyle}>
            <div className="min-w-[40px]">{toggleButton}</div>
            <div className="flex items-center gap-5 ml-auto">
                <SchoolBlock />
                <Sep />
                <CycleBlock />
                <Sep />
                <PillSwitcher />
                <Sep />
                <LanguageSwitcher />
                <Sep />
                <UserBlock />
            </div>
        </nav>
    )
}

export { Navbar }