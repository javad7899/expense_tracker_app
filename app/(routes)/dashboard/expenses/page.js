"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Expenses = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/dashboard');
    }, [router]);

    return null; 
}

export default Expenses;
