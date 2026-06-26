"use client";
import NavLink from '@/components/common/NavLink';
import Button from '@/components/reusable/Button';
import { authClient } from '@/lib/auth-client';
import { uploadImage } from '@/utils/UploadImage';
import { Description, FieldError, Fieldset, Form, Input, Label, Surface, TextField, Select, ListBox } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';




const SignUpPage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const fileRef = useRef(null);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file");
      return;
    }
    const localUrl = URL.createObjectURL(file);
    setImageUrl(localUrl);
    toast.success("Image selected!");
  };

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password)) return "Password must have an uppercase letter";
    if (!/[a-z]/.test(password)) return "Password must have a lowercase letter";
    return null;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const user = Object.fromEntries(formData.entries());
    const passwordError = validatePassword(user.password);
    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    let imageUrlFinal = "";
    if (fileRef.current?.files?.[0]) {
      const imageFile = fileRef.current.files[0];
      imageUrlFinal = await uploadImage(imageFile);
    } else if (imageUrl.trim()) {
      imageUrlFinal = imageUrl.trim();
    }

    await authClient.signUp.email({
      ...user,
      isPremium: false,
      image: imageUrlFinal,
      // plan: "free",
    });

    toast.success("Account created!");
    redirect('/signin')
  };

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
    });
  }
  return (
    <div className="flex items-center justify-center rounded-3xl bg-surface p-6 max-w-2xl mx-auto border mt-5 mb-5">
      <Surface className="w-full">
        <Form
          onSubmit={onSubmit}
        >
          <div>
            {/* Welcome Section */}
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-bold">
                Welcome to Wisdom Vault
              </h1>

              <p className="mt-2 text-xs md:text-sm text-gray-500 dark:text-gray-500">
                Join us to start sharing your journey, saving wisdom, and exploring lessons from others.
              </p>
            </div>
          </div>
          <Fieldset className="w-full">
            {/* <Fieldset.Legend>Signup</Fieldset.Legend>
            <Description>Create your account</Description> */}
            <Fieldset.Group>

              {/* Name */}
              <TextField isRequired name="name">
                <Label>Name</Label>
                <Input placeholder="John Doe" variant="secondary" />
                <FieldError />
              </TextField>

              {/* Image URL + local file picker */}
              <div className="flex flex-col gap-1.5">
                <Label>Image</Label>
                <div className="flex gap-2 items-center">
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  {/* Browse button */}
                  <button
                    type="button"
                    onClick={() => fileRef.current.click()}
                    className="shrink-0 rounded-lg border border-dashed border-violet-400 px-3 py-2 text-xs font-medium text-violet-600 hover:bg-violet-50 dark:text-violet-400 dark:hover:bg-violet-900/20 transition-colors"
                  >
                    Browse
                  </button>
                </div>

                {/* Preview */}
                {imageUrl && (
                  <div className="flex items-center gap-3 mt-1">
                    <Image
                      width='20'
                      height='20'
                      src={imageUrl}
                      alt="preview"
                      className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                      onError={() => {
                        toast.error("Invalid image URL");
                        setImageUrl("");
                      }}
                    />
                    <span className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-[200px]">
                      {imageUrl}
                    </span>
                    <button
                      type="button"
                      onClick={() => setImageUrl("")}
                      className="text-xs text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Email */}
              <TextField isRequired name="email" type="email">
                <Label>Email</Label>
                <Input placeholder="john@example.com" variant="secondary" />
                <FieldError />
              </TextField>

              {/* Password */}
              <TextField isRequired name="password" type="password">
                <Label>Password</Label>
                <Input placeholder="Password" variant="secondary" />
                <FieldError />
              </TextField>

              {/* Role */}
              <Select isRequired name="role" placeholder="Select one">
                <Label>Signup As</Label>
                <Select.Trigger>
                  <Select.Value />
                  <Select.Indicator />
                </Select.Trigger>
                <Select.Popover>
                  <ListBox>
                    <ListBox.Item id="user" textValue="user">
                      User
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  </ListBox>
                </Select.Popover>
              </Select>

            </Fieldset.Group>

            <div className='w-full'>
              <Button type="submit" className="w-full">
                Signup
              </Button>
            </div>


            <div>
              {/* Divider */}
              <div className="flex items-center gap-3 my-5">
                <div className="h-px flex-1 bg-gray-700/40"></div>
                <span className="text-xs text-gray-400">Or continue with</span>
                <div className="h-px flex-1 bg-gray-700/40"></div>
              </div>

              {/* Google Button */}

              <button
                onClick={handleGoogleSignIn}
                type="button"
                className="w-full flex items-center justify-center gap-2 rounded-full border border-gray-700/50 py-3 text-sm font-medium hover:bg-gray-200 transition"
              >
                {/* Google Icon */}
                <FcGoogle />
                Sign up with Google
              </button>



              {/* Login Link */}
              <p className="text-center text-sm text-gray-400 mt-5">
                Already have an account?{" "}
                <a
                  href="/signin"
                  className="text-purple-600 hover:text-purple-800 font-medium transition"
                >
                  Sign In
                </a>
              </p>
            </div>
          </Fieldset>
        </Form>
      </Surface>
    </div>
  );
};

export default SignUpPage;