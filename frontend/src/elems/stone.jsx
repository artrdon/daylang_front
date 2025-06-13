import React from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';



const MoaiStatue = () => {
  return (
    <div style={{width: "100vw", height: "100svh"}}>
      <Canvas 
        shadows 
        camera={{ position: [0, 2, 5], fov: 50 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          position={[5, 10, 7]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        
        
        <OrbitControls 
          enableDamping
          dampingFactor={0.05}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
        />
        
        <Moai />
        
      </Canvas>
    </div>
    
  );
};

const Moai = React.memo(() => {
  const groupRef = React.useRef();
  
  // Анимация небольшого покачивания
  useFrame(({ clock }) => {
   /* if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }*/
  });

  const stoneMaterial = (
    <meshStandardMaterial 
      color="#8B8B83" 
      roughness={1} 
      metalness={0} 
    
    />
  );
  const hernjaMaterial = (
    <meshStandardMaterial 
      color="#7b7b73" 
      roughness={1} 
      metalness={0} 
    
    />
  );

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Основная голова */}
      <mesh castShadow position={[0, 0, 0]}>
        <boxGeometry args={[1.5, 2, 1.2]} />
        {stoneMaterial}
      </mesh>
      
      {/* Лоб */}
      <mesh castShadow position={[0, 0.85, 0.2]}>
        <boxGeometry args={[1.5, 0.3, 1.2]} />
        {stoneMaterial}
      </mesh>
      
      {/* right hernja */}
      <mesh castShadow position={[0.84, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.5]} />
        {hernjaMaterial}
      </mesh>
      
      {/* left hernja */}
      <mesh castShadow position={[-0.84, 0, 0]}>
        <boxGeometry args={[0.2, 1, 0.5]} />
        {hernjaMaterial}
      </mesh>
      

      {/* Нос */}
      <mesh castShadow position={[0, 0.2, 0.6]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.01, 0.35, 0.6, 3,]} />
        <meshStandardMaterial 
          color="#7b7b73"
          roughness={1} 
          metalness={0} 
        />
      </mesh>
      
      {/* Глаз right*/}
      <group>
        <mesh castShadow position={[0.4, 0.3, 0.6]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh castShadow position={[0.4, 0.3, 0.61]}>
          <boxGeometry args={[0.1, 0.075, 0.1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>

      {/* Глаз left */}
      <group>
        <mesh castShadow position={[-0.4, 0.3, 0.6]}>
          <boxGeometry args={[0.3, 0.2, 0.1]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh castShadow position={[-0.4, 0.3, 0.61]}>
          <boxGeometry args={[0.1, 0.075, 0.1]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
      </group>
      
      {/* Брови */}
      <group>
        <mesh castShadow position={[-0.4, 0.45, 0.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.1]} />
          <meshStandardMaterial 
            color="#7b7b73" 
          />
        </mesh>
        <mesh castShadow position={[0.4, 0.45, 0.6]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.4, 0.05, 0.1]} />
          <meshStandardMaterial 
            color="#7b7b73" 
          />
        </mesh>
      </group>
      
      {/* Губы */}
      <mesh castShadow position={[0, -0.3, 0.6]}  rotation={[Math.PI / 6, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.6, 3,]}/>
        <meshStandardMaterial 
          color="#7b7b73"
          roughness={1} 
          metalness={0} 
        />
      </mesh>

      <mesh castShadow position={[0, -0.4, 0.6]}  rotation={[Math.PI / 6, Math.PI, Math.PI / 2]}>
        <cylinderGeometry args={[0.07, 0.07, 0.6, 3,]}/>
        <meshStandardMaterial 
          color="#7b7b73"
          roughness={1} 
          metalness={0} 
        />
      </mesh>


      <mesh castShadow position={[3, 0.2, 0.6]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0, 0.35, 0.6, 4,]} />
        <meshStandardMaterial 
          color="#7b7b73"
          roughness={1} 
          metalness={0} 
        />
      </mesh>

      <mesh castShadow position={[3, 0.2, 0.3]} rotation={[Math.PI, Math.PI / 4, 0]}>
        <cylinderGeometry args={[0.35, 0, 0.6, 4,]} />
        <meshStandardMaterial 
          color="#7b7b73"
          roughness={1} 
          metalness={0} 
        />
      </mesh>
      
      
      
      {/* Основание (тело)
      <mesh castShadow position={[0, -0.2, 0]}>
        <boxGeometry args={[1.8, 1.5, 1.5]} />
        {stoneMaterial}
      </mesh> */}
    </group>
  );
});

export default MoaiStatue;