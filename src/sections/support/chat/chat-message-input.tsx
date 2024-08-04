import useSWRMutation from 'swr/mutation'
import { useRef, useState, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';

import { endpoints } from 'src/utils/axios';


import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
  ticketId: string;

};

export default function ChatMessageInput({
  ticketId
}: Props) {

  const fileRef = useRef<HTMLInputElement>(null);
  // const { trigger } = useSWRMutation(endpoints.support.addMessage(ticketId), AddMessage);
  const [message, setMessage] = useState<any>({ file: null, comment_text: '' });
  const [hide, setHide] = useState<any>(false);

  const handleAttach = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();

    }
  }, []);

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({ comment_text: event.target.value , file: message.file});

  // eslint-disable-next-line react-hooks/exhaustive-deps
  };
  const handleChangeMessageFile = (event: any) => {
    const fileData = event.target.files[0];
    setMessage({  file: fileData ,comment_text: message.comment_text });
   // event.target.value = "";
  };

  const handleSendMessageEnter = async (event: React.KeyboardEvent<HTMLInputElement>) => {
      try {
        if (event?.key === 'Enter' && message?.comment_text !== '') {

          if (ticketId) {
            const formData = new FormData();
            const data = {
              file: message.file,
              comment_text: message.comment_text
            }
            if(data.file){

              formData.append('file', data.file );
            }
            formData.append("comment_text", data.comment_text);
         /*    console.log('info', data, ticketId) */
      //     await trigger(formData as any)
         // await sendMessage(ticketId, formData)
          setMessage({file:null, comment_text: ''});

          }

        }
      } catch (error) {
        console.error(error);
      }
    };


  const handleSendMessage =  async () => {
      try {
        if (ticketId) {
          const formData = new FormData();
          const data = {
            file: message.file,
            comment_text: message.comment_text
          }
          if(data.file){

            formData.append('file', data.file );
          }
          formData.append("comment_text", data.comment_text);
         /*  console.log('info', data, ticketId) */

        //  await trigger(formData as any)

       setMessage({file:null, comment_text: ''});
        }
      } catch (error) {
        console.error(error);
      }
    };



  return (
    <>
      <InputBase
        value={message?.comment_text}
        onKeyUp={handleSendMessageEnter}
        name="commet_text"
        onChange={handleChangeMessage}
        placeholder="Type a message"
       /*  disabled={message?.comment_text !== ''} */
        startAdornment={

          <IconButton onClick={handleAttach}>
            <Iconify color={message.file ? "primary.main": 'inherit'} icon="eva:attach-2-fill" />
          </IconButton>
        }
        endAdornment={
          <Stack direction="row" sx={{ flexShrink: 0 }}>
            <IconButton disabled={message?.comment_text === ''} onClick={handleSendMessage}>
              <Iconify color="primary.main" icon="solar:logout-line-duotone" />
            </IconButton>
          </Stack>
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <input  onChange={handleChangeMessageFile} type="file" accept="image/*, application/pdf, application/docx" ref={fileRef} style={{ display: 'none' }} />
    </>
  );
}
