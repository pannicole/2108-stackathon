import React from "react";
import { useEffect, useRef } from "react";
import { Engine, Render, World, Bodies, Body, Runner, Composite, Common } from "matter-js";

// A few math/random helpers
const DEGREES_TO_RADIANS = Math.PI / 180;
const randomInRange = (min, max) => Math.random() * (max - min) + min;
const randomIntInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const Matter = (props) => {
  const scene = useRef();
  const engine = useRef(Engine.create());

  useEffect(() => {
    // Create the playground
    const render = Render.create({
      element: scene.current,
      engine: engine.current,
      options: {
        width: 800,
        height: 600,
        wireframes: false,
        background: "#f4f4f8",
      },
    });

    const rectangle = Bodies.rectangle(400, -450, 120, 80, {
      friction: 1,
      restitution: 0.25,
    });
    const circle = Bodies.circle(400, -300, 50, {
      friction: 0,
      restitution: 1,
    });
    const triangle = Bodies.polygon(400, -150, 3, 50, {
      friction: 0,
      restitution: 0.5,
    });

    const verticalPart = Bodies.rectangle(400, 0, 100, 50);
    const horizontalPart = Bodies.rectangle(400, 0, 50, 100);
    const cross = Body.create({
      parts: [verticalPart, horizontalPart],
      friction: 0,
      restitution: 1,
    });

    const floor = Bodies.rectangle(400, 575, 800, 50, {
      isStatic: true,
      friction: 0,
    });
    const leftWall = Bodies.rectangle(-25, 400, 50, 800, {
      isStatic: true,
      friction: 0,
    });
    const rightWall = Bodies.rectangle(825, 400, 50, 800, {
      isStatic: true,
      friction: 0,
    });

    const obstacle3 = Bodies.circle(650, 200, 85, {
      isStatic: true,
      friction: 0,
      restitution: 1,
    });

    // Bodies won't do anything unless they are added to the world
    World.add(engine.current.world, [
      rectangle,
      triangle,
      circle,
      cross,
      floor,
      obstacle3,
      leftWall,
      rightWall,
    ]);

    Render.run(render);
    const runner = Runner.create();
    Runner.run(runner, engine.current);

    // unmount
    return () => {
      // destroy Matter
      Render.stop(render);
      World.clear(engine.current.world);
      Engine.clear(engine.current);
      render.canvas.remove();
      render.canvas = null;
      render.context = null;
      render.textures = {};
    };
  }, []);

  const isPressed = useRef(false);

  var explosion = function(engine) {
    var bodies = Composite.allBodies(engine.world);

    for (var i = 0; i < bodies.length; i++) {
        var body = bodies[i];

        if (!body.isStatic && body.position.y >= 500) {
            var forceMagnitude = 0.05 * body.mass;

            Body.applyForce(body, body.position, {
                x: (forceMagnitude + Common.random() * forceMagnitude) * Common.choose([1, -1]),
                y: -forceMagnitude + Common.random() * -forceMagnitude
            });
        }
    }
};
  const handleDown = () => {
    console.log("on mouse down[)");
    isPressed.current = !isPressed.current;
    explosion(engine.current)

  };

  // const handleUp = () => {
  //   console.log("on mouse up[)");
  //   isPressed.current = true;
  // };

  const handleAddCircle = (e) => {
    console.log("mouse move", isPressed.current);
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
            fillStyle: "#0000ff",
          },
        }
      );
      World.add(engine.current.world, [ball]);
    }
  };

  return (
    <div
      onMouseDown={handleDown}
      onMouseMove={handleAddCircle}
    >
      <div ref={scene} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default Matter;
