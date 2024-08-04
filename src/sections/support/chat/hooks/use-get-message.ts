import { t } from 'i18next';
import { useAuthContext } from 'src/auth/hooks';

import { IChatMessage, IChatParticipant } from 'src/types/support';

// ----------------------------------------------------------------------

type Props = {
  message: IChatMessage;
};

export default function useGetMessage({ message }: Props) {
  const {user} = useAuthContext();
  const me = user?.id === message?.user_id;
  console.log(user?.id, message?.user_id)
  const senderDetails =
    message.user_id === user?.id
      ? {
          type: 'me',
        }
      : {
          avatarUrl: message?.user?.avatar || '',
          firstName: message?.user?.name || t("Anonymous user"),
        };


  const hasImage = message?.attachment ;

  return {
    hasImage,
    me,
    senderDetails,
  };
}
