"use client"

import { Suspense } from 'react'
import { Navbar } from './navbar'

export function NavbarWrapper() {
  return (
    <Suspense fallback={
      <nav className="border-b fixed top-0 left-0 right-0 bg-background z-50">
        <div className="w-full max-w-screen-xl mx-auto px-4 py-4 flex items-center justify-between gap-4 overflow-x-hidden">
          <div className="text-2xl font-bold text-primary tracking-tight">
            Shopz
          </div>
          <div className="flex items-center gap-4">
            <div className="w-5 h-5 bg-secondary rounded-full animate-pulse"></div>
            <div className="w-5 h-5 bg-secondary rounded-full animate-pulse"></div>
            <div className="w-5 h-5 bg-secondary rounded-full animate-pulse"></div>
          </div>
        </div>
      </nav>
    }>
      <Navbar />
    </Suspense>
  )
}
