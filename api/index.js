require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const authRoutes = require('../routes/auth.routes');
const foodRoutes = require('../routes/food.routes');
const selectionRoutes = require('../routes/selection.routes');
const invitationRoutes = require('../routes/invitation.routes');

const app = express();

async function connectDB() {
	try {
		await mongoose.connect(process.env.MONGODB_URI);
		console.log('Connected to MongoDB');
	} catch (error) {
		console.error('MongoDB connection error:', error);
		process.exit(1);
	}
}

connectDB();

app.use(express.json());
app.use(
	cors({
		origin: '*',
		methods: ['GET', 'POST', 'PUT', 'DELETE'],
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);

const swaggerOptions = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Amour API',
			version: '1.0.0',
			description: 'Wedding Service API',
			contact: {
				name: 'athslis',
				url: 'https://developer-website.com',
				email: 'developer@example.com',
			},
		},
		paths: {
			'/api/auth/register': {
				post: {
					summary: 'Register a new user',
					tags: ['Authentication'],
					requestBody: {
						required: true,
						content: {
							'application/json': {
								schema: {
									type: 'object',
									required: ['username', 'email', 'password'],
									properties: {
										username: { type: 'string' },
										email: { type: 'string' },
										password: { type: 'string' },
									},
								},
							},
						},
					},
					responses: {
						201: { description: 'User registered successfully' },
						400: { description: 'Bad request' },
						500: { description: 'Internal server error' },
					},
				},
			},
			'/api/auth/login': {
				post: {
					summary: 'Login user',
					tags: ['Authentication'],
					requestBody: {
						required: true,
						content: {
							'application/json': {
								schema: {
									type: 'object',
									required: ['email', 'password'],
									properties: {
										email: { type: 'string' },
										password: { type: 'string' },
									},
								},
							},
						},
					},
					responses: {
						200: { description: 'Login successful' },
						401: { description: 'Authentication failed' },
						500: { description: 'Internal server error' },
					},
				},
			},
		},
	},
	apis: ['./routes/*.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.get('/', (req, res) => {
	res.json({
		message: 'Food Service API is running',
		endpoints: {
			auth: {
				register: 'POST /api/auth/register',
				login: 'POST /api/auth/login',
			},
			foods: {
				getAll: 'GET /api/foods',
				create: 'POST /api/foods',
			},
			selections: {
				getAll: 'GET /api/selections',
				create: 'POST /api/selections',
			},
			invitations: {
				generate: 'POST /api/invitations/generate',
			},
		},
	});
});

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/selections', selectionRoutes);
app.use('/api/invitations', invitationRoutes);

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
