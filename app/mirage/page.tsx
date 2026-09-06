import { MkNav } from "@/components/MarketplaceUI";

type MirageCardProps = {
  imgStyle: React.CSSProperties;
  resonance: string;
  designer: string;
  lot: string;
  name: string;
  why: string;
  price: string;
};

function MirageCard({ imgStyle, resonance, designer, lot, name, why, price }: MirageCardProps) {
  return (
    <div className="mirage-result">
      <div className="img" style={imgStyle}>
        <div className="resonance-pill">
          <span className="bar" style={{ ["--p" as string]: `${resonance}%` }}></span>
          {resonance}%
        </div>
      </div>
      <div className="meta-row">
        <span>{designer}</span>
        <span>{lot}</span>
      </div>
      <div className="name">{name}</div>
      <div className="why italic">— {why}</div>
      <div style={{ marginTop: 8, fontFamily: "var(--font-jetbrains-mono), monospace", fontSize: 10, letterSpacing: "0.14em", color: "var(--ink)" }}>
        {price}
      </div>
    </div>
  );
}

export default function Mirage() {
  return (
    <div className="mk-screen">
      <MkNav active="discover" />

      <div className="mirage">
        {/* LEFT — describe the mirage */}
        <section className="mirage-left">
          <div className="eyebrow">Mirage · visual &amp; mood search</div>
          <h1>
            Tell us
            <br />
            <em>what you can&apos;t</em>
            <br />
            quite name.
          </h1>
          <p className="lede">
            Drop a photograph, paste a film still, or describe the weather of the thing. The muse
            reads it as a place, a fabric, an hour — and finds what shares its weather.
          </p>

          <div className="mirage-prompt">
            <div className="you-line italic">
              &ldquo;Something for a slow weekend — sand, undyed linen, a coat that
              <br />
              survives the wind off the water. Nothing that announces itself.&rdquo;
              <span className="cursor"></span>
            </div>
            <div className="actions-row">
              <button className="chip">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="5" width="18" height="14" rx="1.5" />
                  <circle cx="8" cy="10.5" r="1.5" />
                  <path d="M21 17l-5-5-9 9" />
                </svg>
                Attach image
              </button>
              <button className="chip">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M16.5 16.5L21 21" />
                </svg>
                Paste a link
              </button>
              <button className="chip">
                <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
                Voice
              </button>
              <button className="submit">Glimpse →</button>
            </div>
          </div>

          <div className="mirage-drop">
            <div className="preview"></div>
            <div className="info">
              <div className="mono">— attached · mood image</div>
              <div className="name italic">&ldquo;the_courtyard.jpg&rdquo;</div>
              <div className="desc">
                Read as: sand wall · late afternoon · single source light · linen present · no
                synthetic · one figure, never crowded.
              </div>
            </div>
          </div>

          <div
            style={{
              fontFamily: "var(--font-jetbrains-mono), monospace",
              fontSize: 9,
              letterSpacing: "0.28em",
              textTransform: "uppercase",
              color: "var(--sand-300)",
              marginBottom: 12,
            }}
          >
            — what we heard · adjustable
          </div>
          <div className="mirage-tags">
            <span className="tag weight">
              sand <span className="x">×</span>
            </span>
            <span className="tag weight">
              undyed linen <span className="x">×</span>
            </span>
            <span className="tag">
              late afternoon <span className="x">×</span>
            </span>
            <span className="tag">
              single source light <span className="x">×</span>
            </span>
            <span className="tag">
              never-crowded <span className="x">×</span>
            </span>
            <span className="tag">
              windbreak coat <span className="x">×</span>
            </span>
            <span className="tag">
              no synthetic <span className="x">×</span>
            </span>
            <button className="tag add">+ add a word</button>
          </div>

          <div className="mirage-distillation">
            <span className="mono">— how the muse reads you</span>
            <div className="quote">
              <em>&ldquo;A weekend in the dust, dressed for the wind.&rdquo;</em>
              <br />
              We&apos;ll look for soft objects in sand, linen, undyed wool — nothing chrome,
              nothing loud. We&apos;ve held three pieces for you on the right.
            </div>
          </div>
        </section>

        {/* RIGHT — results */}
        <section className="mirage-right">
          <div className="head">
            <div>
              <div
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  color: "var(--sand-300)",
                  marginBottom: 8,
                }}
              >
                — Resonance order · 14 pieces found
              </div>
              <div className="title">Found in the distance.</div>
            </div>
            <div className="count">
              <div>Sort · resonance</div>
              <div
                style={{
                  marginTop: 4,
                  color: "var(--dusk)",
                  fontStyle: "italic",
                  fontFamily: "var(--font-cormorant), serif",
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  textTransform: "none",
                }}
              >
                slow scroll
              </div>
            </div>
          </div>

          <div className="mirage-results">
            <MirageCard
              imgStyle={{ background: "linear-gradient(155deg, #efe2cc 0%, #c9a57b 60%, #7a5a3c 100%)" }}
              resonance="96"
              designer="Studio Mira"
              lot="NF·0024"
              name="Antwerp overshirt"
              why="The exact sand on the wall in your photo."
              price="EUR 480"
            />
            <MirageCard
              imgStyle={{ background: "linear-gradient(165deg, #f5ead5 0%, #d8b88a 55%, #4a3b2e 100%)" }}
              resonance="91"
              designer="Atelier Souk"
              lot="NF·0008"
              name="Dune Long · coat"
              why="Heavy enough for the wind, undyed cashmere."
              price="EUR 1,240"
            />
            <MirageCard
              imgStyle={{ background: "linear-gradient(170deg, #fbf6ec 0%, #efe2cc 50%, #c9a57b 100%)" }}
              resonance="88"
              designer="Hana Lindqvist"
              lot="NF·0031"
              name="Late Hour · knit"
              why="A merino the colour of last light."
              price="EUR 390"
            />
            <MirageCard
              imgStyle={{ background: "linear-gradient(160deg, #ebe1ce 0%, #b89668 60%, #3a2d20 100%)" }}
              resonance="84"
              designer="Studio Mira"
              lot="NF·0026"
              name="Mistral trouser"
              why="Linen, sand-washed, the same loom."
              price="EUR 410"
            />
            <MirageCard
              imgStyle={{ background: "linear-gradient(180deg, #fdfaf3 0%, #e8eef6 45%, #9ea7b3 100%)" }}
              resonance="79"
              designer="Kestrel & Co."
              lot="NF·0017"
              name="Chrome pleat"
              why="One step cooler — for the late hour."
              price="EUR 620"
            />
            <MirageCard
              imgStyle={{ background: "linear-gradient(180deg, #1a1612 0%, #4a3b2e 100%)" }}
              resonance="71"
              designer="Atelier Souk"
              lot="NF·0011"
              name="Night ink shawl"
              why="When the wind turns. A quiet, dark, edge piece."
              price="EUR 780"
            />
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <button className="btn ghost">Show eight more, more loosely matched →</button>
          </div>
        </section>
      </div>
    </div>
  );
}
