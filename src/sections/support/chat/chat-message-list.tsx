import Box from '@mui/material/Box';

import Scrollbar from 'src/components/scrollbar';
import Lightbox, { useLightBox } from 'src/components/lightbox';

import { IChatMessage, IChatParticipant } from 'src/types/support';

import { useMessagesScroll } from './hooks';
import ChatMessageItem from './chat-message-item';

// ----------------------------------------------------------------------

type Props = {
  messages: IChatMessage[];
  participants: IChatMessage[];
};

export default function ChatMessageList({ messages = [], participants }: Props) {
  const { messagesEndRef } = useMessagesScroll(messages);

  const sortMessage = messages?.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);

    if (dateA < dateB) {
      return -1; // Sort in ascending order
    }
    if (dateA > dateB) {
      return 1;
    }
    return 0; // If dates are equal, keep the original order
  });

  return (

    <Scrollbar ref={messagesEndRef} sx={{ px: 3, py: 5, height: 1 }}>
      <Box>
        {sortMessage?.map((message, index) => (
          <ChatMessageItem
            key={index}
            message={message}
            onOpenLightbox={() => console.log('heeeee')}
          />
        ))}
      </Box>
    </Scrollbar>



  );
}
