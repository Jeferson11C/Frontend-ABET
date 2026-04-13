'use client'
import {
    CheckCircleIcon,
    XCircleIcon,
    ExclamationTriangleIcon,
    InformationCircleIcon,
    XMarkIcon
} from '@heroicons/react/24/solid'

type ToastType = 'success' | 'error' | 'warning' | 'info'

interface ToastProps {
    isOpen: boolean;
    onClose: () => void;
    type?: ToastType;
    message?: string;
}

const toastConfig = {
    success: {
        icon: CheckCircleIcon,
        iconColor: 'text-emerald-500',
        defaultMessage: '¡Operación completada con éxito!',
    },
    error: {
        icon: XCircleIcon,
        iconColor: 'text-red-500',
        defaultMessage: 'Hubo un error al procesar la solicitud.',
    },
    warning: {
        icon: ExclamationTriangleIcon,
        iconColor: 'text-amber-500',
        defaultMessage: 'Atención: Revisa los datos ingresados.',
    },
    info: {
        icon: InformationCircleIcon,
        iconColor: 'text-blue-500',
        defaultMessage: 'Nueva actualización disponible en el sistema.',
    }
}

function Toast({ isOpen, onClose, type = 'success', message }: ToastProps) {
    if (!isOpen) return null;

    const { icon: Icon, iconColor, defaultMessage } = toastConfig[type];

    return (
        <div className="fixed bottom-5 right-5 z-[200] animate-in slide-in-from-right duration-300">
            <div className="bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-zinc-800 min-w-[300px]">
                <Icon className={`h-6 w-6 shrink-0 ${iconColor}`} />

                <div className="flex-1">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        {type === 'success' ? 'Éxito' : type === 'error' ? 'Error' : 'Aviso'}
                    </p>
                    <p className="text-sm font-medium">
                        {message || defaultMessage}
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className="ml-2 hover:bg-zinc-800 p-1.5 rounded-lg transition-colors text-zinc-500 hover:text-white"
                >
                    <XMarkIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}

export {Toast}
