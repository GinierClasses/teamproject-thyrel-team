import HolyDrawLogo from 'components/HolyDrawLogo';
import LobbyStartButton from 'components/room/lobby/LobbyStartAction';
import { Players, PlayerCountBox } from 'components/room/lobby/Players';
import SettingsMenu from 'components/room/lobby/SettingsMenu';
import { Box, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  playersContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
  },
}));

export default function Lobby() {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      pb={2}>
      <Box mb={2} width="100%" display="flex" justifyContent="center">
        <HolyDrawLogo width={20} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        bgcolor="background.paper"
        maxWidth={656}
        borderRadius={16}
        maxHeight={384}
        height="100%"
        py={1}
        px={2}
        alignItems="flex-end"
        width="100%">
        <PlayerCountBox />
        <Box
          display="flex"
          justifyContent="space-between"
          width="100%"
          height="100%"
          className={classes.playersContainer}>
          <SettingsMenu />
          <Players />
        </Box>
      </Box>
      <LobbyStartButton />
    </Box>
  );
}
