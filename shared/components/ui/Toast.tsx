'use client'
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

interface ToastProps {
    message: string;
    onClose: () => void;
    isOpen: boolean;
}

export function Toast({ message, onClose, isOpen }: ToastProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed bottom-5 right-5 z-[200] animate-in slide-in-from-right duration-300">
            <div className="bg-zinc-900 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-zinc-800">
                <CheckCircleIcon className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium">{message}</span>
                <button onClick={onClose} className="ml-2 hover:bg-zinc-800 p-1 rounded-lg">
                    <XMarkIcon className="h-4 w-4 text-zinc-400" />
                </button>
            </div>
        </div>
    )
}