// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import { TextField, Box, Button, ThemeProvider, useTheme } from '@mui/material';
// import { Song, NewSong } from '../types/Song.ts'
import { NewSong } from '../types/Song.ts'
import { useState } from 'react';
// import ImageUpload from './ImageComponents/ImageUpload.tsx';
import { customTheme } from './theme.ts';
import { createSong } from '../services/songService.ts';
import { useMutation } from 'react-query'

// import ImageUpload from './components/ImageUpload.jsx';

// type Errors = { [K in keyof NewSong]?: string }
type Errors = {
  [key: string]: any;
}
type Touched = {
  [key: string]: any;
}

type Status = "idle" | "submitted";

export default function Form({
  inputValues,
  setUpdatedSong,
  newSong,
  // imageUpload,
}: { inputValues: string[], setUpdatedSong: any, newSong: NewSong, imageUpload: boolean }) {
  // const [songs, setSongs] = useState(initSongs)
  const [song, setSong] = useState(newSong as any)
  const [status, setStatus] = useState<Status>("idle")
  // const [image, setImage] = useState<null | string>(null);
  const [touched, setTouched] = useState<Touched>({})
  
  const songMutation = useMutation({
    // mutationFn: (_song: NewSong) => createSong(_song, image || ''), 
    mutationFn: (_song: NewSong) => createSong(_song), 
    onSuccess: (createdSong) => {
      console.log("createdSong: ", createdSong)
      setUpdatedSong(createdSong)
      // setImage(null)
      setSong(newSong)
      setTouched({})
      setStatus("idle")
    }
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSong({
      ...song, [e.target.id]: e.target.value
    })
  }

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const validateForm = () => {
    const errors: Errors = {}
    inputValues.map((key) => {
      if (!song[key]) {
        errors[key] = `${capitalizeFirstLetter(key)} is required`
      }
    })
    return errors
  }

  const errors = validateForm()

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitted")
    if (Object.keys(errors).length) {
      console.log("errors: ", errors)
      return
    }
    songMutation.mutate(song)
    // const updatedSongs: Song = {
    //   ...song,
    //   id: Math.floor(Math.random() * 1000),
    //   createdBy: 'admin',
    //   createdAt: new Date().toISOString(),
    //   updatedBy: 'admin',
    //   updatedAt: new Date().toISOString(),
    //   image: image ? image : ''
    // }
  }
  const outerTheme = useTheme();



  return (<>
    <ThemeProvider theme={customTheme(outerTheme)}>

      <form id="myForm" onSubmit={(e) => onSubmit(e)} className='flex flex-row items-center w-full gap-2'><div>{
        inputValues.map((key) => (
          <Box key={key}>
            <TextField 
              sx={{ input: { color: 'white' } }}
              // variant="filled"
              id={key}
              label={capitalizeFirstLetter(key)}
              value={song?.[key]}
              onChange={(e) => onChange(e)}
              error={
                (status == "submitted" || touched[key]) && Boolean(errors[key])
              }
              helperText={(status == "submitted" || touched[key]) && errors[key]}
              onBlur={() => setTouched({ ...touched, [key]: true })}
            />
          </Box>
        ))}</div>
        {/* { imageUpload && <ImageUpload setImage={setImage} image={image}/> } */}
        <Button type="submit" variant="contained">Add Song</Button>
      </form>
    </ThemeProvider>
  </>)
}
