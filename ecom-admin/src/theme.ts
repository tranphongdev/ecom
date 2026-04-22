import type { ThemeConfig } from 'antd';

export const antdTheme: ThemeConfig = {
  token: {
    colorPrimary: '#4f46e5',
    borderRadius: 12,
    fontFamily: 'Inter, system-ui, sans-serif',
  },
  components: {
    Table: {
      headerBg: '#f8fafc',
      headerColor: '#64748b',
      headerSplitColor: 'transparent',
      cellPaddingInline: 24,
      cellPaddingBlock: 16,
    },
    Button: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Input: {
      borderRadius: 12,
      controlHeight: 40,
    },
    Select: {
      borderRadius: 12,
      controlHeight: 40,
    },
  },
};
