'use client';

import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { DatasetMeta } from '@/types/data';

export default function DatasetSelector({
  datasetMeta,
  selectedIndex,
  setSelectedIndex,
}: {
  datasetMeta: DatasetMeta[];
  selectedIndex: number;
  setSelectedIndex: (n: number) => void;
}) {
  return (
    <FormControl fullWidth sx={{ mb: 3 }}>
      <InputLabel>Select a dataset</InputLabel>
      <Select
        value={selectedIndex}
        label="Select a dataset"
        onChange={(e) => setSelectedIndex(Number(e.target.value))}
      >
        {datasetMeta.map((ds, i) => (
          <MenuItem key={i} value={i}>
            {ds.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}