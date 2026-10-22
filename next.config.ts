import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // 移除 output: 'export'、images 那两行，关闭静态导出
};

export default withNextIntl(nextConfig);
