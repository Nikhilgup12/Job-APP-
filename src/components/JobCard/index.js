import {Link} from 'react-router-dom'
import {FaStar, FaBriefcase} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'
// import {} from 'react-icons/fa'
import './index.css'

const JobCard = props => {
  const {job} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    packagePerAnnum,
    location,
    rating,
    title,
    id,
  } = job
  return (
    <>
      <Link to={`/jobs/${id}`}>
        <li className="job-card-container">
          <div className="job-logo-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="company logo"
            />
            <div className="title-container">
              <h1 className="title"> {title} </h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating"> {rating} </p>
              </div>
            </div>
          </div>
          <div className="job-description-container">
            <div className="company-user-type">
              <div className="company-location">
                <IoLocation className="location-icon" />
                <p className="company-location"> {location} </p>
              </div>
              <div className="company-employmentType">
                <FaBriefcase className="job-icon" />
                <p className="job-type"> {employmentType} </p>
              </div>
            </div>
            <div>
              <p className="job-package"> {packagePerAnnum} </p>
            </div>
          </div>
          <hr className="hr-line" />
          <p className="job-description"> Description </p>
          <p className="para"> {jobDescription} </p>
        </li>
      </Link>
    </>
  )
}

export default JobCard
