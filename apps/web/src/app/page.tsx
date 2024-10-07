"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@repo/ui/button";
import { useRouter } from "next/navigation";

const API_HOST = process.env.NEXT_PUBLIC_API_HOST || "http://localhost:3001";

export default function Web() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const router = useRouter();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(`${API_HOST}/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const response = await result.json();
      if (response.success) {
        router.push("/admin");
      } else {
        setErrorMessage(response.message);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <h1>Welcome</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">Username </label>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        ></input>
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        ></input>
        <Button type="submit">Login</Button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}
