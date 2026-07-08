import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* Muratina liquid spec in 3D: pale milky-tea, translucent, hazy.
   Two stacked materials fake the cloudiness cheaply (no shaders,
   no transmission) so it runs on low-end Android GPUs. */
const LIQUID = "#E2C39E";
const LIQUID_LIGHT = "#F0DFC4";
const GLASS = "#FDFBF4";

function Liquid({ radius, maxHeight, fraction, y }) {
  const mesh = useRef();
  const haze = useRef();
  useFrame(() => {
    if (!mesh.current) return;
    const target = Math.max(fraction.current, 0.001);
    const cur = mesh.current.scale.y;
    const next = THREE.MathUtils.lerp(cur, target, 0.12);
    mesh.current.scale.y = next;
    mesh.current.position.y = y + (next * maxHeight) / 2;
    mesh.current.visible = next > 0.005;
    if (haze.current) {
      haze.current.scale.y = next;
      haze.current.position.y = mesh.current.position.y + 0.01;
      haze.current.visible = mesh.current.visible;
    }
  });
  return (
    <group>
      <mesh ref={mesh} scale={[1, 0.001, 1]}>
        <cylinderGeometry args={[radius, radius, maxHeight, 28]} />
        <meshStandardMaterial color={LIQUID} transparent opacity={0.62} roughness={0.35} />
      </mesh>
      <mesh ref={haze} scale={[0.93, 0.001, 0.93]}>
        <cylinderGeometry args={[radius, radius, maxHeight, 20]} />
        <meshStandardMaterial color={LIQUID_LIGHT} transparent opacity={0.28} roughness={0.9} />
      </mesh>
    </group>
  );
}

function Glass({ radius, height, y, thicknessTint = 0.14 }) {
  return (
    <mesh position={[0, y + height / 2, 0]}>
      <cylinderGeometry args={[radius * 1.06, radius * 1.06, height, 28, 1, true]} />
      <meshStandardMaterial
        color={GLASS}
        transparent
        opacity={thicknessTint}
        roughness={0.15}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Stream({ pouring }) {
  const mesh = useRef();
  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const target = pouring.current ? 1 : 0.001;
    mesh.current.scale.x = THREE.MathUtils.lerp(mesh.current.scale.x, target, 0.2);
    mesh.current.scale.z = mesh.current.scale.x;
    mesh.current.visible = mesh.current.scale.x > 0.02;
    // subtle waver so it reads as liquid
    mesh.current.position.x = 0.62 + Math.sin(clock.elapsedTime * 9) * 0.008;
  });
  return (
    <mesh ref={mesh} position={[0.62, -0.15, 0.9]} scale={[0.001, 1, 0.001]}>
      <cylinderGeometry args={[0.05, 0.065, 2.35, 10]} />
      <meshStandardMaterial color={LIQUID} transparent opacity={0.7} roughness={0.3} />
    </mesh>
  );
}

function Tap({ onTap, pouring }) {
  const handle = useRef();
  useFrame(() => {
    if (!handle.current) return;
    const target = pouring.current ? -Math.PI / 3 : 0;
    handle.current.rotation.z = THREE.MathUtils.lerp(handle.current.rotation.z, target, 0.15);
  });
  return (
    <group
      position={[0.62, 1.02, 0.9]}
      onClick={(e) => {
        e.stopPropagation();
        onTap();
      }}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "")}
    >
      {/* spout */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.12]}>
        <cylinderGeometry args={[0.09, 0.09, 0.5, 12]} />
        <meshStandardMaterial color="#9A7B2F" roughness={0.35} metalness={0.5} />
      </mesh>
      {/* handle */}
      <group ref={handle} position={[0, 0.1, 0.28]}>
        <mesh position={[0, 0.14, 0]}>
          <boxGeometry args={[0.06, 0.3, 0.06]} />
          <meshStandardMaterial color="#3A2C1E" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0.3, 0]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshStandardMaterial color="#C6A85C" roughness={0.3} metalness={0.4} />
        </mesh>
      </group>
      {/* generous invisible hit target */}
      <mesh visible={false}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshBasicMaterial />
      </mesh>
    </group>
  );
}

function Scene({ litersRef, capacity, pouringRef, onTap, sourceLiters }) {
  const cupFraction = useRef(0);
  const kegFraction = useRef(1);
  useFrame(() => {
    cupFraction.current = Math.min(litersRef.current / capacity, 1);
    kegFraction.current = Math.max((sourceLiters - litersRef.current) / sourceLiters, 0);
  });

  return (
    <group position={[0, -0.2, 0]}>
      <ambientLight intensity={0.9} />
      <directionalLight position={[3, 5, 4]} intensity={1.1} color={"#fdf6e3"} />
      <directionalLight position={[-4, 2, -2]} intensity={0.35} color={"#c6a85c"} />

      {/* Source keg — the 20L Reserve */}
      <group position={[0, 1.05, 0]}>
        <Glass radius={1.05} height={2.1} y={-1.05} thicknessTint={0.12} />
        <Liquid radius={0.98} maxHeight={2.0} fraction={kegFraction} y={-1.0} />
        {/* gold hoops */}
        {[-0.85, 0.85].map((yy) => (
          <mesh key={yy} position={[0, yy, 0]}>
            <torusGeometry args={[1.13, 0.03, 8, 40]} />
            <meshStandardMaterial color="#9A7B2F" metalness={0.5} roughness={0.35} />
          </mesh>
        ))}
        {/* wooden lid */}
        <mesh position={[0, 1.08, 0]}>
          <cylinderGeometry args={[1.12, 1.12, 0.1, 28]} />
          <meshStandardMaterial color="#3A2C1E" roughness={0.7} />
        </mesh>
        <Tap onTap={onTap} pouring={pouringRef} />
      </group>

      <Stream pouring={pouringRef} />

      {/* Receiving cup */}
      <group position={[0.62, -2.15, 0.9]}>
        <Glass radius={0.55} height={1.15} y={0} thicknessTint={0.16} />
        <Liquid radius={0.5} maxHeight={1.05} fraction={cupFraction} y={0.06} />
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.58, 0.62, 0.08, 24]} />
          <meshStandardMaterial color="#3A2C1E" roughness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

export default function Pour3D({ litersRef, pouringRef, capacity, sourceLiters, onTap }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0.4, 0.3, 6.4], fov: 42 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      style={{ touchAction: "pan-y" }}
    >
      <Scene
        litersRef={litersRef}
        pouringRef={pouringRef}
        capacity={capacity}
        sourceLiters={sourceLiters}
        onTap={onTap}
      />
    </Canvas>
  );
}
