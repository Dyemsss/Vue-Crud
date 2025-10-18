<template>
  <div class="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
    <h2 class="text-2xl font-bold mb-4 text-center text-blue-700">👩‍🎓 Student Manager</h2>

    <!-- Add Form -->
    <form @submit.prevent="addStudent" class="flex gap-2 mb-4">
      <input v-model="newStudent.name" placeholder="Name" required
        class="border border-gray-300 rounded px-2 py-1 flex-1" />
      <input v-model.number="newStudent.age" placeholder="Age" required
        class="border border-gray-300 rounded px-2 py-1 w-20" />
      <button type="submit" class="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
        Add
      </button>
    </form>

    <!-- Student List -->
    <ul>
      <li v-for="s in students" :key="s.id" class="flex items-center gap-2 mb-2">
        <input v-model="s.name" class="border rounded px-2 py-1 flex-1" />
        <input v-model.number="s.age" class="border rounded px-2 py-1 w-20" />
        <button @click="updateStudent(s)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
          Update
        </button>
        <button @click="deleteStudent(s.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          Delete
        </button>
      </li>
    </ul>
  </div>
   <Card class="max-w-xl mx-auto mt-10">
    <template #title>Student Manager</template>

    <div class="flex gap-2 mb-4">
      <InputText v-model="newStudent.name" placeholder="Name" />
      <InputText v-model.number="newStudent.age" placeholder="Age" />
      <Button label="Add" icon="pi pi-plus" @click="addStudent" />
    </div>

    <ul>
      <li v-for="s in students" :key="s.id" class="flex gap-2 mb-2">
        <InputText v-model="s.name" />
        <InputText v-model.number="s.age" />
        <Button label="Update" icon="pi pi-check" severity="success" @click="updateStudent(s)" />
        <Button label="Delete" icon="pi pi-trash" severity="danger" @click="deleteStudent(s.id)" />
      </li>
    </ul>
  </Card>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'


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