import React from 'react';
import { ActiveTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="backdrop-blur-xl bg-white/[0.02] w-full py-8 border-t border-white/10 mt-auto relative z-10">
      <div className="max-w-[1100px] mx-auto flex flex-col md:flex-row justify-between items-center px-6 gap-6 text-sm">
        {/* Brand */}
        <div className="font-bold text-base text-white tracking-tight flex items-center gap-2">
          <span>Juan Salinas</span>
          <span className="text-[11px] font-mono text-blue-300 font-normal">| PUCV</span>
        </div>

        {/* Center Copyright matching mockup */}
        <div className="text-xs font-mono text-slate-400">
          © 2024 Juan Salinas. Ingeniería Civil en Informática.
        </div>

        {/* Right Links matching mockup */}
        <div className="flex gap-6 text-xs font-mono text-slate-400">
          <a
            href="https://www.linkedin.com/in/juan-salinas-acosta-0313bb41b/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-blue-300 transition-colors opacity-80 hover:opacity-100"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/juansalinasa-glitch"
            target="_blank"
            rel="noreferrer"
            className="hover:text-purple-300 transition-colors opacity-80 hover:opacity-100"
          >
            GitHub
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-sky-300 transition-colors opacity-80 hover:opacity-100"
          >
            Twitter
          </a>
        </div>
      </div>
    </footer>
  );
};

