import { useRights } from "../context/UserRightsContext"

export default function RightsGuard({ rightCode, children }) {
  const { hasRight, loadingRights } = useRights()

  if (loadingRights) return null
  if (!hasRight(rightCode)) return null

  return children
}