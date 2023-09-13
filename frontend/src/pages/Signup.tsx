import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button } from "flowbite-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(email, password);

    await signup(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h1>Sign up to DreamLog</h1>

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

      <Button>
        <button disabled={isLoading}>Sign up</button>
      </Button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
