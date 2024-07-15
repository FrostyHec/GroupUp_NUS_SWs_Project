import { AvatarFullConfig } from "react-nice-avatar";

interface BaseData {
  id: string;
  type: string; // 类型
  timestamp: Date; // 时间戳
}

// 定义 NotificationCard 的 Props 类型
export interface NotificationData extends BaseData {
  surveyName: string;
  title: string;
  content: string;
}

// 定义 ApplicationCard 的 Props 类型
export interface ApplicationData extends BaseData {
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

export type MessageItem = NotificationData | ApplicationData | FeedbackData;
