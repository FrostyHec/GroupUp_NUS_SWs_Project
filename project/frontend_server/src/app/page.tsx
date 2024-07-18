'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from "next-client-cookies";

const HomePage = () => {
  const router = useRouter();
  const cookies = useCookies();

  useEffect(() => {
    // 获取 token
    const token = cookies.get('token');
    console.log('token', token);
    // 根据是否有 token 进行重定向
    if (token && token !== 'undefined') {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router, cookies]);

  return (
    <div>
      <h1>Home Page</h1>
    </div>
  ); // 页面加载时无需显示内容，因为会立即重定向
};

export default HomePage;
