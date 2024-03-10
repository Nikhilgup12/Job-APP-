import './index.css'

const NotFound = () => (
  <>
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
      />
      <h1 className="not-found-heading"> Page Not Found </h1>
      <p className="not-found-para">
        {' '}
        we are query page is not found try again{' '}
      </p>
    </div>
  </>
)

export default NotFound
