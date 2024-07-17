// src/components/Home/Home.tsx
import React, { useMemo } from 'react';
import useFunInfo from '../Services/useFunInfo';
import UserInfo from '../Components/UserInfo/UserInfo';

const Home: React.FC = () => {
  const { funInfo, loading, error } = useFunInfo();

  const userInfoProps = useMemo(() => {
    if (!funInfo) return null;
    return {
      id: funInfo.id,
      name: funInfo.name,
      bio: funInfo.bio,
      hobbies: funInfo.hobbies,
      favoritefood: funInfo.favoritefood,
      funfact: funInfo.funfact
    };
  }, [funInfo]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-xl">Error: {error}</div>;
  }

  return (
    <div
      className="home-container flex flex-col items-center justify-start min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/images/porsche.jpeg')` }}
    >
      <div className="mt-[40vh]">
        {userInfoProps && (
          <UserInfo
            key={JSON.stringify(userInfoProps)}
            {...userInfoProps}
          />
        )}
      </div>
      {/* Social media links */}
    </div>
  );
};

export default Home;
