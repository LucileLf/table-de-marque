// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault(); // Prevent form from refreshing the page
//     try {
//       const response = await axios.post('http://yourapi.com/api/login', {
//         email,
//         password,
//       });
//       // Assuming the response contains a token on successful login
//       if (response.data.token) {
//         localStorage.setItem('userToken', response.data.token);
//         alert('Login successful!');
//         // Redirect user or update the state to indicate successful login
//       }
//     } catch (error) {
//       setError('Failed to login. Please check your credentials.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleLogin}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </div>
//         {error && <div style={{ color: 'red' }}>{error}</div>}
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
