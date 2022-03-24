import {useState, useEffect} from 'react';
import Toolbar from '../Components/ToolBar';
import {Grid,  Box, Paper, TextField, Avatar, Modal, Button, Typography} from '@mui/material'
import axios from 'axios'
import useAxiosGet from '../hooks/useAxiosGet'
import Card from '../Components/Card'



const OrderModal = props => {
  const {open, setOpen, book} = props
  const sendOrder =() => {
    setOpen(false)
    axios.post('/orders', book).then(res => {
      console.log(res)
    }
    )
  }
  return (
    <Modal open={open}>
      <Paper>
      <Box p={2}>
        <Typography variant="h6">
          Order Details
        </Typography>
        <Box p={2}>
          <Typography variant="body1">
            Book: {book && book.title}
          </Typography>
          </Box>
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Button onClick={sendOrder}>Confirm</Button>
      </Box></Paper>
    </Modal>)

}




function App() {
  const [query, setQuery] = useState('');
  const [bookIndex, setBookIndex] = useState(-1);
  const [openModal, setOpenModal] = useState(false);
  const {data, loading} = useAxiosGet( 'books/?q=' + query)
  const books = loading ? 'Loading...' : data && data.map((book, i) => <Grid item key={i}><Card book={{image: book.volumeInfo.imageLinks?.smallThumbnail, title: book.volumeInfo.title}} onClick={() =>{
    setBookIndex(i)
    setOpenModal(true)
  }} /></Grid>)
  
  return (
    <div >
    <div  style={{flexDirection: 'column', align: 'center',backgroundColor: "#EEEEEE", paddingTop: 25}}>
        <OrderModal open={openModal} setOpen={setOpenModal} book={data && {image: data[bookIndex]?.volumeInfo.imageLinks?.smallThumbnail, title: data[bookIndex]?.volumeInfo.title}}/>
        <Grid container spacing={3} direction="column">
          <Grid item>
          <Paper elevation={2}>
            
            <TextField
              id="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              label="Search"
              variant="standard"
              sx={{paddingBottom: 1, paddingHorizontal: 15, marginHorizontal: 15}}
            />
          </Paper>
          </Grid>
          {books}
      </Grid>
    </div></div>
  );
}

export default App;
