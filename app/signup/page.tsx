"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../components/pashm-navbar/Navbar";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

type MobileView = "signup" | "login";

function Field({
  label,
  placeholder,
  required,
  optional,
  type = "text",
  value,
  onChange,
  disabled
}: {
  label: string;
  placeholder?: string;
  required?: boolean;
  optional?: boolean;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="mb-1 flex items-baseline justify-between">
        <label className="text-[11px] tracking-wide text-[#2E3A43]/90">
          {label}
          {required ? <span className="ml-1 text-[#2E3A43]">*</span> : null}
        </label>
        {optional ? (
          <span className="text-[10px] text-[#2E3A43]/50">Optional</span>
        ) : null}
      </div>

      <div className="relative">
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className="w-full rounded-[2px] border border-dashed border-[#12385C]/45 bg-transparent px-3 py-[10px] text-[12px] text-[#1A2D3A] placeholder:text-[#2E3A43]/35 focus:outline-none focus:ring-0 disabled:opacity-50"
        />
      </div>
    </div>
  );
}

function BlueButton({ children, onClick, loading, type = "button" }: { children: React.ReactNode, onClick?: () => void, loading?: boolean, type?: "button" | "submit" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      style={{ backgroundImage: "url('/assets/blue-button.png')" }}
      className="relative w-full rounded-[2px] bg-[#12385C] hover:bg-[#12385C]/90 bg-blend-multiply type-button-1-d-blue-button text-[15px]! text-white py-3 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? "PROCESSING..." : children}
      <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/20" />
    </button>
  );
}

function SocialButtons({ onGoogleClick }: { onGoogleClick: () => void }) {
  return (
    <div className="mt-3">
      <div className="text-center text-[10px] text-[#2E3A43]/55">
        Or continue with
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={onGoogleClick}
          className="flex h-12 items-center justify-center rounded-[2px] bg-[#E8DFCC]/55 hover:bg-[#E8DFCC]/90 cursor-pointer ring-1 ring-[#CEBB84]/40"
          aria-label="Continue with Google"
        >
          <Image
            src="/assets/google.png"
            alt="Google"
            width={22}
            height={22}
            className="opacity-95"
          />
        </button>

        <button
          type="button"
          className="flex h-12 items-center justify-center rounded-[2px] bg-[#E8DFCC]/55 hover:bg-[#E8DFCC]/90 cursor-pointer ring-1 ring-[#CEBB84]/40"
          aria-label="Continue with Apple"
        >
          <Image
            src="/assets/apple.png"
            alt="Apple"
            width={22}
            height={22}
            className="opacity-95"
          />
        </button>
      </div>
    </div>
  );
}

function CardShell({
  title,
  inlineMeta,
  children,
}: {
  title: string;
  inlineMeta?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full">
      <div className="flex items-baseline gap-3">
        <h2 className="font-serif text-[22px] md:text-[28px] leading-none text-[#12385C]">
          {title}
        </h2>
        {inlineMeta ? (
          <div className="text-[11px] italic text-[#2E3A43]/65">
            {inlineMeta}
          </div>
        ) : null}
      </div>

      <div className="mt-6 space-y-4">{children}</div>
    </div>
  );
}

export default function Signup() {
  const [mobileView, setMobileView] = useState<MobileView>("signup");
  const isSignup = useMemo(() => mobileView === "signup", [mobileView]);
  const { user, dbUser, refreshDbUser } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const names = user.displayName?.split(" ") || ["", ""];
      setFormData((prev) => ({
        ...prev,
        firstName: prev.firstName || names[0] || "",
        lastName: prev.lastName || names.slice(1).join(" ") || "",
        email: prev.email || user.email || "",
      }));
    }
  }, [user]);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      showToast("Signed in with Google! Please complete your information.", "success");
    } catch (error: any) {
      console.error(error);
      showToast(error.message || "Failed to sign in with Google", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phoneNumber) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    try {
      setLoading(true);
      
      // If user is not signed in via Google/Firebase yet, we might want to create them
      // but the requirement says Google auth is in signup page and active when clicking google icon.
      // If they fill the form and click "Create Account" without Google, we'd need email/password auth.
      // For now, I'll follow the flow: Google Auth -> Fill Info -> Save to DB.
      
      if (!user) {
         showToast("Please sign in with Google first", "error");
         return;
      }

      const res = await fetch("/api/auth/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: user.uid,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email || user.email,
          phoneNumber: formData.phoneNumber,
          authProvider: "google",
          photoURL: user.photoURL,
        }),
      });

      const data = await res.json();
      if (data.success) {
        showToast("Profile updated successfully!", "success");
        await refreshDbUser();
        router.push("/");
      } else {
        throw new Error(data.error || "Failed to update profile");
      }
    } catch (error: any) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-[#F6F1E6]">
      <Navbar />

      <div className="mx-auto max-w-6xl px-4 pb-14 pt-40 md:pt-50 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md md:max-w-none">
          <div className="grid gap-14 md:grid-cols-2 md:gap-16">
            <div className={isSignup ? "block" : "hidden md:block"}>
              <CardShell
                title="Create account"
                inlineMeta={
                  isSignup ? (
                    <>
                      Already have an account?{" "}
                      <button
                        type="button"
                        onClick={() => setMobileView("login")}
                        className="text-[#12385C] hover:text-[#12385C] cursor-pointer underline underline-offset-2"
                      >
                        Log In
                      </button>
                    </>
                  ) : (
                    <span>Hi there new user!</span>
                  )
                }
              >
                <form onSubmit={handleSignup} className="space-y-4">
                  <Field 
                    label="First Name" 
                    required 
                    value={formData.firstName} 
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                  <Field 
                    label="Last Name" 
                    required 
                    value={formData.lastName} 
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                  <Field 
                    label="Phone Number" 
                    required 
                    value={formData.phoneNumber} 
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                  <Field 
                    label="Email Address" 
                    optional 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!!user?.email}
                  />
                  {!user && (
                    <Field 
                      label="Password" 
                      required 
                      type="password" 
                      value={formData.password} 
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                  )}

                  <div className="pt-2">
                    <BlueButton type="submit" loading={loading}>
                      {dbUser ? "UPDATE ACCOUNT" : "CREATE ACCOUNT"}
                    </BlueButton>
                  </div>
                </form>

                <SocialButtons onGoogleClick={handleGoogleSignIn} />

                <div className="mt-6 space-y-3">
                  <p className="text-[10px] leading-relaxed text-[#2E3A43]/60">
                    Your data is safe with us. We use industry-standard encryption to protect your information.
                  </p>

                  <label className="flex items-start gap-2 text-[10px] text-[#2E3A43]/60">
                    <input
                      type="checkbox"
                      required
                      className="mt-[2px] h-3 w-3 rounded-[2px] border border-[#12385C]/40 bg-transparent"
                    />
                    <span>I agree to the terms and conditions</span>
                  </label>
                </div>
              </CardShell>
            </div>

            <div className={!isSignup ? "block" : "hidden md:block"}>
              <CardShell
                title="Log In"
                inlineMeta={
                  !isSignup ? (
                    <>
                      New here?{" "}
                      <button
                        type="button"
                        onClick={() => setMobileView("signup")}
                        className="text-[#12385C] hover:text-[#12385C] cursor-pointer underline underline-offset-2"
                      >
                        Create account
                      </button>
                    </>
                  ) : (
                    <span>Welcome Back!</span>
                  )
                }
              >
                <div className="space-y-4">
                  <Field 
                    label="Email Address/Phone Number" 
                    required 
                    value={formData.email} 
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  <Field 
                    label="Password" 
                    required 
                    type="password" 
                    value={formData.password} 
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />

                  <div className="pt-2">
                    <BlueButton loading={loading}>LOG IN</BlueButton>
                  </div>

                  <SocialButtons onGoogleClick={handleGoogleSignIn} />

                  <div className="mt-4 space-y-2">
                    <button
                      type="button"
                      className="text-left text-[10px] hover:text-[#12385C] cursor-pointer text-[#2E3A43]/65 underline underline-offset-2"
                    >
                      Forgot Password?
                    </button>

                    <p className="text-[9.5px] leading-relaxed text-[#2E3A43]/55">
                      By clicking “LOG IN”, I agree to the Pashm Terms and
                      Conditions and Privacy Policy
                    </p>
                  </div>
                </div>
              </CardShell>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

