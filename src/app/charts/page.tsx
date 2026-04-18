'use client'
import { ABETCompetenciesChart } from "./ABETCompetenciesChart"
import { ABETGraduationPie } from "./ABETGraduationPie"
import { ABETHistoricalTrend } from "./ABETHistoricalTrend"
import { ABETProjectAssessment } from "./ABETProjectAssessment"
import { Card, Badge } from '@/shared/components/ui'

export default function ABETDashboardPage() {
    return (
        <div className="space-y-8">
            <header className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Reporte de Acreditación ABET</h1>
                    <p className="text-zinc-500">Ciclo Académico 2026-I</p>
                </div>
                <Badge variant="default" className="bg-red-900 text-white px-4 py-1">Ciclo de Evaluación</Badge>
            </header>


            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ABETCompetenciesChart />
                <ABETGraduationPie />
                <ABETHistoricalTrend />
                <ABETProjectAssessment />
            </div>

        </div>
    )
}