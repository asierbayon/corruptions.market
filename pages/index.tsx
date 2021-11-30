import { CorruptionTypes } from '../utils/corruptionTypes'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <Link href="/">
        <p className="m-4 text-2xl font-bold cursor-pointer">{'(8)'}</p>
      </Link>
      <div className="py-3 md:pb-0 font-mono flex flex-col justify-center items-center gap-4 pt-10 md:w-screen">
        <h1 className="text-lg md:text-3xl">{'Corruption(s*)'}</h1>
        <div className="text-center max-w-screen-md md:leading-loose">
          <p className="md:text-xl">Unknown</p>
          <p className="md:text-xl">
            EXPERIMENTAL ART. NO ROADMAP, NO UTILITY, AND ABSOLUTELY NO
            PROMISES.
          </p>
          <p className="md:text-lg pt-2">
            Site by{' '}
            <a
              target="_blank"
              href="https://twitter.com/asier_bayon"
              className="underline"
            >
              asierbayon.eth
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
          <p className="text-sm mv-4">Last updated</p>
        </div>
        <div className="grid md:grid-cols-2 pt-5">
          {Object.values(CorruptionTypes).map((corruption) => {
            return (
              <Link key={corruption} href={`/deviation/${corruption}`}>
                <div className="cursor-pointer m-auto pb-4 mb-8 flex flex-col justify-center items-center gap-2 p-4 md:m-4 transform hover:scale-105 w-full md:w-96">
                  <img
                    src={`/${corruption}.svg`}
                    alt=""
                    width="200"
                    height="200"
                  />
                  <div className="text-center">
                    <p className="text-lg">
                      {corruption}
                      {corruption[corruption.length - 1] === 's' ? '' : 's'}
                    </p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home
