import { MkNav } from "@/components/MarketplaceUI";

type DesignerCardProps = {
  imgStyle: React.CSSProperties;
  eyebrow: string;
  name: string;
  description: string;
  founded: string;
  cadence: string;
  pieces: string;
};

function DesignerCard({ imgStyle, eyebrow, name, description, founded, cadence, pieces }: DesignerCardProps) {
  return (
    <div className="designer-card">
      <div className="img" style={imgStyle}></div>
      <div className="body">
        <div className="eyebrow">{eyebrow}</div>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="facts">
          <div>
            <span className="mono">Founded</span>
            <span className="val">{founded}</span>
          </div>
          <div>
            <span className="mono">Cadence</span>
            <span className="val">{cadence}</span>
          </div>
          <div>
            <span className="mono">Pieces this drop</span>
            <span className="val">{pieces}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Designers() {
  return (
    <div className="mk-screen">
      <MkNav active="designers" />

      <div className="page-header">
        <div className="eyebrow">— The studios we work with</div>
        <h1>The makers behind it.</h1>
        <p className="lede">
          Forty independent designers, each cut to a small run and never replenished. We visit
          the studios ourselves before anything joins the shelf.
        </p>
      </div>

      <div className="designers-grid">
        <DesignerCard
          eyebrow="— In the workshop · Antwerp"
          imgStyle={{ background: "linear-gradient(165deg, #d8a874 0%, #7a5a3c 60%, #2a1f15 100%)" }}
          name="Studio Mira"
          description="A linen overshirt in sand, woven on a single loom in Antwerp by a studio of three. Cut once, finished by hand, shipped in a paper sleeve."
          founded="2019, Antwerp"
          cadence="Twice yearly"
          pieces="04"
        />
        <DesignerCard
          eyebrow="— Tailoring house · Brussels"
          imgStyle={{ background: "linear-gradient(180deg, #cfd4dc 0%, #5b6470 80%)" }}
          name="Kestrel & Co."
          description="Wool trousers with a soft fall, cut for the hour just before dusk. A father-and-daughter house running its third decade of quiet tailoring."
          founded="1998, Brussels"
          cadence="Quarterly"
          pieces="03"
        />
        <DesignerCard
          eyebrow="— Atelier · Milan"
          imgStyle={{ background: "linear-gradient(165deg, #f5ead5 0%, #d8b88a 55%, #4a3b2e 100%)" }}
          name="Atelier Souk"
          description="Undyed cashmere, cut once a year in Milan. Every coat is sized 36–42 and numbered; when a size sells out, it does not return until the next cut."
          founded="2011, Milan"
          cadence="Once yearly"
          pieces="06"
        />
        <DesignerCard
          eyebrow="— Knitwear studio · Helsinki"
          imgStyle={{ background: "linear-gradient(170deg, #fbf6ec 0%, #efe2cc 50%, #c9a57b 100%)" }}
          name="Hana Lindqvist"
          description="Merino knits dyed in small batches with plant pigment, the colour of the light at the hour the studio closes. No two dye lots are quite the same."
          founded="2016, Helsinki"
          cadence="Three times a year"
          pieces="05"
        />
      </div>
    </div>
  );
}
