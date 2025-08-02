'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useMousePosition } from '@/lib/hooks/useMousePosition'
import { useIsMobile } from '@/lib/hooks/useIsMobile'

// Firefly component to create individual glowing insects
const Firefly = ({
  position,
  size,
  color,
  speed,
  blinkRate,
}: {
  position: [number, number, number]
  size: number
  color: string
  speed: number
  blinkRate: number
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const initialPosition = useMemo(() => new THREE.Vector3(...position), [position])
  const phaseShift = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return

    const t = state.clock.getElapsedTime() * speed

    // Create an erratic, natural firefly path
    const xMovement = Math.sin(t + phaseShift) * 1.5
    const yMovement = Math.cos(t * 0.6 + phaseShift) * 1 + Math.sin(t * 0.3) * 0.5
    const zMovement = Math.sin(t * 0.9 + phaseShift * 1.5) * 1.2

    // Update position
    meshRef.current.position.set(
      initialPosition.x + xMovement,
      initialPosition.y + yMovement,
      initialPosition.z + zMovement
    )

    // Create sharp blink pattern
    const blinkPhase = state.clock.elapsedTime * blinkRate + phaseShift
    const blinkPower = Math.pow(0.5 + 0.5 * Math.sin(blinkPhase), 16)
    const scaleFactor = 0.5 + blinkPower * 1.5

    // Apply scale and intensity changes
    meshRef.current.scale.set(scaleFactor * size, scaleFactor * size, scaleFactor * size)

    // Access the material and update its opacity and emissive intensity
    const material = meshRef.current.material as THREE.MeshStandardMaterial
    if (material) {
      material.opacity = 0.7 + blinkPower * 0.3
      material.emissiveIntensity = 0.5 + blinkPower * 5.0
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={5}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// Main component for all fireflies and background particles
export function InteractiveBackground() {
  const { x, y } = useMousePosition()
  const groupRef = useRef<THREE.Group>(null)
  const isMobile = useIsMobile();

  // Generate firefly data
  const fireflies = useMemo(() => {
    const count = isMobile ? 18 : 35;
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        key: i,
        position: [
          (Math.random() - 0.5) * (isMobile ? 18 : 30),
          (Math.random() - 0.5) * (isMobile ? 10 : 20),
          (Math.random() - 0.8) * (isMobile ? 8 : 15),
        ] as [number, number, number],
        size: Math.random() * (isMobile ? 0.11 : 0.15) + 0.08,
        color: ['#e0e0a0', '#a6e0a7', '#70d6ad'][Math.floor(Math.random() * 3)],
        speed: Math.random() * 0.5 + 0.3,
        blinkRate: Math.random() * 1.5 + 0.5,
      });
    }
    return data;
  }, [isMobile]);

  // Add subtle group movement based on mouse
  useFrame(() => {
    if (groupRef.current && x !== null && y !== null) {
      const mouseX = (x / window.innerWidth) * 2 - 1
      const mouseY = -(y / window.innerHeight) * 2 + 1

      // Gentle rotation of the entire firefly group
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouseY * 0.03,
        0.02
      )

      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mouseX * 0.03,
        0.02
      )
    }
  })

  return (
    <>
      {/* Main firefly group */}
      <group ref={groupRef}>
        {/* Individual fireflies with glow */}
        {fireflies.map((fly) => (
          <Firefly
            key={fly.key}
            position={fly.position}
            size={fly.size}
            color={fly.color}
            speed={fly.speed}
            blinkRate={fly.blinkRate}
          />
        ))}

        {/* Additional light sources to enhance atmosphere */}
        <ambientLight intensity={0.02} color="#122845" />

        {/* Distant fog effect */}
        <fog args={['#122845', 20, 40]} />
      </group>
    </>
  )
}
