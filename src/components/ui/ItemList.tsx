'use client';

import { Reorder } from 'motion/react';
import {
  Card,
  CardContent,
  Typography,
} from '@mui/material';
import DragHandleIcon from '@mui/icons-material/DragHandle';

import { DatasetItem } from '@/types/data';
import {
  statusColors,
  getItemStatus,
} from '@/components/utils/datasetUtils';

export default function ItemList({
  items,
  setItems,
  isDragging,
  setIsDragging,
  feedback,
}: {
  items: DatasetItem[];
  setItems: (items: DatasetItem[]) => void;
  isDragging: boolean;
  setIsDragging: (b: boolean) => void;
  feedback: any;
}) {
  return (
    <Reorder.Group
      as="div"
      values={items}
      onReorder={setItems}
      style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.order}
          value={item}
          as="div"
          style={{ position: 'relative' }}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={() => setIsDragging(false)}
        >
          <Card
            variant="outlined"
            sx={{
              cursor: isDragging ? 'grabbing' : 'grab',
              backgroundColor:
                statusColors[
                  getItemStatus(
                    item,
                    items.indexOf(item),
                    feedback
                  )
                ],
              transition: 'background-color 0.3s ease',
            }}
          >
            <CardContent
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                py: '12px !important',
              }}
            >
              <DragHandleIcon color="action" />
              <Typography variant="body1">
                {item.name}
              </Typography>
            </CardContent>
          </Card>
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}