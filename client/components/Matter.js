import React from 'react';
import { useEffect, useRef } from 'react'
import { Engine, Render, World, Bodies, Body, Runner } from "matter-js";

// A few math/random helpers
const DEGREES_TO_RADIANS = Math.PI / 180;
const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomIntInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const Matter = (props) =>{
  const scene = useRef()
  console.log('scene***', scene)
  const engine = useRef(Engine.create())

  useEffect(() => {
    // mount
    const cw = document.body.clientWidth
    const ch = document.body.clientHeight
    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: "#f4f4f8"
      }
    });

    // const render = Render.create({
    //   element: scene.current,
    //   engine: engine.current,
    //   options: {
    //     width: cw,
    //     height: ch,
    //     wireframes: false,
    //     background: 'transparent'
    //   }
    // })

    // boundaries
    World.add(engine.current.world, [
      Bodies.rectangle(cw / 2, -10, cw, 20, { isStatic: true }),
      Bodies.rectangle(-10, ch / 2, 20, ch, { isStatic: true }),
      Bodies.rectangle(cw / 2, ch + 10, cw, 20, { isStatic: true }),
      Bodies.rectangle(cw + 10, ch / 2, 20, ch, { isStatic: true })
    ])

    // run the engine
    // Engine.run(engine.current)
    Render.run(render)
    //nicole code
    const runner = Runner.create()
    Runner.run(runner, engine.current)

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render)
      World.clear(engine.current.world)
      Engine.clear(engine.current)
      render.canvas.remove()
      render.canvas = null
      render.context = null
      render.textures = {}
    }
  }, [])

  const isPressed = useRef(false)

const handleDown = () => {
  console.log('on mouse down[)')
  isPressed.current = true
}

const handleUp = () => {
  console.log('on mouse up[)')
  isPressed.current = true
}

const handleAddCircle = e => {
  console.log('mouse move', isPressed.current)
  if (isPressed.current) {
    const ball = Bodies.circle(
      e.clientX,
      e.clientY,
      10 + Math.random() * 30,
      {
        mass: 10,
        restitution: 0.9,
        friction: 0.005,
        render: {
          fillStyle: '#0000ff'
        }
      })
    World.add(engine.current.world, [ball])
  }
}

  return (
    <div
    onMouseDown={handleDown}
    onMouseUp={handleUp}
    onMouseMove={handleAddCircle}
  >
    <div ref={scene} style={{ width: '100%', height: '100%' }} />
  </div>
  )
}

export default Matter
