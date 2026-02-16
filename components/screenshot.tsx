'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'

interface ScreenshotProps {
  src: string
  alt: string
  caption?: string
  width?: number
  height?: number
  full?: boolean
}

export function Screenshot({
  src,
  alt,
  caption,
  width = 1280,
  height = 800,
  full = false
}: ScreenshotProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = useCallback(() => setIsOpen(true), [])
  const handleClose = useCallback(() => setIsOpen(false), [])

  const imagePath = src.startsWith('/') ? src : `/screenshots/${src}`

  return (
    <>
      <figure className="my-6">
        <div
          className={`overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-neutral-700 cursor-zoom-in ${full ? '' : 'max-w-3xl mx-auto'}`}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleOpen()}
        >
          <Image
            src={imagePath}
            alt={alt}
            width={width}
            height={height}
            className="w-full h-auto"
            unoptimized
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-gray-500 dark:text-neutral-400">
            {caption}
          </figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 cursor-zoom-out p-4"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <Image
            src={imagePath}
            alt={alt}
            width={width * 2}
            height={height * 2}
            className="max-w-full max-h-full object-contain"
            unoptimized
          />
        </div>
      )}
    </>
  )
}
