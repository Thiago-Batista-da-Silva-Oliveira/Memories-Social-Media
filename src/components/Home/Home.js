import React,{ useState} from 'react'
import {Container, Grow, Grid, Paper, AppBar, TextField, Button} from '@material-ui/core'
import { useHistory, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {  getPostsBySearch } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'
import Pagination from '../Pagination'
import useStyles from './styles'


function useQuery(){
  return new URLSearchParams(useLocation().search)
}

function Home() {
 
    const dispatch = useDispatch()
    const [currentId, setCurrentId] = useState(null)
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')
    const classes = useStyles()
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])
    
    /*useEffect(() =>{
         dispatch(getPosts())
    }, [currentId,dispatch])
     */
    const handleKeyPress = (e) =>{
      if(e.key.code === 13){
          searchPost()
      }
    } 

    //const handleAdd = (tag) => setTags([...tags, tag])

    //const handleDelete = (tagToDelete) => setTags(tags.filter((tag) => tag !== tagToDelete))

    const searchPost = () =>{
      if(search.trim() || tags) {
          dispatch(getPostsBySearch({search, tags})) //: tags.join(',') can not pass an array through the url params
          history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${tags}`) //.join(',')
      } else{
        history.push('/')
      }
    }

   
    return (
        <Grow in>
        <Container maxWidth="xl" >
            <Grid className={classes.gridContainer}  container justify="space-between" alignItems="stretch" spacing={3}>
              <Grid item xs={12} sm={6} md={9} >
                <Posts setCurrentId={setCurrentId} />
              </Grid>
              <Grid   item xs={12} sm={6} md={3}>
                <AppBar className={classes.appBarSearch} position="static" color="inherit" >
                  <TextField name="search" onKeyPress={handleKeyPress} variant="outlined" label="Search Memories" fullWidth value={search} onChange={(e) => {setSearch(e.target.value)}}  />
                  <TextField
                style={{ margin: '10px 0' }}
                value={tags}
                label="Search Tags"
                variant="outlined"
                onChange={(e) => {setTags(e.target.value)}}
              />
                  <Button variant="contained" onClick={searchPost} color="primary" className={classes.searchButton}>
                         Search
                  </Button>
                </AppBar>
                  <Form setCurrentId={setCurrentId} currentId={currentId}/>
                  {(!searchQuery && !tags.length) && (
                      <Paper className={classes.pagination}  elevation={6}>
                      <Pagination page={page} />
                    </Paper>
                  )}
                  
              </Grid>
            </Grid>
        </Container>
    </Grow>
    )
}

export default Home
