import { RouteComponentProps } from 'react-router-dom';
import HolyDrawLogo from 'components/HolyDrawLogo';
import PlayerForm from 'components/home/PlayerForm';
import { Grid } from '@material-ui/core';

export default function Home(
  props: RouteComponentProps<{ identifier?: string }>,
) {
  const identifier = props.match.params.identifier;

  return (
    <Grid
      container
      direction="column"
      wrap="nowrap"
      alignItems="center"
      className="full-height"
      justify="space-between">
      <Grid item>
        <HolyDrawLogo width={32} />
      </Grid>
      <PlayerForm identifier={identifier} />
    </Grid>
  );
}
