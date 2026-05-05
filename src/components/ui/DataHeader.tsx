'use client';

import { Typography } from '@mui/material';
import { Dataset } from '@/types/data';

export default function DatasetHeader({
  dataset,
}: {
  dataset: Dataset | null;
}) {
  if (!dataset) return <h3>loading...</h3>;

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {dataset.title}
      </Typography>
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        {dataset.description}
      </Typography>
    </>
  );
}