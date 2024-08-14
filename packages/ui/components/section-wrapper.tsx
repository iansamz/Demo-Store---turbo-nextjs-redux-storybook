import React from "react";
import { cn } from "@repo/ui/lib/utils";

const SectionWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <section
    ref={ref}
    className={cn("mx-auto max-w-7xl p-8 pb-16", className)}
    {...props}
  >
    {children}
  </section>
));

export { SectionWrapper };
