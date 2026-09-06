import { MkNav, SmallSphere } from "@/components/MarketplaceUI";

export default function Atelier() {
  return (
    <div className="mk-screen">
      <MkNav active="atelier" />

      <div className="atelier">
        <main className="atelier-main">
          <header className="atelier-header">
            <div>
              <div className="eyebrow">— The Atelier · a private muse · session 014</div>
              <h2>&ldquo;Tell us where you&apos;re going.&rdquo;</h2>
            </div>
            <div className="session">
              <div>
                <span className="dot"></span>Listening · slow mode
              </div>
              <div style={{ marginTop: 6, opacity: 0.5 }}>Started 14:22 · CET</div>
            </div>
          </header>

          <div className="atelier-thread">
            <div className="msg muse">
              <div className="avatar">
                <SmallSphere size={44} />
              </div>
              <div>
                <div className="text">
                  We are looking at <em>late afternoon, single source light</em>.
                  <span className="softer">
                    Tell us where you&apos;re going, and we&apos;ll glimpse what travels with you.
                    Two words is enough.
                  </span>
                </div>
                <div className="meta">— muse · greeting</div>
              </div>
            </div>

            <div className="msg you">
              <div>
                A wedding outside Marrakech. Late September. We&apos;re staying for the weekend. I
                don&apos;t want to look like a tourist.
              </div>
              <div className="meta">14:23 · you</div>
            </div>

            <div className="msg muse">
              <div className="avatar">
                <SmallSphere size={44} />
              </div>
              <div>
                <div className="text">
                  <em>Sand at six o&apos;clock.</em> Linen that has been worn before. Something
                  that survives the drive in and walks straight to the table.
                  <span className="softer">
                    We&apos;ll set aside three pieces. Slow with us — we won&apos;t show forty.
                  </span>
                </div>
                <div className="meta">— muse · considering</div>
              </div>
            </div>

            <div className="muse-chips">
              <span className="chip warm">+ linen</span>
              <span className="chip warm">+ sand / dune</span>
              <span className="chip warm">+ late afternoon</span>
              <span className="chip">+ never-crowded</span>
              <span className="chip">— polished</span>
              <span className="chip">— synthetic</span>
            </div>

            <div className="muse glimpse-wrapper" style={{ position: "relative" }}>
              <div className="muse-glimpse">
                <div
                  className="img p1"
                  style={{ background: "linear-gradient(155deg, #efe2cc 0%, #c9a57b 60%, #7a5a3c 100%)" }}
                ></div>
                <div className="info">
                  <div className="mono">Glimpse 01 · Studio Mira</div>
                  <div className="name">Antwerp · overshirt</div>
                  <div className="why">
                    A linen overshirt the colour of <em>the wall behind you</em>. It&apos;s been
                    worn a season already — patient, lived-in, never new-feeling. Sized to fall a
                    half-step long.
                  </div>
                </div>
                <div>
                  <div className="price">EUR 480</div>
                  <div className="confidence">we are 86% sure</div>
                </div>
              </div>
            </div>

            <div className="msg muse">
              <div className="avatar">
                <SmallSphere size={44} />
              </div>
              <div>
                <div className="text">And then — a quieter thing. Trousers that don&apos;t announce themselves.</div>
                <div className="meta">— muse · whispering</div>
              </div>
            </div>

            <div className="muse glimpse-wrapper" style={{ position: "relative" }}>
              <div className="muse-glimpse">
                <div
                  className="img"
                  style={{ background: "linear-gradient(180deg, #fdfaf3 0%, #e8eef6 45%, #9ea7b3 100%)" }}
                ></div>
                <div className="info">
                  <div className="mono">Glimpse 02 · Kestrel &amp; Co.</div>
                  <div className="name">Chrome Pleat · trouser</div>
                  <div className="why">
                    Wool with a soft fall, the colour of <em>the sky just before it goes cool</em>.
                    Pleat single, cuff none. We&apos;d wear it with the overshirt above.
                  </div>
                </div>
                <div>
                  <div className="price">EUR 620</div>
                  <div className="confidence">we are 82% sure</div>
                </div>
              </div>
            </div>

            <div className="msg you">
              <div>Could we see something to throw over it at night? I get cold.</div>
              <div className="meta">14:28 · you</div>
            </div>

            <div className="msg muse">
              <div className="avatar">
                <SmallSphere size={44} />
              </div>
              <div>
                <div className="text">
                  <em>One last thing.</em> A cashmere coat the length of a long drive.
                  <span className="softer">
                    It&apos;s the last of its size — we&apos;d reserve it for you while we finish
                    the shelf.
                  </span>
                </div>
                <div className="meta">— muse · settling</div>
              </div>
            </div>

            <div className="muse glimpse-wrapper" style={{ position: "relative" }}>
              <div className="muse-glimpse">
                <div
                  className="img"
                  style={{ background: "linear-gradient(165deg, #f5ead5 0%, #d8b88a 55%, #4a3b2e 100%)" }}
                ></div>
                <div className="info">
                  <div className="mono">Glimpse 03 · Atelier Souk · last one</div>
                  <div className="name">Dune Long · coat</div>
                  <div className="why">
                    Cashmere, undyed. Cut once a year in Milan, sized 36–42.
                    <em> Yours is 38 — we are holding it for the next eleven minutes.</em>
                  </div>
                </div>
                <div>
                  <div className="price">EUR 1,240</div>
                  <div className="confidence">we are 91% sure</div>
                </div>
              </div>
            </div>
          </div>

          <div className="atelier-composer">
            <div className="input italic">
              Say more — or just <em style={{ color: "var(--sand-300)" }}>nothing</em>, and
              we&apos;ll keep glimpsing…
            </div>
            <button className="icon-btn" title="Attach a mood image">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="5" width="18" height="14" rx="1.5" />
                <circle cx="8" cy="10.5" r="1.5" />
                <path d="M21 17l-5-5-9 9" />
              </svg>
            </button>
            <button className="send" title="Send">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </main>

        <aside className="atelier-side">
          <h3 className="italic">The shelf.</h3>
          <div className="sub">— what we&apos;ve set aside · 3 of 5</div>

          <div className="shelf-card">
            <div
              className="img"
              style={{ background: "linear-gradient(155deg, #efe2cc 0%, #c9a57b 60%, #7a5a3c 100%)" }}
            ></div>
            <div>
              <div className="designer">— Studio Mira</div>
              <div className="name italic">Antwerp · overshirt</div>
              <div className="row">
                <span>size 38</span>
                <span>EUR 480</span>
              </div>
            </div>
          </div>

          <div className="shelf-card">
            <div
              className="img"
              style={{ background: "linear-gradient(180deg, #fdfaf3 0%, #e8eef6 45%, #9ea7b3 100%)" }}
            ></div>
            <div>
              <div className="designer">— Kestrel &amp; Co.</div>
              <div className="name italic">Chrome Pleat · trouser</div>
              <div className="row">
                <span>size 38</span>
                <span>EUR 620</span>
              </div>
            </div>
          </div>

          <div className="shelf-card">
            <div
              className="img"
              style={{ background: "linear-gradient(165deg, #f5ead5 0%, #d8b88a 55%, #4a3b2e 100%)" }}
            ></div>
            <div>
              <div className="designer">— Atelier Souk · holding 11:42</div>
              <div className="name italic">Dune Long · coat</div>
              <div className="row">
                <span>size 38</span>
                <span>EUR 1,240</span>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 22 }}>
            <button className="btn" style={{ width: "100%", justifyContent: "center" }}>
              Send the shelf to me →
            </button>
            <div
              style={{
                fontFamily: "var(--font-cormorant), serif",
                fontStyle: "italic",
                fontSize: 13,
                color: "var(--dusk)",
                marginTop: 10,
                textAlign: "center",
              }}
            >
              We&apos;ll email a quiet edit. No carts, no countdowns.
            </div>
          </div>

          <div className="atelier-mood">
            <span className="mono">— What the muse heard</span>
            <div className="quote">
              <em>&ldquo;a wedding outside Marrakech&rdquo;</em>
              <br />
              · sand · late afternoon ·
              <br />
              never-crowded · linen ·
              <br />
              cashmere · sized 38 ·
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
