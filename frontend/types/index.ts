export type Role = 'CLIENT' | 'CREATOR' | 'ADMIN';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar: string;
  bio: string;
  location: string;
  skills: string[];
  hourlyRate?: number;
  availability: string;
  verified: boolean;
}

export interface CreatorProfile {
  id: string;
  userId: string;
  username: string;
  name: string;
  avatar: string;
  headline: string;
  description: string;
  category: string;
  experience: string;
  responseTime: string;
  completionRate: number;
  rating: number;
  reviewCount: number;
  totalProjects: number;
  totalEarnings: number;
  startingPrice: number;
  aiSpecialties: string[];
  tools: string[];
  portfolioUrl?: string;
  socialLinks?: Record<string, string>;
  online: boolean;
  verified: boolean;
}

export interface PortfolioItem {
  id: string;
  creatorId: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  tags: string[];
  toolsUsed: string[];
  aiGenerated: boolean;
  createdAt: string;
}

export interface Service {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  videoUrl?: string;
  deliveryDays: number;
  basicPrice: number;
  standardPrice: number;
  premiumPrice: number;
  revisions: number;
  features: string[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  tools: string[];
}

export interface Project {
  id: string;
  clientId: string;
  clientName: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  serviceId?: string;
  title: string;
  description: string;
  budget: number;
  status: 'PENDING' | 'ACCEPTED' | 'IN_PROGRESS' | 'REVIEW' | 'REVISION_REQUESTED' | 'COMPLETED' | 'CANCELLED';
  deadline: string;
  progress: number;
  createdAt: string;
}

export interface JobPost {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  title: string;
  description: string;
  budget: number;
  category: string;
  skills: string[];
  preferredTools: string[];
  deadline: string;
  status: 'OPEN' | 'IN_PROGRESS' | 'CLOSED';
  applicationsCount: number;
  createdAt: string;
}

export interface Application {
  id: string;
  jobId: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar: string;
  creatorRating: number;
  proposal: string;
  price: number;
  deliveryDays: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
  createdAt: string;
}

export interface Review {
  id: string;
  projectId: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar: string;
  creatorId: string;
  rating: number;
  categories: {
    quality: number;
    communication: number;
    timeliness: number;
    creativity: number;
  };
  comment: string;
  createdAt: string;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  content: string;
  attachment?: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: Role;
  lastMessage: string;
  updatedAt: string;
  unreadCount: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'message' | 'project' | 'payment' | 'match' | 'system';
  read: boolean;
  createdAt: string;
}
