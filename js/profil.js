
let nom=""
let email=""
let mdp=""

const tbMemory=[
    {
        nom: "legumes",
        exemple:"../images/memory-legumes/memory_detail_legumes.png",
        images:[
            "../images/memory-legumes/1.svg",
            "../images/memory-legumes/2.svg",
            "../images/memory-legumes/3.svg",
            "../images/memory-legumes/4.svg",
            "../images/memory-legumes/5.svg",
            "../images/memory-legumes/6.svg",
        ]
    },
    {
        nom: "animaux",
        exemple:"../images/memory-animaux/memory_detail_animaux.png",
        images:[
            "../images/memory-animaux/1.webp",
            "../images/memory-animaux/2.webp",
            "../images/memory-animaux/3.webp",
            "../images/memory-animaux/4.webp",
            "../images/memory-animaux/5.webp",
            "../images/memory-animaux/6.webp",
            "../images/memory-animaux/7.webp",
            "../images/memory-animaux/8.webp",
            "../images/memory-animaux/9.webp",
            "../images/memory-animaux/10.webp",
            "../images/memory-animaux/11.webp",
            "../images/memory-animaux/12.webp",
            "../images/memory-animaux/13.webp",
            "../images/memory-animaux/14.webp",
            "../images/memory-animaux/15.webp",
            "../images/memory-animaux/16.webp",
            "../images/memory-animaux/17.webp",
            "../images/memory-animaux/18.webp",
            "../images/memory-animaux/19.webp",
            "../images/memory-animaux/20.webp",
            "../images/memory-animaux/21.webp",
            "../images/memory-animaux/22.webp",
            "../images/memory-animaux/23.webp",
            "../images/memory-animaux/24.webp",
            "../images/memory-animaux/25.webp",
            "../images/memory-animaux/26.webp",
            "../images/memory-animaux/27.webp",
            "../images/memory-animaux/28.webp",
        ]


    },
    {
        nom: "chiens",
        exemple:"../images/memory-chiens/memory_detail_chiens.png",
        images:[
            "../images/memory-chiens/1.webp",
            "../images/memory-chiens/2.webp",
            "../images/memory-chiens/3.webp",
            "../images/memory-chiens/4.webp",
            "../images/memory-chiens/5.webp",
            "../images/memory-chiens/6.webp",
            "../images/memory-chiens/7.webp",
            "../images/memory-chiens/8.webp",
            "../images/memory-chiens/9.webp",
            "../images/memory-chiens/10.webp",
            "../images/memory-chiens/11.webp",
            "../images/memory-chiens/12.webp",
            "../images/memory-chiens/13.webp",
            "../images/memory-chiens/14.webp",
            "../images/memory-chiens/15.webp",
            "../images/memory-chiens/16.webp",
            "../images/memory-chiens/17.webp",
            "../images/memory-chiens/18.webp",
            "../images/memory-chiens/19.webp",
            "../images/memory-chiens/20.webp",
            "../images/memory-chiens/21.webp",
            "../images/memory-chiens/22.webp",
            "../images/memory-chiens/23.webp",
        ]


    },
    {
        nom: "animaux-domestiques",
        exemple:"../images/memory-animaux-domestiques/memory_detail_animaux_domestiques.png",
        images:[
            "../images/memory-animaux-domestiques/1.jpg",
            "../images/memory-animaux-domestiques/2.jpg",
            "../images/memory-animaux-domestiques/3.jpg",
            "../images/memory-animaux-domestiques/4.jpg",
            "../images/memory-animaux-domestiques/5.jpg",
            "../images/memory-animaux-domestiques/6.jpg",
            "../images/memory-animaux-domestiques/7.jpg",
            "../images/memory-animaux-domestiques/8.jpg",
            "../images/memory-animaux-domestiques/9.jpg",
            "../images/memory-animaux-domestiques/10.jpg",
        ]


    },
    {
        nom: "animaux-animes",
        exemple:"../images/memory-animaux-animes/memory_detail_animaux_animes.png",
        images:[
            "../images/memory-animaux-animes/1.webp",
            "../images/memory-animaux-animes/2.webp",
            "../images/memory-animaux-animes/3.webp",
            "../images/memory-animaux-animes/4.webp",
            "../images/memory-animaux-animes/5.webp",
            "../images/memory-animaux-animes/6.webp",
            "../images/memory-animaux-animes/7.webp",
            "../images/memory-animaux-animes/8.webp",
        ]


    },
    {
        nom: "dinosaures-nommes",
        exemple:"../images/memory-dinosaures-nommes/memory_detail_dinosaures_nommes.png",
        images:[
            "../images/memory-dinosaures-nommes/1.jpg",
            "../images/memory-dinosaures-nommes/2.jpg",
            "../images/memory-dinosaures-nommes/3.jpg",
            "../images/memory-dinosaures-nommes/4.jpg",
            "../images/memory-dinosaures-nommes/5.jpg",
            "../images/memory-dinosaures-nommes/6.jpg",
            "../images/memory-dinosaures-nommes/7.jpg",
            "../images/memory-dinosaures-nommes/8.jpg",
            "../images/memory-dinosaures-nommes/8.jpg",
            "../images/memory-dinosaures-nommes/10.jpg"
        ]


    }
]

const pNom = document.getElementById("pNom")
const pEmail = document.getElementById("pEmail")
const pMdp = document.getElementById("pMdp")

const imgExemple=document.getElementById("imgExemple")
const choixMemory=document.getElementById("choixMemory")

const btnRadio=document.querySelectorAll(".btnRadio")


// _________________________________________



if(localStorage.getItem("prefMemory")==null){
    
    localStorage.setItem("prefMemory","legumes")

}else{

    const data = localStorage.getItem("prefMemory")
    const dataExploitable = JSON.parse(data)
    imgExemple.src=dataExploitable.exemple
    
}


if(localStorage.getItem("prefTailleGrille")==null){
    
    prefTailleGrille={
        "id" : "grille4x3",
        "colonnes" : 4,
        "lignes" : 3,
    }
    const prefTailleGrilleStringify = JSON.stringify(prefTailleGrille)
    localStorage.setItem("prefTailleGrille", prefTailleGrilleStringify)

}else{

    const data = localStorage.getItem("prefTailleGrille")
    const dataExploitable = JSON.parse(data)
    
    btnRadio.forEach(e => {
        if(e.id==dataExploitable .id){
            e.checked=true
        }
    });

    filtrerMemory(dataExploitable.id)
}


function filtrerMemory(tailleGrille){

    const selectionLegumes=document.getElementById("selectionLegumes")
    const selectionAnimaux=document.getElementById("selectionAnimaux")
    const selectionAnimauxAnimes=document.getElementById("selectionAnimauxAnimes")
    const selectionAnimauxDomestiques=document.getElementById("selectionAnimauxDomestiques")
    const selectionChiens=document.getElementById("selectionChiens")
    const selectionDinosauresNommes=document.getElementById("selectionDinosauresNommes")
    const choixMemory = document.getElementById("choixMemory")

    switch (tailleGrille) {
        case "grille4x3":
            // il faut 6 images minimum
            selectionLegumes.style.display="block"
            selectionDinosauresNommes.style.display="block"
            selectionAnimauxAnimes.style.display="block"
            selectionAnimauxDomestiques.style.display="block"

            choixMemory.value = "legumes"
            
            break;

        case "grille6x5":
            // il faut 15 images minimum
            selectionLegumes.style.display="none"
            selectionDinosauresNommes.style.display="none"
            selectionAnimauxAnimes.style.display="none"
            selectionAnimauxDomestiques.style.display="none"
            
            selectionChiens.style.display="block"

            choixMemory.value = "chiens"

            break;

        case "grille8x7":
            // il faut 28 images minimum
            selectionLegumes.style.display="none"
            selectionDinosauresNommes.style.display="none"
            selectionAnimauxAnimes.style.display="none"
            selectionAnimauxDomestiques.style.display="none"
            selectionChiens.style.display="none"

            choixMemory.value = "animaux"
            
            break;
    
        default:
            break;
    }

    afficherExemple()
    afficherScore()

}


determinerBtnSelectionne()


btnRadio.forEach(btn => {
    btn.addEventListener("change",determinerBtnSelectionne)
});

// _________________________________________

function determinerBtnSelectionne(){

    let prefTailleGrille={}

    btnRadio.forEach(btn=>{
        if(btn.checked){
            // console.log(btn.value)
            switch (btn.value) {
                case "grille4x3":
                    prefTailleGrille={
                        "id" : "grille4x3",
                        "colonnes" : 4,
                        "lignes" : 3,
                    }
                    filtrerMemory(btn.value)
                    
                    break;

                case "grille6x5":
                    prefTailleGrille={
                        "id" : "grille6x5",
                        "colonnes" : 6,
                        "lignes" : 5,
                    }
                    filtrerMemory(btn.value)
                    
                    break;

                case "grille8x7":
                    prefTailleGrille={
                        "id" : "grille8x7",
                        "colonnes" : 8,
                        "lignes" : 7,
                    }
                    filtrerMemory(btn.value)
                    
                    break;
            
                default:
                    break;
            }
        }
    })

    const prefTailleGrilleStringify = JSON.stringify(prefTailleGrille)
    localStorage.setItem("prefTailleGrille", prefTailleGrilleStringify)
    afficherScore()

}

recupererInformations()

function recupererInformations(){

    const utilisateur=sessionStorage.getItem("utilisateur")

    const data = localStorage.getItem("comptes")
    const dataExploitable = JSON.parse(data)
    // console.log(dataExploitable)

    dataExploitable.forEach(e => {
        if(e.nom = utilisateur){
            nom=e.nom
            email=e.email
            mdp=e.mdp
        }
    })

    pNom.innerText=nom
    const bienvenue = document.getElementById("bienvenue")
    bienvenue.innerHTML = `Bienvenue ${nom} !`
    pEmail.innerText=email
    pMdp.innerText=mdp
    

}


choixMemory.addEventListener("change",afficherExemple)

function afficherExemple(){

    tbMemory.forEach(e => {
        if(e.nom==choixMemory.value){
            imgExemple.src=e.exemple

            const prefMemory = JSON.stringify(e)
            localStorage.setItem("prefMemory", prefMemory)

        }
    });

}


function afficherScore(){

    console.log("___________________________________________")

    const data = JSON.parse(localStorage.getItem("scores"))

    const tbScore = document.getElementById("tbScore")
    

    if (data!=null){

        
        for (let i = 0; i < 5; i++) {

            if(data[i].utilisateur==sessionStorage.getItem("utilisateur"))

            if(data[i]!=null){
                tbScore.children[1].children[i].children[0].innerText = data[i].memory
                tbScore.children[1].children[i].children[1].innerText = data[i].grille
                tbScore.children[1].children[i].children[2].innerText = data[i].utilisateur
                tbScore.children[1].children[i].children[3].innerText = data[i].date
                tbScore.children[1].children[i].children[4].innerText = data[i].nbTentatives
            }else{
                tbScore.children[1].children[i].children[0].innerText = "-"
                tbScore.children[1].children[i].children[1].innerText = "-"
                tbScore.children[1].children[i].children[2].innerText = "-"
                tbScore.children[1].children[i].children[3].innerText = "-"
                tbScore.children[1].children[i].children[4].innerText = "-"
            }

            
        }
  
            
    }

    console.log("___________________________________________")

}