'use client';

import React, { useEffect, useCallback } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl';
};

const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
};

export function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') onClose();
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, handleKeyDown]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-zinc-900/60 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Contenedor del Modal */}
            <div className={`relative bg-white rounded-2xl shadow-2xl z-10 w-full ${sizes[size]} transform transition-all flex flex-col max-h-[90vh] overflow-hidden`}>

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-zinc-100">
                    <h3 className="text-lg font-bold text-zinc-800 uppercase tracking-tight">
                        {title || 'Información'}
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-zinc-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 overflow-y-auto text-zinc-600 text-sm leading-relaxed">
                    {children}
                </div>

                {/* Footer */}
                {footer && (
                    <div className="p-4 border-t border-zinc-100 flex justify-end gap-3 bg-zinc-50/50">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}