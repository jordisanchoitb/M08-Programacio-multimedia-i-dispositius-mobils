app.component("info-anime", {
    data () {
        return {
            animeresult: new Map(),
        }
    },
    props: ['result'],
    methods: {
        getAnimeinfo (id) {
            if (this.animeresult.has(id)) {
                return;
            } else {
                fetch(`https://anime.ninjakito.com/anime/${id}`)
                .then(response => response.json())
                .then(data => {
                    this.animeresult.set(id, data);
                    //console.log(data);
                    //console.log(this.animeresult.get(id).debut);
                    //console.log(this.animeresult.get(id).episodes.length);
                })
                .catch(error => {
                    console.log(error);
                });
            }
        }
    },
    computed: {

    },
    updated () {
        if (this.result == null) {
            return;
        } else {
            this.result.forEach(anime => {
                this.getAnimeinfo(anime.id);
            })
        }
    },
    template: /*html*/
        `<div id="animeInfo" v-if="result">
        <div class="animes" v-for="anime in result">
            <div id="titleanime" :style="{ backgroundImage: 'url(' + anime.banner + ')' }">
                <h1>{{ anime.title }}</h1>
            </div>
            <div id="divinfo">
                <div id="imgdiv">
                    <a :href="'https://www3.animeflv.net/anime/' + anime.id" target="_black"><img class="imganime" :src="anime.poster" :alt="anime.title"></a>
                </div>
                <div>
                    <div>
                        <p id="ptitlesinopsis"><b>Sinopsis:</b></p>
                        <p id="psinopsis">{{ anime.synopsis }}</p>
                    </div>
                    <div>
                        <p><b>Episodios:</b> {{ animeresult.get(anime.id)?.episodes.length }}</p>
                        <p><b>Estado:</b> {{ animeresult.get(anime.id)?.debut }}</p>
                        <p><b>Rating:</b> {{ anime.rating }}</p>
                        <p><b>Tipo:</b> {{ anime.type }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else><p><b>Anime no encontrado</b></p></div> `
})