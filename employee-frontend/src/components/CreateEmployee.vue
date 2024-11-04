<template>
  <div> 
    <h2 style="color:blue">Create an Employee Record</h2>
   
<div class="form-container">
    <form @submit.prevent="createEmployee">
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
        <select v-model="employee.employmentType" required> 
        <option disabled value="">Select Employment Type</option> 
        <option value="permanent">Permanent</option> 
        <option value="freelance">Freelance</option>
        <option value="contract">Contract</option> 
        <option value="part-time">Part-time</option> 
        <option value="intern">Intern</option> 
        </select>
      </div>
    </div>
    <div class="field-container">
      <div>
        <label>Date Joined:</label>
        <input type="date" v-model="employee.dateJoined" />
      </div>
    </div>
    <div class="field-container">
      <button class="createButton" type="submit">Create</button>
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
import { addEmployee } from '../service';

export default {
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
   
  },
  methods: {    
    
      async createEmployee() {  
      this.employee = await addEmployee(this.employee); 
      this.message = `Employee created successfully at ${new Date().toLocaleString()}`; 
    
    }
  }
};
</script>

<style scoped> 
.form-container { 
 display: flex; 
  flex-direction: column; 
  align-items: center; 
  padding: 20px; 
  border-radius: 10px; 
  justify-content: space-between;
} 
.field-container { 
  display: grid; 
  grid-template-columns: 2fr 2fr; 
  gap: 20px; 
  
  padding: 20px; 
  border-radius: 10px;  
} 
.field-container label { 
  margin-bottom: 5px; 
  }
.field-container input, 
.field-container select { 
  width: 100%; 
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  }

 .createButton { 
  padding: 10px 20px;
  text-align: center;
  color:white;
  background:green ;
  width : 100%;
  }

  .closeButton { 
  padding: 10px 20px;
  text-align: center;
  color:white;
  background:red;
  width:100%;
  }

  input{
    padding: 10px 20px;
    text-align: center; 
  }
</style>
