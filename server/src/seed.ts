import * as dotenv from 'dotenv';
dotenv.config({ path: [__dirname + '/../../.env', __dirname + '/../.env'] });
import { DataSource } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { User } from './entities/user.entity';
import { Banner } from './entities/banner.entity';
import { News } from './entities/news.entity';
import { Activity } from './entities/activity.entity';
import { SkillCategory } from './entities/skill-category.entity';
import { Skill } from './entities/skill.entity';
import { App } from './entities/app.entity';
import { AppCapability } from './entities/app-capability.entity';
import { Discussion } from './entities/discussion.entity';
import { DiscussionComment } from './entities/discussion-comment.entity';
import { DocCategory } from './entities/doc-category.entity';
import { DocSubcategory } from './entities/doc-subcategory.entity';
import { Document } from './entities/document.entity';
import { FaqCategory } from './entities/faq-category.entity';
import { FaqItem } from './entities/faq-item.entity';
import { OpenSourceCategory } from './entities/open-source-category.entity';
import { OpenSourceProject } from './entities/open-source-project.entity';
import { NavMenu } from './entities/nav-menu.entity';
import { FooterItem } from './entities/footer-item.entity';
import { SiteConfig } from './entities/site-config.entity';
import { Page } from './entities/page.entity';
import { PageSeo } from './entities/page-seo.entity';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'bajie_platform',
  entities: [
    User,
    Banner,
    News,
    Activity,
    SkillCategory,
    Skill,
    App,
    AppCapability,
    Discussion,
    DiscussionComment,
    DocCategory,
    DocSubcategory,
    Document,
    FaqCategory,
    FaqItem,
    OpenSourceCategory,
    OpenSourceProject,
    NavMenu,
    FooterItem,
    SiteConfig,
    Page,
    PageSeo,
  ],
  charset: 'utf8mb4',
});

async function seed() {
  console.log('正在连接数据库...');
  await AppDataSource.initialize();
  console.log('数据库连接成功');

  try {
    // ===== 用户 =====
    const userRepo = AppDataSource.getRepository(User);
    const userCount = await userRepo.count();
    if (userCount === 0) {
      const hashedPassword = await bcrypt.hash('admin123', 10);
      await userRepo.save([
        {
          username: 'admin',
          email: 'admin@example.com',
          password: hashedPassword,
          identity: '管理员',
          role: 'admin',
        } as Partial<User> as User,
        {
          username: 'developer',
          email: 'dev@example.com',
          password: hashedPassword,
          identity: '开发者',
          role: 'user',
        } as Partial<User> as User,
      ]);
      console.log('✅ 用户数据插入成功');
    } else {
      console.log('⏭️ 用户数据已存在，跳过');
    }

    // ===== 轮播图 =====
    const bannerRepo = AppDataSource.getRepository(Banner);
    const bannerCount = await bannerRepo.count();
    if (bannerCount === 0) {
      await bannerRepo.save([
        {
          title: '链接具身智能·赋能机器人生态',
          subtitle: '集云端仿真、开源开发、技术交流、项目孵化、需求对接于一体',
          image: 'https://images.pexels.com/photos/28428592/pexels-photo-28428592.jpeg',
          link: '/dev.html',
          sortOrder: 1,
          isActive: 1,
        } as Partial<Banner> as Banner,
        {
          title: '科沃斯首款搭载OpenClaw的管家机器人',
          subtitle: '智能感知、精准抓取、自主导航，重新定义家庭服务体验',
          image: 'https://images.pexels.com/photos/5240547/pexels-photo-5240547.jpeg',
          link: '#',
          sortOrder: 2,
          isActive: 1,
        } as Partial<Banner> as Banner,
        {
          title: '开发者入驻·技术共创空间',
          subtitle: '设备支持、场地提供、项目孵化、资源对接',
          image: 'https://images.pexels.com/photos/8566473/pexels-photo-8566473.jpeg',
          link: '#',
          sortOrder: 3,
          isActive: 1,
        } as Partial<Banner> as Banner,
      ]);
      console.log('✅ 轮播图数据插入成功');
    } else {
      console.log('⏭️ 轮播图数据已存在，跳过');
    }

    // ===== 资讯 =====
    const newsRepo = AppDataSource.getRepository(News);
    const newsCount = await newsRepo.count();
    if (newsCount === 0) {
      await newsRepo.save([
        {
          title: '具身智能VLA大模型技术演进与落地应用',
          content: '解析分层架构VLA与端到端VLA技术路线，助力机器人决策系统升级。随着大模型技术的快速发展，视觉-语言-动作（VLA）模型正在成为具身智能领域的核心研究方向。本文将深入分析VLA技术的演进路径，探讨从分层架构到端到端方案的技术选择，以及在工业、服务等场景中的落地实践。',
          summary: '深度解析VLA技术发展',
          category: '前沿技术',
          author: 'AI研究员',
          views: 1289,
          coverImage: 'https://picsum.photos/800/400?random=3',
          isPublished: 1,
        } as Partial<News> as News,
        {
          title: 'ROS2环境一键部署方案',
          content: '告别虚拟机繁琐配置，网页版ROS2开发环境使用教程。本文详细介绍如何使用八界平台的云端开发环境，快速搭建ROS2开发环境，无需本地安装，打开浏览器即可开始开发。',
          summary: '快速搭建ROS2开发环境',
          category: '技术教程',
          author: '极客小白',
          views: 956,
          coverImage: 'https://picsum.photos/800/400?random=4',
          isPublished: 1,
        } as Partial<News> as News,
        {
          title: 'RoboBrain 2.0开源模型发布',
          content: '7B轻量版+32B全规模，统一感知、推理与规划能力。RoboBrain 2.0在1.0基础上大幅提升了多模态理解和任务规划能力，支持更多机器人平台和任务场景。',
          summary: '重磅开源发布',
          category: '开源项目',
          author: '开发团队',
          views: 892,
          coverImage: 'https://picsum.photos/800/400?random=5',
          isPublished: 1,
        } as Partial<News> as News,
        {
          title: '人形机器人关节控制算法最新突破',
          content: '基于强化学习的高精度轨迹跟踪，实现拟人化运动。研究团队提出了一种新型关节控制算法，在保持高精度的同时显著降低了计算延迟，为人形机器人的实时控制提供了新方案。',
          summary: '算法新突破',
          category: '前沿技术',
          author: '机器人工程师',
          views: 2341,
          coverImage: 'https://picsum.photos/800/400?random=6',
          isPublished: 1,
        } as Partial<News> as News,
        {
          title: 'SLAM算法在复杂环境下的优化策略',
          content: '激光SLAM与视觉SLAM融合方案，提升定位精度。本文探讨了在动态和复杂环境中，如何通过融合激光和视觉SLAM来提升定位的鲁棒性和精度。',
          summary: 'SLAM技术优化',
          category: '技术讨论',
          author: 'AI探索者',
          views: 1856,
          coverImage: 'https://picsum.photos/800/400?random=7',
          isPublished: 1,
        } as Partial<News> as News,
      ]);
      console.log('✅ 资讯数据插入成功');
    } else {
      console.log('⏭️ 资讯数据已存在，跳过');
    }

    // ===== 活动 =====
    const activityRepo = AppDataSource.getRepository(Activity);
    const activityCount = await activityRepo.count();
    if (activityCount === 0) {
      await activityRepo.save([
        {
          title: '机器人马拉松技术复盘沙龙',
          description: '亦庄机器人产业园，动态平衡、步态优化技术分享',
          type: '线下沙龙',
          status: 'ongoing',
          date: '2026-04-25',
          participants: 128,
          location: '北京亦庄机器人产业园',
          image: 'https://picsum.photos/800/400?random=9',
        } as Partial<Activity> as Activity,
        {
          title: '人形机器人仿真开发实战教学',
          description: 'Isaac Sim云端仿真，零样本泛化模型训练',
          type: '直播课程',
          status: 'live',
          date: '2026-04-22 19:00',
          participants: 520,
          location: '线上直播',
          image: 'https://picsum.photos/800/400?random=10',
        } as Partial<Activity> as Activity,
        {
          title: '开发者入驻·技术共创空间',
          description: '设备支持、场地提供、项目孵化、资源对接',
          type: '极客空间',
          status: 'ongoing',
          date: '长期开放',
          participants: 0,
          location: '八界创新中心',
          image: 'https://picsum.photos/800/400?random=11',
        } as Partial<Activity> as Activity,
      ]);
      console.log('✅ 活动数据插入成功');
    } else {
      console.log('⏭️ 活动数据已存在，跳过');
    }

    // ===== 技能分类 =====
    const skillCategoryRepo = AppDataSource.getRepository(SkillCategory);
    const skillCategoryCount = await skillCategoryRepo.count();
    if (skillCategoryCount === 0) {
      await skillCategoryRepo.save([
        { name: '运动控制', sortOrder: 1, isActive: 1 } as Partial<SkillCategory> as SkillCategory,
        { name: '导航定位', sortOrder: 2, isActive: 1 } as Partial<SkillCategory> as SkillCategory,
        { name: '视觉感知', sortOrder: 3, isActive: 1 } as Partial<SkillCategory> as SkillCategory,
        { name: '人机交互', sortOrder: 4, isActive: 1 } as Partial<SkillCategory> as SkillCategory,
      ]);
      console.log('✅ 技能分类数据插入成功');
    } else {
      console.log('⏭️ 技能分类数据已存在，跳过');
    }

    // ===== 技能 =====
    const skillRepo = AppDataSource.getRepository(Skill);
    const skillCount = await skillRepo.count();
    if (skillCount === 0) {
      await skillRepo.save([
        {
          title: '人形机器人步态控制',
          description: '基于强化学习的人形机器人步态控制算法',
          category: '运动控制',
          skillCategory: '运动控制',
          icon: 'fa-robot',
          author: '机器人实验室',
          version: 'v1.2.0',
          downloads: 1256,
          isPublished: 1,
        } as Partial<Skill> as Skill,
        {
          title: 'SLAM建图导航',
          description: '激光SLAM与视觉SLAM融合方案',
          category: '导航定位',
          skillCategory: '导航定位',
          icon: 'fa-map',
          author: 'AI团队',
          version: 'v2.0.1',
          downloads: 2341,
          isPublished: 1,
        } as Partial<Skill> as Skill,
        {
          title: '物体识别抓取',
          description: '基于深度学习的物体识别与抓取规划',
          category: '视觉感知',
          skillCategory: '视觉感知',
          icon: 'fa-eye',
          author: '视觉实验室',
          version: 'v1.5.0',
          downloads: 876,
          isPublished: 1,
        } as Partial<Skill> as Skill,
        {
          title: '语音交互系统',
          description: '端到端语音识别与自然语言理解',
          category: '人机交互',
          skillCategory: '人机交互',
          icon: 'fa-microphone',
          author: '语音团队',
          version: 'v3.0.0',
          downloads: 3456,
          isPublished: 1,
        } as Partial<Skill> as Skill,
      ]);
      console.log('✅ 技能数据插入成功');
    } else {
      console.log('⏭️ 技能数据已存在，跳过');
    }

    // ===== 应用 + 能力标签 =====
    const appRepo = AppDataSource.getRepository(App);
    const appCount = await appRepo.count();
    if (appCount === 0) {
      const app1 = appRepo.create({
        title: '自动巡逻机器人',
        version: 'v1.0.0',
        description: '基于计算机视觉的自动巡逻机器人，支持人脸识别和异常检测',
        introduction: '本项目是一套完整的自动巡逻解决方案，包含机器人控制、视觉识别、路径规划等模块。',
        techStack: 'ROS2,Python,计算机视觉',
        githubUrl: 'https://github.com/example/patrol-robot',
        coverImage: 'https://picsum.photos/800/400?random=40',
        isPublished: 1,
        likes: 189,
        views: 1280,
        capabilities: [
          { name: '视觉识别', description: '实时人脸识别和异常行为检测' },
          { name: '路径规划', description: 'A*算法和动态避障规划' },
          { name: '自动巡航', description: '自动按预设路线巡逻' },
          { name: '告警推送', description: '异常事件实时告警' },
        ] as AppCapability[],
      });
      await appRepo.save(app1);

      const app2 = appRepo.create({
        title: '智能物流分拣',
        version: 'v1.1.0',
        description: '智能物流分拣系统，基于深度学习的物体识别和路径规划',
        introduction: '高效的物流分拣系统，利用深度学习进行物体识别，配合机械臂实现自动化分拣。',
        techStack: 'ROS,深度学习,MoveIt',
        githubUrl: 'https://github.com/example/logistics-sort',
        coverImage: 'https://picsum.photos/800/400?random=41',
        isPublished: 1,
        likes: 456,
        views: 2100,
        capabilities: [
          { name: '物体识别', description: '深度学习物体分类识别' },
          { name: '分拣规划', description: '最优路径和任务规划' },
          { name: '机械臂控制', description: 'MoveIt运动控制' },
          { name: '视觉抓取', description: '精准定位与机械臂抓取协调' },
        ] as AppCapability[],
      });
      await appRepo.save(app2);

      const app3 = appRepo.create({
        title: '安防监控系统',
        version: 'v2.0.0',
        description: '智能安防监控系统，支持异常行为检测和实时告警推送',
        introduction: '集成了最新的计算机视觉技术，能实时检测异常行为并推送告警信息。',
        techStack: 'C++,OpenCV,视频分析',
        githubUrl: 'https://github.com/example/security-monitor',
        coverImage: 'https://picsum.photos/800/400?random=42',
        isPublished: 1,
        likes: 528,
        views: 1850,
        capabilities: [
          { name: '视频分析', description: '多路视频流实时分析' },
          { name: '行为检测', description: '异常行为自动检测' },
          { name: '目标追踪', description: '多目标持续追踪' },
          { name: '实时告警', description: '异常事件推送' },
        ] as AppCapability[],
      });
      await appRepo.save(app3);

      console.log('✅ 应用和能力标签数据插入成功');
    } else {
      console.log('⏭️ 应用数据已存在，跳过');
    }

    // ===== 讨论 =====
    const discussionRepo = AppDataSource.getRepository(Discussion);
    const discussionCount = await discussionRepo.count();
    if (discussionCount === 0) {
      await discussionRepo.save([
        {
          title: '关于双足机器人步态规划的讨论',
          content: '最近在研究基于强化学习的步态规划，遇到模型收敛慢的问题，有没有大佬有优化建议？',
          category: '技术问答',
          userName: '张工程师',
          userAvatar: 'https://picsum.photos/200/200?random=25',
          userLevel: 1,
          views: 234,
          comments: 18,
          isPinned: 0,
        } as Partial<Discussion> as Discussion,
        {
          title: 'Cartographer与ORB-SLAM3对比分析',
          content: '从定位精度、计算效率、地图构建质量三个维度对比分析两款主流SLAM方案的实际表现',
          category: '经验分享',
          userName: '李研究员',
          userAvatar: 'https://picsum.photos/200/200?random=26',
          userLevel: 2,
          views: 512,
          comments: 45,
          isPinned: 1,
        } as Partial<Discussion> as Discussion,
        {
          title: '开源6轴机械臂控制框架分享',
          content: '基于ESP32开发板的开源机械臂控制方案，支持ROS2接口，已在GitHub开源并持续更新',
          category: '开源项目',
          userName: '王创客',
          userAvatar: 'https://picsum.photos/200/200?random=27',
          userLevel: 3,
          views: 892,
          comments: 67,
          isPinned: 0,
        } as Partial<Discussion> as Discussion,
        {
          title: 'VLA模型在机器人控制中的应用',
          content: '探讨视觉语言动作模型如何提升机器人的理解和执行能力，分享最新研究成果',
          category: '行业动态',
          userName: '陈博士',
          userAvatar: 'https://picsum.photos/200/200?random=28',
          userLevel: 4,
          views: 456,
          comments: 32,
          isPinned: 0,
        } as Partial<Discussion> as Discussion,
      ]);
      console.log('✅ 讨论数据插入成功');
    } else {
      console.log('⏭️ 讨论数据已存在，跳过');
    }

    // ===== 文档分类 + 子分类 =====
    const docCategoryRepo = AppDataSource.getRepository(DocCategory);
    const docCategoryCount = await docCategoryRepo.count();
    if (docCategoryCount === 0) {
      const cat1 = docCategoryRepo.create({
        name: '快速入门',
        title: '欢迎来到八界平台',
        icon: 'fa-rocket',
        sortOrder: 1,
        isActive: 1,
        content: '<p>欢迎使用八界具身智能平台！</p><h2>平台介绍</h2><p>八界是一个面向具身智能开发者的开放社区，提供机器人仿真、API服务、开源项目和技术交流平台。</p><h3>主要功能</h3><ul><li>云端机器人仿真环境</li><li>丰富的API接口</li><li>开源项目库</li><li>开发者社区</li></ul>',
      });
      await docCategoryRepo.save(cat1);

      const cat2 = docCategoryRepo.create({
        name: '开发指南',
        title: '八界开发指南',
        icon: 'fa-book',
        sortOrder: 2,
        isActive: 1,
        content: '<p>本指南将帮助您快速上手八界平台的开发工作。</p><h2>环境准备</h2><p>在开始开发之前，请确保您已经完成以下准备工作：</p><ol><li>注册八界账号</li><li>完成开发者认证</li><li>获取API密钥</li></ol>',
      });
      await docCategoryRepo.save(cat2);

      const cat3 = docCategoryRepo.create({
        name: 'API文档',
        title: '八界API参考',
        icon: 'fa-code',
        sortOrder: 3,
        isActive: 1,
        content: '<p>完整的八界API参考文档。</p><h2>API概述</h2><p>八界提供丰富的API接口，包括：</p><ul><li>认证API</li><li>仿真API</li><li>数据API</li></ul>',
      });
      await docCategoryRepo.save(cat3);

      // 子分类
      const docSubcategoryRepo = AppDataSource.getRepository(DocSubcategory);
      await docSubcategoryRepo.save([
        {
          categoryId: cat1.id,
          name: '账号注册',
          title: '如何注册八界账号',
          sortOrder: 1,
          isActive: 1,
          content: '<p>本文档将指导您完成八界账号的注册流程。</p><h2>注册步骤</h2><ol><li>访问注册页面</li><li>填写手机号或邮箱</li><li>获取验证码</li><li>设置密码</li><li>完成注册</li></ol>',
        } as Partial<DocSubcategory> as DocSubcategory,
        {
          categoryId: cat1.id,
          name: '登录系统',
          title: '登录八界平台指南',
          sortOrder: 2,
          isActive: 1,
          content: '<p>本文档将指导您如何登录八界平台。</p><h2>登录方式</h2><p>您可以通过以下方式登录：</p><ul><li>手机号+验证码</li><li>手机号+密码</li><li>邮箱+密码</li></ul>',
        } as Partial<DocSubcategory> as DocSubcategory,
      ]);
      console.log('✅ 文档分类数据插入成功');
    } else {
      console.log('⏭️ 文档分类数据已存在，跳过');
    }

    // ===== 文档 =====
    const documentRepo = AppDataSource.getRepository(Document);
    const documentCount = await documentRepo.count();
    if (documentCount === 0) {
      await documentRepo.save([
        {
          title: '快速入门指南',
          content: '欢迎使用八界具身智能开放社区！本文档将帮助您快速上手...',
          summary: '帮助新手快速了解和使用八界平台',
          category: '入门指南',
          coverImage: 'https://picsum.photos/400/250?random=30',
          sortOrder: 1,
          isPublished: 1,
        } as Partial<Document> as Document,
        {
          title: '开发者API文档',
          content: '详细介绍八界开放平台提供的各种API接口...',
          summary: '全面的API参考文档',
          category: 'API文档',
          coverImage: 'https://picsum.photos/400/250?random=31',
          sortOrder: 2,
          isPublished: 1,
        } as Partial<Document> as Document,
        {
          title: '机器人仿真教程',
          content: '从零开始学习如何使用八界的云端仿真平台...',
          summary: '仿真环境使用教程',
          category: '教程',
          coverImage: 'https://picsum.photos/400/250?random=32',
          sortOrder: 3,
          isPublished: 1,
        } as Partial<Document> as Document,
        {
          title: '常见问题解答',
          content: '收集了开发者最常遇到的问题和解决方案...',
          summary: '常见问题解答',
          category: '帮助',
          coverImage: 'https://picsum.photos/400/250?random=33',
          sortOrder: 4,
          isPublished: 1,
        } as Partial<Document> as Document,
        {
          title: '最佳实践指南',
          content: '分享机器人开发的最佳实践和优化建议...',
          summary: '开发最佳实践',
          category: '指南',
          coverImage: 'https://picsum.photos/400/250?random=34',
          sortOrder: 5,
          isPublished: 1,
        } as Partial<Document> as Document,
      ]);
      console.log('✅ 文档数据插入成功');
    } else {
      console.log('⏭️ 文档数据已存在，跳过');
    }

    // ===== FAQ分类 =====
    const faqCategoryRepo = AppDataSource.getRepository(FaqCategory);
    const faqCategoryCount = await faqCategoryRepo.count();
    if (faqCategoryCount === 0) {
      await faqCategoryRepo.save([
        { name: '账号相关', sortOrder: 1, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: '使用指南', sortOrder: 2, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: 'API相关', sortOrder: 3, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: '问题反馈', sortOrder: 4, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: '技术支持', sortOrder: 5, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: '安装配置', sortOrder: 6, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: '连接问题', sortOrder: 7, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: '软件集成', sortOrder: 8, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: '硬件支持', sortOrder: 9, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
        { name: 'SDK使用', sortOrder: 10, isActive: 1 } as Partial<FaqCategory> as FaqCategory,
      ]);
      console.log('✅ FAQ分类数据插入成功');
    } else {
      console.log('⏭️ FAQ分类数据已存在，跳过');
    }

    // ===== FAQ =====
    const faqItemRepo = AppDataSource.getRepository(FaqItem);
    const faqItemCount = await faqItemRepo.count();
    if (faqItemCount === 0) {
      await faqItemRepo.save([
        {
          question: '如何注册八界账号？',
          answer: '您可以通过邮箱或手机号注册八界账号。访问注册页面，填写必要信息后提交即可完成注册。',
          category: '账号相关',
          sortOrder: 1,
          isActive: 1,
        } as Partial<FaqItem> as FaqItem,
        {
          question: '如何开始使用仿真环境？',
          answer: '登录后，进入开发者平台，点击"云端仿真"即可进入仿真环境。首次使用建议先阅读快速入门指南。',
          category: '使用指南',
          sortOrder: 2,
          isActive: 1,
        } as Partial<FaqItem> as FaqItem,
        {
          question: 'API调用有什么限制？',
          answer: '免费用户每天有1000次API调用限制，超过限制后可以升级到付费套餐获取更多额度。',
          category: 'API相关',
          sortOrder: 3,
          isActive: 1,
        } as Partial<FaqItem> as FaqItem,
        {
          question: '如何提交需求和反馈？',
          answer: '您可以在"需求提交"页面填写您的需求或问题，我们的团队会尽快处理并回复。',
          category: '问题反馈',
          sortOrder: 4,
          isActive: 1,
        } as Partial<FaqItem> as FaqItem,
        {
          question: '支持哪些机器人平台？',
          answer: '八界目前支持ROS、ROS2、Webots等主流机器人开发平台，更多平台正在持续集成中。',
          category: '技术支持',
          sortOrder: 5,
          isActive: 1,
        } as Partial<FaqItem> as FaqItem,
        {
          question: '如何获取技术支持？',
          answer: '您可以通过社区讨论、在线客服或邮件联系我们获取技术支持。',
          category: '技术支持',
          sortOrder: 6,
          isActive: 1,
        } as Partial<FaqItem> as FaqItem,
      ]);
      console.log('✅ FAQ数据插入成功');
    } else {
      console.log('⏭️ FAQ数据已存在，跳过');
    }

    // ===== 开源项目分类 =====
    const openSourceCategoryRepo = AppDataSource.getRepository(OpenSourceCategory);
    const openSourceCategoryCount = await openSourceCategoryRepo.count();
    if (openSourceCategoryCount === 0) {
      await openSourceCategoryRepo.save([
        { name: '机器人控制', sortOrder: 1, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
        { name: '视觉识别', sortOrder: 2, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
        { name: '语音交互', sortOrder: 3, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
        { name: '导航定位', sortOrder: 4, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
        { name: 'AI模型', sortOrder: 5, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
        { name: '开发工具', sortOrder: 6, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
        { name: '运动控制', sortOrder: 7, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
        { name: '仿真工具', sortOrder: 8, isActive: 1 } as Partial<OpenSourceCategory> as OpenSourceCategory,
      ]);
      console.log('✅ 开源项目分类数据插入成功');
    } else {
      console.log('⏭️ 开源项目分类数据已存在，跳过');
    }

    // ===== 开源项目 =====
    const openSourceProjectRepo = AppDataSource.getRepository(OpenSourceProject);
    const openSourceProjectCount = await openSourceProjectRepo.count();
    if (openSourceProjectCount === 0) {
      await openSourceProjectRepo.save([
        {
          title: 'RoboBrain',
          version: 'v1.0.0',
          description: '统一感知、推理与规划的具身智能模型，支持多种机器人平台',
          pythonUrl: 'https://github.com/example/robobrain-python',
          cppUrl: 'https://github.com/example/robobrain-cpp',
          category: 'AI模型',
          isPublished: 1,
        } as Partial<OpenSourceProject> as OpenSourceProject,
        {
          title: 'BajieSDK',
          version: 'v1.0.0',
          description: '八界机器人开发工具包，支持多平台和多种编程语言',
          pythonUrl: 'https://github.com/example/bajiesdk-python',
          cppUrl: '',
          category: '开发工具',
          isPublished: 1,
        } as Partial<OpenSourceProject> as OpenSourceProject,
        {
          title: 'HumanoidControl',
          version: 'v1.0.0',
          description: '高性能人形机器人运动控制框架，支持实时仿真',
          pythonUrl: 'https://github.com/example/humanoid-python',
          cppUrl: 'https://github.com/example/humanoid-cpp',
          category: '运动控制',
          isPublished: 1,
        } as Partial<OpenSourceProject> as OpenSourceProject,
        {
          title: 'SimBridge',
          version: 'v1.0.0',
          description: '连接真实机器人与仿真环境的桥接工具',
          pythonUrl: '',
          cppUrl: 'https://github.com/example/simbridge-cpp',
          category: '仿真工具',
          isPublished: 1,
        } as Partial<OpenSourceProject> as OpenSourceProject,
      ]);
      console.log('✅ 开源项目数据插入成功');
    } else {
      console.log('⏭️ 开源项目数据已存在，跳过');
    }

    // ===== 导航菜单 =====
    const navMenuRepo = AppDataSource.getRepository(NavMenu);
    const navMenuCount = await navMenuRepo.count();
    if (navMenuCount === 0) {
      await navMenuRepo.save([
        { title: '首页', url: '/', icon: 'fa-home', parentId: 0, target: '_self', sortOrder: 1, isActive: 1 } as Partial<NavMenu> as NavMenu,
        { title: '开发者', url: '/dev', icon: 'fa-code', parentId: 0, target: '_self', sortOrder: 2, isActive: 1 } as Partial<NavMenu> as NavMenu,
        { title: '社区', url: '/community', icon: 'fa-users', parentId: 0, target: '_self', sortOrder: 3, isActive: 1 } as Partial<NavMenu> as NavMenu,
        { title: '开源', url: '/open-source', icon: 'fa-github', parentId: 0, target: '_self', sortOrder: 4, isActive: 1 } as Partial<NavMenu> as NavMenu,
        { title: '文档', url: '/docs', icon: 'fa-book', parentId: 0, target: '_self', sortOrder: 5, isActive: 1 } as Partial<NavMenu> as NavMenu,
        { title: '关于', url: '/about', icon: 'fa-info-circle', parentId: 0, target: '_self', sortOrder: 6, isActive: 1 } as Partial<NavMenu> as NavMenu,
      ]);
      console.log('✅ 导航菜单数据插入成功');
    } else {
      console.log('⏭️ 导航菜单数据已存在，跳过');
    }

    // ===== Footer项 =====
    const footerItemRepo = AppDataSource.getRepository(FooterItem);
    const footerItemCount = await footerItemRepo.count();
    if (footerItemCount === 0) {
      await footerItemRepo.save([
        { sectionTitle: '开发者', title: '技能市场', url: '/skills', sortOrder: 1, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '开发者', title: '应用中心', url: '/apps', sortOrder: 2, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '开发者', title: 'API文档', url: '/docs', sortOrder: 3, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '社区', title: '讨论区', url: '/discussions', sortOrder: 4, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '社区', title: '资讯', url: '/news', sortOrder: 5, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '社区', title: '活动', url: '/activities', sortOrder: 6, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '资源', title: '开源项目', url: '/open-source', sortOrder: 7, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '资源', title: 'FAQ', url: '/faq', sortOrder: 8, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '关于', title: '关于我们', url: '/about', sortOrder: 9, isActive: 1 } as Partial<FooterItem> as FooterItem,
        { sectionTitle: '关于', title: '联系我们', url: '/contact', sortOrder: 10, isActive: 1 } as Partial<FooterItem> as FooterItem,
      ]);
      console.log('✅ Footer项数据插入成功');
    } else {
      console.log('⏭️ Footer项数据已存在，跳过');
    }

    // ===== 站点配置 =====
    const siteConfigRepo = AppDataSource.getRepository(SiteConfig);
    const siteConfigCount = await siteConfigRepo.count();
    if (siteConfigCount === 0) {
      await siteConfigRepo.save([
        { configKey: 'footer_slogan', configValue: '链接开发者·赋能具身智能产业', configType: 'string' } as Partial<SiteConfig> as SiteConfig,
        { configKey: 'footer_contact_title', configValue: '联系我们', configType: 'string' } as Partial<SiteConfig> as SiteConfig,
        { configKey: 'footer_contact_phone', configValue: '400-8078-999', configType: 'string' } as Partial<SiteConfig> as SiteConfig,
        { configKey: 'footer_contact_address', configValue: '江苏省苏州市吴中区友翔路18号', configType: 'string' } as Partial<SiteConfig> as SiteConfig,
        { configKey: 'footer_copyright', configValue: '© 2026 科沃斯八界 版权所有', configType: 'string' } as Partial<SiteConfig> as SiteConfig,
        { configKey: 'footer_icp', configValue: '苏ICP备12345678号', configType: 'string' } as Partial<SiteConfig> as SiteConfig,
      ]);
      console.log('✅ 站点配置数据插入成功');
    } else {
      console.log('⏭️ 站点配置数据已存在，跳过');
    }

    // ===== 页面 =====
    const pageRepo = AppDataSource.getRepository(Page);
    const pageCount = await pageRepo.count();
    if (pageCount === 0) {
      await pageRepo.save([
        {
          slug: 'about',
          title: '关于八界',
          description: '了解八界具身智能开放社区',
          content: '<h1>关于八界</h1><p>八界是科沃斯旗下的具身智能开放社区，致力于链接开发者，赋能具身智能产业。</p><h2>我们的使命</h2><p>让每一位开发者都能便捷地参与具身智能的创新与创造。</p>',
          showBanner: 1,
          isPublished: 1,
          sortOrder: 1,
        } as Partial<Page> as Page,
        {
          slug: 'contact',
          title: '联系我们',
          description: '联系八界团队',
          content: '<h1>联系我们</h1><p>如果您有任何问题或合作意向，欢迎通过以下方式联系我们：</p><ul><li>电话：400-8078-999</li><li>地址：江苏省苏州市吴中区友翔路18号</li></ul>',
          showBanner: 0,
          isPublished: 1,
          sortOrder: 2,
        } as Partial<Page> as Page,
      ]);
      console.log('✅ 页面数据插入成功');
    } else {
      console.log('⏭️ 页面数据已存在，跳过');
    }

    // ===== SEO配置 =====
    const pageSeoRepo = AppDataSource.getRepository(PageSeo);
    const pageSeoCount = await pageSeoRepo.count();
    if (pageSeoCount === 0) {
      await pageSeoRepo.save([
        {
          pageSlug: 'home',
          metaTitle: '八界 - 具身智能开放社区',
          metaDescription: '八界是面向具身智能开发者的开放社区，提供云端仿真、开源开发、技术交流和项目孵化平台。',
          metaKeywords: '具身智能,机器人,ROS2,仿真,开源',
          ogTitle: '八界 - 具身智能开放社区',
          ogDescription: '链接开发者·赋能具身智能产业',
          ogImage: 'https://picsum.photos/1200/630?random=seo1',
        } as Partial<PageSeo> as PageSeo,
        {
          pageSlug: 'about',
          metaTitle: '关于八界 - 具身智能开放社区',
          metaDescription: '了解八界具身智能开放社区的使命和愿景。',
          metaKeywords: '八界,具身智能,社区',
          ogTitle: '关于八界',
          ogDescription: '链接开发者·赋能具身智能产业',
          ogImage: 'https://picsum.photos/1200/630?random=seo2',
        } as Partial<PageSeo> as PageSeo,
      ]);
      console.log('✅ SEO配置数据插入成功');
    } else {
      console.log('⏭️ SEO配置数据已存在，跳过');
    }

    console.log('\n🎉 种子数据插入完成！');
  } catch (error) {
    console.error('❌ 种子数据插入失败:', error);
    process.exit(1);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
