<template>
    <div>
        <Sidebar></Sidebar>
        <div class="container is-fullheight hero-body">
            <h3 class="title has-text-dark is-4"> Posts</h3>
            <div class="columns is-centered">
                <div class="column is-12">
                    <div class="box">
                        <section>
                            <div class="columns is-multiline">
                                <div class="column is-4" v-for="post in displayedPosts" :key="post.id">
                                    <div class="card">
                                        <div class="card-content">
                                          <div class="media">
                                            <div class="media-content">
                                              <router-link :to="{name:'PostBody',params:{post}}">
                                                <p class="title is-6 has-text-danger">{{ post.title }}</p>
                                              </router-link>
                                              <strong class="">{{ post.post|truncate(100) }}</strong>
                                            </div>
                                          </div>

                                            <div class="content">
                                              <br>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
          <div class="clearfix btn-group col-md-2 offset-md-5">
              <button type="button" class="btn btn-sm btn-outline-secondary" v-if="page != 1" @click="page--"> &lt; &lt; </button>
              <button type="button" class="btn btn-sm btn-outline-secondary" v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber" @click="page = pageNumber"> {{pageNumber}} </button>
              <button type="button" @click="page++" v-if="page < pages.length" class="btn btn-sm btn-outline-secondary"> >> </button>
          </div>
    </div>


</template>

<script>
import Sidebar from "../components/sidebar/sidebar"

export default {
    name: 'Home',
    data() {
      return {
        search: '',
        desc: '',
        posts: [],
        page:1,
        perPage:5,
        pages:[]
      }
    },
    components: {
        Sidebar
    },
    methods: {
      getPost() {
        this.$axios.get('http://localhost:8080/posts')
          .then(result=>{
            this.posts = result.data.data
            //TODO: sort posts in chronological order
            // this.posts.map(post=>{
            //   console.log(result);
            //   date = new Date(post.create_date)
            //   console.log(date);
            //   return {_id:post._id,title:post.title,date:date.getTime()}
            // })
            console.log(this.posts);
          })
          .catch(error=>{
            console.log(error);
          })
      },
      setPages(){
        let numberOfPages = Math.ceil(this.posts.length / this.perPage);
        //fill pages array with 1...N where N=numberOfPages
        for (let index = 1; index <= numberOfPages; index++) {
          this.pages.push(index);
        }
      },
      paginate(posts){
        let page = this.page;
        let perPage = this.perPage;
        let from = (page * perPage) - perPage;
        let to = (page * perPage);
        return  posts.slice(from, to);
      }
    },
      created(){
        this.getPost()
      },
      watch: {
        posts () {
          this.setPages();
        }
      },
      computed: {
        displayedPosts () {
          return this.paginate(this.posts);
        }
      },

    };

</script>

<style scoped>
.top-10 {
    margin-top: 10px !important;
}
.grey-background {
    background-color: hsl(0, 0%, 86%) !important;
}
</style>
