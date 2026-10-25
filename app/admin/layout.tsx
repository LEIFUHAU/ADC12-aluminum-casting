import type { Metadata } from 'next';
import './admin.css';

export const metadata: Metadata = {
  title: '客户管理后台',
  robots: { index: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="admin-body">{children}</body>
    </html>
  );
}
