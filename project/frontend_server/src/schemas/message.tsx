import { AvatarFullConfig } from "react-nice-avatar";

interface BaseData {
  id: number;
  surveyID: number;
  type: string; // 类型
  create_at: Date; // 时间戳
}

// 定义 AnnouncementCard 的 Props 类型
export interface AnnouncementData extends BaseData {
  surveyName: string;
  title: string;
  description: string;
}

// 定义 ResponseCard 的 Props 类型
export interface ResponseData extends BaseData {
  userAvatar: AvatarFullConfig;
  surveyName: string;
  userName: string; // 用户名
  requestText: string;
  onApprove: ({surveyID, requestID} : {surveyID: number; requestID: number}) => void;
  onReject: ({surveyID, requestID} : {surveyID: number; requestID: number}) => void;
}

// 定义 FeedbackCard 的 Props 类型
export interface FeedbackData extends BaseData {
  surveyName: string;
  isApproved: number; // 0 wait, 1 approved, 2 rejected
}

export type MessageItem = AnnouncementData | ResponseData | FeedbackData;
