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
      <figure className="screenshot">
        <div
          className={`screenshot-container${full ? ' screenshot-container--full' : ''}`}
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
            className="screenshot-img"
            unoptimized
          />
        </div>
        {caption && (
          <figcaption className="screenshot-caption">{caption}</figcaption>
        )}
      </figure>

      {isOpen && (
        <div
          className="screenshot-lightbox"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
        >
          <Image
            src={imagePath}
            alt={alt}
            width={width * 2}
            height={height * 2}
            className="screenshot-lightbox-img"
            unoptimized
          />
        </div>
      )}
    </>
  )
}
