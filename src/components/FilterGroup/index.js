import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaSearch} from 'react-icons/fa'
import './index.css'

const apiConstrant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class FilterGroup extends Component {
  state = {userList: {}, apiStatus: 'INITIAL'}

  componentDidMount() {
    this.getUserList()
  }

  onRetry = () => {
    this.getUserList()
  }

  getUserList = async () => {
    this.setState({apiStatus: apiConstrant.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const formatedProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      this.setState({
        userList: formatedProfile,
        apiStatus: apiConstrant.success,
      })
    } else {
      this.setState({apiStatus: apiConstrant.failure})
    }
  }

  renderProfile = () => {
    const {userList} = this.state
    const {name, profileImageUrl, shortBio} = userList
    return (
      <>
        <div className="user-profile-container">
          <img src={profileImageUrl} className="profile-logo" alt="profile" />
          <h1 className="user-name"> {name} </h1>
          <p className="user-bio"> {shortBio} </p>
        </div>
        <hr className="hr-line" />
      </>
    )
  }

  renderInProgress = () => (
    <div className="user-retry-container">
      <button className="user-retry-btn" onClick={this.onRetry} type="button">
        Retry
      </button>
    </div>
  )

  rednerLoadingView = () => (
    <div className="user-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderuserProfile = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrant.success:
        return this.renderProfile()
      case apiConstrant.failure:
        return this.renderInProgress()
      case apiConstrant.loading:
        return this.rednerLoadingView()
      default:
        return null
    }
  }

  emloyList = event => {
    const {onClickEmploy} = this.props
    onClickEmploy(event.target.id)
  }

  salaryRange = event => {
    const {onclickSalary} = this.props
    onclickSalary(event.target.id)
  }

  renderTypeEmployment = () => {
    const {employmentTypesList} = this.props
    return (
      <>
        <div className="employment-container">
          <h1 className="employment-type-heading"> Type of Employment </h1>
          <ul className="employment-list">
            {employmentTypesList.map(each => (
              <li className="employment-item">
                <input
                  type="checkbox"
                  id={each.employmentTypeId}
                  value={each.employmentTypeId}
                  onChange={this.emloyList}
                />
                <label
                  htmlFor={each.employmentTypeId}
                  className="employment-label"
                >
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
          <hr className="hr-line" />
        </div>
      </>
    )
  }

  renderSalaryRange = () => {
    const {salaryRangesList} = this.props
    return (
      <>
        <div className="employment-container">
          <h1 className="employment-type-heading"> Salary Range </h1>
          <ul className="employment-list">
            {salaryRangesList.map(each => (
              <li className="employment-item">
                <input
                  type="radio"
                  id={each.salaryRangeId}
                  value={each.salaryRangeId}
                  name="name"
                  onChange={this.salaryRange}
                />
                <label
                  htmlFor={each.salaryRangeId}
                  className="employment-label"
                >
                  {each.label}
                </label>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  onSearchMobile = event => {
    const {onClickSearchMobile} = this.props
    onClickSearchMobile(event.target.value)
  }

  onEnterMobile = event => {
    const {onSearchEnterMobile} = this.props
    if (event.key === 'Enter') {
      onSearchEnterMobile()
    }
  }

  renderInputMobile = () => (
    <div className="search-container-mobile">
      <input
        type="search"
        placeholder="search"
        className="search-input"
        onChange={this.onSearchMobile}
        onKeyDown={this.onEnterMobile}
      />
      <div className="search-icon-container">
        <FaSearch className="search-icon" />
      </div>
    </div>
  )

  render() {
    return (
      <>
        <div className="filter-container">
          {this.renderInputMobile()}
          {this.renderuserProfile()}
          {this.renderTypeEmployment()}
          {this.renderSalaryRange()}
        </div>
      </>
    )
  }
}

export default FilterGroup
