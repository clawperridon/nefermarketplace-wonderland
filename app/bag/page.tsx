"use client";

import Link from "next/link";
import { MkNav } from "@/components/MarketplaceUI";
import { useCart } from "@/lib/cart";
import { products } from "@/lib/products";

function formatEUR(n: number) {
  return `EUR ${n.toLocaleString("en-IE", { minimumFractionDigits: 0 })}`;
}

export default function Bag() {
  const { items, subtotal, setQty, removeItem } = useCart();

  return (
    <div className="mk-screen">
      <MkNav active="discover" />

      <div className="page-header">
        <div className="eyebrow">— Your shelf, ready to go</div>
        <h1>The bag.</h1>
        <p className="lede">No carts, no countdowns — just what you&apos;ve set aside.</p>
      </div>

      <div className="bag-layout">
        <div className="bag-items">
          {items.length === 0 ? (
            <div className="bag-empty">
              <div className="name">Your bag is quiet.</div>
              <p>
                Nothing set aside yet. <Link href="/">Return to Discover</Link> or let the{" "}
                <Link href="/atelier">Atelier</Link> assemble a shelf for you.
              </p>
            </div>
          ) : (
            items.map((item) => {
              const product = products.find((p) => p.id === item.id);
              return (
                <div className="bag-row" key={`${item.id}-${item.size}`}>
                  <div className={`img ${product?.imgClass ?? "p1"}`}></div>
                  <div>
                    <div className="designer">— {item.designer}</div>
                    <div className="name">{item.name}</div>
                    <div className="size">
                      size {item.size} · {formatEUR(item.price)}
                    </div>
                    <div className="bag-qty">
                      <button onClick={() => setQty(item.id, item.size, item.qty - 1)} aria-label="Decrease quantity">
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.size, item.qty + 1)} aria-label="Increase quantity">
                        +
                      </button>
                      <button className="remove" onClick={() => removeItem(item.id, item.size)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="price-col">{formatEUR(item.price * item.qty)}</div>
                </div>
              );
            })
          )}
        </div>

        <aside className="bag-summary">
          <h3>Summary</h3>
          <div className="bag-summary-row">
            <span>Subtotal</span>
            <span className="val">{formatEUR(subtotal)}</span>
          </div>
          <div className="bag-summary-row">
            <span>Shipping</span>
            <span className="val">Calculated at checkout</span>
          </div>
          <div className="bag-summary-row total">
            <span>Total</span>
            <span className="val">{formatEUR(subtotal)}</span>
          </div>
          <button className="btn" style={{ width: "100%", justifyContent: "center", marginTop: 20 }} disabled={items.length === 0}>
            Checkout →
          </button>
          <div className="bag-checkout-note">
            This is a design prototype — checkout isn&apos;t wired up to real payment yet.
          </div>
        </aside>
      </div>
    </div>
  );
}
