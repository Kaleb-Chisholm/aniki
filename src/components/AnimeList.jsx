import { Box, Grid, GridItem } from '@chakra-ui/react'
import { AnimeCard } from './AnimeCard'

export function AnimeList(props) {
  return (
    <Grid mr='5px' templateColumns='repeat(5, 1fr)' gap={5}>
      {
        props.data.map((anime) => (
          <AnimeCard key={anime.id} anime={anime.attributes} />
        ))
      }
    </Grid>
  )
}
