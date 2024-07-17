// src/components/EditUserInfo/EditUserInfo.tsx
import React, { useState } from "react";
import { UserInfoProps } from "../UserInfo/UserInfo";
import useFunInfo from '../../Services/useFunInfo';

interface EditUserInfoProps extends UserInfoProps {
  onSave: (updatedInfo: UserInfoProps) => Promise<void>;
  onCancel: () => void;
}

const EditUserInfo: React.FC<EditUserInfoProps> = ({
  id,
  name,
  bio,
  hobbies,
  favoritefood,
  funfact,
  onSave,
  onCancel,
}) => {
  const { setFunInfo, refetchFunInfo } = useFunInfo();
  const [formData, setFormData] = useState({
    id,
    name,
    bio,
    hobbies,
    favoritefood,
    funfact,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name === "hobbies") {
      setFormData({
        ...formData,
        [name]: value.split(", "),
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    console.log(`Changing from current bio: ${bio} to new bio: ${formData.bio}`);
    // Perform optimistic update
    setFunInfo(formData);
    try {
      await onSave(formData);
      await refetchFunInfo();
    } catch (error) {
      console.error('Error saving data:', error);
    } finally {
      setIsSaving(false);
      window.location.reload();
    }
  };

  return (
    <div className="text-center min-w- bg-gray-800 bg-opacity-50 px-6 py-4 rounded shadow-lg mx-auto flex flex-col">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="text-7xl font-bold text-white bg-transparent border-none focus:outline-none text-center"
      />
      <input
        type="text"
        name="bio"
        value={formData.bio}
        onChange={handleChange}
        className="text-white mt-6 text-2xl bg-transparent border-none focus:outline-none text-center"
      />
      <input
        type="text"
        name="hobbies"
        value={formData.hobbies.join(", ")}
        onChange={handleChange}
        className="text-white mt-4 text-2xl bg-transparent border-none focus:outline-none text-center"
      />
      <input
        type="text"
        name="favoritefood"
        value={formData.favoritefood}
        onChange={handleChange}
        className="text-white mt-4 text-2xl bg-transparent border-none focus:outline-none text-center"
      />
      <input
        type="text"
        name="funfact"
        value={formData.funfact}
        onChange={handleChange}
        className="text-white mt-4 text-2xl bg-transparent border-none focus:outline-none text-center"
      />
      <div className=" text-white py-2 px-4 mt-4 rounded mb-4 bg-gray-900">
        You can now click and edit any of this data.
      </div>
      <div className="mt-10 flex justify-center space-x-6">
        <button
          onClick={handleSave}
          className="bg-black text-white text-2xl px-6 py-3 rounded hover:bg-white hover:text-black transition"
          disabled={isSaving}
        >
          {isSaving ? (
            <svg
              className="animate-spin h-5 w-5 text-white inline-block"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          ) : (
            'Save'
          )}
        </button>
        <button
          onClick={onCancel}
          className="bg-white text-black text-2xl px-6 py-3 rounded hover:bg-black hover:text-white transition"
          disabled={isSaving}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditUserInfo;
