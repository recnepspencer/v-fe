// src/components/UserInfo/UserInfo.tsx
import React, { useState, useCallback, useEffect } from 'react';
import EditUserInfo from './EditUserInfo';
import useFunInfo from '../../Services/useFunInfo';
import { updateUser } from '../../Services/userService';

export interface UserInfoProps {
  id: number;
  name: string;
  bio: string;
  hobbies: string[];
  favoritefood: string;
  funfact: string;
}

const UserInfo: React.FC<UserInfoProps> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const { refetchFunInfo, setFunInfo } = useFunInfo();
  
  useEffect(() => {
    console.log('UserInfo received new props:', props);
  }, [props]);

  const handleEdit = useCallback(() => setIsEditing(true), []);
  const handleCancel = useCallback(() => setIsEditing(false), []);
  
  const handleSave = useCallback(async (updatedInfo: UserInfoProps) => {
    try {
      const [firstname, ...rest] = updatedInfo.name.split(' ');
      const lastname = rest.join(' ');

      // Optimistic update
      console.log(`Changing from current bio: ${props.bio} to new bio: ${updatedInfo.bio}`);
      setFunInfo(updatedInfo);

      // Update the backend
      await updateUser(updatedInfo.id, {
        ...updatedInfo,
        firstname,
        lastname,
      });

      // Refetch to ensure consistency
      await refetchFunInfo();
    } catch (error) {
      console.error('Error updating user:', error);
      // If there's an error, revert the optimistic update
      await refetchFunInfo();
    } finally {
      setIsEditing(false);
    }
  }, [props.bio, setFunInfo, refetchFunInfo]);

  if (isEditing) {
    return (
      <EditUserInfo
        {...props}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    );
  }

  return (
    <div className="text-center bg-gray-800 bg-opacity-50 px-6 py-4 rounded shadow-lg">
      <h1 className="text-7xl font-bold text-white">{props.name}</h1>
      <p className="text-white mt-6 text-2xl">Bio: {props.bio}</p>
      <p className="text-white mt-4 text-2xl">Hobbies: {props.hobbies.join(', ')}</p>
      <p className="text-white mt-4 text-2xl">Favorite Food: {props.favoritefood}</p>
      <p className="text-white mt-4 text-2xl">Fun Fact: {props.funfact}</p>
      <div className="mt-10 flex justify-center space-x-6">
        <button onClick={handleEdit} className="bg-black text-white text-2xl px-6 py-3 rounded hover:bg-white hover:text-black transition">Edit Info</button>
      </div>
    </div>
  );
};

export default React.memo(UserInfo);
