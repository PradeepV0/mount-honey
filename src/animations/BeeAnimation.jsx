import { useRef, useMemo, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF } from '@react-three/drei'
import * as THREE from 'three'
import { SkeletonUtils } from 'three-stdlib'
import honeybeeUrl from '../assests/bees/honeybee/source/honeybee.glb'

const BEE_COUNT = 8
const BEE_SCALE = 0.018
const Z_LAYERS = [3.0, 1.5, 0.5, 3.5, 1.0, 2.5, 0.0, 2.0]

const lerp = (a, b, t) => a + (b - a) * t
const smoothstep = (t) => t * t * (3 - 2 * t)

useGLTF.preload(honeybeeUrl)

function BeeInstance({ seed }) {
  const groupRef    = useRef()
  const mixerRef    = useRef(null)
  const materialsRef = useRef([])  // cached once — no per-frame traverse

  const { scene, animations } = useGLTF(honeybeeUrl)
  const { viewport } = useThree()
  const clonedScene  = useMemo(() => SkeletonUtils.clone(scene), [scene])

  useEffect(() => {
    // Cache all materials once so useFrame never traverses the scene graph
    const mats = []
    clonedScene.traverse((node) => {
      if (!node.isMesh || !node.material) return
      const arr = Array.isArray(node.material) ? node.material : [node.material]
      arr.forEach((m) => {
        m.transparent = true
        mats.push(m)
      })
    })
    materialsRef.current = mats

    if (!animations?.length) return
    const mixer = new THREE.AnimationMixer(clonedScene)
    animations.forEach((clip) => mixer.clipAction(clip).play())
    mixerRef.current = mixer
    return () => { mixer.stopAllAction(); mixerRef.current = null }
  }, [clonedScene, animations])

  const path = useMemo(() => {
    const rng = (n) => Math.abs(Math.sin(seed * 9.3 + n * 137.5))
    const w = viewport.width
    const h = viewport.height
    const zone   = (seed - 1) % 3
    const zMin   = -h / 2 + zone * (h / 3)
    const zMax   = zMin + h / 3
    const sy     = zMin + rng(1) * (zMax - zMin) * 0.85 + (zMax - zMin) * 0.075
    const sx     = (rng(0) - 0.5) * w * 0.88
    const baseZ  = Z_LAYERS[(seed - 1) % Z_LAYERS.length]
    return {
      xPath: [sx, sx+(rng(2)-0.5)*w*0.40, sx+(rng(3)-0.5)*w*0.38, sx+(rng(4)-0.5)*w*0.40, sx+(rng(5)-0.5)*w*0.36, sx],
      yPath: [sy, sy+(rng(6)-0.5)*h*0.13, sy+(rng(7)-0.5)*h*0.15, sy+(rng(8)-0.5)*h*0.12, sy+(rng(9)-0.5)*h*0.13, sy],
      baseZ,
      duration:   10 + rng(13) * 14,
      timeOffset: rng(14) * 24,
      baseOpacity: 0.80 + rng(17) * 0.20,
    }
  }, [seed, viewport.width, viewport.height])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    mixerRef.current?.update(delta)

    const elapsed = state.clock.elapsedTime + path.timeOffset
    const t = ((elapsed % path.duration) / path.duration + 1) % 1
    const segs = path.xPath.length - 1
    const seg  = Math.min(Math.floor(t * segs), segs - 1)
    const segT = smoothstep(t * segs - seg)

    const x = lerp(path.xPath[seg], path.xPath[seg + 1], segT)
    const y = lerp(path.yPath[seg], path.yPath[seg + 1], segT)
    const bob    = Math.sin(state.clock.elapsedTime * 3.5 + seed) * 0.05
    const zDrift = Math.sin(state.clock.elapsedTime * 0.6 + seed * 1.3) * 0.4

    groupRef.current.position.set(x, y + bob, path.baseZ + zDrift)

    const dx = path.xPath[Math.min(seg + 1, segs)] - path.xPath[seg]
    if (Math.abs(dx) > 0.001) {
      const targetY = dx > 0 ? 0 : Math.PI
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.06)
    }

    // Update opacity — iterates cached array only, no traverse
    const fadeZone = 0.07
    let alpha = 1
    if (t < fadeZone) alpha = t / fadeZone
    else if (t > 1 - fadeZone) alpha = (1 - t) / fadeZone
    const opacity = alpha * path.baseOpacity
    for (let i = 0; i < materialsRef.current.length; i++) {
      materialsRef.current[i].opacity = opacity
    }
  })

  return (
    <group ref={groupRef} scale={BEE_SCALE}>
      <primitive object={clonedScene} />
    </group>
  )
}

function BeesScene() {
  return (
    <>
      <ambientLight intensity={1.8} color="#FFF5DC" />
      <directionalLight position={[3, 5, 3]} intensity={2.5} color="#FFD700" />
      <pointLight position={[-4, 2, 2]} intensity={0.8} color="#F4B400" />
      {Array.from({ length: BEE_COUNT }, (_, i) => (
        <Suspense key={i} fallback={null}>
          <BeeInstance seed={i + 1} />
        </Suspense>
      ))}
    </>
  )
}

export default function BeeAnimation() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden" style={{ zIndex: 15 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
        dpr={1}
      >
        <BeesScene />
      </Canvas>
    </div>
  )
}
