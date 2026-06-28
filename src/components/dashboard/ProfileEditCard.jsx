"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateProfile } from "@/lib/api/users/action";
import { uploadImage } from "@/utils/UploadImage";
import Image from "next/image";

const ProfileEditCard = ({ user, lessonsCreatedCount, favoritesSavedCount }) => {
  const [editing, setEditing] = useState(false);


  const [displayName, setDisplayName] = useState(user.name || "");
  const [displayImage, setDisplayImage] = useState(user.image || "");

  // Draft values, only used while the form is open
  const [nameDraft, setNameDraft] = useState(user.name || "");
  const [photoPreview, setPhotoPreview] = useState(user.image || "");
  const [photoFile, setPhotoFile] = useState(null);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleEditOpen = () => {
    // reset drafts to the currently displayed values whenever editing starts
    setNameDraft(displayName);
    setPhotoPreview(displayImage);
    setPhotoFile(null);
    setEditing(true);
  };

  const handleCancel = () => {
    setNameDraft(displayName);
    setPhotoPreview(displayImage);
    setPhotoFile(null);
    setEditing(false);
  };

  const handleSave = async () => {
    if (!nameDraft.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      setSaving(true);

      let image = displayImage;

      if (photoFile) {
        setUploading(true);
        const uploadedUrl = await uploadImage(photoFile);
        setUploading(false);

        if (!uploadedUrl) {
          toast.error("Photo upload failed. Please try again.");
          setSaving(false);
          return;
        }
        image = uploadedUrl;
      }

      const finalName = nameDraft.trim();

      const res = await updateProfile({ name: finalName, image }, user.id);

      if (!res.success) {
        throw new Error(res.message || "Failed to update profile");
      }

      // Update the displayed values immediately — no reload, no refetch needed.
      setDisplayName(finalName);
      setDisplayImage(image);

      toast.success("Profile updated successfully");
      setEditing(false);
      setPhotoFile(null);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div className="border rounded-2xl p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-5">
        {/* PHOTO */}
        <div className="flex flex-col items-center sm:items-start gap-2 shrink-0">
          <Image
            width={200}
            height={200}
            src={(editing ? photoPreview : displayImage) || "/default-avatar.png"}
            alt={displayName}
            className="w-24 h-24 rounded-full object-cover border"
          />
          {editing && (
            <label className="text-xs text-blue-600 cursor-pointer underline">
              Change photo
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          )}
        </div>

        {/* INFO */}
        <div className="flex-1 w-full">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {editing ? (
              <input
                type="text"
                value={nameDraft}
                onChange={(e) => setNameDraft(e.target.value)}
                className="border p-2 rounded text-base font-semibold w-full sm:w-auto sm:min-w-[220px]"
              />
            ) : (
              <h2 className="text-xl font-semibold">{displayName}</h2>
            )}

            {user.isPremium && (
              <span className="px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                Premium ⭐
              </span>
            )}
          </div>

          <p className="text-sm text-gray-500 mb-4 break-all">
            {user.email}
          </p>

          {/* STATS */}
          <div className="flex flex-wrap gap-6 text-sm mb-4">
            <div>
              <p className="font-semibold">{lessonsCreatedCount}</p>
              <p className="text-gray-500 text-xs">Lessons Created</p>
            </div>
            <div>
              <p className="font-semibold">{favoritesSavedCount}</p>
              <p className="text-gray-500 text-xs">Lessons Saved</p>
            </div>
          </div>

          {/* ACTIONS */}
          {editing ? (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSave}
                disabled={saving || uploading}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-[#622ad8] to-[#a8258e] text-white text-sm disabled:opacity-60"
              >
                {uploading
                  ? "Uploading..."
                  : saving
                    ? "Saving..."
                    : "Save Changes"}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving || uploading}
                className="px-4 py-2 rounded-full bg-gray-200 text-gray-600 text-sm"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={handleEditOpen}
              className="px-4 py-2 rounded-full border text-sm"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileEditCard;