"use client"

import { Alert, Box, Button, Card, CardContent, CardHeader, Stack, TextField, Typography, IconButton, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { useState, type FormEvent } from "react"
import { createBrowserClient } from "@/lib/supabase/createBrowserClient"
import { useRouter } from "next/navigation"

export function UpdatePasswordForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [supabase] = useState(() => createBrowserClient())
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleForgotPassword = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.updateUser({ password })
      if (error) throw error
      router.push("/")
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "An error occurred")
    } finally {
      setIsLoading(false)
    }
  }

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
          title={<Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>Reset Your Password</Typography>}
          subheader="Please enter your new password below."
          sx={{ pb: 2 }}
        />
        <CardContent>
          <Stack component="form" spacing={2.5} onSubmit={handleForgotPassword}>
            <TextField
              label="New Password"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
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
            <Button type="submit" variant="contained" size="large" disabled={isLoading} fullWidth>
              {isLoading ? "Saving..." : "Save new password"}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  )
}
