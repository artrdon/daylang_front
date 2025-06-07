import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { color } from 'three/tsl'

function Smiley({upValue}) {
  // Создаем текстуру для глаза (черный круг)

  const smallEyeTexture = new THREE.CanvasTexture(
    createCircleCanvas(12, '#221000')
  );

  const eyeTexture = new THREE.CanvasTexture(
    createCircleCanvas(42, 'white')
  );
  
  // Создаем текстуру для рта (улыбка)
  const mouthTexture = new THREE.CanvasTexture(
    createMouthCanvas(128, 'black')
  );
  const mouthRefUp = useRef();
  const mouthRefDown = useRef();
  const random = useRef(0);
  const isRandom = useRef(true);
  const leftminiEye = useRef();
  const rightminiEye = useRef();
  const leftEyeRef = useRef();
  const rightEyeRef = useRef();
  const blinkTimer = useRef(0);
  const isBlinking = useRef(false);
  function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  useFrame((state, delta) => {
  
    blinkTimer.current += delta
    
    // Каждые 3 секунды запускаем мигание
    if (isRandom.current){
      random.current = randomIntFromInterval(2, 7);
      isRandom.current = false;
    }
    if (blinkTimer.current > random.current) {
      leftEyeRef.current.color.set('yellow'); 
      rightEyeRef.current.color.set('yellow');
      leftminiEye.current.visible = false;
      rightminiEye.current.visible = false;
    }
    if (blinkTimer.current > random.current + 0.3) {
      leftEyeRef.current.color.set('white'); 
      rightEyeRef.current.color.set('white');
      leftminiEye.current.visible = true;
      rightminiEye.current.visible = true;
      blinkTimer.current = 0;
      isRandom.current = true;
    }
    
   // console.log("upValue: ", upValue);
    // Плавно меняем рот между улыбкой и грустью
    if (mouthRefUp.current) {
      mouthRefUp.current.position.y = THREE.MathUtils.lerp(
        mouthRefUp.current.position.y,
        upValue,
        1
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
      <mesh position={[-0.3, 0.3, 0.8]} rotation={[Math.PI/2, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial ref={leftEyeRef} color={"white"} />
      </mesh>
      <mesh position={[-0.3, 0.3, 0.95]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial ref={leftminiEye} map={smallEyeTexture} />
      </mesh>

      {/* Правый глаз */}
      <mesh position={[0.3, 0.3, 0.8]} rotation={[Math.PI/2, 0, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial ref={rightEyeRef} color={"white"} />
      </mesh>
      <mesh position={[0.3, 0.3, 0.95]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial ref={rightminiEye} map={smallEyeTexture} />
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
  canvas.height = size * 2
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
      <Canvas camera={{ position: [0, 0, 3], fov: 70 }}>
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} />
        <Smiley upValue={upValue}/>
        <OrbitControls />
      </Canvas>
    </div>
  )
}

export default SmileTest