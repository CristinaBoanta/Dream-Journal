import { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button, Label, TextInput } from "flowbite-react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // console.log(email, password);

    await signup(email, password);
  };

  return (
    // <form className="signup" onSubmit={handleSubmit}>
    //   <h1>Sign up to DreamLog</h1>

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
    //     <button disabled={isLoading}>Sign up</button>
    //   </Button>
    //   {error && <div className="error">{error}</div>}
    // </form>

    <form
      className="signup flex max-w-md flex-col gap-4 m-auto"
      onSubmit={handleSubmit}
    >
      <h1>Sign up to DreamLog</h1>

      <div className="signup-content">
        <div className="py-4">
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            placeholder="name@email.com"
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className="">
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
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
        <div className="pt-8">
        <Button type="submit" gradientDuoTone="purpleToBlue">
          <button disabled={isLoading}>Sign up</button>
        </Button>
        </div>

        <div className="py-8">
        {error && <div className="error">{error}</div>}
        </div>
      </div>
    </form>
  );
};

export default Signup;
