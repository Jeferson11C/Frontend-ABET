'use client'

import React, { useState } from 'react'
import {
    Card,
    Switch,
    TextArea,
    Tabs,
    Toast,
    Skeleton,
    Button,
    Title,
    SubTitle
} from '@/shared/components/ui'

export default function TestNewComponents() {
    // --- Estados para Pruebas ---
    const [activeTab, setActiveTab] = useState('info')
    const [switchEnabled, setSwitchEnabled] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [textValue, setTextValue] = useState('')

    const tabOptions = [
        { id: 'info', label: 'Información General' },
        { id: 'evidences', label: 'Evidencias ABET' },
        { id: 'logs', label: 'Logs de Auditoría' }
    ]

    const [toastState, setToastState] = useState({ open: false, type: 'success' as 'success' | 'error' | 'warning' })

    const triggerToast = (type: 'success' | 'error' | 'warning') => {
        setToastState({ open: true, type })
        setTimeout(() => setToastState(prev => ({...prev, open: false})), 3000)
    }

    return (
        <div className="p-2 space-y-12 max-w-5xl mx-auto animate-in fade-in duration-700">
            <Title
                title="Componentes"
            />

            {/* --- TEST DE TABS --- */}
            <section className="space-y-4">
                <SubTitle title="1. Navegación por Tabs" />
                <Card>
                    <Tabs tabs={tabOptions} activeTab={activeTab} onChange={setActiveTab}/>
                    <div className="py-6 text-sm text-zinc-600">
                        {activeTab === 'info' && <p>Mostrando el formulario de datos generales del alumno...</p>}
                        {activeTab === 'evidences' && <p>Listado de archivos PDF cargados para acreditación.</p>}
                        {activeTab === 'logs' && <p>Historial de cambios realizados por el docente.</p>}
                    </div>
                </Card>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* --- TEST DE TEXTAREA --- */}
                <section className="space-y-4">
                    <SubTitle title="2. Text Area"/>
                    <TextArea
                        label="Comentarios de Mejora Continua"
                        placeholder="Describe las acciones correctivas tomadas en este ciclo..."
                        value={textValue}
                        onChange={(e) => setTextValue(e.target.value)}
                        error={textValue.length > 0 && textValue.length < 10 ? "El informe debe ser más descriptivo" : ""}
                    />
                </section>

                {/* --- TEST DE SWITCH --- */}
                <section className="space-y-4">
                    <SubTitle title="3. Toogle" />
                    <Card className="flex flex-col gap-6">
                        <Switch
                            label="Estado de Acreditación"
                            description="Activar para marcar este resultado como CUMPLIDO."
                            checked={switchEnabled}
                            onChange={setSwitchEnabled}
                        />
                        <div
                            className={`p-2 rounded text-center text-[10px] font-bold uppercase transition-all ${switchEnabled ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-zinc-100 text-zinc-400 border border-zinc-200'}`}>
                            {switchEnabled ? 'Resultado Verificado' : 'Pendiente de Revisión'}
                        </div>
                    </Card>
                </section>
            </div>

            {/* --- TEST DE SKELETON --- */}
            <section className="space-y-4">
                <SubTitle title="4. Skeleton"/>
                <div className="flex items-start gap-4 p-6 bg-white border border-zinc-200 rounded-2xl shadow-sm">
                    <Skeleton className="h-12 w-12 rounded-full"/>
                    <div className="flex-1 space-y-3">
                        <Skeleton className="h-4 w-1/3"/>
                        <Skeleton className="h-3 w-full"/>
                        <Skeleton className="h-3 w-5/6"/>
                    </div>
                </div>
            </section>

            {/* --- TEST DE TOAST --- */}
            <section className="space-y-4 pb-10">
                <SubTitle title="5. Toast" />

                <div className="flex flex-wrap gap-4">
                    <Button
                        onClick={() => triggerToast('success')}
                        className="bg-emerald-600 hover:bg-emerald-700"
                    >
                        Test Éxito
                    </Button>

                    <Button
                        onClick={() => triggerToast('error')}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Test Error
                    </Button>

                    <Button
                        onClick={() => triggerToast('warning')}
                        className="bg-amber-500 hover:bg-amber-600"
                    >
                        Test Aviso
                    </Button>
                </div>

                <Toast
                    isOpen={toastState.open}
                    type={toastState.type}
                    onClose={() => setToastState(prev => ({...prev, open: false}))}
                    // message="Si no mandas nada, sale el mensaje por defecto"
                />
            </section>
        </div>
    )
}