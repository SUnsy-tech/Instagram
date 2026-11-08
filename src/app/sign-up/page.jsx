
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/toast";

const Page = () => {
    const supabase = supabaseClient();

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
        username: "",
    });

    const [loading, setLoading] = useState(false);

    const handleUserInfo = (e) => {
        const { name, value } = e.target;

        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const signup = async () => {
        if (!userInfo.email || !userInfo.password || !userInfo.username) {
            toast.add({
                title: "Missing information",
                description: "Please fill in all fields.",
                type: "error",
            });
            return;
        }

        setLoading(true);

        try {
            const { data, error } = await supabase.auth.signUp({
                email: userInfo.email,
                password: userInfo.password,
            });

            if (error) throw error;

            if (!data.user) {
                throw new Error("User registration failed.");
            }

            const { error: profileError } = await supabase
                .from("profile")
                .insert({
                    id: data.user.id,
                    username: userInfo.username,
                });

            if (profileError) throw profileError;

            toast.add({
                title: "Welcome!",
                description: "Your account has been created.",
                type: "success",
            });

        } catch (error) {
            toast.add({
                title: "Sign up failed",
                description: error.message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8">
            <div className="w-full max-w-[350px]">
                <div className="border border-[#dbdbdb] px-10 pt-9 pb-6 text-center">
                    <div className="flex flex-col items-center mb-8">
                    <div className="w-[65px] h-[65px] rounded-[19px] bg-gradient-to-tr from-[#ffb347] via-[#ff3d77] to-[#833ab4] flex items-center justify-center">
                      <div className="w-[43px] h-[43px] rounded-[13px] border-[3px] border-white flex items-center justify-center relative">
                        <div className="w-[19px] h-[19px] rounded-full border-[3px] border-white" />
                        <div className="absolute w-[5px] h-[5px] rounded-full bg-white top-[5px] right-[5px]" />
                      </div>
                    </div>
                    <h1 className="text-[43px] font-bold tracking-[-2px] mt-3">
                    Instagram
                    </h1>
                  </div>

                    <p className="text-[#737373] font-semibold text-base mb-5 leading-5">
                        Sign up to see photos and videos from your friends.
                    </p>

                    {/* Facebook button */}
                    <button
                        type="button"
                        className="w-full h-[32px] bg-[#0095f6] hover:bg-[#1877f2] rounded-[8px] text-white text-sm font-semibold flex items-center justify-center gap-2"
                    >
                        Log in with Facebook
                    </button>

                    {/* OR */}
                    <div className="flex items-center gap-4 my-5">
                        <div className="h-px bg-[#dbdbdb] flex-1" />
                        <span className="text-[13px] font-semibold text-[#737373]">
                            OR
                        </span>
                        <div className="h-px bg-[#dbdbdb] flex-1" />
                    </div>

                    {/* Inputs */}
                    <div className="flex flex-col gap-1.5">

                        <Input
                            name="email"
                            type="email"
                            placeholder="Mobile Number or Email"
                            value={userInfo.email}
                            onChange={handleUserInfo}
                            className="h-[38px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] text-[12px] shadow-none focus-visible:ring-0"
                        />

                        <Input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={userInfo.username}
                            onChange={handleUserInfo}
                            className="h-[38px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] text-[12px] shadow-none focus-visible:ring-0"
                        />

                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={userInfo.password}
                            onChange={handleUserInfo}
                            className="h-[38px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] text-[12px] shadow-none focus-visible:ring-0"
                        />

                    </div>

                    {/* Description */}
                    <p className="text-[11px] text-[#737373] leading-4 mt-5 mb-4">
                        People who use our service may have uploaded your
                        contact information. Learn More.
                    </p>

                    <p className="text-[11px] text-[#737373] leading-4 mb-5">
                        By signing up, you agree to our Terms, Privacy Policy
                        and Cookies Policy.
                    </p>

                    {/* Signup */}
                    <Button
                        onClick={signup}
                        disabled={loading}
                        className="w-full h-[32px] rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm"
                    >
                        {loading ? "Signing up..." : "Sign up"}
                    </Button>

                </div>

                {/* Login panel */}
                <div className="border border-[#dbdbdb] mt-3 py-5 text-center">
                    <p className="text-sm text-[#262626]">
                        Have an account?{" "}
                        <Link
                            href="/login"
                            className="text-[#0095f6] font-semibold"
                        >
                            Log in
                        </Link>
                    </p>
                </div>

                {/* Download */}
                <div className="text-center mt-5">
                    <p className="text-sm text-[#262626]">
                        Get the app.
                    </p>

                    <div className="flex justify-center gap-2 mt-4">
                        <div className="bg-black text-white rounded-md px-4 py-2 text-left min-w-[130px]">
                            <p className="text-[8px]">Download on the</p>
                            <p className="text-sm font-semibold">App Store</p>
                        </div>

                        <div className="bg-black text-white rounded-md px-4 py-2 text-left min-w-[130px]">
                            <p className="text-[8px]">GET IT ON</p>
                            <p className="text-sm font-semibold">Google Play</p>
                        </div>
                    </div>
                </div>

            </div>

            {/* Footer */}
            <footer className="mt-14 mb-5 text-center max-w-[900px]">
                <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-[#737373]">
                    <span>Meta</span>
                    <span>About</span>
                    <span>Blog</span>
                    <span>Jobs</span>
                    <span>Help</span>
                    <span>API</span>
                    <span>Privacy</span>
                    <span>Terms</span>
                    <span>Locations</span>
                    <span>Language</span>
                </div>

                <p className="text-xs text-[#737373] mt-5">
                    © 2026 InstaClass · Educational UI mockup
                </p>
            </footer>

        </main>
    );
};

export default Page;

