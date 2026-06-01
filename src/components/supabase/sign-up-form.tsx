"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Card, CardContent, CardHeader, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createBrowserClient } from "@/lib/supabase/createBrowserClient";

export function SignUpForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [supabase] = useState(() => createBrowserClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== repeatPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/api/auth/confirm?next=/auth/sign-up-success`,
        },
      });
      if (error) throw error;
      router.push("/auth/sign-up-success");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        maxWidth: 500,
        mx: "auto",
        width: "100%",
        px: 2,
        mt: 2,
      }}
      className={className}
      {...props}
    >
      <Card sx={{ boxShadow: 1 }}>
        <CardHeader
          title={<Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>Sign up</Typography>}
          subheader="Create a new account"
          sx={{ pb: 2 }}
        />
        <CardContent>
          <Stack component="form" spacing={2.5} onSubmit={handleSignUp}>
            <TextField
              label="Email"
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Password"
              id="password"
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                        size="small"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              label="Repeat Password"
              id="repeat-password"
              type={showRepeatPassword ? "text" : "password"}
              required
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true },
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                        edge="end"
                        size="small"
                      >
                        {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Button type="submit" variant="contained" size="large" disabled={isLoading} fullWidth>
              {isLoading ? "Creating an account..." : "Sign up"}
            </Button>
            <Box sx={{ typography: "body2", textAlign: "center", color: "text.secondary" }}>
              Already have an account? <Link href="/login">Login</Link>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
