"use client";

import { useState } from "react";
import { MkNav, SmallSphere } from "@/components/MarketplaceUI";

export default function Account() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  };

  return (
    <div className="mk-screen">
      <MkNav active="discover" />

      <div className="account-wrap">
        <div className="account-card">
          <SmallSphere size={48} />
          <h1>Your account.</h1>
          <p className="lede">
            No password to remember — we&apos;ll send a quiet link to sign in.
          </p>

          {sent ? (
            <div className="account-confirm">
              If &ldquo;{email}&rdquo; is in our little black book, a sign-in link is on its way.
            </div>
          ) : (
            <form className="account-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@somewhere.quiet"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit" className="btn" style={{ justifyContent: "center", marginTop: 6 }}>
                Send me a link →
              </button>
            </form>
          )}

          <div className="account-note">This is a design prototype · no real accounts are created</div>
        </div>
      </div>
    </div>
  );
}
