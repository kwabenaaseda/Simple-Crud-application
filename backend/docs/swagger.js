// Add this to your routes files or create a separate swagger.js file

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         username:
 *           type: string
 *           description: The user's username
 *           minLength: 3
 *         email:
 *           type: string
 *           description: The user's email address
 *           format: email
 *         password:
 *           type: string
 *           description: The user's password
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the user was created
 *       example:
 *         id: 60d0fe4f5311236168a109ca
 *         username: johndoe
 *         email: johndoe@example.com
 *         createdAt: 2023-01-01T00:00:00.000Z
 *     
 *     Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the admin
 *         name:
 *           type: string
 *           description: The admin's name
 *         email:
 *           type: string
 *           description: The admin's email address
 *           format: email
 *         role:
 *           type: string
 *           default: admin
 *           description: The admin's role
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the admin was created
 *       example:
 *         id: 60d0fe4f5311236168a109cb
 *         name: John Admin
 *         email: admin@example.com
 *         role: admin
 *         createdAt: 2023-01-01T00:00:00.000Z
 *     
 *     Feedback:
 *       type: object
 *       required:
 *         - user
 *         - feedback
 *         - userLocation
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the feedback
 *         user:
 *           type: string
 *           description: The user's email who gave feedback
 *         feedback:
 *           type: string
 *           description: The feedback content
 *         userLocation:
 *           type: string
 *           description: The location/page where feedback was given
 *         userid:
 *           type: string
 *           description: Reference to the user's ObjectId
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the feedback was created
 *       example:
 *         id: 60d0fe4f5311236168a109cc
 *         user: johndoe@example.com
 *         feedback: Great application!
 *         userLocation: /pages/user/user.html
 *         userid: 60d0fe4f5311236168a109ca
 *         createdAt: 2023-01-01T00:00:00.000Z
 *     
 *     Activity:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the activity
 *         message:
 *           type: string
 *           description: The activity message
 *         timestamp:
 *           type: string
 *           description: Custom timestamp format
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: When the activity was created
 *       example:
 *         id: 60d0fe4f5311236168a109cd
 *         message: User johndoe signed up successfully
 *         timestamp: 14:30:45--1/1/2023
 *         createdAt: 2023-01-01T14:30:45.000Z
 *     
 *     ApiResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the request was successful
 *         message:
 *           type: string
 *           description: Response message
 *         data:
 *           type: object
 *           description: Response data
 *         redirectUrl:
 *           type: string
 *           description: Optional redirect URL
 *       example:
 *         success: true
 *         message: Success
 *         data: {}
 *         redirectUrl: /pages/user/user.html
 *     
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: Error message
 *       example:
 *         success: false
 *         message: User not found
 *   
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *       description: JWT token for authentication
 */

/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: User authentication routes
 *   - name: Admin
 *     description: Admin authentication and management routes
 *   - name: Data
 *     description: Data management routes for users and admins
 *   - name: Status
 *     description: Application status routes
 */

/**
 * @swagger
 * /api/status:
 *   get:
 *     summary: Get application status
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: Application status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 env:
 *                   type: string
 *                   example: development
 */

/**
 * @swagger
 * /api/signup/data:
 *   post:
 *     summary: Sign up a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 redirectUrl:
 *                   type: string
 *                   example: /pages/user/user
 *       400:
 *         description: User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/signup/data/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: Passw0rd!
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 redirectUrl:
 *                   type: string
 *                   example: /pages/user/user
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/admin/signup:
 *   post:
 *     summary: Sign up a new admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: John Admin
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin@2020242914
 *                 description: Must be the correct admin secret key
 *     responses:
 *       201:
 *         description: Admin created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *                 redirectUrl:
 *                   type: string
 *                   example: /pages/admin/homepage
 *       400:
 *         description: Admin already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Invalid admin secret key
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Login an admin
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: admin@2020242914
 *     responses:
 *       200:
 *         description: Admin login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 admin:
 *                   $ref: '#/components/schemas/Admin'
 *                 redirectUrl:
 *                   type: string
 *                   example: /pages/admin/homepage
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/users/update:
 *   post:
 *     summary: Update user data (user endpoint)
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID to update
 *                 example: 60d0fe4f5311236168a109ca
 *               username:
 *                 type: string
 *                 example: johnsmith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johnsmith@example.com
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/users/update/admin:
 *   post:
 *     summary: Update user data (admin endpoint)
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID to update
 *                 example: 60d0fe4f5311236168a109ca
 *               username:
 *                 type: string
 *                 example: johnsmith
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johnsmith@example.com
 *     responses:
 *       200:
 *         description: User updated successfully (admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/users/delete:
 *   post:
 *     summary: Delete user (user endpoint)
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID to delete
 *                 example: 60d0fe4f5311236168a109ca
 *               name:
 *                 type: string
 *                 description: User name for logging
 *                 example: johndoe
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/users/delete/admin:
 *   post:
 *     summary: Delete user (admin endpoint)
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *             properties:
 *               id:
 *                 type: string
 *                 description: User ID to delete
 *                 example: 60d0fe4f5311236168a109ca
 *               name:
 *                 type: string
 *                 description: User name for logging
 *                 example: johndoe
 *     responses:
 *       200:
 *         description: User deleted successfully (admin)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ApiResponse'
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/users:
 *   get:
 *     summary: Get all users
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Users retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/admin:
 *   get:
 *     summary: Get all admins
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Admins retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/history:
 *   get:
 *     summary: Get application activity history
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: History retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Activity'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */

/**
 * @swagger
 * /api/data/feedback:
 *   get:
 *     summary: Get all feedback
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Feedback retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Feedback retrieved successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Feedback'
 *       401:
 *         description: Not authorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *   post:
 *     summary: Add new feedback
 *     tags: [Data]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mail
 *               - content
 *             properties:
 *               mail:
 *                 type: string
 *                 format: email
 *                 description: User's email
 *                 example: johndoe@example.com
 *               content:
 *                 type: string
 *                 description: Feedback content
 *                 example: Great application, very user-friendly!
 *     responses:
 *       200:
 *         description: Feedback added successfully (redirects back)
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Server error
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: router Error
 */

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test API endpoint
 *     tags: [Status]
 *     responses:
 *       200:
 *         description: API test successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: API working
 */

/**
 * @swagger
 * /admin:
 *   get:
 *     summary: Redirect to admin login page
 *     tags: [Admin]
 *     responses:
 *       302:
 *         description: Redirect to admin login page
 *         headers:
 *           Location:
 *             schema:
 *               type: string
 *               example: https://snappod.netlify.app/pages/admin/adminlogin.html
 */