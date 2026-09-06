"use client";

import { useState } from "react";
import { MkNav } from "@/components/MarketplaceUI";
import { useCart } from "@/lib/cart";

const SIZES = [
  { size: "36", state: "sold" },
  { size: "38", state: "available" },
  { size: "40", state: "last" },
  { size: "42", state: "available" },
  { size: "44", state: "sold" },
] as const;

export default function Product() {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("38");
  const [added, setAdded] = useState(false);

  const handleAddToBag = () => {
    addItem({
      id: "antwerp-overshirt",
      name: "Antwerp overshirt",
      designer: "Studio Mira",
      price: 480,
      size: selectedSize,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div className="mk-screen">
      <MkNav active="discover" />

      <div className="pdp">
        {/* TOP — image + buy panel */}
        <div className="pdp-stage">
          <div className="pdp-img">
            <div className="thumbs">
              <div className="t t1 active"></div>
              <div className="t t2"></div>
              <div className="t t3"></div>
              <div className="t t4"></div>
            </div>
          </div>

          <div className="pdp-info">
            <div className="breadcrumb">
              <span>Discover</span>
              <span>·</span>
              <span>Studio Mira</span>
              <span>·</span>
              <span style={{ color: "var(--ink)" }}>Antwerp overshirt</span>
            </div>

            <div className="designer">— Studio Mira · Antwerp</div>
            <h1>
              Antwerp <span style={{ color: "var(--sand-300)" }}>·</span> overshirt, sand.
            </h1>

            <div className="price-row">
              <div className="price italic">EUR 480.00</div>
              <div className="lot">Lot NF·0024 · 1 of 18 cut</div>
            </div>

            <div className="description">
              A linen overshirt woven on a single loom in Antwerp by a studio of three. Cut once,
              finished by hand, shipped in a paper sleeve.
            </div>

            <div className="spec-row">
              <div className="k">— Material</div>
              <div className="v">100% European linen · undyed · garment-washed once</div>
            </div>
            <div className="spec-row">
              <div className="k">— Provenance</div>
              <div className="v">Loomed Antwerp · cut Antwerp · finished by hand</div>
            </div>
            <div className="spec-row">
              <div className="k">— Cadence</div>
              <div className="v">Not replenished · when it&apos;s gone, it returns to the dune</div>
            </div>

            <div className="size-row">
              <div className="label">
                <span>— Italian sizing</span>
                <span className="right">Three left in your shelf.</span>
              </div>
              <div className="sizes">
                {SIZES.map(({ size, state }) => (
                  <button
                    key={size}
                    className={`sz ${state === "sold" ? "sold" : ""} ${state === "last" ? "last" : ""} ${
                      selectedSize === size ? "active" : ""
                    }`}
                    disabled={state === "sold"}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="actions">
              <button className="primary" onClick={handleAddToBag}>
                {added ? "Added to the bag ✓" : "Add to the bag · EUR 480"}
              </button>
              <button className="icon-btn" title="Save">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.4">
                  <path d="M12 21s-7-4.5-9.5-9.5C0 6.5 4 3 7.5 4.5 10 5.5 12 8 12 8s2-2.5 4.5-3.5C20 3 24 6.5 21.5 11.5 19 16.5 12 21 12 21z" />
                </svg>
              </button>
            </div>

            <div style={{ marginTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  color: "var(--sand-300)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Care notes →
              </a>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  color: "var(--sand-300)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Returns within 30 days →
              </a>
              <a
                href="#"
                style={{
                  fontFamily: "var(--font-jetbrains-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.22em",
                  color: "var(--sand-300)",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                Ask the muse →
              </a>
            </div>
          </div>
        </div>

        {/* AI SECTION */}
        <section className="pdp-ai">
          <div className="edit-head" style={{ marginBottom: 36 }}>
            <h2
              className="italic"
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontWeight: 300,
                fontSize: 56,
                lineHeight: 1,
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              The muse, on this piece.
            </h2>
            <div className="meta">
              <span>Quiet AI assistance · house-trained</span>
              <span className="val">Voice · Cormorant · slow</span>
            </div>
          </div>

          <div className="pdp-ai-grid">
            {/* Fit guidance */}
            <div className="ai-card">
              <div className="head">
                <span className="sphere-bullet"></span>
                <span className="label">— Fit guidance</span>
              </div>
              <h3>
                It runs <em style={{ color: "var(--sand-300)" }}>half a step long.</em>
              </h3>
              <div className="body">
                If you wear an Italian 38 in Margaret Howell linen, take a 38 here. It will hang a
                finger past the wrist — that is the cut, not the size.
              </div>
              <div className="fit-meter">
                <div className="fill"></div>
                <div className="marker" style={{ left: "68%" }}></div>
              </div>
              <div className="fit-row">
                <span>tight</span>
                <span>true</span>
                <span className="here">half long</span>
                <span>long</span>
                <span>tent</span>
              </div>
              <div
                style={{
                  marginTop: 18,
                  fontFamily: "var(--font-cormorant), serif",
                  fontStyle: "italic",
                  fontSize: 14,
                  color: "var(--dusk)",
                  borderTop: "1px solid var(--line)",
                  paddingTop: 14,
                }}
              >
                — drawn from 1,200 fitted bodies · we are 88% sure for your frame.
              </div>
            </div>

            {/* Pieces that share its weather */}
            <div className="ai-card">
              <div className="head">
                <span className="sphere-bullet"></span>
                <span className="label">— Pieces that share its weather</span>
              </div>
              <h3>
                Linen, sand, <em style={{ color: "var(--sand-300)" }}>late afternoon.</em>
              </h3>
              <div className="body">
                Six other objects on the shelf live in the same light. We listened to the
                photograph more than the tags — material, hour, the place it was made.
              </div>
              <div className="weather-grid">
                <div className="w" style={{ background: "linear-gradient(160deg, #ebe1ce 0%, #b89668 60%, #3a2d20 100%)" }}>
                  <div className="meta">
                    <span>Studio Mira</span>
                    <span>96%</span>
                  </div>
                </div>
                <div className="w" style={{ background: "linear-gradient(170deg, #fbf6ec 0%, #efe2cc 50%, #c9a57b 100%)" }}>
                  <div className="meta">
                    <span>Hana L.</span>
                    <span>91%</span>
                  </div>
                </div>
                <div className="w" style={{ background: "linear-gradient(180deg, #1a1612 0%, #4a3b2e 100%)" }}>
                  <div className="meta" style={{ color: "#FAF7F2" }}>
                    <span>Souk</span>
                    <span>89%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Provenance */}
          <div className="ai-card" style={{ marginTop: 24 }}>
            <div className="head">
              <span className="sphere-bullet"></span>
              <span className="label">— Provenance trace · each step verified</span>
            </div>
            <h3>
              Loom, hand, sleeve, <em style={{ color: "var(--sand-300)" }}>dune.</em>
            </h3>
            <div className="body" style={{ maxWidth: "60ch" }}>
              We log each garment as a small object passing through a small number of hands. No
              factories, no middle warehouses. The muse reads this back to you in plain language.
            </div>
            <div className="provenance">
              <div className="node">
                <div className="step">01 · Loom</div>
                <span className="place">Antwerp</span>
                Single loom · 14 m of linen woven over three days · log #L-2026-0118
              </div>
              <div className="node">
                <div className="step">02 · Cut &amp; hand</div>
                <span className="place">Same room</span>
                Cut once · finished by Marta · 4 hours per garment
              </div>
              <div className="node">
                <div className="step">03 · Sleeve</div>
                <span className="place">Paper, undyed</span>
                Shipped in a paper sleeve, sealed with wax · no plastic
              </div>
              <div className="node">
                <div className="step">04 · You</div>
                <span className="place">Brussels → ?</span>
                Carbon · 1.2kg · ship 14.05 · arrives ~ 18.05
              </div>
            </div>
          </div>

          {/* What we'd wear with it */}
          <div className="pdp-ai-grid" style={{ marginTop: 24 }}>
            <div className="ai-card">
              <div className="head">
                <span className="sphere-bullet"></span>
                <span className="label">— What we&apos;d wear with it</span>
              </div>
              <h3>
                One garment, <em style={{ color: "var(--sand-300)" }}>a small shelf.</em>
              </h3>
              <div className="body">
                The muse assembles a quiet outfit around this piece. None of the others are
                louder than the overshirt; that&apos;s the point.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginTop: 18 }}>
                <div className="w" style={{ background: "linear-gradient(180deg, #fdfaf3 0%, #e8eef6 45%, #9ea7b3 100%)", aspectRatio: "3/4", borderRadius: 2 }}></div>
                <div className="w" style={{ background: "linear-gradient(165deg, #f5ead5 0%, #d8b88a 55%, #4a3b2e 100%)", aspectRatio: "3/4", borderRadius: 2 }}></div>
                <div className="w" style={{ background: "linear-gradient(180deg, #1a1612 0%, #4a3b2e 100%)", aspectRatio: "3/4", borderRadius: 2 }}></div>
                <div className="w" style={{ background: "linear-gradient(175deg, #f7f3eb 0%, #c5c9d0 50%, #2a2f36 100%)", aspectRatio: "3/4", borderRadius: 2 }}></div>
              </div>
            </div>

            <div className="ai-card">
              <div className="head">
                <span className="sphere-bullet"></span>
                <span className="label">— Ask the muse · in your words</span>
              </div>
              <h3 style={{ marginBottom: 12 }}>
                &ldquo;Will I be warm in this in September, in the south of France?&rdquo;
              </h3>
              <div className="body" style={{ fontFamily: "var(--font-cormorant), serif", fontStyle: "italic", fontSize: 18, lineHeight: 1.4 }}>
                <span style={{ color: "var(--sand-300)" }}>— </span>
                You will, until the wind picks up after eight. We&apos;d carry the cashmere coat
                in the bag and put it on at dinner. Linen lets the day stay on you.
              </div>
              <div style={{ marginTop: 22, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <button
                  style={{
                    background: "transparent",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: "7px 14px",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--dusk)",
                    cursor: "pointer",
                  }}
                >
                  How does it wash?
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: "7px 14px",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--dusk)",
                    cursor: "pointer",
                  }}
                >
                  Does it crease badly?
                </button>
                <button
                  style={{
                    background: "transparent",
                    border: "1px solid var(--line)",
                    borderRadius: 999,
                    padding: "7px 14px",
                    fontFamily: "var(--font-jetbrains-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--dusk)",
                    cursor: "pointer",
                  }}
                >
                  Show me on someone 178cm
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
