<template>
  <div>
      <h2 style="color:blue">Update Employee Record (<i style="color:blue" v-if="employee.lastUpdatedTime">last updated on {{employee.lastUpdatedTime}}</i><i v-else>last updated on {{employee.dateJoined}}</i>)</h2>
    
   <div class="form-container">
    <form @submit.prevent="updateEmployeeR">
    <div class="field-container">
      <div>
        <label>First Name:</label>
        <input type="text" v-model="employee.firstName" />
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" v-model="employee.lastName" />
      </div>
      </div>
      <div class="field-container">
      <div>
        <label>Email:</label>
        <input type="email" v-model="employee.email" />
      </div>
      <div>
        <label>Employment Type:</label>
        <input type="text" v-model="employee.employmentType" />
      </div>
      </div>
      <div class="field-container">
      <div>
        <label>Date Joined:</label>
        <input type="date" v-model="employee.dateJoined" />
      </div>
      </div>

      <div class="field-container">
       <button class="updateButton" type="submit">Update</button>
       <router-link :to="{ name: 'EmployeeList'}">
              <button class="closeButton">Close</button>
            </router-link>
      </div>
      
    </form>
    </div>
    <div v-if="message">
      <p style="color:green">{{ message }}</p>
    </div>
  </div>
</template>

<script>

import { getEmployeeById, updateEmployee } from '../service';

export default {
  props: ['id'],
  data() {
    return {
      employee: {
        firstName: '',
        lastName: '',
        email: '',
        employmentType: '',
        dateJoined: ''
      },
      message: ''
    };
  },
  created() {
    this.fetchEmployee(this.id);
  },
  methods: {
    async fetchEmployee(id) { this.employee = await getEmployeeById(id); },
    //async deleteEmployee(id) { await deleteEmployee(id); this.fetchEmployees(); },
    async updateEmployeeR() {  
      this.employee = await updateEmployee(this.id, this.employee); 
      this.message = `Employee updated successfully at ${new Date().toLocaleString()}`; 
    }
  }
};
</script>


<style scoped> 
 
 .form-container { 
  display: flex; 
  flex-direction: column; 
  align-items: center;
  border-bottom: 2px solid #ddd; 
  padding: 20px; 
  border-radius: 10px; 
} 

 .field-container { 
  display: flex; 
  justify-content: space-between; 
  width: 100%; 
  margin-bottom: 10px; } 


.updateButton { 
  padding: 10px 20px;
  text-align: center;
  color:white;
  background:green 
  }

  .closeButton { 
  padding: 10px 20px;
  text-align: center;
  color:white;
  background:red 
  }

  input{
    padding: 10px 20px;
    text-align: center; 
  }
</style>
