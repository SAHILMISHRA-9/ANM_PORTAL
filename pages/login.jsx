import dynamic from "next/dynamic";
const LoginComponent = dynamic(() => import("../components/LoginPage"), {
  ssr: false,
});

export default function Login() {
  return <LoginComponent />;
}
