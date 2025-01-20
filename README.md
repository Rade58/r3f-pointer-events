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

# `onPointerMissed`

Triggers When the user clicks outside of the object we set handler

We can add it on the `<Canvas>` and it will be triggered if we click (when the click is released) but none of the listen objects have registered a hit

I also registered handler on the canvas, see here: `src/3_other_events/App.tsx`

**THIS IS WHAT IS INTERESTING FOTR THIS EVENT IN CASE WHEN WE REGISTER ONE HANDLER ON CANVAS AND ONE HANDLER ON SOME MESH: IF WE CLICK AROUND (NOT ON THE MESH), EVENTS FOR CANVAS AND MESH WILL TRIGGER, BUT IF WE CLICK ON MESH, NO EVENTS WILL BE TRIGGERED**

# How to know where to use which event?

Let's take an RTS game as an example (Age of Empire or StarCraft)

- When the player clicks on a unit, you want to select it
- When the user drags and drops, you want to draw a rectangle and when it releases you want to select all units inside the rectangle
- When the user clicks again but with the shift key, you want to add to the currently selected units or remove them if they were already selected
- When the user clicks but there is no hit, you want to deselect every unit

# Occluding

If you register on click event handler on the mesh, and if you hide, entirly or partialy the mesh by other random mesh, and if you click on the random mesh, probably raycaster ray will go through the object and event will be triggered

What if we want to occlude the other "random" object

We will register on click event ton that random element too, **And there we will prevent event to be propagated**

`event.stopPropagation()`

# Cursor change

On desktop: We want to transfor cursor into a finger cursor when we hover clickable object

Here we use `onPointerEnter` and `onPointerLeave` events

# Cursor change with `useCursor` helper from drei

we use this with evenet handlers `onPointerOver` and `onPointerOut`

and we need to use useState

**I don't like this, because it causes rerender**

**only place where I would use this is in separate component for entire mesh, making sure that that mesh is being rerender and not entire Experience**

**Author of the workshop isn't using this one, it uses previous solution**

# Events on complex objects

We will test this on our donut, check `src/7_events_on_complex_objects/Donut.tsx`

`<primitive />` is the group under the hood so when we add event handler it is like we are listening events on the group

You can access entire group in the handler with `event.eventObject`

**YOU SHOULD PAY ATTENTON ON PROPAGATION HERE TOO, SINCE IF YOU RAYCASTER RAY INTERSECTS ALL OF THE MESHES OF YOUR MODEL, MULTIPLE CLICK EVENTS WILL BE TRIGGERED, FOR EACHS MODEL MESH THAT IS INTERSECTED BY RAY**

SO WE CAN USE `event.stopPropagation()`

If we console loge from handler, We get multiple console.log for each click because the ray is going through multiple objects at once

Even though we listen to the event on the parent, R3F will test the meshes
inside

Also check the names when you are doing this, with `e.object.name`

**Problem can occur when one object is parent of another one**

todo: Try to find solution in this case, for example problem can occur when donut is parent of icing, and if you want to scale just clicke donut, icing will also sacale, but if you click icing, just icing will scale

**BUT I THINK ONLY SOLUTION THAT IS GOOD WOULD BE GOING BACK TO BLANDER AND REMOVING THAT PARENT RELATIONSHIP**

# Performances

Listening to pointer events is quite a taxing task for the CPU
Keep an eye on performance (especially on low-end devices) and optimise as you can

Avoid events that need to be tested on each frame:

- onPointerOver
- onPointerEnter
- onPointerOut
- onPointerLeave
- onPointerMove

Minimise the number of objects that listen to events and avoid testing complex geometries
If you notice a freeze, even a short one when interacting, you'll have some more optimisation to do

## **use `meshBounds`**

<https://drei.docs.pmnd.rs/performances/mesh-bounds#meshbounds>

meshBounds will create a theoretical sphere around the mesh (called bounding sphere) and the pointer events will be tested on that sphere instead of testing the geometry of the mesh

I used it here on the cube mesh: `src/8_meshBounds/Experience.tsx`

Try to move cursor slowly closer to the cube, you will see that cursor enter event will run even you didn't actually enter cube

## BVG (Bounding Volume Hierarchy)

If you have very complex geometries and still need the pointer events to be accurate, you can also use the BVH (Bounding Volume Hierarchy)

it is more complex approach

check it out: <https://drei.docs.pmnd.rs/performances/bvh#bvh>
