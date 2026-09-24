import React, { useState, useEffect } from 'react';
import { Github, Menu, X, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ChipLogo from '@/components/ui/ChipLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Overview', href: '#overview' },
    { label: 'Silicon Die', href: '#code-silicon' },
    { label: 'Architecture', href: '#architecture' },
    { label: 'ISA', href: '#isa' },
    { label: 'Stack', href: '#stack' },
    { label: 'Physical Design', href: '#physical-design' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020305]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          className="group flex items-center gap-3 text-lg font-bold tracking-tight text-white hover:text-cyan-300 transition-colors"
        >
          <ChipLogo size={28} />
          <span className="font-mono tracking-wider">AURA-RV</span>
        </a>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-zinc-300">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-white transition-colors hover:underline hover:underline-offset-8 hover:decoration-cyan-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/sudhanshu-mishra/AURA-RV"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-white/15 bg-white/[0.05] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-cyan-400 hover:bg-white/[0.1] whitespace-nowrap"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub</span>
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile dropdown with framer-motion folding animation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            layout
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: { type: 'spring', stiffness: 350, damping: 30 },
                opacity: { duration: 0.2 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { type: 'spring', stiffness: 380, damping: 35 },
                opacity: { duration: 0.15 },
              },
            }}
            className="lg:hidden overflow-hidden border-b border-white/10 bg-[#05070b]/95 backdrop-blur-xl px-6 py-4"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-sm text-zinc-300 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

