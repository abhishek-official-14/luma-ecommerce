"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowLeft, ArrowRight, BadgeCheck, Eye, EyeOff, KeyRound, LockKeyhole, Mail, MessageSquareText, Phone, ShieldCheck, Sparkles, UserRound } from "lucide-react";

const authImage = "https://images.pexels.com/photos/7303855/pexels-photo-7303855.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=1200";

export function AuthPage({ mode }: { mode: string }) {
  const normalized = ["login", "signup", "forgot", "reset", "verify"].includes(mode) ? mode : "login";
  const [method, setMethod] = useState<"password" | "otp">("password");
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const title = normalized === "signup" ? "Create your account" : normalized === "forgot" ? "Reset your password" : normalized === "reset" ? "Choose a new password" : normalized === "verify" ? "Verify your account" : "Welcome back";
  const copy = normalized === "signup" ? "Join Luma for a more personal way to shop." : normalized === "forgot" ? "We’ll send a secure reset link to your email." : normalized === "verify" ? "Enter the 6-digit code sent to your email and phone." : "Sign in to access your orders, rewards and personal edit.";

  if (submitted && ["forgot", "verify", "reset"].includes(normalized)) return <main className="auth-page"><section className="auth-success"><span><BadgeCheck /></span><p className="eyebrow">All set</p><h1>{normalized === "forgot" ? "Check your inbox" : normalized === "verify" ? "You’re verified" : "Password updated"}</h1><p>{normalized === "forgot" ? "We sent a secure password reset link. It expires in 15 minutes." : "Your account is secure and ready to use."}</p><Link className="primary-button" href="/auth/login">Continue to sign in <ArrowRight /></Link></section></main>;

  return <main className="auth-page"><section className="auth-visual"><img src={authImage} alt="Considered modern living" /><div className="auth-overlay"><Link className="logo logo-light" href="/">LUMA<span>.</span></Link><blockquote>“Shopping should feel less like searching and more like discovering something made for you.”</blockquote><div><span><Sparkles /></span><p><strong>Curated with intelligence</strong><small>Better picks, fewer endless scrolls</small></p></div></div></section><section className="auth-form-wrap"><Link className="auth-back" href="/"><ArrowLeft /> Back to Luma</Link><div className="auth-form"><p className="eyebrow">{normalized === "login" ? "Your account" : normalized}</p><h1>{title}</h1><p className="auth-copy">{copy}</p>
    {normalized === "login" && <div className="auth-method"><button className={method === "password" ? "active" : ""} onClick={() => setMethod("password")}><Mail /> Email</button><button className={method === "otp" ? "active" : ""} onClick={() => setMethod("otp")}><MessageSquareText /> OTP login</button></div>}
    <form onSubmit={(event) => { event.preventDefault(); normalized === "login" || normalized === "signup" ? window.location.assign("/account") : setSubmitted(true); }}>
      {normalized === "signup" && <label>Full name<div><UserRound /><input placeholder="Your full name" required /></div></label>}
      {normalized === "verify" ? <><label className="otp-label">Verification code<div className="otp-boxes">{Array.from({length: 6}).map((_, index) => <input key={index} maxLength={1} inputMode="numeric" required />)}</div></label><p className="resend">Didn&apos;t receive it? <button type="button">Resend in 00:42</button></p></> : <label>{normalized === "reset" ? "New password" : method === "otp" ? "Mobile number" : "Email address"}<div>{method === "otp" ? <Phone /> : normalized === "reset" ? <KeyRound /> : <Mail />}<input type={normalized === "reset" ? (showPassword ? "text" : "password") : method === "otp" ? "tel" : "email"} placeholder={method === "otp" ? "+91 98765 43210" : normalized === "reset" ? "At least 8 characters" : "you@example.com"} required />{normalized === "reset" && <button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button>}</div></label>}
      {(normalized === "login" && method === "password") && <label>Password<div><LockKeyhole /><input type={showPassword ? "text" : "password"} placeholder="Your password" required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button></div><Link href="/auth/forgot">Forgot password?</Link></label>}
      {normalized === "signup" && <label>Password<div><LockKeyhole /><input type={showPassword ? "text" : "password"} placeholder="Create a secure password" required /><button type="button" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <EyeOff /> : <Eye />}</button></div><small>8+ characters with a number and symbol</small></label>}
      {normalized === "signup" && <label className="auth-consent"><input type="checkbox" required /> I agree to the Terms of Use and Privacy Policy.</label>}
      <button className="auth-submit">{normalized === "login" ? method === "otp" ? "Send secure OTP" : "Sign in securely" : normalized === "signup" ? "Create account" : normalized === "verify" ? "Verify and continue" : "Continue"}<ArrowRight /></button>
    </form>
    {["login", "signup"].includes(normalized) && <><div className="auth-divider"><span />Or continue with<span /></div><div className="social-login"><button><b>G</b> Google</button><button><b>●</b> Apple</button><button><b>f</b> Facebook</button></div><p className="auth-switch">{normalized === "login" ? "New to Luma?" : "Already have an account?"} <Link href={normalized === "login" ? "/auth/signup" : "/auth/login"}>{normalized === "login" ? "Create an account" : "Sign in"}</Link></p></>}
    <div className="auth-trust"><ShieldCheck /><span><strong>Your privacy is protected</strong><small>Encrypted sessions · Secure OTP · Optional two-factor authentication</small></span></div>
  </div></section></main>;
}
