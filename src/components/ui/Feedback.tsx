'use client';

import { Box, Alert } from '@mui/material';

export default function FeedbackBox({
  feedback,
}: {
  feedback: { severity: 'success' | 'info'; message: string } | null;
}) {
  return (
    <Box sx={{ minHeight: 48, mb: 3 }}>
      {feedback && (
        <Alert severity={feedback.severity}>
          {feedback.message}
        </Alert>
      )}
    </Box>
  );
}