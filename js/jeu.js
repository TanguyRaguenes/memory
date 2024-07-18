let tbSelections=[]
let tbTirages=[]
let tbFinal=[]

let nbOccurences=0
let compteur=0

let tbImages=[]


alimenterTbImages()

function alimenterTbImages(){

    const data = localStorage.getItem("prefMemory")
    const dataExploitable = JSON.parse(data)

    dataExploitable.images.forEach(e => {
        tbImages.push(e)
    });

}



// ***INITIALISATION***
// ______________________________________________________

const grille = document.getElementById("grille")


genererElementsGrille()

reinitialiserJeu()

alimenterTbScores()

function alimenterTbScores(){

    const scores = JSON.parse(localStorage.getItem("scores"))
    console.log(scores)
    const memory = JSON.parse(localStorage.getItem("prefMemory")).nom
    console.log(memory)
    const grille = JSON.parse(localStorage.getItem("prefTailleGrille")).id
    console.log(grille)

    console.log("***************************")

    const tableau=[]

    scores.forEach(e => {
        console.log(e.memory)
        if(e.memory==memory && e.grille==grille){
            tableau.push(e)
        }
    });

    tableau.sort((a,b)=>a.nbTentatives-b.nbTentatives)
    console.log(tableau)

    

        
    for (let i = 0; i < 5; i++) {

        if(tableau[i]!=null){
            tbScore.children[1].children[i].children[0].innerText = tableau[i].memory
            tbScore.children[1].children[i].children[1].innerText = tableau[i].grille
            tbScore.children[1].children[i].children[2].innerText = tableau[i].utilisateur
            tbScore.children[1].children[i].children[3].innerText = tableau[i].date
            tbScore.children[1].children[i].children[4].innerText = tableau[i].nbTentatives
        }else{
            tbScore.children[1].children[i].children[0].innerText = "-"
            tbScore.children[1].children[i].children[1].innerText = "-"
            tbScore.children[1].children[i].children[2].innerText = "-"
            tbScore.children[1].children[i].children[3].innerText = "-"
            tbScore.children[1].children[i].children[4].innerText = "-"
        }

        
    }
  
            
    


}

function genererElementsGrille(){

    const data=localStorage.getItem("prefTailleGrille")
    const dataExploitable=JSON.parse(data)
    // console.log(dataExploitable)
    const lignes = dataExploitable.lignes
    const colonnes = dataExploitable.colonnes
    const nbCases = lignes*colonnes

    const grille = document.getElementById("grille")
    grille.style.gridTemplateRows=`repeat(${lignes}, 1fr)`
    grille.style.gridTemplateColumns=`repeat(${colonnes}, 1fr)`


    for (let i = 0; i < nbCases; i++) {

        const balise = `
        <div  id='carte${i}' class='carte'>
            <div class='avant'>
                <img  src='../images/question.svg' alt=''>
            </div>
            <div class='arriere retourner'>
                <img src='' alt=''>
            </div>
        </div>
        `
        grille.insertAdjacentHTML('beforeend', balise)
        
    }

    const avant = document.querySelectorAll(".avant")
    const arriere = document.querySelectorAll(".arriere")

    avant.forEach(e=> {

        dimensionnerCartes(e,dataExploitable.id)

    });

    arriere.forEach(e=> {
        dimensionnerCartes(e,dataExploitable.id)
    });

 

}

function dimensionnerCartes(carte, dimension){

    switch (dimension) {

        case "grille4x3":
            carte.style.width="18vw"
            carte.style.height="13vh"
            break;

        case "grille6x5":
            carte.style.width="12vw"
            carte.style.height="7vh"
            break;

        case "grille8x7":
            carte.style.width="9vw"
            carte.style.height="4.4vh"
            break;
    
        default:
            break;
    }

}

function reinitialiserJeu(){

    nbOccurences=0
    compteur=0
    tbTirages=[]
    tbFinal=[]

    
    definirPositionImages()

    for(let i=0 ; i<grille.children.length; i++){
        grille.children[i].children[0].classList.remove("retourner")
        grille.children[i].children[1].classList.add("retourner")
    }

    setTimeout(()=>{

        for(let i=0 ; i<grille.children.length; i++){
            grille.children[i].children[1].children[0].src=tbFinal[i]
        }
    

    },1000)

}


// ***POSITION DES IMAGES***
// ______________________________________________________

function definirPositionImages(){

    const data=localStorage.getItem("prefTailleGrille")
    const dataExploitable=JSON.parse(data)
    const lignes = dataExploitable.lignes
    const colonnes = dataExploitable.colonnes
    const nbCases = lignes*colonnes

    
    for (let i = 0; i < nbCases; i++) {

        let tirageEstValide = false

        while (tirageEstValide==false){

            let tirage = TirageAleatoire(nbCases/2)

            if (compterOccurences(tirage, tbTirages)<2){
                
                tbTirages.push(tirage)

                tirageEstValide=true
    
            }


        }
        
    }

    // console.log(tbTirages)

    for (let i= 0; i < tbTirages.length; i++) {
        
        tbFinal[i]=tbImages[tbTirages[i]] 
    }

    // console.log(tbFinal)

}

function TirageAleatoire(plage){

    return(Math.ceil(Math.random()*plage)-1)

}

function compterOccurences(valeur, tableau){

    let nbOccurences=0
    tableau.forEach(e => {
        
        if(e==valeur){
            nbOccurences++
        }
    });

    return nbOccurences

}

// ***GESTION FRAPPE***
// ______________________________________________________

document.addEventListener("keydown", e=>recupererFrappe(e))

function recupererFrappe(e){

    console.log(e.key)
    if(e.key==" "){
        
        alert("Nouvelle partie !")
        reinitialiserJeu()

    }
}

// ***GESTION CLIC SUR IMAGES***
// ______________________________________________________


const carte = document.querySelectorAll(".carte")

carte.forEach(elmt=>elmt.addEventListener('click',(e)=>recupererCible(e)))

function recupererCible(e){

    if(e.target.src.includes("question.svg") && tbSelections.length<2){
        // console.log(e.target.parentElement)
        // console.log(e.target.parentElement.nextElementSibling)
        e.target.parentElement.classList.add("retourner")
        e.target.parentElement.nextElementSibling.classList.remove("retourner")
    }
    
    // console.log(e.target.parentElement.parentElement)
    if(!tbSelections.includes(e.target.parentElement.parentElement)){
        tbSelections.push(e.target.parentElement.parentElement)
    }
    

    // console.log(tbSelections)

    if(tbSelections.length==2){

        const nbTentatives = document.getElementById("nbTentatives")
        compteur++
        nbTentatives.innerText=compteur


        setTimeout(()=>{


            if(tbSelections[0].children[1].children[0].src==tbSelections[1].children[1].children[0].src){
            
                nbOccurences ++
    
                if(nbOccurences==grille.children.length/2){
                    alert("Victoire !")


                    const utilisateur = sessionStorage.getItem("utilisateur")
                    const grille = JSON.parse(localStorage.getItem("prefTailleGrille")).id
                    const memory = JSON.parse(localStorage.getItem("prefMemory")).nom
                    

                    const score = {

                        "utilisateur" : utilisateur,
                        "date" : new Date().toLocaleString(),
                        "nbTentatives" : compteur,
                        "memory" : memory,
                        "grille" : grille

                    }

                    console.log("__________________________________")

                    // console.log(score)

                    const scores=[]
                    scores.push(score)
                    const data= JSON.parse(localStorage.getItem("scores"))
                    
                    if(data!=null){
                        data.forEach(e => {
                            scores.push(e)
                    });
                    }
           
                    
                    // console.log(scores)


                    localStorage.setItem("scores",JSON.stringify(scores))


                }
    
    
    
    
            }else{
                tbSelections.forEach(e => {
                    e.children[0].classList.remove("retourner")
                    e.children[1].classList.add("retourner")
                });

            }



            tbSelections=[]
        },1000)

    }
    
}