import { ICorruptionsInfo } from "../api";
import Card from "./card";
import { format as ts } from 'timeago.js'

interface Props {
    trait: string
    corruptions: ICorruptionsInfo[]
    lastUpdate: string
  }

const TraitPage = ({ trait, corruptions, lastUpdate }: Props) => {
    return (
      <div className="py-3 md:pb-0 font-mono flex flex-col justify-center items-center gap-4 pt-10 md:w-screen">
        <h1 style={{textTransform: "capitalize"}} className="text-lg md:text-3xl">{trait}</h1>
        <div className="text-center max-w-screen-md md:leading-loose">
          <p className="md:text-xl">
            There are {corruptions.length} corruptions for sale with {trait.toUpperCase()} deviation.
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
  
  export default TraitPage;