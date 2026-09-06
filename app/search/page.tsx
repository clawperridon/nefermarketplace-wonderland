"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { MkNav } from "@/components/MarketplaceUI";
import { products } from "@/lib/products";

export default function Search() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) =>
      [p.name, p.designer, p.category, p.lot].some((field) => field.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className="mk-screen">
      <MkNav active="discover" />

      <div className="search-header">
        <div className="eyebrow">— Search the shelf</div>
        <div className="search-input-row">
          <input
            type="text"
            placeholder="Search by piece, designer, or material…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <span className="search-count">
            {results.length} {results.length === 1 ? "piece" : "pieces"}
          </span>
        </div>
      </div>

      {results.length === 0 ? (
        <div className="search-empty">Nothing matches &ldquo;{query}&rdquo; — try a designer name or a fabric.</div>
      ) : (
        <div className="product-grid" style={{ padding: "0 48px 80px" }}>
          {results.map((p) => (
            <Link key={p.id} href={`/${p.slug}`} className="product-card">
              <div className={`img ${p.imgClass}`}></div>
              <div className="meta-row">
                <span>{p.category}</span>
                <span>{p.lot}</span>
              </div>
              <div className="name">{p.name}</div>
              <div className="row2">
                <span>{p.designer}</span>
                <span className="price">EUR {p.price.toLocaleString("en-IE")}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
