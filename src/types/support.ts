export type ITicket = {
id: string;
ticketNumber: string;
name:string;
description: string;
title:string;
phone:string;
status:string;
date:string | Date;
newMessages:number;
}

export type IChatMessageUser = {
   avatar: string | null;
email: string | null;
id: string ;
name: string | null
phone: string | null ;
}
export type IChatMessageAccachemt = {

    id: string;
    file_url: string;
    file_type:string;
    file_name: string;
    created_at: string;
    updated_at: string;

}
export type IChatMessage = {
attachment: IChatMessageAccachemt | null;
comment_text: string;
created_at: string | Date
id: string;
ticket_id: string;
updated_at:string;
user: IChatMessageUser;
user_id: string;
}

export type IChatParticipant = {
  id: string;
  name: string;
  role: string;
  email: string;
  address: string;
  avatarUrl: string;
  phoneNumber: string;
  lastActivity: Date;
  status: 'online' | 'offline' | 'alway' | 'busy';
};
