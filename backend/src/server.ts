import express from 'express';
import AuthenticationOperations from './authOperations.ts';
const app = express();
const PORT = 3000;

const authOps = new AuthenticationOperations();

app.use(express.json());

// Root route
app.get('/', (req, res) => {
  console.log("Received request with body ",req.body);
  res.send('Hello from TypeScript Express 🚀');
});

app.post('/auth/signup', (req, res) => {
  console.log(req.body, req);
  const { username, password } = req.body;
  // Here you would typically hash the password and save the user to the database

  res.status(201).json({ message: 'User created successfully', user: { username } });
});

app.post('/auth/login', (req, res) => {

})



// Mount user routes
// app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
