<template>
    <div>
        <h1>{{receivedPost.title}}</h1>
        <h3>{{receivedPost.post}}</h3>
        <b-button @click="removePost"
                type="is-danger"
                icon-right="delete">
            Delete
        </b-button>
    </div>
</template>

<script>
export default {
    name: 'PostBody',
    props: ['post'],
    data() {
        return {
            receivedPost: ''
        }
    },
    mounted() {
        if (this.post) {
            this.receivedPost = this.post    
        }

    },
    methods: {
        removePost: function(){
            console.log(this.receivedPost._id);
            this.$axios.delete(`http://localhost:8080/posts/${this.receivedPost._id}`)
                .then(result=>{
                    this.$router.push('/');
                })
                .catch(error=>{
                    console.log(error);
                })
            console.log('test');
        }
    },
}
</script>