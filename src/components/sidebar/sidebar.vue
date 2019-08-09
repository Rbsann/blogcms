<template>
    <div>
        <nav class="navbar is-dark" role="navigation" aria-label="dropdown navigation">
            <div class="navbar-brand">
                <button class="button is-light is-small" outlined
                    @click="postModal()">
                    Add Post
                        </button>
            </div>
        </nav>
    </div>
</template>



<script>
    const ModalForm = {
        props: ['title', 'text'],
        template: `
            <form action="">
                <div class="modal-card" style="width: auto">
                    <header class="modal-card-head">
                        <p class="modal-card-title">Add post</p>
                    </header>
                    <section class="modal-card-body">
                        <b-field label="Title">
                            <b-input
                                type="text"
                                :value="title"
                                v-model="title"
                                placeholder="Post title"
                                required>
                            </b-input>
                        </b-field>

                        <b-field label="Text">
                            <b-input
                                type="textarea"
                                maxlength="300"
                                v-model="post"
                                :value="post"
                                placeholder="Blog post"
                                required>
                            </b-input>
                        </b-field>

                    </section>
                    <footer class="modal-card-foot">
                        <button class="button" type="button" @click="$parent.close()">Close</button>
                        <button type='button' class="button is-primary" @click="onSubmit()">Add post</button>
                    </footer>
                </div>
            </form>
    `,
        data(){
            return{
                title:'',
                post:'',
            }
        },
        methods:{
            onSubmit(){
                this.$axios.post('http://localhost:8080/posts',{
                    title:this.title,
                    post:this.post
                }).then(result=>{
                    //reload the page
                    this.$router.go();
                }).catch(error=>{
                    console.log(error);
                })
            }
        },
    }

export default {
    name: 'Sidebar',
    data() {
        return {
            showNav: false,
            logo: './static/logo.png',
            navLogin: true
        }
    },
    methods: {
        postModal() {
            this.$buefy.modal.open({
                parent: this,
                component: ModalForm,
                hasModalCard: true,
                customClass: 'custom-class custom-class-2',
            })
        },

    },   
}
</script>

