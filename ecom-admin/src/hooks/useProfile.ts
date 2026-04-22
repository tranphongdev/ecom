import { useAtom } from 'jotai';
import { profileAtom } from '../atoms';
import { UserProfile } from '../types';
import { message } from 'antd';
import { useState } from 'react';

export const useProfile = () => {
  const [profile, setProfile] = useAtom(profileAtom);
  const [loading, setLoading] = useState(false);

  const updateProfile = async (values: Partial<UserProfile>) => {
    setLoading(true);
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      setProfile(prev => ({
        ...prev,
        ...values
      }));
      
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async (prefs: Partial<UserProfile['preferences']>) => {
    try {
      setProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          ...prefs
        }
      }));
      message.success('Preferences updated');
    } catch (error) {
      message.error('Failed to update preferences');
    }
  };

  const changePassword = async (values: any) => {
    setLoading(true);
    try {
      // Mock API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('Password changed successfully');
    } catch (error) {
      message.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return {
    profile,
    loading,
    updateProfile,
    updatePreferences,
    changePassword
  };
};
