'use client'

import React from 'react'
import LoginForm from './components/LoginForm'
import { Card } from '@/shared/components/ui/Card'
import { Title } from '@/shared/components'
import { useScreen } from '@/shared/hooks'

export default function Login() {
  const { isMobile, isTablet } = useScreen()

  return (
      <div
          className="min-h-screen w-full bg-cover bg-center flex items-center justify-center"
          style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="w-full px-4 py-8">
          <div
              className="mx-auto w-full"
              style={{ maxWidth: isMobile ? '360px' : isTablet ? '480px' : '540px' }}
          >
            <Card
                className="w-full px-8 py-8 flex flex-col justify-center gap-4"
                style={
                  isMobile
                      ? { aspectRatio: 'auto', minHeight: 'auto' }
                      : { aspectRatio: '1 / 1' }
                }
            >

              {/* HEADER */}
              <div className="text-center">
                <img
                    className="mx-auto w-auto mb-3"
                    style={{ height: isMobile ? '72px' : '96px' }}
                    src="/assets/ABETLogo.png"
                    alt="ABET Logo"
                />
                <div className="flex justify-center">
                  <Title title="Sistema de acreditación" className="justify-center py-0" />
                </div>
              </div>

              {/* FORM */}
              <LoginForm />

            </Card>

          </div>
        </div>
      </div>
  )
}