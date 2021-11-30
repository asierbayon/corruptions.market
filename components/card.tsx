import { ICorruptionsInfo } from "../api"

export default function Card ({ corruption }: { corruption: ICorruptionsInfo }) {
    return (
      <a href={corruption.url} target="_blank">
        <div className="m-auto pb-4 mb-8 flex flex-col justify-center items-center gap-2 p-4 md:m-4 transform hover:scale-105 w-full md:w-96">
          <img src={corruption.image} alt="" width="200" height="200" />
          <div className="text-center">
            <p className="text-lg">#{corruption.id}</p>
            <p>{corruption.price} ETH</p>
          </div>
        </div>
      </a>
    )
  }