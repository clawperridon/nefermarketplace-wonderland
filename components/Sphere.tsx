"use client";

import { useId } from "react";

type SphereProps = {
  size?: number;
  speed?: number;
  hue?: "cool" | "warm";
};

export function Sphere({ size = 240, speed = 18, hue = "cool" }: SphereProps) {
  const uid = useId().replace(/:/g, "");

  // Two palettes: cool (default chrome) and warm (chrome reflecting dune).
  // Order: [sky-bright, sky-mid, equator, ground-mid, ground-deep]
  const env =
    hue === "warm"
      ? ["#ffffff", "#f6e3c4", "#c9a57b", "#7a5a3c", "#2a1f15"]
      : ["#ffffff", "#e6edf6", "#9fb1c8", "#3a4a64", "#0e1622"];

  const id = (k: string) => `${k}-${uid}`;

  return (
    <div
      className="sphere-wrap"
      style={{ width: size, height: size, ["--rot-dur" as string]: `${speed}s` }}
    >
      <div className="sphere">
        <div className="sphere-env" aria-hidden="true">
          <svg viewBox="0 0 400 400" width="100%" height="100%">
            <defs>
              <radialGradient id={id("ball")} cx="42%" cy="34%" r="78%">
                <stop offset="0%" stopColor={env[0]} />
                <stop offset="18%" stopColor={env[1]} />
                <stop offset="55%" stopColor={env[2]} />
                <stop offset="88%" stopColor={env[3]} />
                <stop offset="100%" stopColor={env[4]} />
              </radialGradient>

              <linearGradient id={id("horizon")} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={env[0]} />
                <stop offset="38%" stopColor={env[1]} />
                <stop offset="49%" stopColor={env[2]} />
                <stop offset="50%" stopColor={env[3]} />
                <stop offset="78%" stopColor={env[2]} />
                <stop offset="100%" stopColor={env[3]} />
              </linearGradient>

              <radialGradient id={id("rim")} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="82%" stopColor="rgba(255,255,255,0)" />
                <stop offset="97%" stopColor="rgba(255,255,255,0.5)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>

              <radialGradient id={id("rimDark")} cx="75%" cy="80%" r="60%">
                <stop offset="65%" stopColor="rgba(0,0,0,0)" />
                <stop offset="98%" stopColor="rgba(0,0,0,0.35)" />
              </radialGradient>

              <radialGradient id={id("spec1")} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                <stop offset="60%" stopColor="rgba(255,255,255,0.15)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>

              <radialGradient id={id("spec2")} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>

              <radialGradient id={id("bounce")} cx="50%" cy="92%" r="50%">
                <stop
                  offset="0%"
                  stopColor={hue === "warm" ? "rgba(255,210,150,0.6)" : "rgba(230,200,160,0.35)"}
                />
                <stop offset="100%" stopColor="rgba(0,0,0,0)" />
              </radialGradient>

              <clipPath id={id("clip")}>
                <circle cx="200" cy="200" r="188" />
              </clipPath>

              <linearGradient id={id("streaks")} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="30%" stopColor="rgba(255,255,255,0.06)" />
                <stop offset="70%" stopColor="rgba(0,0,0,0.05)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            <circle cx="200" cy="200" r="188" fill={`url(#${id("ball")})`} />

            <g clipPath={`url(#${id("clip")})`}>
              <g className="sphere-horizon">
                <rect x="-220" y="12" width="840" height="376" fill={`url(#${id("horizon")})`} opacity="0.78" />
                <rect x="-220" y="195" width="840" height="2" fill={env[0]} opacity="0.55" />
                <rect x="-220" y="201" width="840" height="3" fill={env[4]} opacity="0.65" />
                <ellipse cx="120" cy="150" rx="140" ry="14" fill={env[0]} opacity="0.18" />
                <ellipse cx="310" cy="170" rx="80" ry="8" fill={env[0]} opacity="0.22" />
                <rect x="0" y="0" width="400" height="400" fill={`url(#${id("streaks")})`} opacity="0.5" />
              </g>

              <rect x="0" y="0" width="400" height="400" fill={`url(#${id("bounce")})`} />
            </g>

            <circle cx="200" cy="200" r="188" fill={`url(#${id("rimDark")})`} />
            <ellipse cx="148" cy="125" rx="78" ry="48" fill={`url(#${id("spec1")})`} />
            <ellipse cx="128" cy="108" rx="22" ry="11" fill={`url(#${id("spec2")})`} />
            <ellipse cx="118" cy="100" rx="9" ry="5" fill="#ffffff" opacity="0.95" />
            <circle cx="200" cy="200" r="188" fill={`url(#${id("rim")})`} />
            <circle cx="200" cy="200" r="188" fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth="1" />
          </svg>
        </div>
        <div className="sphere-shadow" aria-hidden="true"></div>
      </div>
    </div>
  );
}
