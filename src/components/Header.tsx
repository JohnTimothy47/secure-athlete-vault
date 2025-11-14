import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Logo } from './Logo';

export const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between px-6">
        <Logo />
        <div className="flex items-center gap-8">
          <div className="hidden md:block text-sm font-medium text-muted-foreground">
            Train Hard, Share Securely.
          </div>
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};
