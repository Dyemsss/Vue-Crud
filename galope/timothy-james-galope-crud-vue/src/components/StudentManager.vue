<template>
  <div class="container">
    <h2>👩‍🎓 Student Manager</h2>

    <!-- Add Form -->
    <form @submit.prevent="addStudent">
      <input v-model="newStudent.name" placeholder="Name" required />
      <input v-model.number="newStudent.age" placeholder="Age" required />
      <button type="submit">Add</button>
    </form>

    <hr />

    <!-- Student List -->
    <ul>
      <li v-for="s in students" :key="s.id">
        <input v-model="s.name" />
        <input v-model.number="s.age" />
        <button @click="updateStudent(s)">Update</button>
        <button @click="deleteStudent(s.id)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const students = ref([])
const newStudent = ref({ name: '', age: null })
const apiBase = 'http://localhost:3000/students'

// Fetch all students
const fetchStudents = async () => {
  const res = await axios.get(apiBase)
  students.value = res.data
}

// Add new student
const addStudent = async () => {
  await axios.post(apiBase, newStudent.value)
  newStudent.value = { name: '', age: null }
  fetchStudents()
}

// Update student
const updateStudent = async (student) => {
  await axios.put(`${apiBase}/${student.id}`, student)
  fetchStudents()
}

// Delete student
const deleteStudent = async (id) => {
  await axios.delete(`${apiBase}/${id}`)
  fetchStudents()
}

onMounted(fetchStudents)
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}
input {
  margin: 0.2rem;
  padding: 0.4rem;
}
button {
  margin: 0.2rem;
  padding: 0.4rem 0.8rem;
}
</style>