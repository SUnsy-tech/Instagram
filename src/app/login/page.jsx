
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabaseClient } from "@/supabase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { toast } from "@/components/ui/toast";

const Page = () => {
    const router = useRouter();
    const supabase = supabaseClient();

    const [userInfo, setUserInfo] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const handleUserInfo = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const login = async () => {
        if (!userInfo.email || !userInfo.password) {
            toast.add({
                title: "Missing information",
                description: "Please enter your email and password.",
                type: "error",
            });
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: userInfo.email,
                password: userInfo.password,
            });

            if (error) throw error;

            toast.add({
                title: "Welcome back!",
                description: "Successfully logged in.",
                type: "success",
            });

            router.push("/");
        } catch (error) {
            toast.add({
                title: "Login failed",
                description: error.message,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-white flex flex-col items-center justify-center px-4">

            <div className="w-full max-w-[350px]">
                <div className="border border-[#dbdbdb] px-10 pt-9 pb-6 text-center">
                  <div className="flex flex-col items-center mb-8">
                    <div className="w-[65px] h-[65px] rounded-[19px] bg-gradient-to-tr from-[#ffb347] via-[#ff3d77] to-[#833ab4] flex items-center justify-center">
                      <div className="w-[43px] h-[43px] rounded-[13px] border-[3px] border-white flex items-center justify-center relative">
                        <div className="w-[19px] h-[19px] rounded-full border-[3px] border-white" />
                          <div className="absolute w-[5px] h-[5px] rounded-full bg-white top-[5px] right-[5px]" />
                          </div>
                        </div>
                        <h1
                        className="text-[43px] font-bold tracking-[-2px] mt-3"
    >
        Instagram
    </h1>
</div>
                    <div className="flex flex-col gap-1.5">
                        <Input
                            name="email"
                            type="email"
                            placeholder="Phone number, username, or email"
                            value={userInfo.email}
                            onChange={handleUserInfo}
                            className="h-[38px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] text-[12px] shadow-none focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                        <Input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={userInfo.password}
                            onChange={handleUserInfo}
                            className="h-[38px] rounded-[3px] border-[#dbdbdb] bg-[#fafafa] text-[12px] shadow-none focus-visible:ring-0 focus-visible:border-gray-400"
                        />
                        <Button
                            onClick={login}
                            disabled={loading}
                            className="h-[32px] mt-2 rounded-[8px] bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold text-sm"
                        >
                            {loading ? "Logging in..." : "Log in"}
                        </Button>
                    </div>
                    <div className="flex items-center gap-4 my-5">
                        <div className="h-px bg-[#dbdbdb] flex-1" />
                        <span className="text-[13px] font-semibold text-[#737373]">
                            OR
                        </span>
                        <div className="h-px bg-[#dbdbdb] flex-1" />
                    </div>

                    <button
                        type="button"
                        className="flex items-center justify-center gap-2 w-full text-[#385185] text-sm font-semibold"
                    >
                        Log in with Facebook
                    </button>
                    <div className="mt-5">
                        <Link
                            href="/forgot-password"
                            className="text-xs text-[#00376b]"
                        >
                            Forgot password?
                        </Link>
                    </div>
                </div>               
                <div className="border border-[#dbdbdb] mt-3 py-5 text-center">
                    <p className="text-sm text-[#262626]">
                        Don't have an account?{" "}
                        <Link
                            href="/sign-up"
                            className="text-[#0095f6] font-semibold"
                        >
                            Sign up
                        </Link>
                    </p>
                </div>

                {/* App download section */}
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
            <footer className="mt-16 mb-6 text-center max-w-[900px]">
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
