
"use client";

import { supabaseClient } from "@/supabase";
import { Input } from "@base-ui/react";
import { useState } from "react";

export default function Home() {
    const [file, setFile] = useState(null);
    const supabase = supabaseClient();

    const handleFile = async (e) => {
        const selectedFile = e.target.files[0];

        console.log(selectedFile);
        setFile(e.target.file);

        const response = await supabase.storage
            .from("post-Insta")
            .upload(`images/${e.target.files[0].name}`,e.target.files[0]);

        console.log(response, "response");
    };

    console.log(file);

    return (
        <div>
            <Input type="file" onChange={(e) => handleFile(e)} />
        </div>
    );
}
