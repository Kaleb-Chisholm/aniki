import { Box, Grid, GridItem } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'

export function AnimeList(props) {
  return (
    <Grid mr='5px' templateColumns='repeat(5, 1fr)' gap={5}>
      {
        // console.log(props.data.Page.media)
        props.data.Page.media.map((item) => (
          <AnimeCard key={item.id} anime={item} />
        ))
      }
    </Grid>
  )
}
