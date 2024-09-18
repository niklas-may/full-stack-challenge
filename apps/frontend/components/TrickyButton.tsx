import classNames from "classnames";
import React, { use, useEffect, useState } from "react";
import { useHover } from "@uidotdev/usehooks";

export interface TrickyButtonProps {
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "ghost" | "outline";
  type?: "submit" | "reset" | "button" | undefined;
  classes?: string;
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

export const TrickyButton: React.FC<TrickyButtonProps> = ({
  size,
  variant,
  type,
  onClick,
  children,
  classes,
  disabled,
}) => {
  const [ref, hovering] = useHover();
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [translate, setTranslate] = useState("translate(0px, 0px)");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (chance(50)) {
      const x = pos.x === 0 ? randomPos() : 0;
      const y = pos.y === 0 ? randomPos() : 0;
      const trans = `translate(${x}px, ${y}px)`;
      setTranslate(hovering ? trans : "translate(0px, 0px)");
    }

    if (chance(40)) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [hovering, setTranslate, pos]);

  function randomPos() {
    return Math.floor(Math.random() * 300);
  }

  function chance(pct: number) {
    return Math.random() * 100 > pct;
  }

  const className = classNames("btn transition-transform", classes, {
    "btn-sm": size === "sm",
    "btn-md": size === "md",
    "btn-lg": size === "lg",
    "btn-primary": variant === "primary",
    "btn-ghost": variant === "ghost",
    "btn-outline": variant === "outline",
  });
  return (
    <button
      className={className}
      type={type}
      onClick={() => onClick()}
      disabled={disabled}
      style={{ transform: translate }}
      ref={ref}
    >
      {children}
    </button>
  );
};
