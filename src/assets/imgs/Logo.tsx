import { useNavigate } from 'react-router-dom'

export function Logo() {
  const navigate = useNavigate()
  return (
    <section className="logo" onClick={() => navigate(`/`)}>
      <span>T</span>
    </section>
  )
}
