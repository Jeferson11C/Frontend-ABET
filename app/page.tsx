'use client';

import { useState } from 'react';
import { Button, Input, Select, Modal, FeedbackModal } from '@/shared/components/ui';

export default function ModalsDemoPage() {
    // Estados para cada tipo de modal
    const [openForm, setOpenForm] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openWarning, setOpenWarning] = useState(false); // NUEVO ESTADO

    return (
        <div className="space-y-8 p-6">
            <div>
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Gestión de Modales</h1>
                <p className="text-zinc-500">Prueba las diferentes interacciones del sistema.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* BOTONES DE ACTIVACIÓN */}
                <Button onClick={() => setOpenForm(true)} className="bg-zinc-900">Abrir Formulario</Button>
                <Button onClick={() => setOpenSuccess(true)} className="bg-red-600">Simular Éxito</Button>
                <Button onClick={() => setOpenConfirm(true)} className="bg-zinc-100 !text-zinc-900 border border-zinc-200 shadow-sm">Confirmar Acción</Button>
                <Button onClick={() => setOpenWarning(true)} className="bg-amber-500 hover:bg-amber-600 text-white">Ver Advertencia</Button>
                <Button onClick={() => setOpenError(true)} className="bg-zinc-500">Simular Error</Button>
                <Button onClick={() => setOpenInfo(true)} className="bg-zinc-400">Ver Info</Button>
            </div>

            {/* 1. MODAL TIPO FORMULARIO */}
            <Modal
                isOpen={openForm}
                onClose={() => setOpenForm(false)}
                title="Registrar Nuevo Alumno"
                size="md"
                footer={
                    <div className="flex gap-2">
                        <Button onClick={() => setOpenForm(false)} className="bg-zinc-100 !text-zinc-900">Cancelar</Button>
                        <Button onClick={() => {setOpenForm(false); setOpenSuccess(true)}} className="bg-red-600">Guardar Registro</Button>
                    </div>
                }
            >
                <div className="grid grid-cols-1 gap-4">
                    <Input label="Nombre completo" placeholder="Nombre y Apellido" required />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Código" placeholder="U202..." />
                        <Select
                            label="Ciclo Actual"
                            placeholder="Seleccione ciclo"
                            options={[{label: '2026-I', value: '1'}, {label: '2026-II', value: '2'}]}
                        />
                    </div>
                </div>
            </Modal>

            {/* 2. MODAL DE ÉXITO */}
            <FeedbackModal
                isOpen={openSuccess}
                onClose={() => setOpenSuccess(false)}
                type="success"
                title="¡Registro Exitoso!"
                message=""
            />

            {/* 3. MODAL DE CONFIRMACIÓN */}
            <FeedbackModal
                isOpen={openConfirm}
                onClose={() => setOpenConfirm(false)}
                type="confirm"
                title="¿Eliminar Registro?"
                message="Esta acción no se puede deshacer. Se perderán todos los datos vinculados."
                confirmText="Sí, eliminar ahora"
                onConfirm={() => {
                    console.log("Eliminado...");
                    setOpenConfirm(false);
                }}
            />

            {/* 4. MODAL DE ADVERTENCIA (Warning) */}
            <FeedbackModal
                isOpen={openWarning}
                onClose={() => setOpenWarning(false)}
                type="warning"
                title="Aviso Relevante"
                message=""
            />

            {/* 5. MODAL DE ERROR */}
            <FeedbackModal
                isOpen={openError}
                onClose={() => setOpenError(false)}
                type="error"
                title="Error de Conexión"
                message=""
                confirmText="Reintentar"
            />

            {/* 6. MODAL DE INFORMACIÓN */}
            <FeedbackModal
                isOpen={openInfo}
                onClose={() => setOpenInfo(false)}
                type="info"
                title="Guía de Usuario"
                message=""
            />

        </div>
    );
}