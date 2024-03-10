import './index.css'

const SkillCard = props => {
  const {skill} = props
  const {imageUrl, name} = skill
  return (
    <>
      <li className="skill-item">
        <img src={imageUrl} className="skill-image" alt={` skills ${name}`} />
        <p className="skill-name">{name} </p>
      </li>
    </>
  )
}

export default SkillCard
