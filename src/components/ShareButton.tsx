"use client";

import { useState } from "react";
import { ProfileIconButton } from "./ProfileIconButton";
import { icons } from "./icons";

export default function ShareButton({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, url });
      } catch {
        // the person closed the share sheet; nothing to do
      }
      return;
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  }

  return (
    <ProfileIconButton label={copied ? "Copied!" : "Share"} onClick={share}>
      {icons.share}
    </ProfileIconButton>
  );
}
