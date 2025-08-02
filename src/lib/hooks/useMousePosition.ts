'use client'

import { useState, useEffect } from 'react'

interface MousePosition {
  x: number | null
  y: number | null
}

export function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: null,
    y: null,
  })

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    // Add throttling to prevent excessive updates
    let timeoutId: NodeJS.Timeout | null = null
    const throttledUpdateMousePosition = (e: MouseEvent) => {
      if (timeoutId === null) {
        timeoutId = setTimeout(() => {
          updateMousePosition(e)
          timeoutId = null
        }, 16) // ~60fps
      }
    }

    window.addEventListener('mousemove', throttledUpdateMousePosition)

    return () => {
      window.removeEventListener('mousemove', throttledUpdateMousePosition)
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  return mousePosition
}
