'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function UserAvatar({ id }: any) {
  return (
    <Avatar>
      <AvatarImage src={`https://avatar.vercel.sh/${id}.png`} />
      <AvatarFallback>SC</AvatarFallback>
    </Avatar>
  );
}
