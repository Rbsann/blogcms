<template>
    <div>
        <form >
            <section>
                <div class="column is-half is-offset-one-quarter">
                    <b-field label="user">
                        <b-input type="text" v-model="user" name="user" class="form-control"  />
                    </b-field>
                    <b-field label="password">
                        <b-input type="password" v-model="password" name="password" class="form-control" />
                    </b-field>
                    <b-button @click='handleSubmit' type='is-success' outlined>Login</b-button>
                </div>
            </section>
        </form>
    </div>
</template>

<script>

export default {
    data () {
        return {
            user: '',
            password: '',
        }
    },
    methods: {
        handleSubmit (e) {
            console.log('test');
            this.$axios.post('http://localhost:8080/admin',{
                user:this.user,
                password:this.password
            })
            .then(response => {
                if(!response.ok && response.status===401){
                    this.logout();
                    alert('Wrong user');
                    this.$router.go();
                }else{
                    console.log(response.data.token);
                    if (response.data.data.token) {
                        console.log('aqui')
                        // login successful if there's a jwt token in the response
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('user', JSON.stringify(response.data.data.token));
                        this.$router.replace('/');
                    }
                }

            return response;
        });
        },
        handleReponse(){
            console.log('entrou');
            return response.text().then(text => {
                console.log(text);
                const data = text && JSON.parse(text);
                if (!response.ok) {
                    if (response.status === 401) {
                        // auto logout if 401 response returned from api
                        logout();
                        alert('Wrong user');
                        this.$router.go();

                    }
                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
                }
        return data.data;
            })
        },
        logout(){
            localStorage.removeItem('user');
        }
    }
};
</script>