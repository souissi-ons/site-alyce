"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!firstName || !name || !email || !password || !confirmPassword) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Veuillez entrer une adresse email valide.");
      return;
    }
    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    console.log("Register Submitted", { firstName, name, email, password });
    setError("");
    setIsRegistered(true);
  };

  return (
    <div
      className="min-h-screen flex relative bg-pink-50 md:bg-none"
      style={{
        backgroundImage: "url('/bg-image.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Logo en haut à gauche - position absolue sans marge */}
      <Link href="/" className="absolute top-0 left-0 z-10 p-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/alyce-logo-1.png"
            alt="Alyce"
            width={40}
            height={40}
            className="w-8 h-8"
          />
          <Image
            src="/alyce-logo-2.png"
            alt="Alyce"
            width={80}
            height={32}
            className="w-20 h-6"
          />
        </div>
      </Link>

      {/* Contenu principal sans padding-top */}
      <div className="w-full md:w-2/5 flex items-center justify-center bg-black bg-opacity-0 md:bg-opacity-40 p-12">
        <div className="w-full max-w-sm mt-0">
          <h2 className="text-lg text-black md:text-white text-center mb-3 tracking-wide">
            CRÉER UN COMPTE
          </h2>
          <hr className="border-t border-black md:border-white w-80 mx-auto mb-6" />

          {error && (
            <div
              className="text-red-500 mb-4 text-center text-sm"
              aria-live="polite"
            >
              {error}
            </div>
          )}
          {isRegistered && (
            <div
              className="text-pink-300 mb-4 text-center text-sm"
              aria-live="polite"
            >
              Un email de confirmation a été envoyé. Veuillez vérifier votre
              boîte de réception.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative left-20 top-[-10px]">
              <label className="block text-sm text-black md:text-white mb-1">
                Prénom:
              </label>
              <input
                type="text"
                className="w-full bg-transparent text-black md:text-white border-none focus:outline-none"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <hr className="border-t border-black md:border-white w-60 mx-0 mb-6" />
            </div>

            <div className="relative left-20 top-[-10px]">
              <label className="block text-sm text-black md:text-white mb-1">
                Nom:
              </label>
              <input
                type="text"
                className="w-full bg-transparent text-black md:text-white border-none focus:outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <hr className="border-t border-black md:border-white w-60 mx-0 mb-6" />
            </div>

            <div className="relative left-20 top-[-10px]">
              <label className="block text-sm text-black md:text-white mb-1">
                Email:
              </label>
              <input
                type="email"
                className="w-full bg-transparent text-black md:text-white border-none focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <hr className="border-t border-black md:border-white w-60 mx-0 mb-6" />
            </div>

            <div className="relative left-20 top-[6px]">
              <label className="block text-sm text-black md:text-white mb-1">
                Mot de Passe:
              </label>
              <input
                type="password"
                className="w-full bg-transparent text-black md:text-white border-none focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
              <hr className="border-t border-black md:border-white mt-0.5 mb-6 w-60 mx-0" />
            </div>

            <div className="relative left-20 top-[6px]">
              <label className="block text-sm text-black md:text-white mb-1">
                Confirmer le mot de passe:
              </label>
              <input
                type="password"
                className="w-full bg-transparent text-black md:text-white border-none focus:outline-none"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={6}
              />
              <hr className="border-t border-black md:border-white mt-0.5 mb-10 w-60 mx-0" />
            </div>

            <button
              type="submit"
              className="w-36 mb-6 mx-auto block py-2 border border-black md:border-white text-black md:text-white rounded-md text-sm hover:bg-black md:hover:bg-white hover:text-white md:hover:text-black transition-colors"
            >
              Créer un compte
            </button>

            {/* Register with Google Button */}
            <button className="w-60 mb-6 mx-auto block py-2 border border-black md:border-white text-black md:text-white rounded-md text-sm hover:bg-black md:hover:bg-white hover:text-white md:hover:text-black transition-colors">
              Continuer avec Google
            </button>

            <div className="text-center">
              <p className="text-xs text-black md:text-white">
                Vous avez déjà un compte ?{" "}
                <Link href="/login" className="font-medium hover:underline">
                  Se connecter
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden md:block w bg-white h-full absolute left-2/5"></div>
      <div className="w-3/5 flex items-center justify-center relative">
        <img src="/logo.png" alt="Alyce Logo" className="w-80" />
      </div>
    </div>
  );
}
