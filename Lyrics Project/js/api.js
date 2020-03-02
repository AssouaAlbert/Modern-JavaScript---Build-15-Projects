export class API{
    constructor(artist, song){
        this.artist = artist;
        this.song = song;
    }
    async queryAPI(){
        const response = await fetch(`https://api.lyrics.ovh/v1/${this.artist}/${this.song}`);
        const lyric = await response.json();   
        return lyric;
    }
}