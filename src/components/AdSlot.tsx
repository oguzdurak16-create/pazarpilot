"use client";
import { useEffect, useRef, useState } from "react";

export default function AdSlot({ id, className="" }: { id: string; className?: string }) {
  const ref = useRef<HTMLDivElement|null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => e.isIntersecting && setShow(true));
    }, { rootMargin: "300px" });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`w-full rounded-xl border border-dashed p-3 text-center text-xs text-gray-500 ${className}`}>
      {show ? <div id={id}>Reklam alanı: {id}</div> : <div style={{height: 80}}/>}
    </div>
  );
}
