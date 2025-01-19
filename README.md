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
