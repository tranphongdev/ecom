import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center h-[60vh]">
    <Spin indicator={<LoadingOutlined style={{ fontSize: 36 }} spin />} />
  </div>
);
