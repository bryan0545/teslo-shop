import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { ISizes } from '../../interfaces';

interface Props {
  selectedSize?: string;
  sizes: ISizes[];
  onSelectSize: (size: ISizes) => void;
}

const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectSize }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button key={size} size="small" color={selectedSize === size ? 'primary' : 'info'} onClick={() => onSelectSize(size)}>
          {size}
        </Button>
      ))}
    </Box>
  );
};
export default SizeSelector;
