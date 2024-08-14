import { Button } from "@repo/ui/components/button";
import { MenuIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@repo/ui/components/sheet";

interface MobileMenuProps {
  children: React.ReactNode;
}

export const MobileMenu = ({ children }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="shrink self-center md:hidden"
          size="icon"
          variant="ghost"
          aria-controls="mobile-menu"
          aria-expanded={false}
          aria-label="Open menu"
        >
          <MenuIcon className="h-6 w-6 shrink-0" aria-hidden />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="h-full">
        <SheetTitle>
          <span className="sr-only">Mobile Menu</span>
        </SheetTitle>
        {children}
        <SheetDescription />
      </SheetContent>
    </Sheet>
  );
};
