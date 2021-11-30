import { ICorruptionsInfo, fetchCorruptions } from '../api'
import ApotheosisIDs from '../data/apotheosis-ids.json';
import { format as ts } from 'timeago.js'

export async function getStaticProps() {
  const data = await fetchCorruptions(ApotheosisIDs)
  return {
    props: {
      corruptions: data.corruptions,
      lastUpdate: data.lastUpdate,
    },
    revalidate: 300,
  }
}

interface Props {
  corruptions: ICorruptionsInfo[]
  lastUpdate: string
}

const Card = ({ corruption }: { corruption: ICorruptionsInfo }) => {
  return (
    <a href={corruption.url} target="_blank">
      <div className="m-auto pb-4 mb-8 flex flex-col justify-center items-center gap-2 p-4 md:m-4 transform hover:scale-105 transition-all bg-black w-full md:w-96">
        <img src={corruption.image} alt="" width="350" height="350" />
        <div className="text-center">
          <p className="text-lg">#{corruption.id}</p>
          <p>{corruption.price} ETH</p>
        </div>
      </div>
    </a>
  )
}

const IndexPage = ({ corruptions, lastUpdate }: Props) => {
  return (
    <div className="py-3 md:pb-0 font-mono flex flex-col justify-center items-center gap-4 pt-10 md:w-screen">
      <h1 className="text-lg md:text-3xl">Apotheosis</h1>
      <div className="text-center max-w-screen-md md:leading-loose">
        <p className="md:text-xl">
          There are {corruptions.length} corruptions for sale with APOTHEOSIS.
        </p>
        <p className="md:text-xl">
          The floor price is {corruptions[0].price} ETH.
        </p>
        <p className="md:text-lg pt-2">
          Site by{' '}
          <a
            target="_blank"
            href="https://twitter.com/asier_bayon"
            className="underline"
          >
            @asier_bayon
          </a>
          . This site is{' '}
          <a
            target="_blank"
            className="underline"
            href="https://github.com/asierbayon/corruptions.market"
          >
            open-source
          </a>
          .
        </p>
        <p className="text-sm mv-4">Last updated {ts(lastUpdate)}</p>
      </div>
      <div className="grid md:grid-cols-2 pt-5">
        {corruptions.map((corruption) => {
          return <Card corruption={corruption} key={corruption.id} />
        })}
      </div>
    </div>
  )
}

export default IndexPage
