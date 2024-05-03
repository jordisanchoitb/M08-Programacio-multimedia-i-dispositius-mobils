const app = Vue.createApp({
    data() {
        return {
            anime: '',
            result: null,
            sinopsis: '',
        }
    },
    methods: {
        conectarAPI() {
            let formatetAnime = this.anime.toLowerCase().replaceAll(' ', '-');
            const options = {
                method: "GET",
                cache: "default"
            };
            fetch(`https://anime.ninjakito.com/search/${formatetAnime}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.result = data;
                //this.sinopsis = data.synopsis.replaceAll("\<br/>", "")
            })
            .catch(error => {
                console.log(error);
                this.result = null;
            });
        }
    }
});