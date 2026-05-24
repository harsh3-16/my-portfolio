"use client";

import { useRef, ReactNode, ReactElement } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
}

export default function MagneticButtons({ children }: Props) {
  const magnet = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } =
      magnet.current!.getBoundingClientRect();

    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    gsap.to(magnet.current, {
      x: x * 0.3,

      y: y * 0.3,
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(magnet.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1,0.3)",
    });
  };

  return (
    <div
      ref={magnet}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block w-fit"
    >
      {children}
    </div>
  );
}
