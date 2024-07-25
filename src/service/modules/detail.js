import kxRequest from '../request'

export function getDetailInfos (houseId) {
  return kxRequest.get({
    url: "/detail/infos",
    params: {
      houseId
    }
  })
}
