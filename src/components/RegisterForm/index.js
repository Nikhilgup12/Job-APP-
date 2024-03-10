// import {Component} from 'react'
// import './index.css'

// class RegisterForm extends Component {
//   state = {username: '', name: '', password: '', location: '', gender: ''}

//   onSubmitRegister = async event => {
//     event.preventDefault()
//     const {name, username, password, location, gender} = this.state
//     const userDetails = {username, name, password, location, gender}
//     const url = 'https://nikhilloginregister.onrender.com/register'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(userDetails),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     console.log(response)
//   }

//   onUsername = event => {
//     const {username} = this.state
//     this.setState({username: event.target.value})
//     console.log(username)
//   }

//   onName = event => {
//     this.setState({name: event.target.value})
//   }

//   onPassword = event => {
//     this.setState({password: event.target.value})
//   }

//   onLocation = event => {
//     this.setState({location: event.target.value})
//   }

//   onMale = event => {
//     this.setState({gender: event.target.value})
//   }

//   onFemale = event => {
//     this.setState({gender: event.target.value})
//   }

//   render() {
//     return (
//       <>
//         <div className="register-container">
//           <div className="register-form-container">
//             <form onSubmit={this.onSubmitRegister}>
//               <div className="input-container">
//                 <label className="username-label" htmlFor="username">
//                   Username
//                 </label>
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="username"
//                   id="username"
//                   className="username-input"
//                   onChange={this.onUsername}
//                 />
//               </div>

//               <div className="input-container">
//                 <label className="username-label" htmlFor="name">
//                   name
//                 </label>
//                 <br />
//                 <input
//                   type="text"
//                   placeholder="name"
//                   id="name"
//                   className="username-input"
//                   onChange={this.onName}
//                 />
//               </div>
//               <div className="input-container">
//                 <label className="username-label" htmlFor="Password">
//                   Password
//                 </label>
//                 <br />
//                 <input
//                   type="password"
//                   placeholder="Password"
//                   id="Password"
//                   className="username-input"
//                   onChange={this.onPassword}
//                 />
//               </div>
//               <div className="input-container">
//                 <input
//                   type="radio"
//                   name="name"
//                   id="male"
//                   className="name-radio"
//                   value="male"
//                   onChange={this.onMale}
//                 />
//                 <label className="male-radio" htmlFor="male">
//                   Male
//                 </label>
//                 <input
//                   type="radio"
//                   name="name"
//                   id="female"
//                   className="name-radio"
//                   value="female"
//                   onChange={this.onFemale}
//                 />
//                 <label className="username-label" htmlFor="female">
//                   Female
//                 </label>
//               </div>
//               <div className="input-container">
//                 <label className="username-label" htmlFor="location">
//                   Location
//                 </label>
//                 <br />
//                 <input
//                   type="location"
//                   placeholder="Location"
//                   id="location"
//                   className="username-input"
//                   onChange={this.onLocation}
//                 />
//               </div>
//               <button type="submit" className="register-btn">
//                 Register
//               </button>
//             </form>
//           </div>
//         </div>
//       </>
//     )
//   }
// }

// export default RegisterForm
