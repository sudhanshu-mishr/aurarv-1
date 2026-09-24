import React from 'react';
import { Github, Cpu, ArrowUp } from 'lucide-react';
import ChipLogo from '@/components/ui/ChipLogo';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#020305] py-14 text-xs font-mono text-zinc-500">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/5">
          
          <div>
            <div className="flex items-center gap-3 text-base font-bold text-white">
              <ChipLogo size={24} />
              <span className="font-mono tracking-wider">AURA-RV</span>
            </div>
            <p className="mt-2 text-zinc-400 max-w-sm font-sans text-xs">
              A RISC-V CPU. Built from RTL to Silicon. Open-source processor hardware engineering project.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs">
            <div>
              <div className="font-semibold text-zinc-300 uppercase tracking-wider mb-2">Navigation</div>
              <ul className="space-y-1.5">
                <li><a href="#overview" className="hover:text-cyan-400 transition-colors">Overview</a></li>
                <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a></li>
                <li><a href="#isa" className="hover:text-cyan-400 transition-colors">RV32I ISA</a></li>
                <li><a href="#stack" className="hover:text-cyan-400 transition-colors">The Stack</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-zinc-300 uppercase tracking-wider mb-2">Hardware</div>
              <ul className="space-y-1.5">
                <li><a href="#code-silicon" className="hover:text-cyan-400 transition-colors">Silicon Die</a></li>
                <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Architecture</a></li>
                <li><a href="#physical-design" className="hover:text-cyan-400 transition-colors">Physical Design</a></li>
                <li><a href="#roadmap" className="hover:text-cyan-400 transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <div className="font-semibold text-zinc-300 uppercase tracking-wider mb-2">Repository</div>
              <ul className="space-y-1.5">
                <li>
                  <a
                    href="https://github.com/sudhanshu-mishra/AURA-RV"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <Github className="h-3.5 w-3.5" />
                    <span>GitHub</span>
                  </a>
                </li>
                <li><a href="#about" className="hover:text-cyan-400 transition-colors">Manifesto</a></li>
              </ul>
            </div>
          </div>

        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-zinc-600">
            © {new Date().getFullYear()} AURA-RV Project. Open-source hardware under Apache 2.0.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
