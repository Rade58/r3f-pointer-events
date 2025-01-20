import { useRef, useState } from "react";
import { ThreeEvent, useFrame } from "@react-three/fiber";

import { MeshStandardMaterial, type Mesh } from "three";

import {
  meshBounds,
  OrbitControls /* Stage */,
  useCursor,
} from "@react-three/drei";

// import { Perf } from "r3f-perf";

// import { useControls } from "leva";

export function Experience() {
  // ----------------------------------------------------------
  // ----------------------------------------------------------
  // Handling mouse enter and leave
  function enter(e: ThreeEvent<MouseEvent>) {
    // console.log({ e });
    // You don't need to do it on the body
    // we can do it on canvas element (you can obtain it with querySelector for example)
    document.body.style.cursor = "pointer";

    ((e.object as Mesh).material as MeshStandardMaterial).color.set(
      `hsl(${Math.random() * 360}, 100%, 75%)`
    );
  }
  function leave(e: ThreeEvent<MouseEvent>) {
    // console.log({ e });
    document.body.style.cursor = "default";

    ((e.object as Mesh).material as MeshStandardMaterial).color.set(
      `hsl(10, 100%, 100%)`
    );
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

  console.log("render");

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
        raycast={meshBounds}
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
        // onPointerMissed={otherHandler}
        //
        // ----------------------------
        // enter and leave
        onPointerEnter={enter}
        onPointerLeave={leave}
        //
        // --------------------------------

        //
        position={[2, 0, 0]}
        ref={cubeRef}
        scale={1.5}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="mediumpurple" />
      </mesh>
      {/* SPHERE */}
      <mesh
        position={[-2, 0, 0]}
        // onClick={clickEventHandlerWithoutPropagation}
        // onPointerEnter={enterLeaveWithoutPropagation}
        // onPointerLeave={enterLeaveWithoutPropagation}
      >
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
