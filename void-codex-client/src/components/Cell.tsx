import { useExtend } from "@pixi/react";
import { Graphics, Text, TextStyle } from "pixi.js";

export type CellProps = {
  posX: number;
  posY: number;
  width: number;
  height: number;
  cellId: number;
  showCellId?: boolean;
};

const Cell = ({
  posX,
  posY,
  width,
  height,
  cellId,
  showCellId = false,
}: CellProps) => {
  const drawCell = (graphics: Graphics) => {
    graphics.clear();

    // Draw cell border
    graphics.rect(0, 0, width, height);
    graphics.stroke({ color: 0xffffff, width: 1 });

    // Create and position text for cell number
    if (showCellId) drawCellId(graphics);
  };

  const drawCellId = (graphics: Graphics) => {
    // Create text style for cell number
    const textStyle = new TextStyle({
      fontSize: width * 0.3,
      fill: 0xffffff,
      align: "center",
    });

    const text = new Text({
      text: cellId.toString(),
      style: textStyle,
    });

    // Center the text in the cell
    text.x = width / 2;
    text.y = height / 2;
    text.anchor.set(0.5);

    // Add text to graphics
    graphics.addChild(text);
  };

  useExtend({ Graphics });

  return <pixiGraphics draw={drawCell} x={posX} y={posY} />;
};

export default Cell;
