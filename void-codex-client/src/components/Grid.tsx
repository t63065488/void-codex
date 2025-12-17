import { useExtend } from "@pixi/react";
import { Graphics } from "pixi.js";

type GridProps = {
  x: number;
  y: number;
};

const Grid = ({ x, y }: GridProps) => {
  const drawGrid = (graphics: Graphics) => {
    // Draw vertical lines
    for (let i = 0; i < y; ++i) {
      drawLine(graphics, i * y, 0, i * y, 100, 0xffffff);
    }
    // Draw vertical lines
    for (let i = 0; i < x; ++i) {
      drawLine(graphics, 0, i * x, 100, i * x, 0xffffff);
    }
  };

  const drawLine = (
    graphics: Graphics,
    xStart: number,
    yStart: number,
    xEnd: number,
    yEnd: number,
    color: number,
  ) => {
    graphics.moveTo(xStart, yStart).lineTo(xEnd, yEnd).stroke({ color: color });
  };

  useExtend({ Graphics });

  return <pixiGraphics draw={drawGrid} scale={5} />;
};

export default Grid;
