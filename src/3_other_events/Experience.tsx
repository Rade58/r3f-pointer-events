import { useRef } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";

import { MeshStandardMaterial, type Mesh } from "three";

import { OrbitControls /* Stage */ } from "@react-three/drei";

// import { Perf } from "r3f-perf";

// import { useControls } from "leva";

export function Experience() {
  // ------------------------------------------------------------
  // Event Handlers
  // ------------------------------------------------------------
  function clickEventHandler(ev: ThreeEvent<MouseEvent>) {
    console.log("Click", ev);

    // setting random color on the mesh
    ((ev.object as Mesh).material as MeshStandardMaterial).color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  // Other Event Handlers
  function handler(ev: ThreeEvent<MouseEvent>) {
    ((ev.object as Mesh).material as MeshStandardMaterial).color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------
  function otherHandler(ev: MouseEvent) {
    console.log({ ev });

    if (cubeRef.current) {
      (cubeRef.current.material as MeshStandardMaterial).color.set(
        `hsl(${Math.random() * 360}, 100%, 75%)`
      );
    }
  }
  // ------------------------------------------------------------
  // ------------------------------------------------------------

  // const someControls = useControls("_", { test: 1 });

  const cubeRef = useRef<Mesh>(null);
  // const sphereRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    // const elapsed: number = state.clock.getElapsedTime();

    if (cubeRef.current) {
      cubeRef.current.rotation.y += delta;
    }
  });

  return (
    <>
      {/* <Perf position="top-left" /> */}

      <OrbitControls makeDefault />

      {/* ---------------------------------- */}
      <directionalLight castShadow position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.5} />
      {/* ---------------------------------- */}

      {/* CUBE */}

      <mesh
        // onClick={clickEventHandler}
        // onContextMenu={handler}
        // onDoubleClick={handler}
        // onPointerUp={handler}
        // onPointerDown={handler}
        // ----------------------------
        // SAME (no difference since this is not native javascript)
        // onPointerOver={handler}
        // onPointerEnter={handler}
        // ----------------------------
        // SAME (no difference since this is not native javascript)
        // onPointerOut={handler}
        // onPointerLeave={handler}
        // ----------------------------
        // onPointerMove={handler}
        // ----------------------------
        // if you click on this mesh
        // it won't be triggered
        // if you click around it will be triggered (very interesting)
        onPointerMissed={otherHandler}
        //
        position={[2, 0, 0]}
        ref={cubeRef}
        scale={1.5}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      {/* SPHERE */}
      <mesh position={[-2, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial args={[{ color: "orange" }]} />
      </mesh>
      {/* FLOOR */}
      <mesh
        rotation={[-Math.PI * 0.5, 0, 0]}
        scale={10}
        position-y={-1}
        // visible={false}
      >
        <planeGeometry />
        <meshStandardMaterial args={[{ color: "greenyellow" }]} />
      </mesh>

      {/* ---------------------------------------------------- */}
    </>
  );
}
