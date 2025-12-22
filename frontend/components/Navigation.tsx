"use client";

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useChainId } from 'wagmi';

export function Navigation() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  
  const getNetworkName = (id: number) => {
    switch (id) {
      case 1: return 'Ethereum';
      case 11155111: return 'Sepolia';
      case 31337: return 'Localhost';
      default: return 'Unknown';
    }
  };

  return (
    <>
      <header className="relative z-20 border-b border-white/10 backdrop-blur-xl bg-slate-900/50">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-purple-500/30 animate-float">
                🏃‍♂️
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-xs border-2 border-slate-900">
                ✓
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                🏆 Athlete Registration
              </h1>
              <p className="text-sm text-white/50 flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
                FHE Privacy Protection Platform
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {isConnected && (
              <div className="network-indicator">
                <div className="network-dot"></div>
                <span className="text-white/80">{getNetworkName(chainId)}</span>
                {chainId === 31337 && (
                  <span className="badge badge-warning text-xs">🧪 Dev</span>
                )}
              </div>
            )}
            <ConnectButton showBalance={false} />
          </div>
        </div>
      </header>

      <section className="relative py-16 px-6 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 animate-fade-in">
            <span className="text-lg">🔐</span>
            <span className="text-sm font-medium text-purple-300">Powered by Zama FHE Technology</span>
            <span className="text-lg">⚡</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-slide-up">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Privacy-First
            </span>
            <br />
            <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Athlete Registration 🏅
            </span>
          </h1>

          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto leading-relaxed animate-slide-up stagger-1">
            Register your athlete profile with <span className="text-purple-400 font-semibold">end-to-end encryption</span>. 
            Your personal data stays private, even from the blockchain! 🛡️
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12 animate-slide-up stagger-2">
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/20 backdrop-blur-sm">
              <span className="text-2xl">🏃‍♂️</span>
              <span className="font-semibold text-white">Athlete Registration</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-green-500/20 to-green-600/10 border border-green-500/20 backdrop-blur-sm">
              <span className="text-2xl">🔒</span>
              <span className="font-semibold text-white">FHE Encryption</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-500/20 to-purple-600/10 border border-purple-500/20 backdrop-blur-sm">
              <span className="text-2xl">📊</span>
              <span className="font-semibold text-white">Age Verification</span>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/20 backdrop-blur-sm">
              <span className="text-2xl">🔓</span>
              <span className="font-semibold text-white">Secure Decryption</span>
            </div>
          </div>

          <div className="stats-grid max-w-3xl mx-auto animate-slide-up stagger-3">
            <div className="stat-card">
              <div className="icon">🏆</div>
              <div className="value">5</div>
              <div className="label">Sport Categories</div>
            </div>
            <div className="stat-card">
              <div className="icon">🔐</div>
              <div className="value">256</div>
              <div className="label">Bit Encryption</div>
            </div>
            <div className="stat-card">
              <div className="icon">⚡</div>
              <div className="value">100%</div>
              <div className="label">On-Chain Privacy</div>
            </div>
            <div className="stat-card">
              <div className="icon">🌐</div>
              <div className="value">24/7</div>
              <div className="label">Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">✨ How It Works</h2>
            <p className="text-white/60">Simple steps to register with complete privacy</p>
          </div>

          <div className="steps">
            <div className="step active">
              <div className="step-number">1</div>
              <span className="step-label">📝 Fill Form</span>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">2</div>
              <span className="step-label">🔐 Encrypt</span>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">3</div>
              <span className="step-label">⛓️ Store</span>
            </div>
            <div className="step-connector"></div>
            <div className="step">
              <div className="step-number">4</div>
              <span className="step-label">🔓 Decrypt</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
