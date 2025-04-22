"use client";
import { useActionState, useState } from "react";
import { signIn } from "@/actions/auth.actions";

import Image from "next/image";
import Link from "next/link";
const initialState = {
  success: false,
  message: "",
  errors: undefined,
  inputs: undefined,
};

export default function Login() {
  const [state, action, isPending] = useActionState(signIn, initialState);

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
          {" "}
          {/* mt-0 pour supprimer toute marge haute */}
          <h2 className="text-lg text-black md:text-white text-center mb-3 tracking-wide">
            LOGIN
          </h2>
          <hr className="border-t border-black md:border-white w-80 mx-auto mb-6" />
          <form action={action} className="space-y-4">
            <div className="relative left-20 top-[-10px]">
              <label className="block text-sm text-black md:text-white mb-1">
                email:
              </label>
              <input
                type="email"
                className="w-full bg-transparent text-black md:text-white border-none focus:outline-none"
                name="email"
                required
              />
              <hr className="border-t border-black md:border-white w-60 mx-0.00000000001 mb-6" />
            </div>
            <div className="relative left-20 top-[6px]">
              <label className="block text-sm text-black md:text-white mb-1 top-[2000px]">
                Mot de Passe:
              </label>
              <input
                type="text"
                className="w-full bg-transparent text-black md:text-white border-none focus:outline-none"
                name="password"
                required
              />
              <hr className="border-t border-black md:border-white mt-0.5 mb-10 w-60 mx-0" />
            </div>
            <p className="text-xs text-black md:text-white text-center my-4 cursor-pointer hover:underline">
              Mot de passe oublié ?
            </p>
            <button
              type="submit"
              disabled={isPending}
              className="w-36 mb-10 mx-auto block py-2 border border-black md:border-white text-black md:text-white rounded-md text-sm hover:bg-black md:hover:bg-white hover:text-white md:hover:text-black transition-colors"
            >
              <span className="">
                {isPending ? "Connexion..." : "Connecter"}
              </span>
            </button>
            {state.message && (
              <p className="text-red-500 text-center">
                {typeof state.message === "string"
                  ? state.message
                  : "Erreur lors de la connexion"}
              </p>
            )}{" "}
            <div className="text-center">
              <p className="text-xs text-black md:text-white">
                Vous n'avez pas de compte ?{" "}
                <Link href="/register" className="font-medium hover:underline">
                  S'inscrire
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
