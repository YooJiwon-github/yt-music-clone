"use client"

import React from 'react';
import Image from 'next/image';
import { RxHamburgerMenu } from 'react-icons/rx';
import IconButton from '@/components/elements/IconButton'
import { useRouter } from 'next/navigation';
import { IoCloseOutline } from 'react-icons/io5';

const Logo = ({isInDrawer = false, onClickClose = () => {}}) => {

    const { push } = useRouter();

    const onClickLogo = () => {
        push("/");
    };

    const onClickMenu = () => {

    };


  return (
    <section className=' flex flex-row items-center gap-3'>
        {isInDrawer ? (
            <IconButton 
                icon={<IoCloseOutline size={30} />}
                onClickIcon={onClickClose}
            />
        ) : (
            <IconButton 
                icon={<RxHamburgerMenu size={24} />}
                onClickIcon={onClickMenu}
            />
        )}
        
        <div className=' cursor-pointer' onClick={onClickLogo}>
            <Image alt='logo' width={100} height={100} src={"/main-logo.svg"}/>
        </div>
    </section>
  )
}

export default Logo