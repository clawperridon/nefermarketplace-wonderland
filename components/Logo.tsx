type WordmarkProps = {
  size?: number;
  color?: string;
  sphere?: boolean;
};

export function Wordmark({ size = 140, color = "#1A1612", sphere = true }: WordmarkProps) {
  return (
    <div className="wordmark" style={{ fontSize: size, color }}>
      <span className="wm-text">nefer</span>
      {sphere && <span className="wm-dot" aria-hidden="true"></span>}
    </div>
  );
}

export function Lockup({ scale = 1, color = "#1A1612" }: { scale?: number; color?: string }) {
  return (
    <div className="lockup" style={{ ["--lk-scale" as string]: scale, color }}>
      <div className="lk-sphere">
        <svg viewBox="0 0 100 100" width="100%" height="100%">
          <defs>
            <radialGradient id="lk-ball" cx="38%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="30%" stopColor="#e0e3e9" />
              <stop offset="70%" stopColor="#5b6470" />
              <stop offset="100%" stopColor="#0c0f14" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="46" fill="url(#lk-ball)" />
          <ellipse cx="36" cy="32" rx="14" ry="8" fill="#fff" opacity="0.7" />
        </svg>
      </div>
      <div className="lk-word">nefer</div>
      <div className="lk-tag">a fashion mirage</div>
    </div>
  );
}
