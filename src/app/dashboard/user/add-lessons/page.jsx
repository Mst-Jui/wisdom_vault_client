"use client";

import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Lock } from "lucide-react";
import { Form } from "@heroui/react";
import Button from "@/components/reusable/Button";
import DashboardHeading from "@/components/dashboard/DashboardHeading";
import { uploadImage } from "@/utils/UploadImage";
import { addLessons } from "@/lib/api/users/action";
import { authClient } from "@/lib/auth-client";

const AddLessonPage = () => {
  const { data: session } = authClient.useSession();
    const user = session?.user?._id;
  console.log("userId", user);
  const {
    register,
    handleSubmit,
    reset,
  } = useForm();
  const fileRef = useRef(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isPremium = user?.isPremium || false;
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview("");
    }
  };
  const onSubmit = async (formValues) => {
    try {
      setIsSubmitting(true);

      let imageUrlFinal = "";
      const imageFile = fileRef.current?.files?.[0];

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (!uploadedUrl) {
          setIsSubmitting(false);
          return;
        }
        imageUrlFinal = uploadedUrl;
      }

      const finalAccessLevel = isPremium
        ? formValues.accessLevel || "Free"
        : "Free";

      const lessonPayload = {
        title: formValues.title,
        description: formValues.description,
        category: formValues.category,
        emotionalTone: formValues.emotionalTone,
        accessLevel: finalAccessLevel,
        image: imageUrlFinal,
        // userId: user?._id,
        user,
        isPremium,
      };

      console.log("userId", userId);

      const result = await addLessons(lessonPayload);

      if (result?.success) {
        toast.success("Lesson published successfully!");
        reset();
        setImagePreview("");
        if (fileRef.current) fileRef.current.value = "";
      } else {
        toast.error(result?.message || "Failed to publish lesson");
      }
    } catch (error) {
      console.error("Error submitting lesson:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-xl shadow-lg">
      <DashboardHeading
        title="Add Lesson"
        description="Add new lesson"
      />
      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        {/* Title */}
        <div className="w-full">
          <label className="block mb-2 font-medium">
            Lesson Title
          </label>
          <input
            {...register("title", { required: true })}
            placeholder="Enter lesson title"
            className="w-full border rounded-lg p-3"
          />
        </div>

        {/* Description */}
        <div className="w-full">
          <label className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            {...register("description", { required: true })}
            placeholder="Write your lesson..."
            className="w-full border rounded-lg p-3 h-36"
          />
        </div>

        {/* Image Upload */}
        <div className="w-full">
          <label className="block mb-2 font-medium">
            Upload Lesson Image
          </label>

          <input
            type="file"
            accept="image/*"
            ref={fileRef}
            onChange={handleImageChange}
            className="w-full border rounded-lg p-2"
          />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-64 object-cover rounded-lg mt-4 border"
            />
          )}
        </div>

        {/* Category + Tone */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              {...register("category")}
              className="w-full border rounded-lg p-3 bg-white dark:bg-zinc-900"
            >
              <option value="Personal Growth">
                Personal Growth
              </option>
              <option value="Career">Career</option>
              <option value="Relationships">
                Relationships
              </option>
              <option value="Mindset">Mindset</option>
              <option value="Mistakes Learned">
                Mistakes Learned
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Emotional Tone
            </label>

            <select
              {...register("emotionalTone")}
              className="w-full border rounded-lg p-3 bg-white dark:bg-zinc-900"
            >
              <option value="Motivational">
                Motivational
              </option>
              <option value="Sad">Sad</option>
              <option value="Realization">
                Realization
              </option>
              <option value="Gratitude">
                Gratitude
              </option>
            </select>
          </div>
        </div>

        {/* Access Level */}
        <div>
          <label className="block mb-2 font-medium">
            Access Level
          </label>

          <div className="flex items-center gap-3">
            <select
              {...register("accessLevel")}
              disabled={!isPremium}
              defaultValue="Free"
              className={`w-full border rounded-lg p-3 ${!isPremium ? "cursor-not-allowed opacity-60" : ""
                }`}
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>

            {!isPremium && (
              <div className="relative group">
                <Lock
                  size={20}
                  className="text-gray-500"
                />

                <div className="absolute bottom-full right-0 hidden group-hover:block text-xs p-2 rounded w-52 mb-2 bg-zinc-800 text-white">
                  Upgrade to Premium to create paid lessons.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full text-white font-semibold py-3 rounded-full"
        >
          {isSubmitting ? "Publishing..." : "Publish Lesson"}
        </Button>
      </Form>
    </div>
  );
};

export default AddLessonPage;