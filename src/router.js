import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PostBody from './views/postBody.vue';
import LoginPage from './views/LoginPage.vue';

Vue.use(Router)

export const router =  new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path:'/postBody',
      name: 'PostBody',
      component: PostBody,
      props:true
    },
    {
      path:'/login',
      name:'LoginPage',
      component:LoginPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/login'];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    return next('/login');
  }
  next();
})
