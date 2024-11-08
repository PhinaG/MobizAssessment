<template>
  <div>
    <h1 style="color:blue">Employee Management Portal</h1>
    <div class="container">
      <input v-model="searchText" placeholder="Search by first name/last name/email" />
      <router-link :to="{ name: 'CreateEmployee'}">
              <button>Add Employee</button>
            </router-link>
    </div>
   
   <table border="1">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Employment Type</th>
          <th>Date Joined</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in filteredEmployees" :key="employee.id">
          <td>{{ employee.firstName }}</td>
          <td>{{ employee.lastName }}</td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.employmentType }}</td>
          <td>{{ new Date(employee.dateJoined).toLocaleDateString() }}</td>
          <td>
            <router-link :to="{ name: 'UpdateEmployee', params: { id: employee?.id } }">
              <button class="editButton">Edit</button>
            </router-link>          
            <button class="deleteButton" @click="confirmDelete(employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

      <div v-if="showModal" class="modal"> 
        <div class="modal-content"> 
          <span class="close" @click="showModal = false">&times;</span> 
          <p>Are you sure you want to delete this employee?</p> 
          <button class="deleteButton"  @click="deleteEmployee(employeeIdToDelete)">Yes</button> 
          <button class="editButton" @click="showModal = false">No</button> 
        </div> 
      </div>
  </div>
</template>
<script>

import { getEmployees, deleteEmployee } from '../service';

export default {
  data() {
    return {
      employees: [],
      searchText:'',
      showModal: false, 
      employeeIdToDelete: null,
    };
  },

  computed: {
    filteredEmployees() {
      return this.employees.filter(employee => 
      employee.firstName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      employee.email.toLowerCase().includes(this.searchText.toLowerCase())       
      ).sort((a, b) => a.id - b.id); // Sort by ID
       }, 
     
  },
  created() {
   this.fetchEmployees();
     
  },

  methods:{
    async fetchEmployees() { this.employees = await getEmployees(); },

    async deleteEmployee(id) { await deleteEmployee(id); 
    this.showModal = false;
    this.fetchEmployees(); 
    },

    confirmDelete(id) { 
      this.employeeIdToDelete = id; 
      this.showModal = true; },
  }
};
</script>

<style scoped>
 .container { 
    display: flex; 
    justify-content: space-between; 
    margin-top: 10px; 
  } 

  input{
    padding: 10px 20px;
    text-align: center;
    width:30% 
  }

  table { width: 100%; border-collapse: collapse; margin-top: 20px; } 
  th, td { border: 1px solid #ddd; padding: 8px; text-align: left; } 
  th { background-color: #f2f2f2; } 
  tr:nth-child(even) { background-color: #f9f9f9; } 
  tr:hover { background-color: #f1f1f1; }

  button { 
  padding: 10px 20px;
  text-align: center;
  color:white;
  background:blue 
  }

  .editButton { 
  padding: 10px 20px;
  text-align: center;
  color:white;
  background:green 
  }

  .deleteButton { 
  padding: 10px 20px;
  text-align: center;
  color:white;
  background:red 
  }

  .modal {
    display: flex; 
    justify-content: center; 
    align-items: center; 
    position: fixed; 
    z-index: 1; 
    left: 0; 
    top: 0; 
    width: 100%; 
    height: 100%; 
    overflow: auto; 
    background-color: rgba(0, 0, 0, 0.4); 
    } 
  .modal-content { 
    background-color: #fff;
      padding: 20px; 
      border: 1px solid #888; 
      width: 300px; 
      text-align: center; 
      border-radius: 10px;
      } 
  .close { position: absolute; right: 10px; top: 10px; font-size: 20px; cursor: pointer; }
</style>
