import './index.css'

import {FaStar} from 'react-icons/fa'

const SimilarJobs = props => {
  const {similarJobs} = props
  const {companyLogoUrl, jobDescription, rating, title} = similarJobs
  return (
    <li className="similarJobs-items">
      <div className="job-logo-container">
        <img
          src={companyLogoUrl}
          className="company-logo"
          alt="similar job company logo"
        />
        <div className="title-container">
          <h1 className="title"> {title} </h1>
          <div className="rating-container">
            <FaStar className="star-icon" />
            <p className="rating"> {rating} </p>
          </div>
        </div>
      </div>
      <p className="job-description"> Description </p>
      <p className="para"> {jobDescription} </p>
    </li>
  )
}
export default SimilarJobs
