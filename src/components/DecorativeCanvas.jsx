import React, { useMemo } from "react";
import {
  CodeSlash, Braces, Terminal, Cpu, Git, Github, Bug, Cloud, Database, Gear, Microsoft, Javascript, Code, JournalCode , FiletypeCss,
  FiletypeJsx
} from "react-bootstrap-icons";

// helpers
const rand = (min, max) => Math.random() * (max - min) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

const ICONS = [Github, Terminal, Git, Database, Cpu, Cloud, Bug, Gear, Braces, CodeSlash, Microsoft, Javascript, Code ,JournalCode , FiletypeCss, FiletypeJsx];

export default function DecorativeCanvas({
  count = 25,
  opacityRange = [0.08, 0.22],
  sizeRange = [16, 34],
}) {
  const items = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => {
      const Icon = pick(ICONS);

      const opacity = rand(opacityRange[0], opacityRange[1]);
      const size = rand(sizeRange[0], sizeRange[1]);

      // random scatter
      const top = `${rand(-5, 105)}%`;
      const left = `${rand(-5, 105)}%`;

      // motion params
      const rot = rand(-18, 18);
      const scale = rand(0.9, 1.25);

      const driftX = `${rand(-22, 22)}px`;
      const driftY = `${rand(-18, 18)}px`;

      const duration = `${rand(10, 22).toFixed(2)}s`;
      const delay = `${rand(0, 6).toFixed(2)}s`;

      return {
        key: i,
        Icon,
        top,
        left,
        opacity,
        size,
        rot,
        scale,
        driftX,
        driftY,
        duration,
        delay,
      };
    });
  }, [count, opacityRange, sizeRange]);

  return (
    <div className="decorative-canvas position-absolute top-0 start-0 w-100 h-100 overflow-hidden pe-none">
      {items.map((it) => {
        const Icon = it.Icon;
        return (
          <Icon
            key={it.key}
            aria-hidden="true"
            className="deco position-absolute"
            style={{
              top: it.top,
              left: it.left,
              width: it.size,
              height: it.size,
              opacity: it.opacity,

              // custom props consumed by CSS animation
              "--rot": `${it.rot}deg`,
              "--scale": it.scale,
              "--dx": it.driftX,
              "--dy": it.driftY,
              "--dur": it.duration,
              "--delay": it.delay,
            }}
          />
        );
      })}
    </div>
  );
}
