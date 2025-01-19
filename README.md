# R3F Workshops - Pointer events

- Bootstraped with:

```
pnpm create vite
```

- dependancies

```
pnpm add three @react-three/fiber @react-three/drei leva@0.9.34
```

```
pnpm add -D r3f-perf @types/three
```

# Leva @0.9.34

latest version has bug I think, unable to use joystick and color picker (maybe because I'm using react 18)

# About workshop

our demonstrations are using a mouse (or trackpad), but in broader term we are dealing with "pointer events"

# Listening click events

In vanilla threejs we used Raycaster for something like this, where we tested interecting objects we had too put in array.

Well we don't have to do this, since r3f made this process easier and we don't need to implement Raycaster ourself.

**ALL WE NEED TO DO IS ADD `onClick` TO AN OBJECT (like a `<mesh>`) OR A SCENE**

## click event

```ts
console.log("---");
console.log("distance", event.distance); // Distance between camera and hit point
console.log("point", event.point); // Hit point coordinates (in 3D)
console.log("uv", event.uv); // UV coordinates on the geometry (in 2D)
console.log("object", event.object); // The object that triggered the event
console.log("eventObject", event.eventObject); // The object that was listening to the event
console.log("---");
console.log("x", event.x); // 2D screen coordinates of the pointer
console.log("y", event.y); // 2D screen coordinates of the pointer

console.log("---");
console.log("shiftkey", event.shiftKey); // If the SHIFT key was pressed
console.log("ctrlkey", event.ctrlKey); // If the CTRL key was pressed
console.log("metakey", event.metakey); // If the COMMAND key was pressed
```

# Other Events

Check `src/3_other_events/Experience.tsx`

# Interesting events

- `onPointerMissed`
