"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Alert, Box, Button, Card, CardContent, CardHeader, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { createBrowserClient } from "@/lib/supabase/createBrowserClient";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [supabase] = useState(() => createBrowserClient());
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      router.push("/");
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
          title={<Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>Login</Typography>}
          subheader="Enter your email below to login to your account"
          sx={{ pb: 2 }}
        />
        <CardContent>
          <Stack component="form" spacing={2.5} onSubmit={handleLogin}>
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
            {error ? <Alert severity="error">{error}</Alert> : null}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography variant="body2" color="text.secondary">Forgot your password?</Typography>
              <Link href="/auth/forgot-password" style={{ textDecoration: "none", color: "inherit" }}>
                <Typography variant="body2" sx={{ color: "primary.main", cursor: "pointer", textDecoration: "underline" }}>
                  Reset it
                </Typography>
              </Link>
            </Box>
            <Button type="submit" variant="contained" size="large" disabled={isLoading} fullWidth>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
            <Box sx={{ typography: "body2", textAlign: "center", color: "text.secondary" }}>
              Don&apos;t have an account? <Link href="/signup">Sign up</Link>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
