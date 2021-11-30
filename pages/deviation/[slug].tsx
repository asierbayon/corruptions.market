import { fetchCorruptions } from '../../api'
import { CorruptionsIds } from '../../data'
import TraitPage from '../../components/trait-page'
import { useRouter } from 'next/router'
import { CorruptionTypes } from '../../utils/corruptionTypes'
import { useEffect, useState } from 'react'

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 300,
  }
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: CorruptionTypes.APOTHEOSIS } },
      { params: { slug: CorruptionTypes.AUTOMATION } },
      { params: { slug: CorruptionTypes.FENESTELLA } },
      { params: { slug: CorruptionTypes.LACERATION } },
      { params: { slug: CorruptionTypes.SACROSANCT } },
      { params: { slug: CorruptionTypes.STRONGHOLD } },
      { params: { slug: CorruptionTypes.VIVICATION } },
      { params: { slug: CorruptionTypes.WILTEDROSE } },
    ],
    fallback: false,
  }
}

export default function IndexPage() {
  const router = useRouter()
  const { slug } = router.query

  let deviation;
  const [corruptions, setCorruptions] = useState([])
  const [lastUpdate, setLastUpdate] = useState('')

  switch (slug) {
    case CorruptionTypes.WILTEDROSE:
      deviation = CorruptionsIds.WiltedroseIds
      break
    case CorruptionTypes.APOTHEOSIS:
      deviation = CorruptionsIds.ApotheosisIds
      break
    case CorruptionTypes.AUTOMATION:
      deviation = CorruptionsIds.AutomationIds
      break
    case CorruptionTypes.FENESTELLA:
      deviation = CorruptionsIds.FenestellaIds
      break
    case CorruptionTypes.LACERATION:
      deviation = CorruptionsIds.LacerationIds
      break
    case CorruptionTypes.SACROSANCT:
      deviation = CorruptionsIds.SacrosanctIds
      break
    case CorruptionTypes.STRONGHOLD:
      deviation = CorruptionsIds.StrongholdIds
      break
    case CorruptionTypes.VIVICATION:
      deviation = CorruptionsIds.VivicationIds
      break
    case CorruptionTypes.WILTEDROSE:
      deviation = CorruptionsIds.WiltedroseIds
      break
    default:
      break
  }

  useEffect(() => {
    fetchCorruptions(deviation).then((data) => {
      setCorruptions(data.corruptions)
      setLastUpdate(data.lastUpdate)
    })
  }, [])

  if (corruptions.length > 0 && slug.length > 0) {
    return (
      <TraitPage
        trait={Array.isArray(slug) ? slug[0] : slug}
        corruptions={corruptions}
        lastUpdate={lastUpdate}
      />
    )
  }
  return <p>Loading...</p>
}
