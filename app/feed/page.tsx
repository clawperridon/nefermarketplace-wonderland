import { MkNav } from "@/components/MarketplaceUI";

type FeedItemProps = {
  imgStyle: React.CSSProperties;
  category: string;
  readTime: string;
  title: string;
  excerpt: string;
  date: string;
};

function FeedItem({ imgStyle, category, readTime, title, excerpt, date }: FeedItemProps) {
  return (
    <a href="#" className="feed-item">
      <div className="img" style={imgStyle}></div>
      <div>
        <div className="mono">
          {category} · {readTime}
        </div>
        <h3 className="feed-item-title">{title}</h3>
        <p className="excerpt">{excerpt}</p>
        <div className="meta">{date}</div>
      </div>
    </a>
  );
}

export default function Feed() {
  return (
    <div className="mk-screen">
      <MkNav active="feed" />

      <div className="page-header">
        <div className="eyebrow">— Read · listen · look</div>
        <h1>The feed.</h1>
        <p className="lede">
          Essays, studio conversations and field notes from the people who make what we carry.
          Updated most Fridays, never in a hurry.
        </p>
      </div>

      <div className="feed-list">
        <FeedItem
          imgStyle={{ background: "linear-gradient(165deg, #d8a874 0%, #7a5a3c 60%, #2a1f15 100%)" }}
          category="Essay"
          readTime="14 min"
          title="A weatherproof wardrobe for the desert at dusk."
          excerpt="On dressing for the hour when the temperature drops thirty degrees in twenty minutes, and why layering is a discipline, not an accident."
          date="Friday · 24 April"
        />
        <FeedItem
          imgStyle={{ background: "linear-gradient(180deg, #cfd4dc 0%, #5b6470 80%)" }}
          category="Conversation"
          readTime="9 min"
          title="Studio Mira on patience."
          excerpt="A conversation with the studio of three about weaving on a single loom, and why they have never once rushed a season."
          date="Friday · 17 April"
        />
        <FeedItem
          imgStyle={{ background: "linear-gradient(180deg, #1a1612 0%, #4a3b2e 100%)" }}
          category="Field notes · sound"
          readTime="6 min"
          title="The room before the storm."
          excerpt="Field recordings and notes from the Milan atelier the week before the yearly cashmere cut — the quiet that precedes a year's worth of coats."
          date="Friday · 10 April"
        />
        <FeedItem
          imgStyle={{ background: "linear-gradient(170deg, #fbf6ec 0%, #efe2cc 50%, #c9a57b 100%)" }}
          category="Conversation"
          readTime="11 min"
          title="Hana Lindqvist on dyeing with what's left over."
          excerpt="How a Helsinki knitwear studio built a palette entirely from plant pigment offcuts, and why no two dye lots ever quite match."
          date="Friday · 3 April"
        />
        <FeedItem
          imgStyle={{ background: "linear-gradient(160deg, #ebe1ce 0%, #b89668 60%, #3a2d20 100%)" }}
          category="Essay"
          readTime="8 min"
          title="Why we don't replenish stock."
          excerpt="A short case for scarcity that isn't marketing — on what changes when a studio truly cannot make more of a thing."
          date="Friday · 27 March"
        />
      </div>
    </div>
  );
}
