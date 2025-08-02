"use client";

import React, {
  createContext,
  useState,
  useContext,
  useRef,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";

// -----------------------------------------------------------------------------
// Context to share hover state between CardContainer and CardItem
// -----------------------------------------------------------------------------
type MouseEnterContextType = [
  boolean,
  React.Dispatch<React.SetStateAction<boolean>>
];
const MouseEnterContext = createContext<MouseEnterContextType | undefined>(
  undefined
);

export const useMouseEnter = (): MouseEnterContextType => {
  const ctx = useContext(MouseEnterContext);
  if (!ctx)
    throw new Error("useMouseEnter must be used within a CardContainer");
  return ctx;
};

// -----------------------------------------------------------------------------
// CardContainer: wraps the 3D area and handles mouse enter/move/leave
// -----------------------------------------------------------------------------
export const CardContainer: React.FC<{
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
}> = ({ children, className, containerClassName }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 10;
    const y = (e.clientY - top - height / 2) / 10;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = () => setIsMouseEntered(true);
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
      <div
        className={cn("flex items-center justify-center", containerClassName)}
        style={{ perspective: "1000px" }}
      >
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className={cn(
            "flex items-center justify-center relative transition-all duration-200 ease-linear",
            className
          )}
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </div>
      </div>
    </MouseEnterContext.Provider>
  );
};

// -----------------------------------------------------------------------------
// CardBody: simple 3D container with fixed size and preserve-3d
// -----------------------------------------------------------------------------
export const CardBody: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => (
  <div
    className={cn(
      "h-96 w-96 [transform-style:preserve-3d] [&>*]:[transform-style:preserve-3d]",
      className
    )}
  >
    {children}
  </div>
);

// -----------------------------------------------------------------------------
// CardItem: polymorphic (any tag or component) that transforms on hover
// -----------------------------------------------------------------------------
export type CardItemProps = {
  /**
  * The React tag or component to render.
  * You can pass arbitrary attributes thanks to `...rest`.
  */
  as?: keyof JSX.IntrinsicElements | React.JSXElementConstructor<any>;
  children?: React.ReactNode;
  className?: string;
  translateX?: number | string;
  translateY?: number | string;
  translateZ?: number | string;
  rotateX?: number | string;
  rotateY?: number | string;
  rotateZ?: number | string;
} & Record<string, any>;

export const CardItem: React.FC<CardItemProps> = ({
  as = "div",
  children,
  className,
  translateX = 0,
  translateY = 0,
  translateZ = 0,
  rotateX = 0,
  rotateY = 0,
  rotateZ = 0,
  ...rest
}) => {
  // Internal ref to apply transform
  const innerRef = useRef<HTMLElement>(null);
  const [isMouseEntered] = useMouseEnter();

  // Effect to apply / reset transform on hover
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;
    if (isMouseEntered) {
      el.style.transform = `
        translateX(${translateX}px)
        translateY(${translateY}px)
        translateZ(${translateZ}px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        rotateZ(${rotateZ}deg)
      `;
    } else {
      el.style.transform = "";
    }
  }, [
    isMouseEntered,
    translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
  ]);

  const Tag = as as any;

  return (
    <Tag
      ref={innerRef as any}
      className={cn("w-fit transition duration-200 ease-linear", className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};