export interface User {
  id: number;
  username: string;
  email: string;
  identity: string;
  role: 'admin' | 'user';
  avatar?: string;
  bio?: string;
  createdAt: string;
}

export interface News {
  id: number;
  title: string;
  content: string;
  summary?: string;
  category: string;
  source?: string;
  author?: string;
  coverImage?: string;
  views: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Skill {
  id: number;
  title: string;
  description?: string;
  featureIntro?: string;
  techSpecs?: string;
  supportedDevices?: string;
  documentUrl?: string;
  downloadUrl?: string;
  author?: string;
  version?: string;
  category?: string;
  skillCategory?: string;
  icon?: string;
  views: number;
  downloads: number;
  isPublished: boolean;
  createdAt: string;
}

export interface App {
  id: number;
  title: string;
  version: string;
  description?: string;
  introduction?: string;
  techStack?: string;
  githubUrl?: string;
  coverImage?: string;
  video?: string;
  capabilities: AppCapability[];
  isPublished: boolean;
  likes: number;
  views: number;
  createdAt: string;
}

export interface AppCapability {
  name: string;
  description: string;
}

export interface Discussion {
  id: number;
  title: string;
  content: string;
  category?: string;
  userId?: number;
  userName?: string;
  userAvatar?: string;
  userLevel: number;
  views: number;
  comments: number;
  isPinned: boolean;
  createdAt: string;
}

export interface Document {
  id: number;
  title: string;
  content: string;
  summary?: string;
  category?: string;
  categoryId?: number;
  subcategoryId?: number;
  coverImage?: string;
  sortOrder: number;
  isPublished: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  category?: string;
  sortOrder: number;
  isActive: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface OpenSourceProject {
  id: number;
  title: string;
  version: string;
  description?: string;
  pythonUrl?: string;
  cppUrl?: string;
  category?: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Banner {
  id: number;
  title: string;
  subtitle?: string;
  image?: string;
  link?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  date: string;
  location?: string;
  image?: string;
  participants: number;
  maxParticipants?: number;
  createdAt: string;
}

export interface Demand {
  id: number;
  title: string;
  type: string;
  description: string;
  contactName: string;
  contactPhone: string;
  contactEmail?: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
}

export interface IncubateProject {
  id: number;
  name: string;
  teamName: string;
  description: string;
  coverImage?: string;
  progress: number;
  status: string;
  createdAt: string;
}

export interface SiteConfig {
  [key: string]: string;
}

export interface NavMenu {
  id: number;
  title: string;
  url: string;
  icon?: string;
  parentId: number;
  target: string;
  sortOrder: number;
  isActive: boolean;
  children?: NavMenu[];
  createdAt: string;
  updatedAt: string;
}

export interface FooterItem {
  id: number;
  sectionTitle: string;
  title: string;
  url?: string;
  icon?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: number;
  slug: string;
  title: string;
  description?: string;
  content: string;
  coverImage?: string;
  showBanner: boolean;
  isPublished: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageBanner {
  id: number;
  pageSlug: string;
  title: string;
  subtitle?: string;
  image?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PageSeo {
  id: number;
  pageSlug: string;
  metaTitle?: string;
  metaDescription?: string;
  metaKeywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface DocCategory {
  id: number;
  name: string;
  title?: string;
  icon?: string;
  content?: string;
  sortOrder: number;
  isActive: boolean;
  subcategories?: DocSubcategory[];
  documents?: Document[];
  createdAt: string;
  updatedAt: string;
}

export interface DocSubcategory {
  id: number;
  categoryId: number;
  name: string;
  title?: string;
  content?: string;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
EOF; __tr_native_ec=$?; pwd -P >| '/var/folders/bj/brc4gsps4tjgknm93lxfcwvr0000gn/T/agent-toolhost/jobs/job-800af822628346dfaf45a0bbc7273c53/cwd.txt'; exit "$__tr_native_ec"