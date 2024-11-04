
import { createRouter, createWebHistory } from 'vue-router';
import EmployeeList from '@/components/EmployeeList';
import UpdateEmployee from '@/components/UpdateEmployee.vue';
import CreateEmployee from '@/components/CreateEmployee.vue';

const routes = [
  {
    path: '/',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/update/:id',
    name: 'UpdateEmployee',
    component: UpdateEmployee,
    props: true
  },
  {
    path: '/create',
    name: 'CreateEmployee',
    component: CreateEmployee
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;