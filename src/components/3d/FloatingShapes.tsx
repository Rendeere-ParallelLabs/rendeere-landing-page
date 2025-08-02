'use client'

import { useRef, useState, useEffect, useMemo  } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, Float } from '@react-three/drei'
import * as THREE from 'three'
import React from 'react'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

type ShapeProps = {
  position: [number, number, number]
  rotation?: [number, number, number]
  color?: string
  scale?: number
  speed?: number
  url?: string // prop to send the path to the .glb model
}

const Icosahedron = ({ position, color, scale = 1, speed = 1 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.sin(time * 0.2 * speed) * 0.2
    meshRef.current.rotation.y = Math.sin(time * 0.3 * speed) * 0.2
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={2}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.8} />
      </mesh>
    </Float>
  )
}

const Octahedron = ({ position, color, scale = 1, speed = 1 }: ShapeProps) => {
  const meshRef = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    const time = state.clock.getElapsedTime()
    meshRef.current.rotation.x = Math.cos(time * 0.2 * speed) * 0.2
    meshRef.current.rotation.z = Math.sin(time * 0.3 * speed) * 0.2
  })

  return (
    <Float
      speed={1}
      rotationIntensity={0.3}
      floatIntensity={1}
    >
      <mesh ref={meshRef} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.6} />
      </mesh>
    </Float>
  )
}


export const GLBShape = ({
  position,
  rotation,
  scale = 1,
  speed = 1,
  url,
}: ShapeProps) => {
  const groupRef = useRef<THREE.Group>(null!)
  const gltf = useGLTF(url ?? '') as { scene: THREE.Group }

  const clonedScene = useMemo(() => {
    if (!gltf.scene) {
      console.warn('No scene found in GLB')
      return new THREE.Group()
    }

    const clone = gltf.scene.clone(true)
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        child.castShadow = true
        child.receiveShadow = true
      }
    })
    return clone
  }, [gltf.scene])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.cos(t * 0.2 * speed) * 0.2
      groupRef.current.rotation.z = Math.sin(t * 0.3 * speed) * 0.2
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={1}>
      <primitive
        object={clonedScene}
        ref={groupRef}
        position={position}
        scale={scale}
        rotation={rotation}
      />
    </Float>
  )
}

useGLTF.preload('/3dmodels/axis.glb')

export const FloatingShapes = React.memo(function FloatingShapes() {
  const isMobile = useIsMobile();

  if (isMobile) {
    // Mostrar solo un objeto (ajusta el Icosahedron si prefieres otro)
    return (
      <>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />
        <GLBShape
          position={[-1.8, 2.5, -5]}
          scale={0.4}
          speed={1}
          url="/3dmodels/axis.glb"
        />
        <GLBShape
          position={[1.7, 1, -5]}
          scale={0.4}
          speed={1}
          rotation={[0, 3, 0]}
          url="/3dmodels/axis.glb"
        />
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#ffffff" />

      <GLBShape
        position={[-3, 2, -5]}
        scale={0.6}
        speed={1}
        url="/3dmodels/axis.glb"
      />
      {/* <GLBShape
        position={[5, -1, -3]}
        scale={0.6}
        speed={1}
        url="/3dmodels/axis.glb"
      /> */}
      <Octahedron
        position={[-4, -2, -4]}
        color="#1f909c"
        scale={0.9}
        speed={1}
      />
      <Icosahedron
        position={[3.5, 1.5, -8]}
        color="#70d6ad"
        scale={0.8}
        speed={0.9}
      />
    </>
  )
})
