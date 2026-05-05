'use client';

import { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';

import DatasetSelector from '@/components/ui/DatasetSelector';
import DatasetHeader from '@/components/ui/DataHeader';
import FeedbackBox from '@/components/ui/Feedback';
import ItemList from '@/components/ui/ItemList';

import { Dataset, DatasetItem, DatasetMeta } from '@/types/data';

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dataset, setDataset] = useState<Dataset | null>(null);
  const [shuffledItems, setShuffledItems] = useState<DatasetItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [datasetMeta, setDatasetMeta] = useState<DatasetMeta[]>([]);
  const [feedback, setFeedback] = useState<{
    severity: 'success' | 'info';
    message: string;
  } | null>(null);

  useEffect(() => {
    fetch('/api/titles')
      .then((r: Response) => r.json())
      .then((data: DatasetMeta[]) => setDatasetMeta(data));
  }, []);

  useEffect(() => {
    if (dataset) {
      const shuffled = [...dataset.items].sort(
        () => Math.random() - 0.5
      );
      setShuffledItems(shuffled);
      setFeedback(null);
    }
  }, [dataset]);

  useEffect(() => {
    if (datasetMeta.length > selectedIndex) {
      fetch(
        `/api/data?name=${datasetMeta[selectedIndex].dataset_slug}`
      )
        .then((r: Response) => r.json())
        .then((data: Dataset) => setDataset(data));
    }
  }, [selectedIndex, datasetMeta]);

  const handleCheckOrder = () => {
    if (dataset) {
      const correctCount = shuffledItems.reduce(
        (count, item, index) => {
          return item.name === dataset.items[index].name
            ? count + 1
            : count;
        },
        0
      );

      if (correctCount === dataset.items.length) {
        setFeedback({
          severity: 'success',
          message: 'Correct! You solved the puzzle.',
        });
      } else {
        setFeedback({
          severity: 'info',
          message: `${correctCount} of ${dataset.items.length} items are in the correct position.`,
        });
      }
    }
  };

  const handleReorder = (newOrder: DatasetItem[]) => {
    setShuffledItems(newOrder);
    setFeedback(null);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, px: 2 }}>
      <DatasetSelector
        datasetMeta={datasetMeta}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />

      <Button
        variant="contained"
        onClick={handleCheckOrder}
        sx={{ mb: 2 }}
      >
        Check Order
      </Button>

      <FeedbackBox feedback={feedback} />

      <DatasetHeader dataset={dataset} />

      <ItemList
        items={shuffledItems}
        setItems={handleReorder}
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        feedback={feedback}
      />
    </Box>
  );
}