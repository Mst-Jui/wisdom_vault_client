"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import { updateLessons } from "@/lib/api/users/action";
import { uploadImage } from "@/utils/UploadImage";
import Image from "next/image";
import Button from "../reusable/Button";


const CATEGORIES = [
  "Personal Growth",
  "Career",
  "Relationships",
  "Mindset",
  "Mistakes Learned",
];

const EMOTIONAL_TONES = ["Motivational", "Sad", "Realization", "Gratitude"];

const UpdateLessonModal = ({ lesson, user, onClose, onUpdated }) => {
  const [formData, setFormData] = useState({
    title: lesson.title || "",
    description: lesson.description || "",
    category: lesson.category || CATEGORIES[0],
    emotionalTone: lesson.emotionalTone || EMOTIONAL_TONES[0],
    accessLevel: lesson.accessLevel || "Free",
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(lesson.image || "");
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      setSaving(true);
      let imageUrl = lesson.image || "";

      if (imageFile) {
        setUploading(true);
        const uploadedUrl = await uploadImage(imageFile);
        setUploading(false);

        if (!uploadedUrl) {
          toast.error("Image upload failed. Please try again.");
          setSaving(false);
          return;
        }

        imageUrl = uploadedUrl;
      }

      const res = await updateLessons(
        {
          userId: user.id,
          title: formData.title.trim(),
          description: formData.description.trim(),
          category: formData.category,
          emotionalTone: formData.emotionalTone,
          image: imageUrl,
          // a Free user can never push a lesson to Premium, no matter what was selected
          accessLevel: user?.isPremium ? formData.accessLevel : "Free",
        },
        lesson._id
      );

      if (!res.success) {
        throw new Error(res.message || "Failed to update lesson");
      }

      toast.success("Lesson updated successfully");
      onUpdated(res.data);
      onClose();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-8 overflow-y-auto">
      <div className="bg-white text-neutral-500 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-5">Update Lesson</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border p-2 w-full rounded"
              required
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="border p-2 w-full rounded resize-none"
              required
            />
          </div>

          {/* CATEGORY */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* EMOTIONAL TONE */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Emotional Tone
            </label>
            <select
              name="emotionalTone"
              value={formData.emotionalTone}
              onChange={handleChange}
              className="border p-2 w-full rounded"
            >
              {EMOTIONAL_TONES.map((tone) => (
                <option key={tone} value={tone}>
                  {tone}
                </option>
              ))}
            </select>
          </div>

          {/* IMAGE UPLOAD */}
          <div>
            <label className="block text-sm font-medium mb-1">Image</label>

            {imagePreview && (
              <Image
                width={300}
                height={300}
                src={imagePreview}
                alt="Lesson preview"
                className="w-full h-40 object-cover rounded-lg mb-2 border"
              />
            )}

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 w-full rounded text-sm file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:bg-blue-50 file:text-blue-700 file:text-sm"
            />

            {uploading && (
              <p className="text-xs text-blue-600 mt-1">
                Uploading image...
              </p>
            )}
            <p className="text-xs text-gray-400 mt-1">
              Leave empty to keep the current image.
            </p>
          </div>

          {/* ACCESS LEVEL */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Access Level
            </label>
            <select
              name="accessLevel"
              value={formData.accessLevel}
              onChange={handleChange}
              disabled={!user?.isPremium}
              title={
                !user?.isPremium
                  ? "Upgrade to Premium to create paid lessons"
                  : ""
              }
              className={`border p-2 w-full rounded ${!user?.isPremium ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
            {!user?.isPremium && (
              <p className="text-xs text-gray-400 mt-1">
                Upgrade to Premium to create paid lessons.
              </p>
            )}
          </div>

          {/* ACTIONS */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-200 text-sm"
            >
              Cancel
            </button>
            <Button
              type="submit"
              disabled={saving || uploading}
            >
              {uploading
                ? "Uploading..."
                : saving
                  ? "Saving..."
                  : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLessonModal;