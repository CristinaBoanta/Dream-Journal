import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
// import { Button } from "flowbite-react";
import { Button, Label, TextInput } from "flowbite-react";

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
    // <form className="login" onSubmit={handleSubmit}>
    //   <h1>Log In</h1>

    //   <div className="form-row">
    //     <label>Email:</label>
    //     <input
    //       type="email"
    //       onChange={(e) => setEmail(e.target.value)}
    //       value={email}
    //     />
    //   </div>

    //   <div className="form-row">
    //     <label>Password:</label>
    //     <input
    //       type="password"
    //       onChange={(e) => setPassword(e.target.value)}
    //       value={password}
    //     />
    //   </div>

    //   <Button>
    //     <button disabled={isLoading}>Log In</button>
    //   </Button>
    //   {error && <div className="error">{error}</div>}
    // </form>

    <form className="flex max-w-md flex-col gap-4 m-auto" onSubmit={handleSubmit}>
      <h1>Log In</h1>

      <div className="form-content">
        <div className="py-4">
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            placeholder="name@email.org"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="password" value="Password" />
          </div>
          <TextInput
            id="password"
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        {/* <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div> */}
        <div className="py-6">
        <Button type="submit">
          <button disabled={isLoading}>Log In</button>
        </Button>
        </div>

        {error && <div className="error">{error}</div>}
      </div>
    </form>
  );
};

export default Login;
