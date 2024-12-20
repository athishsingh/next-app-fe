'use client'
import React, { useEffect } from 'react'
import { useRouter } from "nextjs-toploader/app";

const page = () => {
    const router = useRouter();
    useEffect(() => {
        router.push('/projects/active-tasks');
    }, []);
    return null;
}

export default page