// abet-frontend-base/src/shared/hooks/useAuthGuard.ts
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuthGuard() {
    const router = useRouter()
    const [checking, setChecking] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('bearerToken')
        if (!token) {
            router.replace('/auth/login')
        } else {
            setChecking(false)
        }
    }, [router])

    return checking
}
