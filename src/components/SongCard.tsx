import { Song } from '../types/Song.ts'
import Heart from '../assets/icons/Heart.tsx'
import SongMetadata from './SongMetadata.tsx'
import { prominent } from 'color.js'
import { useState, useEffect } from 'react'

export default function SongCard(song: Song) {
  console.log(song)
  const [color, setColor] = useState('gray')
  const getColor = async (image: string) => {
    const _color = await prominent(image, { amount: 1 })
    console.log(_color.toString())
    setColor(_color.toString())
  }

  useEffect(() => {
    console.log(song?.image)
    if (song?.image) getColor(song.image)
  }, [song?.image])

  return (
    <div className='flex flex-col p-3 m-3 bg-cover border-2 rounded-md h-fit w-80 bg-grey-100' style={{
      // backgroundImage: `url(${song.image})`, 
      // ref={imgRef},
      backgroundColor: `rgb(${color})`,
      // dropShadow: shadow
    }}>
      {/* <img style={{backgroundImage: `url(${song.image})`}} className='flex w-full h-full'/> */}
      <img src={song.image} className='flex w-full h-full rounded-md'/>
      <div className='flex items-center justify-between'>
        <h1 className='flex text-xl font-black'>{song.title}</h1>
        <div className='flex flex-row'>
          <p className='mt-1 text-center align-middle'>{song.length}</p>
          <Heart fill='green' stroke='black' />
        </div>
      </div>
      <div className='flex'>
        <h2 className='text-lg font-medium'>{song.artist}</h2>
      </div>
      <SongMetadata email={song.createdBy} date={song.createdAt} action='Created' />
      <SongMetadata email={song.updatedBy} date={song.updatedAt} action='Updated' />
      {/* <div>
        <p className='font-light'>{song.createAt} - {song.createdBy}</p>
        <p className='font-light'>{song.updatedAt} - {song.updatedBy}</p>
      </div> */}
      {/* <h2 className='font-medium'>{song.artist} - {<p>{song.length}</p>}</h2> */}
    </div>
  )
}
