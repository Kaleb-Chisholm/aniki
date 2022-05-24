import { Box, Grid, GridItem } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'

export function AnimeList(props) {
  return (
    <Grid templateColumns='repeat(3, 1fr)' gap={5} m='50px'>
      {
        props.data.Page.media.map((item) => (
          <AnimeCard key={item.id} anime={item} />
        ))
      }
    </Grid>
  )
}
