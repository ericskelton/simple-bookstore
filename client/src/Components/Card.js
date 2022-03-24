import react from 'react'
import {Paper, Avatar, Box} from "@mui/material"

const Card = props => {
    const book = props.book
    const onClick = props.onClick
    return (
      <Paper>
        <Box onClick={onClick} p={2}>
        <Avatar src={book?.image}/>
          <h1>{book?.title}</h1>
          <p>{book?.subtitle}</p>
        </Box>
      </Paper>
    );
  }

  export default Card;