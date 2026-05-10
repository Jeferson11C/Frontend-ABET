import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuthGuard() {
    const router = useRouter()
    const [checking, setChecking] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('bearerToken')
        if (!token) {
            setChecking(true)
            router.replace('/auth/login')
        } else {
            setChecking(false)
        }
    }, [router])

    return checking
}
