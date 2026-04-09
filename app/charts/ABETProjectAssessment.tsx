'use client'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from "recharts"
import { Card, ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/shared/components/ui'

const data = [
    { criterio: "Técnico", puntaje: 85 },
    { criterio: "Ética", puntaje: 90 },
    { criterio: "Comunicación", puntaje: 70 },
    { criterio: "Trabajo Equipo", puntaje: 95 },
    { criterio: "Impacto Social", puntaje: 60 },
]

const config = {
    puntaje: { label: "Puntaje Promedio", color: "#dc2626" }
} satisfies ChartConfig

export function ABETProjectAssessment() {
    return (
        <Card title="Evaluación de Jurados Externos" description="Desempeño en sustentación de proyectos">
            <ChartContainer config={config} className="h-[350px] w-full mt-4">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e4e4e7" />
                    <PolarAngleAxis dataKey="criterio" tick={{ fill: "#71717a", fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Radar
                        name="Puntaje"
                        dataKey="puntaje"
                        stroke="var(--color-puntaje)"
                        fill="var(--color-puntaje)"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ChartContainer>
        </Card>
    )
}