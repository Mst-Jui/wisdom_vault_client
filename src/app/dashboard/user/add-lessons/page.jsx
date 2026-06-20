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
import { useSession } from "@/lib/auth-client";

const AddLessonPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

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

      let imageUrl = "";

      const imageFile = fileRef.current?.files?.[0];

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);

        if (!imageUrl) {
          toast.error("Image upload failed");
          return;
        }
      }

      const lessonData = {
        title: formValues.title,
        description: formValues.description,
        category: formValues.category,
        emotionalTone: formValues.emotionalTone,
        accessLevel: isPremium
          ? formValues.accessLevel
          : "Free",
        image: imageUrl,
        visibility: "Public",

        creatorId: user?.id,
        creatorName: user?.name,
        creatorEmail: user?.email,
        creatorPhoto: user?.image,

        likes: [],
        likesCount: 0,
        favoritesCount: 0,

        isFeatured: false,
        isReviewed: false,

        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await addLessons(lessonData);

      if (result?.success) {
        toast.success("Lesson added successfully");

        reset();
        setImagePreview("");

        if (fileRef.current) {
          fileRef.current.value = "";
        }
      } else {
        toast.error(result?.message || "Failed to add lesson");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <DashboardHeading
        title="Add Lesson"
        description="Create a new lesson"
      />

      <Form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <div className="w-full">
          <label className="block mb-2">
            Lesson Title
          </label>

          <input
            {...register("title", {
              required: true,
            })}
            className="w-full border rounded-lg p-3"
            placeholder="Lesson title"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2">
            Description
          </label>

          <textarea
            {...register("description", {
              required: true,
            })}
            className="w-full border rounded-lg p-3 h-40"
            placeholder="Lesson description"
          />
        </div>

        <div className="w-full">
          <label className="block mb-2">
            Lesson Image
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
              className="w-full h-64 object-cover rounded-lg mt-4"
            />
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2">
              Category
            </label>

            <select
              {...register("category")}
              className="w-full border rounded-lg p-3"
            >
              <option value="Personal Growth">
                Personal Growth
              </option>

              <option value="Career">
                Career
              </option>

              <option value="Relationships">
                Relationships
              </option>

              <option value="Mindset">
                Mindset
              </option>

              <option value="Mistakes Learned">
                Mistakes Learned
              </option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Emotional Tone
            </label>

            <select
              {...register("emotionalTone")}
              className="w-full border rounded-lg p-3"
            >
              <option value="Motivational">
                Motivational
              </option>

              <option value="Sad">
                Sad
              </option>

              <option value="Realization">
                Realization
              </option>

              <option value="Gratitude">
                Gratitude
              </option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Access Level
          </label>

          {isPremium ? (
            <select
              {...register("accessLevel")}
              defaultValue="Free"
              className="w-full border rounded-lg p-3 bg-white dark:bg-zinc-900"
            >
              <option value="Free">Free</option>
              <option value="Premium">Premium</option>
            </select>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value="Free"
                readOnly
                className="w-full border rounded-lg p-3 bg-gray-100 dark:bg-zinc-800 cursor-not-allowed"
              />

              <div className="flex items-center gap-2 text-amber-500 text-sm">
                <Lock size={16} />
                <span>
                  Upgrade to Premium to create Premium lessons.
                </span>
              </div>
            </div>
          )}
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting
            ? "Publishing..."
            : "Publish Lesson"}
        </Button>
      </Form>
    </div>
  );
};

export default AddLessonPage;