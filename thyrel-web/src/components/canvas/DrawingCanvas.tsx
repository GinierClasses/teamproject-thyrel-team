import { makeStyles, Theme } from '@material-ui/core';
import { CanvasWidth } from './canvas.type';
import { useCanvasContext } from './DrawingCanvasContext';

const useStyles = makeStyles<Theme, { size: CanvasWidth; disabled?: boolean }>(
  theme => ({
    canvas: {
      backgroundColor: props => (props.disabled ? '#BBBBBB' : '#DDDDDD'),
      width: props => props.size.width,
      height: props => props.size.height,
      cursor: props => (props.disabled ? 'not-allowed' : 'crosshair'),
      borderRadius: 32,
    },
    canvasBox: {
      width: props => props.size.width + props.size.border * 2,
      height: props => props.size.height + props.size.border * 2,
      borderRadius: 32,
      overflow: 'hidden',
      border: props =>
        `${props.size.border}px solid ${theme.palette.custom.main}`,
      boxShadow: theme.shadows[1],
    },
  }),
);

export default function DrawingCanvas({ disabled }: { disabled?: boolean }) {
  const { canvasRef, size } = useCanvasContext();
  const classes = useStyles({ size, disabled });

  return (
    <div className={classes.canvasBox}>
      <canvas ref={canvasRef} className={classes.canvas} />
    </div>
  );
}
