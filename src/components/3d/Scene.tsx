'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { FloatingShapes } from './FloatingShapes'
import { InteractiveBackground } from './InteractiveBackground'
import dynamic from 'next/dynamic'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

const EffectComposer = dynamic(() => 
  import('@react-three/postprocessing').then((mod) => mod.EffectComposer)
, { ssr: false })

const Bloom = dynamic(() => 
  import('@react-three/postprocessing').then((mod) => mod.Bloom)
, { ssr: false })

const Vignette = dynamic(() => 
  import('@react-three/postprocessing').then((mod) => mod.Vignette)
, { ssr: false })

const { BlendFunction, KernelSize } = await import('postprocessing')

type SceneProps = {
  showBackground?: boolean
}

export function Scene({ showBackground = true }: SceneProps) {
  const isMobile = useIsMobile();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 35 }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          maxWidth: '100vw',
          maxHeight: '100vh',
          overflow: 'hidden',
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'low-power',
        }}
      >
        {showBackground && <InteractiveBackground />}
        <FloatingShapes />
          <EffectComposer>
          <Bloom
            intensity={1.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            kernelSize={KernelSize.LARGE}
            blendFunction={BlendFunction.SCREEN}
          />
          <Vignette
            offset={0.5}
            darkness={0.5}
            blendFunction={BlendFunction.NORMAL}
          />
        </EffectComposer>
      </Canvas>
    </Suspense>
  )
}
