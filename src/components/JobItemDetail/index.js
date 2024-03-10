import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaBriefcase, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocation} from 'react-icons/io5'

// import {} from 'react-icons/fa'
// import {} from 'react-icons/fa'

import SkillCard from '../SkillCard'
import CompanyLife from '../CompanyLife'
import SimilarJobs from '../SimilarJobs'
import Header from '../Header'
import './index.css'

const apiStatusConstrant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetail extends Component {
  state = {jobDetail: {}, apiStatus: apiStatusConstrant.initial}

  componentDidMount() {
    this.getJobDetails()
  }

  getFormtaedSimilarProduct = each => ({
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    jobDescription: each.job_description,
    id: each.id,
    location: each.location,
    rating: each.rating,
    title: each.title,
  })

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstrant.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        skills: data.job_details.skills.map(each => ({
          imageUrl: each.image_url,
          name: each.name,
        })),
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
        similarJobs: data.similar_jobs.map(each =>
          this.getFormtaedSimilarProduct(each),
        ),
      }

      this.setState({
        jobDetail: formatedJobDetails,
        apiStatus: apiStatusConstrant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstrant.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderFailureView = () => (
    <div className="products-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="products-failure-img"
        alt="failure view"
      />
      <h1 className="product-failure-heading-text">
        Oops! Something Went Wrong
      </h1>
      <p className="products-failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="failure-btn" onClick={this.onClickRetry} type="button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSkill = () => {
    const {jobDetail} = this.state
    const {skills} = jobDetail
    return (
      <div className="skill-container">
        <h1 className="skill-heading"> Skills </h1>
        <ul className="skill-list">
          {skills.map(each => (
            <SkillCard skill={each} />
          ))}
        </ul>
      </div>
    )
  }

  renderCompanyLife = () => {
    const {jobDetail} = this.state
    return <CompanyLife life={jobDetail} />
  }

  renderSimilarJobs = () => {
    const {jobDetail} = this.state
    const {similarJobs} = jobDetail
    return (
      <div className="similar_jobs-container">
        <h1 className="similar_jobs-heading"> Similar Jobs </h1>
        <ul className="similar_jobs-list">
          {similarJobs.map(each => (
            <SimilarJobs similarJobs={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderSuccessView = () => {
    const {jobDetail} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetail
    return (
      <div className="job-detail-main">
        <div className="job-detail-container">
          <div className="job-logo-container">
            <img
              src={companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
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
          <div className="company-description-url-container">
            <p className="job-description"> Description </p>
            <a href={companyWebsiteUrl} className="company-url-link">
              Visit <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>
          <p className="para"> {jobDescription} </p>
          {this.renderSkill()}
          {this.renderCompanyLife()}
        </div>
        {this.renderSimilarJobs()}
      </div>
    )
  }

  apiStatusCheck = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstrant.success:
        return this.renderSuccessView()
      case apiStatusConstrant.failure:
        return this.renderFailureView()
      case apiStatusConstrant.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-detail-main-container">{this.apiStatusCheck()}</div>
      </>
    )
  }
}

export default JobItemDetail
