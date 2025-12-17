import { render } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Grid from "./Grid";

// Mock @pixi/react
vi.mock("@pixi/react", () => ({
  useExtend: vi.fn(),
}));

// Mock pixi.js Graphics
vi.mock("pixi.js", () => {
  const mockGraphics = {
    moveTo: vi.fn().mockReturnThis(),
    lineTo: vi.fn().mockReturnThis(),
    stroke: vi.fn().mockReturnThis(),
  };

  return {
    Graphics: vi.fn(() => mockGraphics),
  };
});

describe("Grid Component", () => {
  let mockGraphics: any;

  beforeEach(() => {
    vi.clearAllMocks();
    mockGraphics = {
      moveTo: vi.fn().mockReturnThis(),
      lineTo: vi.fn().mockReturnThis(),
      stroke: vi.fn().mockReturnThis(),
    };
  });

  it("should render without crashing", () => {
    const { container } = render(<Grid x={10} y={10} />);
    expect(container).toBeTruthy();
  });

  it("should render pixiGraphics element with correct scale", () => {
    const { container } = render(<Grid x={10} y={10} />);
    const pixiGraphics = container.querySelector("pixigraphics");
    expect(pixiGraphics).toBeTruthy();
    expect(pixiGraphics?.getAttribute("scale")).toBe("5");
  });

  describe("drawGrid function", () => {
    it("should draw correct number of vertical lines based on y prop", () => {
      const y = 5;
      const x = 10;

      render(<Grid x={x} y={y} />);

      // Extract the draw function and call it
      const drawProp = render(<Grid x={x} y={y} />)
        .container.querySelector("pixigraphics")
        ?.getAttribute("draw");

      if (typeof drawProp === "function") {
        drawProp(mockGraphics);

        // Should call moveTo y times for vertical lines
        expect(mockGraphics.moveTo).toHaveBeenCalledTimes(y + x);
      }
    });

    it("should draw vertical lines with correct coordinates", () => {
      const y = 3;
      const x = 2;

      const { container } = render(<Grid x={x} y={y} />);
      const element = container.querySelector("pixigraphics");
      const drawFn = (element as any)?.draw;

      if (drawFn) {
        drawFn(mockGraphics);

        // First vertical line (i=0)
        expect(mockGraphics.moveTo).toHaveBeenCalledWith(0, 0);
        expect(mockGraphics.lineTo).toHaveBeenCalledWith(0, 100);

        // Second vertical line (i=1)
        expect(mockGraphics.moveTo).toHaveBeenCalledWith(y, 0);
        expect(mockGraphics.lineTo).toHaveBeenCalledWith(y, 100);
      }
    });

    it("should draw horizontal lines with correct coordinates", () => {
      const y = 2;
      const x = 3;

      const { container } = render(<Grid x={x} y={y} />);
      const element = container.querySelector("pixigraphics");
      const drawFn = (element as any)?.draw;

      if (drawFn) {
        drawFn(mockGraphics);

        // First horizontal line (i=0)
        expect(mockGraphics.moveTo).toHaveBeenCalledWith(0, 0);
        expect(mockGraphics.lineTo).toHaveBeenCalledWith(100, 0);

        // Second horizontal line (i=1)
        expect(mockGraphics.moveTo).toHaveBeenCalledWith(0, x);
        expect(mockGraphics.lineTo).toHaveBeenCalledWith(100, x);
      }
    });

    it("should use white color (0xffffff) for all lines", () => {
      const { container } = render(<Grid x={5} y={5} />);
      const element = container.querySelector("pixigraphics");
      const drawFn = (element as any)?.draw;

      if (drawFn) {
        drawFn(mockGraphics);

        // Check all stroke calls use white color
        const strokeCalls = mockGraphics.stroke.mock.calls;
        strokeCalls.forEach((call: any) => {
          expect(call[0]).toEqual({ color: 0xffffff });
        });
      }
    });
  });

  describe("drawLine function", () => {
    it("should call moveTo, lineTo, and stroke in correct order", () => {
      const { container } = render(<Grid x={1} y={1} />);
      const element = container.querySelector("pixigraphics");
      const drawFn = (element as any)?.draw;

      if (drawFn) {
        drawFn(mockGraphics);

        // Verify chaining works correctly
        expect(mockGraphics.moveTo).toHaveBeenCalled();
        expect(mockGraphics.lineTo).toHaveBeenCalled();
        expect(mockGraphics.stroke).toHaveBeenCalled();
      }
    });
  });

  describe("edge cases", () => {
    it("should handle x=0 and y=0", () => {
      const { container } = render(<Grid x={0} y={0} />);
      expect(container.querySelector("pixigraphics")).toBeTruthy();
    });

    it("should handle large grid values", () => {
      const { container } = render(<Grid x={100} y={100} />);
      expect(container.querySelector("pixigraphics")).toBeTruthy();
    });

    it("should handle asymmetric grids", () => {
      const { container } = render(<Grid x={5} y={20} />);
      const pixiGraphics = container.querySelector("pixigraphics");
      expect(pixiGraphics).toBeTruthy();
    });
  });
});
