'use client';

import { t } from 'i18next';
import { io } from 'socket.io-client';
import { getCookie } from 'cookies-next';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {  useParams } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

import { useSettingsContext } from 'src/components/settings';
import { LoadingScreen } from 'src/components/loading-screen';

import { IChatMessage, IChatParticipant } from 'src/types/support';

import ChatRoom from '../chat-room';
import ChatMessageList from '../chat-message-list';
import ChatHeaderDetail from '../chat-header-detail';
import ChatMessageInput from '../chat-message-input';
import {Messages} from "../hooks/fake-data";
// ----------------------------------------------------------------------

export default function ChatView() {

  const { user } = useAuthContext();

  const settings = useSettingsContext();
  const params = useParams();
  const pathname = usePathname()
  const [previousPath, setPreviousPath] = useState(pathname || '');
    const selectedConversationId = params.supportId || '';

  const [recipients, setRecipients] = useState<IChatParticipant[]>([]);

  const [newMessages, setNewMessages] = useState<IChatMessage[]>(Messages);
  const participants: IChatMessage[] = newMessages
    ? newMessages.filter(
      (message: IChatMessage) => message.user_id !== `${user?.id}`
    )
    : [];


    console.log(Messages)
    const token = getCookie('access_token');

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (selectedConversationId && typeof token === 'string') {
      const socket = io(`https://symlink.live/support-ticket?ticket_id=${selectedConversationId}`, {
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        reconnection: true,
        reconnectionAttempts: Infinity,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
      });
      socket.on("connect", () => {
        console.log("Connected to the server");
      });
      socket.on(`support_ticket_${selectedConversationId}`, (data: any) => {
        const new_message: any = {
          ...data?.ticketComment
        };
        setNewMessages((prev) => [new_message, ...prev]);
      });

      socket.on("connect_error", (err: any) => {
        console.log("Connection error:", err);

      });

      socket.on("disconnect", () => {
        console.log("Disconnected from the server");
      });

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.disconnect();
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedConversationId]);
  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72 }}
    >
      {selectedConversationId ? (
        <ChatHeaderDetail participants={participants} />
      ) : (
        ''
      )}
    </Stack>
  );



  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={newMessages} participants={participants} />

      <ChatMessageInput
        ticketId={selectedConversationId as string}

      />
    </Stack>
  );

  return (
    <>
      {false ? (<LoadingScreen />) : (

        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography
            variant="h4"
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          >
            {t('Support ticket')}
          </Typography>

          <Stack component={Card} direction="row" sx={{ height: '72vh' }}>


            <Stack
              sx={{
                width: 1,
                height: 1,
                overflow: 'hidden',
              }}
            >
              {renderHead}

              <Stack
                direction="row"
                sx={{
                  width: 1,
                  height: 1,
                  overflow: 'hidden',
                  borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >

                {renderMessages}

                {newMessages && <ChatRoom conversation={newMessages} participants={participants} />}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      )}
    </>

  );
}
