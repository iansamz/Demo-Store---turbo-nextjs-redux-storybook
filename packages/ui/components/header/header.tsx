import { Logo } from "../logo";

export interface HeaderProps {
  children?: React.ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-20 bg-neutral-100/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-3 sm:px-8">
        <div className="flex h-16 justify-between gap-4 md:gap-8">
          <Logo />
          {children}
        </div>
      </div>
    </header>
  );
};

export { Header };
