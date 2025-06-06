import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'

function Smiley({upValue}) {
  // Создаем текстуру для глаза (черный круг)
  const eyeTexture = new THREE.CanvasTexture(
    createCircleCanvas(32, 'black')
  );
  
  // Создаем текстуру для рта (улыбка)
  const mouthTexture = new THREE.CanvasTexture(
    createMouthCanvas(128, 'black')
  );
  const mouthRefUp = useRef();
  const mouthRefDown = useRef();
  const emotionTimer = useRef(0);
  const isHappy = useRef(true);
  
  useFrame((state, delta) => {
    emotionTimer.current += delta
    
    // Каждые 5 секунд меняем эмоцию
    if (emotionTimer.current > 5) {
      isHappy.current = !isHappy.current
      emotionTimer.current = 0
    }
   // console.log("upValue: ", upValue);
    // Плавно меняем рот между улыбкой и грустью
    if (mouthRefUp.current) {
      mouthRefUp.current.position.y = THREE.MathUtils.lerp(
        mouthRefUp.current.position.y,
        upValue,
        delta * 2
      )
    }
  })

  return (
    <group>
      {/* Основная сфера (голова) */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="yellow" />
      </mesh>

      {/* Левый глаз */}
      <mesh position={[-0.35, 0.3, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial map={eyeTexture} />
      </mesh>

      {/* Правый глаз */}
      <mesh position={[0.35, 0.3, 0.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial map={eyeTexture} />
      </mesh>

      {/* Рот (используем тор) */}
      <mesh ref={mouthRefUp} position={[0, -0.1, 0.9]} rotation={[Math.PI + Math.PI*0.04, 0, Math.PI*0.08]}>
        <torusGeometry args={[0.4, 0.02, 16, 32, Math.PI/1.2]} />
        <meshStandardMaterial map={mouthTexture} />
      </mesh>

      <mesh ref={mouthRefDown} position={[0, -0.2, 0.84]} rotation={[Math.PI + Math.PI*0.04, 0, 0]}>
        <torusGeometry args={[0.4, 0.05, 16, 32, Math.PI]} />
        <meshStandardMaterial map={mouthTexture} />
      </mesh>
    </group>
  )
}

// Вспомогательная функция для создания текстуры глаза
function createCircleCanvas(size, color) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/2, 0, Math.PI * 2)
  ctx.fill()
  return canvas
}

// Вспомогательная функция для создания текстуры рта
function createMouthCanvas(size, color) {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size/2
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = color
  ctx.lineWidth = 8
  ctx.beginPath()
  ctx.arc(size/2, size/2, size/3, 0, Math.PI)
  ctx.stroke()
  return canvas
}

function SmileTest({upValue}) {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Smiley upValue={upValue}/>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default SmileTest