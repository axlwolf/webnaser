import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link href="/sign-in">
        <button>Login</button>
      </Link>
      <Link href="/sign-up">
        <button>Register</button>
      </Link>
    </div>
  );
}
