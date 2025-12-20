import { Application, extend, useApplication, useTick } from "@pixi/react";
import { Container, Sprite } from "pixi.js";
import Grid from "./components/Grid";

// extend tells @pixi/react what Pixi.js components are available
extend({
  Container,
  Sprite,
});

export default function App() {
  return (
    // We'll wrap our components with an <Application> component to provide
    // the Pixi.js Application context
    <Application resizeTo={window} autoStart sharedTicker>
      <pixiContainer>
        <Grid x={10} y={10} />
      </pixiContainer>
    </Application>
  );
}
