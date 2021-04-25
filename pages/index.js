import { createClient } from 'contentful'
import BreedCard from '../components/BreedCard'

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_KEY,
  })

  const res = await client.getEntries({ content_type: 'breed' })

  return {
    props: {
      breeds: res.items,
    },
  }
}

export default function Breeds({ breeds }) {
  console.log(breeds)
  return (
    <div className="recipe-list">
      {breeds.map((breed) => (
        <BreedCard key={breed.sys.id} breed={breed} />
      ))}

      <style jsx>{`
        .recipe-list {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 20px 60px;
        }
      `}</style>
    </div>
  )
}
