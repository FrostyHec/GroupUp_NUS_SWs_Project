import { AvatarFullConfig } from "react-nice-avatar";

interface BaseData {
  id: number;
  surveyID: number;
  type: string; // 类型
  timestamp: Date; // 时间戳
}

// 定义 AnnouncementCard 的 Props 类型
export interface AnnouncementData extends BaseData {
  surveyName: string;
  title: string;
  content: string;
}

// 定义 RequestCard 的 Props 类型
export interface RequestData extends BaseData {
  userAvatar: AvatarFullConfig;
  surveyName: string;
  userName: string;
  requestText: string;
  onApprove: () => void;
  onReject: () => void;
}

// 定义 FeedbackCard 的 Props 类型
export interface FeedbackData extends BaseData {
  userAvatar: AvatarFullConfig;
  surveyName: string;
  approverName: string;
  isApproved: boolean;
}

export type MessageItem = AnnouncementData | RequestData | FeedbackData;
