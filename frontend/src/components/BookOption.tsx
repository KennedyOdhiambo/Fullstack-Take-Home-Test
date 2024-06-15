import { Add, Remove } from '@mui/icons-material'
import { Avatar, Box, IconButton, Typography } from '@mui/material'

type BookOptionProps = {
   coverPhotoURL: string
   bookTitle: string
   bookAuthor: string
   selected: boolean
   onSelect: () => void
}

export default function BookOption(props: BookOptionProps) {
   const { bookAuthor, bookTitle, coverPhotoURL, onSelect, selected } = props
   return (
      <Box
         component="li"
         onClick={onSelect}
         display="flex"
         sx={{
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingX: '1rem',
            paddingY: '0.5rem',
            '&:hover': {
               backgroundColor: 'rgba(0, 0, 0, 0.05)',
               cursor: 'pointer',
            },
         }}
      >
         <Box display="flex" flexDirection="row" alignItems="center">
            <Avatar src={coverPhotoURL} sx={{ marginRight: 2 }} />
            <Box>
               <Typography variant="body1">{bookTitle}</Typography>
               <Typography variant="body2" color="textSecondary">
                  {bookAuthor}
               </Typography>
            </Box>
         </Box>
         <IconButton>{selected ? <Remove /> : <Add />}</IconButton>
      </Box>
   )
}
