import Link from "next/link";
import { MkNav, HeroSphere, SmallSphere } from "@/components/MarketplaceUI";

type ProductCardProps = {
  imgClass: string;
  tag?: string;
  cat: string;
  lot: string;
  name: string;
  designer: string;
  price: string;
};

function ProductCard({ imgClass, tag, cat, lot, name, designer, price }: ProductCardProps) {
  return (
    <Link href="/product" className="product-card">
      <div className={`img ${imgClass}`}>
        {tag && (
          <div className="tag-pill">
            <span className="glyph"></span>
            {tag}
          </div>
        )}
      </div>
      <div className="meta-row">
        <span>{cat}</span>
        <span>{lot}</span>
      </div>
      <div className="name">{name}</div>
      <div className="row2">
        <span>{designer}</span>
        <span className="price">{price}</span>
      </div>
    </Link>
  );
}

export default function Discover() {
  return (
    <div className="mk-screen mk-canvas">
      <MkNav active="discover" />

      <div className="mk-body">
        {/* HERO */}
        <section className="mk-hero">
          <div>
            <div className="eyebrow">Spring Chapter · Vol. IV · 04.26</div>
            <h1>
              Soft <span className="accent italic">objects,</span>
              <br />
              found in the
              <br />
              distance.
            </h1>
            <p className="lede">
              Forty independent designers. One slow, patient shelf. Edited weekly, shipped from
              the studios that made them.
            </p>
            <div className="meta-row">
              <Link href="/" className="btn">
                Enter the chapter <span className="arrow">→</span>
              </Link>
              <Link href="/feed" className="btn ghost">
                Read the editorial
              </Link>
            </div>
          </div>
          <div className="mk-hero-stage">
            <HeroSphere size={420} />
          </div>
        </section>

        {/* ATELIER STRIP — the AI muse promo */}
        <div className="atelier-strip">
          <SmallSphere size={56} />
          <div>
            <div className="badge">— The Atelier · your private muse</div>
            <div className="line">
              <span className="italic">&ldquo;Tell us where you&apos;re going,&rdquo;</span> she
              says, <span className="italic">&ldquo;and we&apos;ll glimpse what travels with
              you.&rdquo;</span>
            </div>
            <div className="sub">
              A slow, considered AI trained on our editorial voice. No trends, no hard sells —
              just a small shelf assembled in conversation.
            </div>
          </div>
          <Link href="/atelier" className="btn">
            Open Atelier <span className="arrow">→</span>
          </Link>
        </div>

        {/* CURATED EDIT */}
        <section className="edit-section">
          <div className="edit-head">
            <h2>
              The April edit — <span style={{ color: "var(--sand-300)" }}>twelve quiet pieces.</span>
            </h2>
            <div className="meta">
              <span>Curated by Imani O. · House editor</span>
              <span className="val">12 garments · 7 designers</span>
            </div>
          </div>

          <div className="product-grid">
            <ProductCard
              tag="muse pick"
              imgClass="p1"
              cat="overshirt · linen"
              lot="NF·0024"
              name="Antwerp"
              designer="Studio Mira"
              price="EUR 480"
            />
            <ProductCard
              imgClass="p2"
              cat="trouser · wool"
              lot="NF·0017"
              name="Chrome Pleat"
              designer="Kestrel & Co."
              price="EUR 620"
            />
            <ProductCard
              tag="last one"
              imgClass="p3"
              cat="coat · cashmere"
              lot="NF·0008"
              name="Dune Long"
              designer="Atelier Souk"
              price="EUR 1,240"
            />
            <ProductCard
              imgClass="p4"
              cat="knit · merino"
              lot="NF·0031"
              name="Late Hour"
              designer="Hana Lindqvist"
              price="EUR 390"
            />
          </div>
        </section>

        {/* DESIGNER CHAPTER */}
        <section className="designer-chapter">
          <div className="img">
            <span className="badge">— In the workshop · Antwerp · Spring 2026</span>
          </div>
          <div>
            <div className="eyebrow">— Designer chapter · 03 of 12</div>
            <h3>Studio Mira</h3>
            <p>
              A linen overshirt in sand, woven on a single loom in Antwerp by a studio of three.
              Cut once, finished by hand, shipped in a paper sleeve. We don&apos;t replenish stock
              — when it&apos;s gone, it returns to the dune.
            </p>
            <div className="facts">
              <div>
                <span className="mono">Founded</span>
                <span className="val">2019, Antwerp</span>
              </div>
              <div>
                <span className="mono">Cadence</span>
                <span className="val">Twice yearly</span>
              </div>
              <div>
                <span className="mono">Pieces this drop</span>
                <span className="val">04</span>
              </div>
            </div>
          </div>
        </section>

        {/* EDITORIAL */}
        <section className="editorial-strip">
          <div className="edit-head" style={{ marginBottom: 32 }}>
            <h2>
              <Link href="/feed" style={{ color: "inherit", textDecoration: "none" }}>
                Editorial.
              </Link>
            </h2>
            <div className="meta">
              <Link href="/feed" style={{ color: "inherit", textDecoration: "none" }}>
                Read · listen · look
              </Link>
              <span className="val">Updated Friday</span>
            </div>
          </div>
          <div className="editorial-grid">
            <Link
              href="/feed"
              className="tile large"
              style={{ background: "linear-gradient(165deg, #d8a874 0%, #7a5a3c 60%, #2a1f15 100%)" }}
            >
              <div className="caption">
                <div className="mono">Essay · 14 min</div>
                <div className="h">A weatherproof wardrobe for the desert at dusk.</div>
              </div>
            </Link>
            <Link
              href="/feed"
              className="tile"
              style={{ background: "linear-gradient(180deg, #cfd4dc 0%, #5b6470 80%)" }}
            >
              <div className="caption">
                <div className="mono">Conversation</div>
                <div className="h">Studio Mira on patience.</div>
              </div>
            </Link>
            <Link
              href="/feed"
              className="tile"
              style={{ background: "linear-gradient(180deg, #1a1612 0%, #4a3b2e 100%)" }}
            >
              <div className="caption">
                <div className="mono">Field notes · sound</div>
                <div className="h">The room before the storm.</div>
              </div>
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="mk-footer">
          <div className="col">
            <h4 className="italic">
              This desert
              <br /> has a door.
            </h4>
            <div style={{ opacity: 0.6, marginTop: 14, fontSize: 12, letterSpacing: "0.04em", maxWidth: "32ch" }}>
              An editorial fashion marketplace for independent makers. Brussels · Milan ·
              everywhere quiet.
            </div>
          </div>
          <div className="col">
            <span className="mono">Marketplace</span>
            <ul>
              <li>Discover</li>
              <li>Designers</li>
              <li>Feed</li>
              <li>Atelier</li>
            </ul>
          </div>
          <div className="col">
            <span className="mono">House</span>
            <ul>
              <li>The manifesto</li>
              <li>Provenance</li>
              <li>Returns &amp; care</li>
              <li>Contact</li>
            </ul>
          </div>
          <div className="col">
            <span className="mono">Letter</span>
            <ul>
              <li style={{ opacity: 1 }}>One slow letter, sent on Friday.</li>
            </ul>
            <div
              style={{
                marginTop: 12,
                border: "1px solid rgba(250,247,242,0.18)",
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 13,
                opacity: 0.9,
                fontStyle: "italic",
                fontFamily: "var(--font-cormorant), serif",
              }}
            >
              your address →
            </div>
            <div className="legal">© NEFER 2026 · IDN v1.0</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
