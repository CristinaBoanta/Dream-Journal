import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, password);
    await login(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <div className="form-row">
        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </div>

      <div className="form-row">
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>

      <button disabled={isLoading}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
