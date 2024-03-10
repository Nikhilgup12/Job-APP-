import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import FilterGroup from '../FilterGroup'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiConstrant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllJobsList extends Component {
  state = {
    apiStatus: apiConstrant.initial,
    jobList: [],
    employmentList: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobList()
  }

  getJobList = async () => {
    // this.setState({apiStatus: apiConstrant.loading})

    const {employmentList, salaryRange, searchInput} = this.state

    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employmentList.join(
      ',',
    )}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedJobFormat = data.jobs.map(eachJobList => ({
        companyLogoUrl: eachJobList.company_logo_url,
        id: eachJobList.id,
        employmentType: eachJobList.employment_type,
        jobDescription: eachJobList.job_description,
        location: eachJobList.location,
        packagePerAnnum: eachJobList.package_per_annum,
        rating: eachJobList.rating,
        title: eachJobList.title,
      }))
      this.setState({
        jobList: updatedJobFormat,
        apiStatus: apiConstrant.success,
      })
    } else {
      this.setState({apiStatus: apiConstrant.failure})
    }
  }

  onSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchMobile = searchInput => {
    this.setState({searchInput})
  }

  onEnterSearch = event => {
    if (event.key === 'Enter') {
      this.getJobList()
    }
  }

  onSearchEnterMobile = () => {
    this.getJobList()
  }

  searchInput = () => {
    const {searchInput} = this.state
    return (
      <div className="search-container">
        <input
          type="search"
          value={searchInput}
          placeholder="search"
          className="search-input"
          onChange={this.onSearchInput}
          onKeyDown={this.onEnterSearch}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-icon-container"
        >
          <BsSearch className="search-icon" aria-label="close" />
        </button>
      </div>
    )
  }

  onClickRetry = () => {
    this.getJobList()
  }

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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

  renderProductsListView = () => {
    const {jobList} = this.state
    return (
      <>
        <div className="all-jobs-list-container">
          {this.searchInput()}
          {jobList.length === 0 ? (
            <div className="no-job-container">
              <div>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
                  className="no-job-image"
                  alt="no jobs"
                />
                <h1 className="no-job-para"> No Jobs Found </h1>
                <p className="no-job-disc">
                  We could not find any jobs. Try other filters.
                </p>
              </div>
            </div>
          ) : (
            <ul className="job-list-container">
              {jobList.map(job => (
                <JobCard job={job} key={job.id} />
              ))}
            </ul>
          )}
        </div>
      </>
    )
  }

  onClickEmploy = employ => {
    const {employmentList} = this.state
    const employActive = employ
    const isCheck = employmentList.includes(employActive)
    if (isCheck) {
      // If checkbox is unchecked, remove the ID from the list
      this.setState(
        prevState => ({
          employmentList: prevState.employmentList.filter(
            id => id !== employActive,
          ),
        }),
        () => {
          this.getJobList()
        },
      )
    } else {
      // If checkbox is checked, add the ID to the list
      this.setState(
        prevState => ({
          employmentList: [...prevState.employmentList, employActive],
        }),
        () => {
          this.getJobList()
        },
      )
    }
  }

  onclickSalary = salaryRange => {
    this.setState({salaryRange}, this.getJobList)
  }

  renderAllProducts = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiConstrant.success:
        return this.renderProductsListView()
      case apiConstrant.failure:
        return this.renderFailureView()
      case apiConstrant.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <div className="jobs-main-container">
          <FilterGroup
            employmentTypesList={employmentTypesList}
            salaryRangesList={salaryRangesList}
            onClickEmploy={this.onClickEmploy}
            onclickSalary={this.onclickSalary}
            onClickSearchMobile={this.onClickSearchMobile}
            onSearchEnterMobile={this.onSearchEnterMobile}
          />
          {this.renderAllProducts()}
        </div>
      </>
    )
  }
}

export default AllJobsList
