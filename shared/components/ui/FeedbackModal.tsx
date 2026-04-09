'use client';

import {
    CheckCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import { Modal } from './Modal';

type AlertType = 'success' | 'error' | 'warning' | 'info' | 'confirm';

interface FeedbackModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: AlertType;
    title: string;
    message: string;
    onConfirm?: () => void;
    confirmText?: string;
    cancelText?: string;
}

// Configuración unificada con tu Rojo Primario (#dc2626)
const alertConfig = {
    // ÉXITO: Rojo Primario
    success: {
        icon: CheckCircleIcon,
        color: 'text-red-600',
        bg: 'bg-red-50',
        btn: 'bg-red-600 hover:bg-red-700'
    },
    // ERROR: Rojo Primario (Corregido de Negro a Rojo)
    error: {
        icon: XCircleIcon,
        color: 'text-red-600',
        bg: 'bg-red-50',
        btn: 'bg-red-600 hover:bg-red-700'
    },
    // ADVERTENCIA: Ámbar para distinguir de Error Crítico
    warning: {
        icon: ExclamationTriangleIcon,
        color: 'text-amber-500',
        bg: 'bg-amber-50',
        btn: 'bg-red-600 hover:bg-red-700'
    },
    // INFO: Neutral
    info: {
        icon: InformationCircleIcon,
        color: 'text-red-600',
        bg: 'bg-red-50',
        btn: 'bg-red-600 hover:bg-red-700'
    },
    // CONFIRMACIÓN: Rojo Primario
    confirm: {
        icon: ExclamationTriangleIcon,
        color: 'text-red-600',
        bg: 'bg-red-50',
        btn: 'bg-red-600 hover:bg-red-700'
    }
};

export function FeedbackModal({
                                  isOpen,
                                  onClose,
                                  type,
                                  title,
                                  message,
                                  onConfirm,
                                  confirmText = 'Aceptar',
                                  cancelText = 'Cancelar'
                              }: FeedbackModalProps) {

    const style = alertConfig[type];
    const Icon = style.icon;

    const footer = (
        <div className="flex gap-3 w-full">
            {type === 'confirm' && (
                <button
                    onClick={onClose}
                    className="flex-1 px-4 py-2 text-xs font-bold text-zinc-600 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors"
                >
                    {cancelText}
                </button>
            )}
            <button
                onClick={onConfirm || onClose}
                className={`flex-1 px-4 py-2 text-xs font-bold text-white rounded-lg transition-all shadow-sm ${style.btn}`}
            >
                {confirmText}
            </button>
        </div>
    );

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="sm"
            footer={footer}
            title="" // Pasamos vacío para que el centro sea el feedback
        >
            <div className="flex flex-col items-center text-center py-2">
                {/* Círculo de fondo con el icono */}
                <div className={`p-4 rounded-full ${style.bg} mb-4`}>
                    <Icon className={`w-10 h-10 ${style.color}`} />
                </div>

                {/* Título en Mayúsculas y Negrita */}
                <h3 className="text-xl font-black text-zinc-900 mb-2 uppercase tracking-tight">
                    {title}
                </h3>

                {/* Mensaje de descripción */}
                <p className="text-zinc-500 text-sm font-medium leading-relaxed">
                    {message}
                </p>
            </div>
        </Modal>
    );
}