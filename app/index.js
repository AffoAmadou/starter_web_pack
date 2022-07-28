import About from 'pages/About'
import Collections from 'pages/Collections'
import Detail from 'pages/Detail'
import Home from 'pages/Home'
 //* IMPORTO GLI INDEX PRESENTI NELLE CARTELLE

class App{
constructor(){
    this.createContent()
    this.createPages()
}

createContent(){

    //?block variables      - var template = 'home'   block content  QUESTA PARTE DEL FILE PUG
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
   //? Cosi ottengo la pagina in cui mi trovo GENIALEEE
}

createPages(){
    this.pages = {
        about: new About(),
        home: new Home(),
        collections: new Collections(),
        detail: new Detail(),
        
    }

    this.page = this.pages[this.template] //!INSERISCO LA PAGINA IN CUI SONO ATTUALMENTE
    console.log(this.page)
}
}

new App()