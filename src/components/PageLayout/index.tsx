import { Header } from "@/components/Header";
import type { PageLayoutProps } from "./types";

export function PageLayout({ className, children, ...props }: PageLayoutProps) {
  return (
    <>
      <Header />
      <div
        className={`max-w-6xl w-full px-3 py-6 mx-auto ${className}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
