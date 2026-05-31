import "./button.module.css";
import type { ReactNode } from "react";

export default function Button({
  href,
  children,
  light = false,
  ghost = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  ghost?: boolean;
}) {
  const className = ghost
    ? "button button-ghost"
    : light
      ? "button button-light"
      : "button";

  return (
    <a className={className} href={href}>
      {children}
    </a>
  );
}
