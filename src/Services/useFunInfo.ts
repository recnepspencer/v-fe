// src/Services/useFunInfo.ts
import { useState, useEffect, useCallback } from 'react';
import { getFunInfo } from './userService';

const useFunInfo = () => {
  const [funInfo, setFunInfo] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFunInfo = useCallback(async () => {
    console.log('Fetching fun info...');
    setLoading(true);
    try {
      const data = await getFunInfo();
      console.log('Received fun info:', data);
      setFunInfo(data);
    } catch (err) {
      console.error('Error fetching fun info:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFunInfo();
  }, [fetchFunInfo]);

  const updateFunInfoOptimistically = useCallback((updatedInfo: any) => {
    console.log('Updating fun info optimistically:', updatedInfo);
    setFunInfo((prevInfo: any) => {
      const newInfo = { ...prevInfo, ...updatedInfo };
      console.log('New fun info:', newInfo);
      return newInfo;
    });
  }, []);

  return { 
    funInfo, 
    setFunInfo: updateFunInfoOptimistically, 
    loading, 
    error, 
    refetchFunInfo: fetchFunInfo 
  };
};

export default useFunInfo;
