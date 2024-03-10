import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="home-container">
      <div className="home-job-container">
        <h1 className="job-title"> Find The Job That Fits Your Life </h1>
        <p className="job-discription">
          Millions of people are searching for jobs. salary information, company
          reveiws. find the job that fit your abilities and potientials
        </p>
        <Link to="jobs">
          <button className="find-jobs-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default Home
