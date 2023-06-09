// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { CircularProgress } from '@mui/material';
import SongCard from './components/SongCard'
import { Song, NewSong } from './types/Song.ts'
// import { useState } from 'react';
// import ImageUpload from './components/ImageComponents/ImageUpload.tsx';
import Form from './components/Form.tsx';
// import { getSongs } from './services/songService.ts';
import { useQueryClient, useQuery } from 'react-query'
import { useGetSongs } from './hooks/useSongs.ts'

const newSong: NewSong = {
  artist: "",
  title: "",
  length: "",
  // image: ""
}

export default function App() {
  const queryClient = useQueryClient()
  // const { data: songs, status, isError } = useQuery(['songs'], getSongs)
  const { data: songs = [], status } = useGetSongs()

  const setUpdatedSong = (updatedState: Song) => {
    // const _songs: Song[] = queryClient.getQueryData(['songs']) || []
    const newArray = [...songs, updatedState]
    queryClient.setQueryData(['songs'], newArray)
  };

  const inputValues = [
    'title',
    'artist',
    'length',
  ]

  return (
    <div className='m-3'>
      <Form newSong={newSong} setUpdatedSong={setUpdatedSong} inputValues={inputValues} imageUpload={true}/>
      <div className='flex flex-col items-center w-100 h-fit'> 
        {(status === 'success' && songs.map((song) => (<SongCard {...song} />))) || <CircularProgress />}
      </div>
    </div>
  )
}

