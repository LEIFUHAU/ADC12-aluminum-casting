# ADC12 Aluminum Die Casting International Website

高端 B2B 外贸独立站 - 专注 ADC12 铝合金压铸制造

## 功能特点

✅ **多语言支持**
- 英语 (en)
- 西班牙语 (es)
- 中文 (zh)

✅ **核心页面**
- 首页：工厂实力展示
- 产品页：ADC12 压铸产品分类
- 关于我们：工厂资质
- 联系我们：询盘表单 + WhatsApp

✅ **技术栈**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- next-intl (国际化)
- React Hook Form (表单)

✅ **SEO 优化**
- 多语言路由 (/en, /es, /zh)
- 语义化 HTML
- 结构化数据 (待添加)
- sitemap.xml (待生成)
- robots.txt (待配置)

## 本地开发

\ash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 打开浏览器访问
http://localhost:3000
\
## 生产部署

\ash
# 构建生产版本
npm run build

# 启动生产服务器
npm start
\
## 推荐部署平台

### 1. Vercel (最佳选择)
- 零配置部署
- 全球 CDN
- 自动 SSL
- 免费额度充足

\ash
npm install -g vercel
vercel
\
### 2. Netlify
- 拖拽式部署
- 表单处理
- 分析工具

### 3. AWS Amplify
- 企业级方案
- 高可用性

### 4. 传统主机 (cPanel)
- 导出静态站点: pm run build && npm run export- 上传 out 目录到主机

## 域名配置

购买域名后在 DNS 设置 A 记录指向服务器 IP，或 CNAME 指向部署平台。

## 自定义配置

### 修改联系方式
编辑 components/Contact.tsx 和 components/Footer.tsx
### 修改 WhatsApp 号码
搜索 wa.me/your-whatsapp-number 替换为实际号码

### 添加产品图片
在 public/images/ 目录添加图片，更新 components/Products.tsx 中的路径

### SEO 关键词
在 pp/[locale]/layout.tsx 添加 metadata

## 后续优化

1. **表单集成**
   - Resend / SendGrid 邮件服务
   - 或后端 API 接收表单

2. **Google 服务**
   - Google Analytics (GA4)
   - Google Search Console
   - Google Tag Manager

3. **内容营销**
   - 添加博客功能
   - 技术文章 SEO

4. **性能优化**
   - 图片优化 (WebP)
   - CDN 配置
   - 缓存策略

## 许可证

MIT License
