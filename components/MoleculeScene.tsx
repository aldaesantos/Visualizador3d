import React, { useRef, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { MoleculeData } from '../types';
import { ELEMENT_COLORS, ELEMENT_RADII } from '../constants';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MoleculeSceneProps {
  molecule: MoleculeData;
}

const AtomMesh: React.FC<{
  position: [number, number, number];
  element: string;
}> = ({ position, element }) => {
  const color = ELEMENT_COLORS[element] || '#ccc';
  const radius = ELEMENT_RADII[element] || 0.5;
  const [hovered, setHovered] = useState(false);
  
  return (
    <mesh 
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.3}
        emissive={hovered ? '#444' : '#000'}
      />
      {/* Label for the atom */}
      <Html distanceFactor={15}>
        <div className={`text-xs font-bold text-white bg-black/50 px-1 rounded select-none pointer-events-none transition-opacity duration-200 ${hovered ? 'opacity-100 scale-110' : 'opacity-50'}`}>
          {element}
        </div>
      </Html>
    </mesh>
  );
};

const BondMesh: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
  order?: number;
}> = ({ start, end, order = 1 }) => {
  const [hovered, setHovered] = useState(false);
  
  const startVec = new THREE.Vector3(...start);
  const endVec = new THREE.Vector3(...end);
  const direction = new THREE.Vector3().subVectors(endVec, startVec);
  const length = direction.length();
  
  // Calculate center position
  const position = new THREE.Vector3().addVectors(startVec, endVec).multiplyScalar(0.5);
  
  // Calculate orientation using quaternion
  const quaternion = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  quaternion.setFromUnitVectors(up, direction.clone().normalize());

  const radius = 0.15;
  const offset = 0.12; // Separation for multiple bonds
  
  const bondColor = hovered ? '#38bdf8' : '#888'; // Highlight color

  const getBondLabel = (ord: number) => {
      if (ord === 3) return "Ligação Tripla";
      if (ord === 2) return "Ligação Dupla";
      return "Ligação Simples";
  }

  const handlePointerOver = (e: any) => {
      e.stopPropagation();
      setHovered(true);
  }

  const handlePointerOut = (e: any) => {
      e.stopPropagation();
      setHovered(false);
  }

  const renderCylinders = () => {
      if (order === 3) {
           // Triple Bond: One center, two offset
           // Need perpendicular vector
           const arbitrary = new THREE.Vector3(1, 0, 0);
           if (Math.abs(direction.dot(arbitrary)) > 0.9) arbitrary.set(0, 1, 0);
           const perp = new THREE.Vector3().crossVectors(direction, arbitrary).normalize().multiplyScalar(offset);
           
           const pos1 = position.clone().add(perp);
           const pos2 = position.clone().sub(perp);
           
           return (
             <group>
                <mesh position={position} quaternion={quaternion}>
                     <cylinderGeometry args={[radius * 0.7, radius * 0.7, length, 12]} />
                     <meshStandardMaterial color={bondColor} />
                 </mesh>
                 <mesh position={pos1} quaternion={quaternion}>
                     <cylinderGeometry args={[radius * 0.6, radius * 0.6, length, 12]} />
                     <meshStandardMaterial color={bondColor} />
                 </mesh>
                 <mesh position={pos2} quaternion={quaternion}>
                     <cylinderGeometry args={[radius * 0.6, radius * 0.6, length, 12]} />
                     <meshStandardMaterial color={bondColor} />
                 </mesh>
             </group>
           )
      } else if (order === 2) {
          // Double Bond: Two offset
          const arbitrary = new THREE.Vector3(1, 0, 0);
          if (Math.abs(direction.dot(arbitrary)) > 0.9) arbitrary.set(0, 1, 0);
          const perp = new THREE.Vector3().crossVectors(direction, arbitrary).normalize().multiplyScalar(offset);
          
          const pos1 = position.clone().add(perp);
          const pos2 = position.clone().sub(perp);
    
          return (
            <group>
                 <mesh position={pos1} quaternion={quaternion}>
                    <cylinderGeometry args={[radius * 0.8, radius * 0.8, length, 12]} />
                    <meshStandardMaterial color={bondColor} />
                </mesh>
                <mesh position={pos2} quaternion={quaternion}>
                    <cylinderGeometry args={[radius * 0.8, radius * 0.8, length, 12]} />
                    <meshStandardMaterial color={bondColor} />
                </mesh>
            </group>
          )
      } else {
        // Single Bond
        return (
            <mesh position={position} quaternion={quaternion}>
              <cylinderGeometry args={[radius, radius, length, 12]} />
              <meshStandardMaterial color={bondColor} />
            </mesh>
        );
      }
  }

  return (
    <group 
        onPointerOver={handlePointerOver} 
        onPointerOut={handlePointerOut}
    >
      {renderCylinders()}
      {hovered && (
          <Html position={position} distanceFactor={10} zIndexRange={[100, 0]}>
              <div className="bg-science-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg whitespace-nowrap">
                  {getBondLabel(order)}
              </div>
          </Html>
      )}
    </group>
  );
};

const MoleculeGroup: React.FC<{ molecule: MoleculeData }> = ({ molecule }) => {
  const groupRef = useRef<THREE.Group>(null);

  // Auto-rotate logic slightly
  useFrame((state) => {
    if (groupRef.current) {
        groupRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={groupRef}>
      {molecule.atoms.map((atom) => (
        <AtomMesh key={atom.id} position={atom.position} element={atom.element} />
      ))}
      {molecule.bonds.map((bond, idx) => {
        const sourceAtom = molecule.atoms.find(a => a.id === bond.source);
        const targetAtom = molecule.atoms.find(a => a.id === bond.target);
        
        if (!sourceAtom || !targetAtom) return null;

        return (
          <BondMesh
            key={`bond-${idx}`}
            start={sourceAtom.position}
            end={targetAtom.position}
            order={bond.order}
          />
        );
      })}
    </group>
  );
};

const SceneControls = () => {
  const { camera, gl } = useThree();
  const controlsRef = useRef<any>(null);

  const handleZoomIn = () => {
    if (controlsRef.current) {
        // Dolly in (move camera closer)
        const dist = controlsRef.current.getDistance();
        controlsRef.current.dollyIn(1.2);
        controlsRef.current.update();
    }
  };

  const handleZoomOut = () => {
      if (controlsRef.current) {
          controlsRef.current.dollyOut(1.2);
          controlsRef.current.update();
      }
  };

  const handleReset = () => {
      if (controlsRef.current) {
          controlsRef.current.reset();
          camera.position.set(0, 0, 8);
          controlsRef.current.update();
      }
  }

  return (
      <>
        <OrbitControls ref={controlsRef} makeDefault minDistance={3} maxDistance={20} />
        <Html position={[0,0,0]} style={{ pointerEvents: 'none' }} fullscreen zIndexRange={[0, 10]}>
            <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-auto">
                <button onClick={handleZoomIn} className="bg-slate-800/80 p-2 rounded-lg text-white hover:bg-science-600 transition-colors border border-white/10" title="Aproximar">
                    <ZoomIn size={20} />
                </button>
                <button onClick={handleZoomOut} className="bg-slate-800/80 p-2 rounded-lg text-white hover:bg-science-600 transition-colors border border-white/10" title="Afastar">
                    <ZoomOut size={20} />
                </button>
                 <button onClick={handleReset} className="bg-slate-800/80 p-2 rounded-lg text-white hover:bg-science-600 transition-colors border border-white/10" title="Resetar Câmera">
                    <RotateCcw size={20} />
                </button>
            </div>
        </Html>
      </>
  )
}

export const MoleculeScene: React.FC<MoleculeSceneProps> = ({ molecule }) => {
  return (
    <div className="w-full h-full bg-gradient-to-b from-slate-900 to-slate-800 rounded-xl overflow-hidden shadow-2xl relative">
       {/* Legend Overlay */}
       <div className="absolute top-4 right-4 bg-black/60 p-3 rounded-lg backdrop-blur-sm z-10 border border-white/10">
          <h4 className="text-xs font-bold text-white mb-2 uppercase tracking-wider">Elementos</h4>
          <div className="space-y-1">
             {Object.entries(ELEMENT_COLORS).map(([elem, color]) => (
                 <div key={elem} className="flex items-center gap-2">
                     <div className="w-3 h-3 rounded-full shadow-sm border border-white/20" style={{backgroundColor: color}}></div>
                     <span className="text-xs text-gray-200">{elem}</span>
                 </div>
             ))}
          </div>
       </div>

      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0ea5e9" />
        
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
           <MoleculeGroup molecule={molecule} />
        </Float>
        
        <SceneControls />
        <Environment preset="city" />
      </Canvas>
      
      <div className="absolute bottom-4 left-4 text-white/40 text-xs pointer-events-none bg-black/30 px-2 py-1 rounded">
         Passe o mouse sobre as ligações para detalhes
      </div>
    </div>
  );
};