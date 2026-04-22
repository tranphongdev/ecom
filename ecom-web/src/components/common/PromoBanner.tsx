import React, { useState } from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';

const PromoBanner: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(() => {
    // Check if the banner has been shown in this session
    const hasShownBanner = sessionStorage.getItem('hasShownPromoBanner');
    if (!hasShownBanner) {
      // Mark as shown for the current session and show it
      sessionStorage.setItem('hasShownPromoBanner', 'true');
      return true;
    }
    return false;
  });

  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleBannerClick = () => {
    setIsModalVisible(false);
    navigate('/products');
  };

  return (
    <Modal
      open={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      closable={true}
      width={700}
      centered
    >
      <div 
        onClick={handleBannerClick}
      >
        <img 
          src="https://nguyencongpc.vn/media/banner/popup_popup%20ctkm%20t3%202.webp" 
          alt="Khuyến mãi" 
          style={{ width: '100%', height: 'auto', display: 'block' }} 
        />
      </div>
    </Modal>
  );
};

export default PromoBanner;
