interface NavProps {
  children?: React.ReactNode;
}

const Nav = ({ children }: NavProps) => {
  return (
    <nav className="flex w-full gap-4 lg:gap-6" aria-label="Main navigation">
      {children}
    </nav>
  );
};

export { Nav };
