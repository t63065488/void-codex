import { useApplication, useExtend } from "@pixi/react";
import { Container, Graphics, Text, TextStyle } from "pixi.js";
import Cell from "./Cell";
import { JSX } from "react";

type GridProps = {
  x: number;
  y: number;
  width?: number;
  height?: number;
};

const Grid = ({ x, y, width, height }: GridProps) => {
  const { app } = useApplication();
  // Use provided dimensions or fall back to screen size
  const containerWidth = width ?? app.screen.width;
  const containerHeight = height ?? app.screen.height;

  const cellWidth = containerWidth / x;
  const cellHeight = containerHeight / y;

  const cells: JSX.Element[] = [];

  // Draw cells with numbers
  for (let row = 0; row < y; row++) {
    for (let col = 0; col < x; col++) {
      const cellX = col * cellWidth;
      const cellY = row * cellHeight;
      const cellNumber = row * x + col + 1;

      cells.push(
        <Cell
          posX={cellX}
          posY={cellY}
          key={cellNumber}
          cellId={cellNumber}
          showCellId={false}
          height={cellHeight}
          width={cellWidth}
        />,
      );
    }
  }

  useExtend({ Container });

  return <pixiContainer>{cells}</pixiContainer>;
};

export default Grid;
