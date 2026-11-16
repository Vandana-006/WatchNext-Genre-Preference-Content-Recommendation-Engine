
import { useRef, useState } from "react";
import {
  Clapperboard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Play,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import "./Welcome.css";

export default function Welcome({ onLoginSuccess }) {
  const [mode, setMode] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);

  const authCardRef = useRef(null);
  const visualRef = useRef(null);

  const handleCardPointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const card = authCardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;

    card.style.setProperty("--tilt-x", `${(0.5 - y) * 9}deg`);
    card.style.setProperty("--tilt-y", `${(x - 0.5) * 11}deg`);
    card.style.setProperty("--shine-x", `${x * 100}%`);
    card.style.setProperty("--shine-y", `${y * 100}%`);
  };

  const resetCardTilt = () => {
    const card = authCardRef.current;
    if (!card) return;

    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
    card.style.setProperty("--shine-x", "50%");
    card.style.setProperty("--shine-y", "50%");
  };

  const handleVisualPointerMove = (event) => {
    if (event.pointerType !== "mouse") return;

    const panel = visualRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    panel.style.setProperty("--visual-x", `${x * 12}px`);
    panel.style.setProperty("--visual-y", `${y * 12}px`);
  };

  const resetVisual = () => {
    const panel = visualRef.current;
    if (!panel) return;

    panel.style.setProperty("--visual-x", "0px");
    panel.style.setProperty("--visual-y", "0px");
  };

  
const handleSubmit = async (event) => {
  event.preventDefault();

  setMessage("");
  setLoading(true);

  const endpoint =
    mode === "login"
      ? "http://localhost:8080/api/auth/login"
      : "http://localhost:8080/api/auth/register";

  const requestBody =
    mode === "login"
      ? { email, password }
      : { name, email, password };

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    if (mode === "login") {
      onLoginSuccess?.({
        id: data.id,
        name: data.name,
        email: data.email
      });
      return;
    }

    setMessage("Registration successful! You can now log in.");

    setPassword("");

  } catch (error) {
    setMessage(
      error.message === "Failed to fetch"
        ? "Cannot connect to the server. Please start your backend."
        : error.message
    );
  } finally {
    setLoading(false);
  }
};

  const changeMode = (nextMode) => {
    setMode(nextMode);
    setMessage("");
    setShowPassword(false);
  };

  return (
    <main className="welcome-page">
      <div className="cosmic-glow glow-one" />
      <div className="cosmic-glow glow-two" />
      <div className="cosmic-glow glow-three" />

      <header className="site-header">
        <a className="brand" href="/">
          <span className="brand-icon">
            <Clapperboard size={25} />
          </span>
          <span className="brand-name">
            Watch<span>Next</span>
          </span>
        </a>

        <p className="brand-tagline">
          Discover <span>&#8226;</span> Stream <span>&#8226;</span> Enjoy
        </p>

        <div className="header-caption">
          More than movies...
          <br />
          <span>It's your story.</span>
        </div>
      </header>

      <section className="welcome-layout">
        <div
          className="welcome-visual"
          ref={visualRef}
          onPointerMove={handleVisualPointerMove}
          onPointerLeave={resetVisual}
        >
          <div className="visual-stars" />
          <div className="visual-planet" />
          <div className="visual-ring" />

          <div className="visual-content">
            <div className="mini-brand">
              <Clapperboard size={17} />
              WatchNext
            </div>

            <div className="hero-copy">
              <span className="hero-eyebrow">
                YOUR PERSONAL CINEMA UNIVERSE
              </span>

              <h1>
                Your Next
                <br />
                Favourite <span>Movie</span>
                <br />
                Awaits...
              </h1>

              <p>
                Discover personalized recommendations
                <br />
                based on your mood and taste.
              </p>

              <button
                className="magic-button"
                type="button"
                onClick={() => changeMode("signup")}
              >
                <span className="play-icon">
                  <Play size={15} fill="currentColor" />
                </span>
                Watch the Magic
                <ArrowRight className="magic-arrow" size={16} />
              </button>
            </div>

            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="visual-bottom-glow" />
          </div>
        </div>

        <div className="auth-visual">
          <div
            className="auth-card"
            ref={authCardRef}
            onPointerMove={handleCardPointerMove}
            onPointerLeave={resetCardTilt}
          >
            <div className="auth-tabs">
              <button
                type="button"
                className={mode === "login" ? "active" : ""}
                onClick={() => changeMode("login")}
              >
                Login
              </button>

              <button
                type="button"
                className={mode === "signup" ? "active" : ""}
                onClick={() => changeMode("signup")}
              >
                Sign Up
              </button>
            </div>

            <div className="auth-heading">
              <div className="auth-sparkle">
                <Sparkles size={19} />
              </div>

              <h2>
                {mode === "login" ? "Welcome Back!" : "Join WatchNext!"}
              </h2>

              <p>
                {mode === "login"
                  ? "Continue your movie journey"
                  : "Create your account and discover more"}
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === "signup" && (
                <label className="auth-input">
                  <Mail size={16} />
                  <input
  type="text"
  placeholder="Your Name"
  autoComplete="name"
  value={name}
  onChange={(event) => setName(event.target.value)}
  required
/>
                </label>
              )}

              <label className="auth-input">
                <Mail size={16} />
                <input
                  type="email"
                  placeholder="Email Address"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </label>

              <label className="auth-input">
                <Lock size={16} />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                  value={password}
onChange={(event) => setPassword(event.target.value)}
                  minLength={6}
                  required

                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </label>

              {mode === "login" && (
                <div className="auth-options">
                  <label className="remember-option">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={(event) => setRemember(event.target.checked)}
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    className="forgot-link"
                    onClick={() =>
                      setMessage("Password recovery will be added later.")
                    }
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button className="auth-submit" type="submit">
                {mode === "login" ? "Login" : "Create Account"}
                <ArrowRight size={17} />
              </button>

              {message && (
                <p className="auth-message" role="status">
                  {message}
                </p>
              )}
            </form>

            <div className="auth-divider">
              <span />
              <p>or continue with</p>
              <span />
            </div>

            <div className="social-login">
              <button type="button" aria-label="Google">
                G
              </button>
              <button type="button" aria-label="Apple">
                ï£¿
              </button>
              <button type="button" aria-label="Facebook">
                f
              </button>
            </div>

            <p className="auth-switch">
              {mode === "login"
                ? "New to WatchNext?"
                : "Already have an account?"}
              <button
                type="button"
                onClick={() =>
                  changeMode(mode === "login" ? "signup" : "login")
                }
              >
                {mode === "login" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </section>

      <footer className="welcome-footer">
        <span>âœ¦</span> MADE FOR MOVIE LOVERS
        <span className="footer-separator">•</span>
        POWERED BY YOUR TASTE <span>âœ¦</span>
      </footer>
    </main>
  );
}

