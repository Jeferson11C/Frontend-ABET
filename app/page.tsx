'use client';

import { useState } from 'react';
import { Button, Input, Select, LoadingDialog, ErrorDialog, SuccessDialog, WarningDialog, InfoDialog, ConfirmDialog, FormDialog } from '@/shared/components/ui';

export default function ModalsDemoPage() {
    // Estados para cada tipo de modal
    const [openForm, setOpenForm] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [openInfo, setOpenInfo] = useState(false);
    const [openWarning, setOpenWarning] = useState(false);
    const [retryStatus, setRetryStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
    const [isSaving, setIsSaving] = useState(false);

    const handleRetry = () => {
        setOpenError(false);
        setRetryStatus('loading');

        setTimeout(() => {
            const didFail = Math.random() < 0.5;

            if (didFail) {
                setRetryStatus('error');
                setOpenError(true);
                return;
            }

            setRetryStatus('success');
        }, 1200);
    };

    const handleSubmitForm = () => {
        setIsSaving(true);

        setTimeout(() => {
            setIsSaving(false);
            setOpenForm(false);
            setOpenSuccess(true);
        }, 1200);
    };

    return (
        <div className="space-y-8">
            <LoadingDialog isOpen={retryStatus === 'loading'} label="Reintentando ..."/>
            <LoadingDialog isOpen={isSaving} label="Guardando ..."/>

            <div>
                <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Gestión de Modales</h1>
                <p className="text-zinc-500">Prueba las diferentes interacciones del sistema.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* BOTONES DE ACTIVACIÓN */}
                <Button onClick={() => setOpenForm(true)} className="bg-zinc-900">Abrir Formulario</Button>
                <Button onClick={() => setOpenSuccess(true)} className="bg-red-600">Simular Éxito</Button>
                <Button onClick={() => setOpenConfirm(true)}
                        className="bg-zinc-100 !text-zinc-900 border border-zinc-200 shadow-sm">Confirmar
                    Acción</Button>
                <Button onClick={() => setOpenWarning(true)} className="bg-amber-500 hover:bg-amber-600 text-white">Ver
                    Advertencia</Button>
                <Button onClick={() => setOpenError(true)} className="bg-zinc-500">Simular Error</Button>
                <Button onClick={() => setOpenInfo(true)} className="bg-zinc-400">Ver Info</Button>
            </div>

            {/* MODAL TIPO FORMULARIO */}
            <FormDialog
                isOpen={openForm}
                onClose={() => setOpenForm(false)}
                onSubmit={handleSubmitForm}
                title="Registrar Nuevo Alumno"
            >
                <div className="grid grid-cols-1 gap-4">
                    <Input label="Nombre completo" placeholder="Nombre y Apellido" required/>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Código" placeholder="U202..."/>
                        <Select
                            label="Ciclo Actual"
                            placeholder="Seleccione ciclo"
                            options={[{label: '2026-I', value: '1'}, {label: '2026-II', value: '2'}]}
                        />
                    </div>
                </div>
            </FormDialog>

            <SuccessDialog
                isOpen={openSuccess}
                onClose={() => setOpenSuccess(false)}
                title="Confirmación"
                message=""
            />

            <ConfirmDialog
                isOpen={openConfirm}
                onClose={() => setOpenConfirm(false)}
                message=""
                onConfirm={() => {
                    console.log("Eliminado...");
                    setOpenConfirm(false);
                }}
                onDecline={() => setOpenConfirm(false)}
            />

            <WarningDialog
                isOpen={openWarning}
                onClose={() => setOpenWarning(false)}
                message=""
                onConfirm={() => setOpenWarning(false)}
                onDecline={() => setOpenWarning(false)}
            />

            <ErrorDialog
                isOpen={openError}
                onClose={() => setOpenError(false)}
                message=""
                onConfirm={handleRetry}
            />

            <InfoDialog
                isOpen={openInfo}
                onClose={() => setOpenInfo(false)}
                title="Guía de Usuario"
                message=""
            />

        </div>
    );
}