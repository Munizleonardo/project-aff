"use client";

import { createContext, useContext, useEffect, useState } from "react";
import {
  getCurrentUser,
  getMyProfile,
  getSavedProductIds,
  getStoredSession,
  isSupabaseBrowserAuthConfigured,
  removeProductFromBox,
  saveProductToBox,
  signInWithEmailPassword,
  signOut,
  signUpWithEmailPassword,
  storeSession,
  upsertMyProfile,
  type SupabaseSession,
  type UserProfile,
} from "@/app/_lib/supabase-auth-client";

type AuthContextValue = {
  session: SupabaseSession | null;
  profile: UserProfile | null;
  savedProductIds: string[];
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (input: { fullName: string; email: string; phone?: string; password: string; acceptedTerms: boolean }) => Promise<void>;
  logout: () => Promise<void>;
  toggleSavedProduct: (productId: string) => Promise<void>;
  isProductSaved: (productId: string) => boolean;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<SupabaseSession | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [savedProductIds, setSavedProductIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  async function hydrateAuthenticatedState(nextSession: SupabaseSession | null) {
    setSession(nextSession);
    storeSession(nextSession);

    if (!nextSession) {
      setProfile(null);
      setSavedProductIds([]);
      return;
    }

    const [nextProfile, nextSavedProducts] = await Promise.all([
      getMyProfile(nextSession.access_token),
      getSavedProductIds(nextSession.access_token),
    ]);
    setProfile(nextProfile);
    setSavedProductIds(nextSavedProducts);
  }

  useEffect(() => {
    async function restoreSession() {
      if (!isSupabaseBrowserAuthConfigured()) {
        setIsLoading(false);
        return;
      }

      const storedSession = getStoredSession();
      if (!storedSession) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await getCurrentUser(storedSession.access_token);
        await hydrateAuthenticatedState({ ...storedSession, user });
      } catch {
        storeSession(null);
        setSession(null);
        setProfile(null);
        setSavedProductIds([]);
      } finally {
        setIsLoading(false);
      }
    }

    restoreSession();
  }, []);

  async function signIn(email: string, password: string) {
    const nextSession = await signInWithEmailPassword(email, password);
    await hydrateAuthenticatedState(nextSession);
  }

  async function signUp(input: { fullName: string; email: string; phone?: string; password: string; acceptedTerms: boolean }) {
    const nextSession = await signUpWithEmailPassword(input);
    if (nextSession?.access_token) {
      await upsertMyProfile(nextSession.access_token, {
        userId: nextSession.user.id,
        fullName: input.fullName,
        email: input.email,
        phone: input.phone,
        acceptedTerms: input.acceptedTerms,
      });
      await hydrateAuthenticatedState(nextSession);
    }
  }

  async function logout() {
    if (session?.access_token) await signOut(session.access_token);
    await hydrateAuthenticatedState(null);
  }

  async function refreshProfile() {
    if (!session) return;
    setProfile(await getMyProfile(session.access_token));
  }

  function isProductSaved(productId: string) {
    return savedProductIds.includes(productId);
  }

  async function toggleSavedProduct(productId: string) {
    if (!session) throw new Error("Entre na sua conta para salvar produtos na Minha Caixa.");
    const alreadySaved = isProductSaved(productId);

    if (alreadySaved) {
      await removeProductFromBox(session.access_token, productId);
      setSavedProductIds((items) => items.filter((id) => id !== productId));
      return;
    }

    await saveProductToBox(session.access_token, session.user.id, productId);
    setSavedProductIds((items) => [...items, productId]);
  }

  const value: AuthContextValue = {
    session,
    profile,
    savedProductIds,
    isLoading,
    signIn,
    signUp,
    logout,
    toggleSavedProduct,
    isProductSaved,
    refreshProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
