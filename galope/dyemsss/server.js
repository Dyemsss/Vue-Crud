import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import cors from 'cors'

const app = express();
app.use(cors())
app.use(express.json());

let students = [];
let idCounter = 1;

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Student CRUD API',
      version: '1.0.0',
    },
  },
  apis: ['./server.js'],
};
const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created
 */
app.post('/students', (req, res) => {
  const student = { id: idCounter++, ...req.body };
  students.push(student);
  res.status(201).json(student);
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Get all students
 *     responses:
 *       200:
 *         description: List of students
 */
app.get('/students', (req, res) => {
  res.json(students);
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Get a student by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */
app.get('/students/:id', (req, res) => {
  const student = students.find(s => s.id == req.params.id);
  student ? res.json(student) : res.status(404).send('Not Found');
});



/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Update a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student updated
 *       404:
 *         description: Student not found
 */
app.put('/students/:id', (req, res) => {
  const index = students.findIndex(s => s.id == req.params.id);
  if (index !== -1) {
    students[index] = { id: parseInt(req.params.id), ...req.body };
    res.json(students[index]);
  } else {
    res.status(404).send('Not Found');
  }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Delete a student
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Student deleted
 */
app.delete('/students/:id', (req, res) => {
  students = students.filter(s => s.id != req.params.id);
  res.sendStatus(204);
});

app.listen(3000, () => console.log('API running on http://localhost:3000'));