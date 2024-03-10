import './index.css'

const CompanyLife = props => {
  const {life} = props
  const {imageUrl, description} = life
  return (
    <>
      <div className="CompanyLife">
        <div className="company-feature-container">
          <h1 className="company-life-heading"> Life at Company </h1>
          <div className="company-life-image-mobile">
            <img
              src={imageUrl}
              className="company-life-image"
              alt="life at company"
            />
          </div>
          <p className="company-life-description"> {description} </p>
        </div>
        <div className="company-life-image-desktop">
          <img
            src={imageUrl}
            className="company-life-image"
            alt="life at company"
          />
        </div>
      </div>
    </>
  )
}
export default CompanyLife
