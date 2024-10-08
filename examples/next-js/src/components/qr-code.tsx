"use client";

import { createNoteQR, encodeURL } from "@note-protocol/actions";
import { useEffect, useRef } from "react";

type ComponentProps = {
  url: string | URL;
  className?: string;
  background?: string;
  color?: string;
  size?: number;
};

export function NoteQRCode({
  url,
  className,
  background = "transparent",
  color,
  size = 400,
}: ComponentProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const encodedUrl = encodeURL(
      {
        link: new URL(url, window.location.href),
      },
      "note-action:",
    );

    console.log("encodedUrl:", encodedUrl.toString());

    const qr = createNoteQR(encodedUrl, size, background, color);

    if (ref.current && !ref.current.innerHTML) {
      qr.append(ref.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  return <div ref={ref} className={className} />;
}
