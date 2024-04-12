import React from 'react';
import Category from './components/Category';
import PagePadding from '@/components/PagePadding';
import PlayListCarousel from '@/components/PlayListCarousel'
import { dummyPlaylistArray } from '@/lib/dummyData';
import UserIcon from '@/components/UserIcon';


const page = async () => {

  const dummyPlaylistArray1 = [...dummyPlaylistArray];
  const dummyPlaylistArray2 = [...dummyPlaylistArray];
  const dummyPlaylistArray3 = [...dummyPlaylistArray];
  const dummyPlaylistArray4 = [...dummyPlaylistArray];

  return (
    <PagePadding>
      <div className='min-h-[600px]'>
        <div className='my-9'></div>
        <Category />
        <div className='my-12'></div>
        <PlayListCarousel
          playListArray={[...dummyPlaylistArray1]}
          Thumbnail={
            <div className='w-[56px] h-[56px]'>
              <UserIcon size={"lg"}/>
            </div>
          }
          title="다시 듣기"
          subTitle='오감자'
        />
        <div className='mt-20'></div>
        <PlayListCarousel
          playListArray={[...dummyPlaylistArray2]}
          title='케이시 - Full Bloom'
          subTitle='새로운 앨범'
        />
        <div className='mt-20'></div>
        <PlayListCarousel
          playListArray={[...dummyPlaylistArray3]}
          title='커뮤니티 제공'
        />
        <div className='mt-20'></div>
        <PlayListCarousel
          playListArray={[...dummyPlaylistArray4]}
          title='커버 및 리믹스'
        />
      </div>
    </PagePadding>
  )
}

export default page