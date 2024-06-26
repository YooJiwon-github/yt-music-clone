"use client"

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import UserIcon from '@/components/UserIcon';
import PagePadding from '@/components/PagePadding';
import { FaChromecast } from 'react-icons/fa';
import { FiSearch } from 'react-icons/fi';
import { cn } from '@/lib/utils';
import useUIState from '@/hooks/useUIState';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import Logo from './elements/Logo';
import Navigator from './elements/Navigator';

const HeaderDrawer = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer direction="left" open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent className="w-[240px] h-full">
        {/* 로고 */}
        <div className='py-3'>
          <div className='px-3'>
            <Logo isInDrawer onClickClose={()=>{
              setIsOpen(false);
            }} />
          </div>
          <Navigator />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const Header = ({children}) => {
  
  const { headerImageSrc } = useUIState();
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const headRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = headRef?.current?.scrollTop;
      setIsScrolled(scrollValue !== 0);
      // 스크롤 위치를 업데이트합니다.
      setScrollY(window.scrollY);
    };

    const debouncedHandleScroll = debounce(handleScroll, 200); // 디바운싱 적용
    window.addEventListener('scroll', debouncedHandleScroll);

    headRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      headRef?.current?.removeEventListener("scroll", handleScroll);

      // 컴포넌트가 언마운트되면 이벤트 리스너를 제거합니다.
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []); // useEffect의 두 번째 매개변수로 빈 배열을 전달하여 한 번만 실행되도록 설정합니다.

  return (
    <header ref={headRef} className="relative overflow-y-auto w-full h-full">
      <section className='absolute top-0 w-full'>
        <div className='relative h-[400px] w-full'>
          <Image 
            alt='mediaItem'
            className='object-cover'
            fill
            src= {
              headerImageSrc || 
              "https://images.unsplash.com/photo-1707833558984-3293e794031c"} />
            <div className=" absolute h-[400px] top-0 bg-black opacity-40 w-full"></div>
            <div className=" absolute h-[400px] top-0 bg-gradient-to-t from-black w-full"></div>
        </div>
      </section>
      {/* search section */}
      <section className={
        cn('sticky top-0 left-0 z-10', isScrolled&&'bg-black')
      }>
        <PagePadding>
          <div className='h-[64px] flex flex-row justify-between items-center'>
          <article
              className="h-[42px] min-w-[480px] hidden lg:flex flex-row items-center
            bg-[rgba(0,0,0,0.14)] rounded-2xl px-[16px] gap-[16px] border border-neutral-500
            "
            >
              <div>
                <FiSearch size={24} />
              </div>
              <input
                className='h-full w-full bg-transparent'
                type='text'
                placeholder='노래, 앨범, 아티스트, 팟캐스트 검색'/>
            </article>
            <HeaderDrawer>
              <article className='lg:hidden'>
                <Logo />
              </article>
            </HeaderDrawer>

            <article className=' flex flex-row gap-6 items-center'>
              <FaChromecast size={26} />
              <UserIcon />
            </article>
          </div>
        </PagePadding>
      </section>
      <section className='relative'>
        {children}
      </section>
    </header>
  )
}

// 디바운싱 함수
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}


export default Header