// src/services/userService.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/users';

export const getAllUsers = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching users');
  }
};

export const getUserById = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching user by ID');
  }
};

export const createUser = async (user: any) => {
  try {
    const response = await axios.post(API_BASE_URL, user);
    return response.data;
  } catch (error) {
    throw new Error('Error creating user');
  }
};

export const updateUser = async (id: number, user: any) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${id}`, user);
    return response.data;
  } catch (error) {
    throw new Error('Error updating user');
  }
};

export const deleteUser = async (id: number) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Error deleting user');
  }
};

export const getFunInfo = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/awesome/applicant`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching fun info');
  }
};
