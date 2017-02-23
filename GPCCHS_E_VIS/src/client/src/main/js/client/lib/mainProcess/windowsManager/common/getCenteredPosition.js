import { screen } from 'electron';

export default function (width, height) {
  const bounds = screen.getPrimaryDisplay().bounds;
  const x = bounds.x + ((bounds.width - width) / 2);
  const y = bounds.y + ((bounds.height - height) / 2);
  return { x, y };
}
