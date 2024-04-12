import { getPlaylistById } from '@/lib/dummyData';
import { getRandomElementFromArray } from '@/lib/utils';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import HeaderBgChanger from '@/components/HeaderBgChanger';
import PlayListHead from '@/components/PlayListHead';
import PagePadding from '@/components/PagePadding';
import SongCardRowExpand from '@/components/SongCardRowExpand';

interface PlayListPageProps {
  searchParams: {
    list:string;
  };
}

const page = async (props: PlayListPageProps) => {
  const playlist = await getPlaylistById(Number(props.searchParams.list));

  if(!playlist) permanentRedirect("/");

  const imageSrc = getRandomElementFromArray(playlist.songList)?.imageSrc;

  return (
    <PagePadding>
      <HeaderBgChanger imageSrc={imageSrc} />
      <div className='mt-12'></div>
      <PlayListHead playlist={playlist} />
      <div className='mt-12'></div>
      <section className=' flex flex-col gap-2'>
        {
          playlist.songList.map((song, idx) => {
            return (
              <SongCardRowExpand song={song} key={idx} />
            )
          })
        }
      </section>
    </PagePadding>
  )
}

export default page