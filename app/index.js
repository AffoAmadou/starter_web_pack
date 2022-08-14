import About from 'pages/About'
import Collections from 'pages/Collections'
import Detail from 'pages/Detail'
import Home from 'pages/Home'
import each from 'lodash/each'
import Preloader from './components/Preloader'
import Navigation from './components/Navigation'
import Canvas from './components/Canvas'
//* IMPORTO GLI INDEX PRESENTI NELLE CARTELLE

class App {
    constructor() {
        this.createContent()

        this.createPreloader()
        this.createNavigation()
        this.createPages()
        this.createCanvas()
        this.addEventListeners()
        this.addLinkListeners()

        this.update()
    }

    //!L'ORDINE IN CUI CHIAMO I METODI É IMPORTANTE

    createNavigation() {
        this.navigation = new Navigation({
            template: this.template
        })
    }

    createPreloader() {
        this.preloader = new Preloader()
        this.preloader.once('completed', this.onPreloaded.bind(this)) //! QUANDO COMPLETO RICHIAMO IL METODO SOTTO
    }

    createCanvas() {
        this.canvas = new Canvas() //!CREO IL CANVA E LO RESIZZO NEL RESIZE SOTTO
    }

    createContent() {

        //!block variables      - var template = 'home'   block content  QUESTA PARTE DEL FILE PUG
        this.content = document.querySelector('.content')
        this.template = this.content.getAttribute('data-template')
        //! Cosi ottengo la pagina in cui mi trovo GENIALEEE
    }

    createPages() {
        this.pages = {
            about: new About(),
            home: new Home(),
            collections: new Collections(),
            detail: new Detail(),
        }

        this.page = this.pages[this.template] //!INSERISCO LA PAGINA IN CUI SONO ATTUALMENTE
        this.page.create()

    }

    onPreloaded() {
        this.preloader.destroy()
        this.onResize()
        this.page.show()
    }

    onPopState() {
        this.onChange(
            {
                url: window.location.pathname, //!per cabmio link nella barra
                push: false
            })
    }

    //! ///////////////////////////////////////////////////////
    update() {
        if (this.canvas && this.canvas.update) {
            this.canvas.update()
        }

        if (this.page && this.page.update) {
            this.page.update()
        }

        this.frame = window.requestAnimationFrame(this.update.bind(this))


    }
    onResize() {
        if (this.canvas && this.canvas.onResize) {
            this.canvas.onResize()
            console.log("ddd")
        }
        if (this.page && this.page.onResize) {
            this.page.onResize()
        }
    }
    //! ///////////////////////////////////////////////////////




    //*  TUTTO QUSTO SERVE PER OTTENERE TUTTO L HTML DELLA PAGINA CHE E CONTENUTA NEL LINK CLICCATO IN MODO DA CARICARLA PRIMA DI CAMBIARE PAGINA
    //? ////////////////////////////////INIZIO//////////////////////////////////////////////////////////////////////
    //*  ////////////////////////////////INIZIO//////////////////////////////////////////////////////////////////////

    async onChange(url, push = true) { //!URL SARA IL LINK DEL BOTTONE CLICCATO NEL METODO SOTTO


        await this.page.hide() //*ANIMAZIONE DI USCITA

        const request = await window.fetch(url)


        if (request.status === 200) {
            const html = await request.text() //!QUESTO CONTIENE TUTTO L HTML

            const div = document.createElement('div') //!CREO LA DIV IN CUI METTERE L HTML ESTRATTO
            div.innerHTML = html

            // if (push) {
            //     window.history.pushState({}, '', url) //! CAMBIO LINK !!!!!!!!!!!
            // }



            const divContent = div.querySelector('.content') //!QUI PRENDO DA DIV (SOPRA) IL TAG DA CONTENTUTO NEL CONTENT VISTO CHE OGNI PAGINA HA CONTENT COSI DA NON INSERIRE TUTTI I TAG HTML META ETC...

            this.content.innerHTML = divContent.innerHTML //! E LO INSERISCO NELLA PAGINA COS DA CAMBIARE QUANDO TUTTO É CARICATO FANTASTICOOOOOOOOOO


            this.template = divContent.getAttribute('data-template')

            this.content.setAttribute('data-template', this.template) //! BISOGNA CAMBIARE ANCHE L ATTRIBUTO VISTO CHE E IL NOME DELLA PAGINA IMPORTANTE
            // console.log(html)

            this.navigation.onChange(this.template)

            this.page = this.pages[this.template]

            this.page.create()

            this.onResize()
            this.page.show()

            this.addLinkListeners()
        } else {
            console.log("error")
        }
    }



    addEventListeners()//!Metodo per update laltezza dello scroll nelle pagine
    {
        // window.addEventListener('popstate', this.onPopState.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
    }

    addLinkListeners() {
        const links = document.querySelectorAll('a')

        each(links, link => {
            link.onclick = event => {

                event.preventDefault() //!IN QUESTO MODO AL CLICK NON MI MANDA DIRETTAMENTE NELL'ALTRA PAGINA

                const { href } = link
                this.onChange(href)  //!{LO CHIAMO QUIIIIIIII ONCHANGE}
            }
        })
    }
    //*  ////////////////////////////////INIZIO//////////////////////////////////////////////////////////////////////
    //? //////////////////////////////////////////FINE///////////////////////////////////////////////////////////////
    //*  ////////////////////////////////INIZIO//////////////////////////////////////////////////////////////////////


}

new App()