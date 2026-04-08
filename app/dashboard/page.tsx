import React, { useState } from 'react'
import { Button } from '@/shared/components/ui'
import { Modal } from '@/shared/components/ui'

export default function DashboardPage() {
  const [open, setOpen] = useState(false)
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard de ejemplo</h1>
      <Button onClick={() => setOpen(true)}>Abrir modal</Button>

      <Modal open={open} onClose={() => setOpen(false)} title="Modal de ejemplo">
        <p>Contenido del modal del dashboard.</p>
      </Modal>
    </div>
  )
}
