import React from 'react'
import useAxiosGet from '../hooks/useAxiosGet'
import Card from '../Components/Card'
import {Grid} from '@mui/material'

export default function Admin() {
    const { data, loading, error } = useAxiosGet('/admin')
    return (<>
        {loading ? <div>Loading...</div> :  <Grid container spacing={3}>
            {data.map((item,i) => <Grid item xs={12} sm={6} md={4} key={i}>
            <Card book={item} id={i} /> </Grid>)}
        </Grid>}</>
    )
}
