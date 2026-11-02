import { Header } from "@/components/Header";
import type { PageLayoutProps } from "./types";

export function PageLayout({ className, children, ...props }: PageLayoutProps) {
  return (
    <>
      <Header />
      <div
        className={`max-w-6xl w-full p-3 mx-auto ${className}`}
        {...props}
      >
        {children}
      </div>
    </>
  );
}
