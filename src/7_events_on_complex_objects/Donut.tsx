import { useGLTF } from "@react-three/drei";
import { ThreeEvent } from "@react-three/fiber";
import { Mesh, MeshStandardMaterial } from "three";

export function Donut() {
  const model = useGLTF("/models/donut_with_glaze.glb");
  function clickEventHandler(ev: ThreeEvent<MouseEvent>) {
    // console.log("Click", ev);

    ev.stopPropagation();

    // setting random color on the mesh
    if (ev.object instanceof Mesh) {
      (ev.object.material as MeshStandardMaterial).color.set(
        `hsl(${Math.random() * 360}, 100%, 75%)`
      );
    }

    console.log("click");
  }

  function enter(ev: ThreeEvent<MouseEvent>) {
    ev.stopPropagation();

    console.log(ev.object);
    // console.log(ev.object.name);
    if (ev.object instanceof Mesh) {
      ev.object.scale.setScalar(1.2);
    }
  }
  function leave(ev: ThreeEvent<MouseEvent>) {
    ev.stopPropagation();

    console.log(ev.object.name);
    if (ev.object instanceof Mesh) {
      ev.object.scale.setScalar(1);
    }
  }

  return (
    <primitive
      object={model.scene}
      position-y={1}
      position-x={-0.4}
      scale={12}
      //
      onClick={clickEventHandler}
      //
      onPointerEnter={enter}
      onPointerLeave={leave}
    />
  );
}
