import { client } from 'api/client';
import { getToken } from 'api/player-provider';
import React from 'react';
import { useHistory } from 'react-router';
import { Notification } from 'rsuite';
import Session, { SessionStepType } from 'types/Session.type';

function useSessionStates() {
  const [session, setSession] = React.useState<Session>();
  const history = useHistory();

  React.useEffect(() => {
    let deleted = false;
    client<Session>('session/current', { token: getToken() }).then(
      session => !deleted && setSession(session),
      () => {
        Notification.error({
          title: 'Session error',
          description: 'Go on Home or refresh the page...',
        });
        history.push('/r/lobby');
      },
    );

    return () => {
      deleted = true;
    };
  }, [history]);

  // handling page with the Session
  React.useEffect(() => {
    const pathname = history.location.pathname;
    let newPathname = '';
    switch (session?.stepType) {
      case SessionStepType.Start:
        newPathname = '/r/start';
        break;
      case SessionStepType.Write:
        newPathname = '/r/write';
        break;
      case SessionStepType.Draw:
        newPathname = '/r/draw';
        break;
      case SessionStepType.Book:
        newPathname = '/r/book';
        break;
    }
    // change only if pathname is different than before
    if (newPathname && pathname !== newPathname) history.push(newPathname);
  }, [session?.stepType, history]);

  return { session, setSession };
}

export default useSessionStates;
