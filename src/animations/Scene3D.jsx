import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/* Single floating hexagon particle */
function HexParticle({ position, scale, speed, opacity }) {
  const mesh = useRef()

  useFrame((state) => {
    if (!mesh.current) return
    mesh.current.rotation.z = state.clock.elapsedTime * speed * 0.25
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.18) * 0.3
  })

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={mesh} position={position} scale={scale}>
        <cylinderGeometry args={[0.5, 0.5, 0.12, 6]} />
        <meshStandardMaterial
          color="#F4B400"
          metalness={0.75}
          roughness={0.25}
          transparent
          opacity={opacity}
        />
      </mesh>
    </Float>
  )
}

/* Golden particle dust */
function ParticleDust() {
  const points = useRef()
  const count  = 120

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 14
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!points.current) return
    points.current.rotation.y = state.clock.elapsedTime * 0.025
    points.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.015) * 0.1
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#F4B400"
        size={0.05}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  )
}

function Scene() {
  const hexagons = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        position: [
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 5 - 3,
        ],
        scale: 0.08 + Math.random() * 0.28,
        speed: 0.25 + Math.random() * 0.65,
        opacity: 0.2 + Math.random() * 0.5,
      })),
    []
  )

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 6, 4]} intensity={1.2} color="#F4B400" />
      <pointLight position={[-6, -4, -4]} intensity={0.5} color="#D89C0D" />

      <ParticleDust />

      {hexagons.map((h) => (
        <HexParticle
          key={h.id}
          position={h.position}
          scale={h.scale}
          speed={h.speed}
          opacity={h.opacity}
        />
      ))}
    </>
  )
}

/* Lightweight 3D scene overlay — placed as full-viewport background */
export default function Scene3D({ className = '' }) {
  return (
    <div
      className={`pointer-events-none ${className}`}
      style={{ position: 'absolute', inset: 0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  )
}
