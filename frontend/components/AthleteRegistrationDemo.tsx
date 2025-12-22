"use client";

import React, { useState, useRef } from "react";
import { useFhevm } from "../fhevm/useFhevm";
import { useInMemoryStorage } from "../hooks/useInMemoryStorage";
import { useAthleteRegistration, SportCategory } from "@/hooks/useAthleteRegistration";
import { useAccount, useChainId } from 'wagmi';
import { ethers } from 'ethers';

const SPORT_CATEGORIES = [
  { id: SportCategory.Individual, name: "Individual", icon: "🏃‍♂️", minAge: 8, color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-500/10", borderColor: "border-blue-500/30" },
  { id: SportCategory.Team, name: "Team", icon: "⚽", minAge: 10, color: "from-green-500 to-emerald-500", bgColor: "bg-green-500/10", borderColor: "border-green-500/30" },
  { id: SportCategory.Endurance, name: "Endurance", icon: "🏊‍♂️", minAge: 12, color: "from-yellow-500 to-orange-500", bgColor: "bg-yellow-500/10", borderColor: "border-yellow-500/30" },
  { id: SportCategory.Combat, name: "Combat", icon: "🥊", minAge: 14, color: "from-red-500 to-pink-500", bgColor: "bg-red-500/10", borderColor: "border-red-500/30" },
  { id: SportCategory.Other, name: "Other", icon: "🎯", minAge: 8, color: "from-purple-500 to-violet-500", bgColor: "bg-purple-500/10", borderColor: "border-purple-500/30" },
];

export const AthleteRegistrationDemo = () => {
  const { storage: fhevmDecryptionSignatureStorage } = useInMemoryStorage();
  const storageRef = useRef(fhevmDecryptionSignatureStorage);

  const wagmiAccount = useAccount();
  const wagmiChainId = useChainId();

  const [mounted, setMounted] = useState(false);
  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isConnected = mounted ? wagmiAccount.isConnected : false;
  const chainId = wagmiChainId;

  const [ethersSigner, setEthersSigner] = useState<ethers.Signer | undefined>(undefined);
  const [ethersReadonlyProvider, setEthersReadonlyProvider] = useState<ethers.ContractRunner | undefined>(undefined);

  React.useEffect(() => {
    if (wagmiAccount.isConnected && typeof window !== 'undefined' && window.ethereum && wagmiAccount.address) {
      const provider = new ethers.BrowserProvider(window.ethereum);
      provider.getSigner(wagmiAccount.address).then((signer) => {
        setEthersReadonlyProvider(provider);
        setEthersSigner(signer);
      });
    } else {
      setEthersReadonlyProvider(undefined);
      setEthersSigner(undefined);
    }
  }, [wagmiAccount.isConnected, wagmiAccount.address]);

  const [fhevmDelayPassed, setFhevmDelayPassed] = useState(false);
  React.useEffect(() => {
    const timer = setTimeout(() => setFhevmDelayPassed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const fhevmEnabled = isConnected && mounted && fhevmDelayPassed && typeof window !== 'undefined' && !!window?.ethereum;

  const {
    instance: fhevmInstance,
    status: fhevmStatus,
  } = useFhevm({
    provider: fhevmEnabled ? window.ethereum : undefined,
    chainId,
    initialMockChains: {},
    enabled: fhevmEnabled,
  });

  const athleteRegistration = useAthleteRegistration({
    instance: fhevmInstance,
    fhevmDecryptionSignatureStorage: storageRef,
    eip1193Provider: typeof window !== 'undefined' ? window.ethereum : undefined,
    chainId,
    ethersSigner,
    ethersReadonlyProvider,
    sameChain: { current: () => true },
    sameSigner: { current: () => true },
  });

  const [formData, setFormData] = useState({
    name: "",
    age: "",
    contact: "",
    sportCategory: SportCategory.Individual,
  });

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    if (!formData.name || !formData.age || !formData.contact) {
      alert("Please fill in all fields");
      return;
    }
    const age = parseInt(formData.age);
    const contact = parseInt(formData.contact);
    if (isNaN(age) || isNaN(contact)) {
      alert("Please enter valid numbers for age and contact");
      return;
    }
    await athleteRegistration.registerAthlete(formData.name, age, contact, formData.sportCategory);
  };

  const selectedCategory = SPORT_CATEGORIES.find(c => c.id === formData.sportCategory);

  return (
    <main className="max-w-7xl mx-auto px-6 py-8">
      <div className="animate-fade-in">
        {/* Connection Required */}
        {!isConnected && (
          <div className="mb-8 animate-scale-in">
            <div className="card max-w-lg mx-auto text-center py-12">
              <div className="w-24 h-24 bg-gradient-to-br from-orange-400 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center text-5xl mx-auto mb-8 shadow-2xl shadow-purple-500/30 animate-float">
                🏃‍♂️
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                👋 Welcome, Athlete!
              </h2>
              <p className="text-white/60 mb-8 text-lg">
                Connect your wallet to start your privacy-protected registration journey
              </p>
              <div className="flex items-center justify-center gap-3 text-white/40 text-sm">
                <span>🔒 Secure</span>
                <span>•</span>
                <span>🔐 Encrypted</span>
                <span>•</span>
                <span>🛡️ Private</span>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        {isConnected && (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Registration Form */}
            <div className="card animate-slide-up">
              <div className="section-header">
                <div className="icon bg-gradient-to-br from-blue-500 to-purple-600">
                  📝
                </div>
                <div>
                  <h2 className="title">Athlete Registration</h2>
                  <p className="subtitle">Fill in your details securely</p>
                </div>
              </div>

              {athleteRegistration.isRegistered ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30 animate-glow">
                    <span className="text-4xl">✅</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">
                    🎉 Registration Complete!
                  </h3>
                  <p className="text-white/60 mb-6">
                    Your athlete information has been securely encrypted and stored on-chain.
                  </p>
                  <div className="badge badge-success">
                    <span>🔐</span> FHE Protected
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); handleRegister(); }} className="space-y-6">
                  {/* Name Input */}
                  <div className="form-group">
                    <label className="form-label">
                      <span className="form-label-icon">👤</span>
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                    />
                  </div>

                  {/* Age Input */}
                  <div className="form-group">
                    <label className="form-label">
                      <span className="form-label-icon">🎂</span>
                      Age
                    </label>
                    <input
                      type="number"
                      className="input-field"
                      placeholder="Enter your age"
                      value={formData.age}
                      onChange={(e) => handleInputChange("age", e.target.value)}
                      min="1"
                      max="120"
                    />
                  </div>

                  {/* Contact Input */}
                  <div className="form-group">
                    <label className="form-label">
                      <span className="form-label-icon">📱</span>
                      Contact Number
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter contact number"
                      value={formData.contact}
                      onChange={(e) => handleInputChange("contact", e.target.value)}
                    />
                  </div>

                  {/* Sport Category Selector */}
                  <div className="form-group">
                    <label className="form-label">
                      <span className="form-label-icon">🏆</span>
                      Sport Category
                    </label>
                    <div className="sport-category-grid">
                      {SPORT_CATEGORIES.map((category) => (
                        <div
                          key={category.id}
                          className={`sport-category-card ${formData.sportCategory === category.id ? 'selected' : ''}`}
                          onClick={() => handleInputChange("sportCategory", category.id)}
                        >
                          <span className="icon">{category.icon}</span>
                          <span className="name">{category.name}</span>
                          <span className="min-age">Min: {category.minAge}+</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`btn-primary w-full ${athleteRegistration.isRegistering ? 'opacity-80' : ''}`}
                    disabled={!athleteRegistration.canRegister}
                  >
                    {athleteRegistration.isRegistering ? (
                      <>
                        <div className="spinner"></div>
                        <span>🔐 Encrypting & Registering...</span>
                      </>
                    ) : athleteRegistration.canRegister ? (
                      <>
                        <span>🚀</span>
                        <span>Register Athlete</span>
                      </>
                    ) : (
                      <>
                        <span>⏳</span>
                        <span>Preparing...</span>
                      </>
                    )}
                  </button>

                  {/* FHEVM Status */}
                  <div className="text-center text-sm text-white/40 mt-4">
                    {fhevmStatus === 'ready' ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        FHE Encryption Ready
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <div className="spinner w-3 h-3"></div>
                        Initializing FHE...
                      </span>
                    )}
                  </div>
                </form>
              )}
            </div>

            {/* Right Column - Info & Actions */}
            <div className="space-y-6">
              {/* Encrypted Information */}
              {athleteRegistration.isRegistered && athleteRegistration.athleteInfo && (
                <div className="card animate-slide-up stagger-1">
                  <div className="section-header">
                    <div className="icon bg-gradient-to-br from-green-500 to-teal-600">
                      🔒
                    </div>
                    <div>
                      <h2 className="title">Encrypted Data</h2>
                      <p className="subtitle">Stored securely on-chain</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="data-row">
                      <span className="label">
                        <span>🏆</span> Sport Category
                      </span>
                      <span className="value">
                        {selectedCategory?.icon} {selectedCategory?.name}
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="label">
                        <span>📅</span> Registered
                      </span>
                      <span className="value text-sm">
                        {new Date(Number(athleteRegistration.athleteInfo.registrationTimestamp) * 1000).toLocaleString()}
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="label">
                        <span>👤</span> Name
                      </span>
                      <span className="value encrypted">••••••••</span>
                    </div>
                    <div className="data-row">
                      <span className="label">
                        <span>🎂</span> Age
                      </span>
                      <span className="value encrypted">••</span>
                    </div>
                    <div className="data-row">
                      <span className="label">
                        <span>📱</span> Contact
                      </span>
                      <span className="value encrypted">••••••••••</span>
                    </div>
                  </div>

                  <div className="divider"></div>

                  <button
                    className={`btn-primary btn-success w-full ${athleteRegistration.isDecrypting ? 'opacity-80' : ''}`}
                    disabled={!athleteRegistration.canDecrypt}
                    onClick={athleteRegistration.decryptAthleteInfo}
                  >
                    {athleteRegistration.isDecrypting ? (
                      <>
                        <div className="spinner"></div>
                        <span>🔓 Decrypting...</span>
                      </>
                    ) : athleteRegistration.canDecrypt ? (
                      <>
                        <span>🔓</span>
                        <span>Decrypt My Information</span>
                      </>
                    ) : (
                      <>
                        <span>⏳</span>
                        <span>Preparing Decryption...</span>
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-white/40 mt-3">
                    🔐 Only you can decrypt your private data
                  </p>
                </div>
              )}

              {/* Decrypted Information */}
              {athleteRegistration.clearAthleteInfo && (
                <div className="card card-success animate-scale-in">
                  <div className="section-header">
                    <div className="icon bg-gradient-to-br from-green-500 to-emerald-600">
                      ✅
                    </div>
                    <div>
                      <h2 className="title">Decrypted Data</h2>
                      <p className="subtitle">Your private information</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="data-row">
                      <span className="label">
                        <span>👤</span> Name
                      </span>
                      <span className="value decrypted">
                        {athleteRegistration.clearAthleteInfo.name.toString()}
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="label">
                        <span>🎂</span> Age
                      </span>
                      <span className="value decrypted">
                        {athleteRegistration.clearAthleteInfo.age.toString()} years
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="label">
                        <span>📱</span> Contact
                      </span>
                      <span className="value decrypted">
                        {athleteRegistration.clearAthleteInfo.contact.toString()}
                      </span>
                    </div>
                    <div className="data-row">
                      <span className="label">
                        <span>🏆</span> Category Min Age
                      </span>
                      <span className="value">
                        {selectedCategory?.minAge}+ years
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">🎉</span>
                      <div>
                        <p className="font-semibold text-green-400">Decryption Successful!</p>
                        <p className="text-sm text-white/60">Your data has been securely decrypted</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="card animate-slide-up stagger-2">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span>⚡</span> Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    className="btn-secondary"
                    disabled={!athleteRegistration.canRefresh}
                    onClick={athleteRegistration.refreshAthleteInfo}
                  >
                    <span>🔄</span> Refresh
                  </button>
                  <button
                    className="btn-secondary"
                    disabled={!athleteRegistration.canCheckAge}
                    onClick={athleteRegistration.checkAgeRequirement}
                  >
                    <span>📊</span> Check Age
                  </button>
                </div>
              </div>

              {/* Status Messages */}
              {(athleteRegistration.message || athleteRegistration.error) && (
                <div className={`message ${athleteRegistration.error ? 'error' : 'success'} animate-slide-in`}>
                  <span className="text-xl">
                    {athleteRegistration.error ? '❌' : '✅'}
                  </span>
                  <span>
                    {athleteRegistration.message || athleteRegistration.error?.message}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center animate-fade-in">
          <div className="glass-dark rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-6 mb-6">
              <span className="text-3xl">🏃‍♂️</span>
              <span className="text-3xl">🔐</span>
              <span className="text-3xl">⛓️</span>
              <span className="text-3xl">🛡️</span>
            </div>
            <p className="text-white/60 mb-4">
              Built with ❤️ using Zama FHE Technology
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-white/40">
              <span>🔒 End-to-End Encrypted</span>
              <span>•</span>
              <span>🌐 Decentralized</span>
              <span>•</span>
              <span>🛡️ Privacy First</span>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
};
