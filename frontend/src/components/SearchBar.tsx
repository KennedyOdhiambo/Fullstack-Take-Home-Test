import TextField from "@mui/material/TextField"
import Autocomplete from "@mui/material/Autocomplete"
import { gql, useQuery } from "@apollo/client"
import { Container } from "@mui/material"

const getBooks = gql`
  query Books {
    books {
      author
      coverPhotoURL
      readingLevel
      title
    }
  }
`

type Book = {
  _typename: "Book"
  author: string
  coverPhotoURL: string
  readingLevel: string
  title: string
}

type BooksQuery = {
  books: Array<Book>
}

export default function SearchBar() {
  const { data } = useQuery<BooksQuery>(getBooks, {
    fetchPolicy: "no-cache",
  })

  const books = data?.books
  const searchBarOptions = books?.map((book) => ({
    bookTitle: book.title,
    author: book.author,
  }))

  return (
    <Container>
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={searchBarOptions ?? []}
        getOptionLabel={(options) => options.bookTitle}
        getOptionKey={(options) => `${options.author}${options.bookTitle}`}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Books" />}
      />
      <img src={""} alt="" />

      <div>
        {books?.map((book) => (
          <div>
            <img
              src={`../../public/assets/${book.coverPhotoURL}`}
              alt={book.title ?? ""}
            />
            <p>{book.coverPhotoURL}</p>
          </div>
        ))}
      </div>
    </Container>
  )
}
