'use client';
import { Button } from '@mui/material';
import { DatasetItem } from '@/types/data';

type ShuffleButtonProps = {
    items: DatasetItem[];
    onShuffle: (items: DatasetItem[]) => void;
};

export default function ShuffleButton({items, onShuffle,}: ShuffleButtonProps){
    const handleShuffle = () => {
        const shuffled = [...items].sort(() => Math.random() - 0.5);
        onShuffle(shuffled);
    };

    return (
    <Button variant="contained" onClick={handleShuffle} sx={{ mb: 2, ml: 1 }}>
        Shuffle Order
    </Button>
    );
}