'use client';
import React, { forwardRef, useId } from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    options: { label: string; value: string | number }[];
    placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    ({ label, error, options, className = "", placeholder, ...props }, ref) => {
        const id = useId();

        return (
            <div className="flex flex-col w-full">
                {/* LABEL: font-medium text-xs mb-2 */}
                {label && (
                    <label
                        htmlFor={id}
                        className="font-medium text-xs mb-2 text-zinc-700 select-none"
                    >
                        {label}
                        {props.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                )}

                <div className="relative group">
                    <select
                        id={id}
                        ref={ref}
                        className={`
                            /* Estilos base */
                            w-full px-3 py-2 text-sm rounded-md border outline-none transition-all
                            bg-white text-zinc-900 appearance-none cursor-pointer
                            
                            /* Diseño solicitado: Borde Rojo Primario */
                            border-red-600 focus:border-red-700 focus:ring-4 focus:ring-red-100
                            
                            /* Estado deshabilitado */
                            disabled:bg-gray-100 disabled:text-gray-600 disabled:cursor-not-allowed
                            
                            /* Estado de error */
                            ${error ? "border-red-500 ring-2 ring-red-500/20" : ""}
                            
                            ${className}
                        `}
                        {...props}
                    >
                        {placeholder && (
                            <option value="" disabled hidden>
                                {placeholder}
                            </option>
                        )}
                        {options.map((opt) => (
                            <option key={opt.value} value={opt.value} className="bg-white text-zinc-900">
                                {opt.label}
                            </option>
                        ))}
                    </select>

                    {/* FLECHA PERSONALIZADA (Solo Tailwind) */}
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-red-600 group-focus-within:rotate-180 transition-transform duration-200">
                        <svg
                            className="h-4 w-4 fill-current"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                        </svg>
                    </div>
                </div>

                {/* ERROR O HELPER TEXT */}
                {error && (
                    <p className="font-medium text-xs mt-2 text-red-500 italic leading-none">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Select.displayName = "Select";

export default Select;
