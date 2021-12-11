document.addEventListener('DOMContentLoaded', loadPups)

function loadPups() {
    fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => {
        let div = document.querySelector('#dog-bar')
        data.forEach(pup  => {
            let span = document.createElement('span')
            span.innerText = pup.name
            div.appendChild(span)

            let container = document.querySelector('#dog-info')
            span.addEventListener('click', puppies)
            function puppies() {
                container.innerHTML = `
                <img src = ${pup.image} />
                <h2> ${pup.name} </h2>
                `
                let button = document.createElement('button')
                button.setAttribute('id', 'good-bad-dog')
                container.appendChild(button)
                if (pup.isGoodDog == true){
                    button.innerText = 'Good Dog!'
                } else {
                    button.innerText = 'Bad Dog!'
                }
                console.log(pup)
                goodBadButton = document.querySelector('#good-bad-dog')

                goodBadButton.addEventListener('click', (e)=>{changeObj(pup)})
                function changeObj(pup) {
                    console.log(pup)
                    if(button.innerText == 'Good Dog!'){
                        pup.isGoodDog = false
                        button.innerText = 'Bad Dog!'
                    }else if (button.innerText == 'Bad Dog!'){
                        pup.isGoodDog = true
                        button.innerText = 'Good Dog!'
                    
                    }
                }
                    updatePup(pup)
                    function updatePup(pup) {
       
                        fetch(`http://localhost:3000/pups/${pup.id}`,{
                            method : 'PATCH',
                            headers : {
                                'Content-Type' : 'application/json'
                            },
                            body : JSON.stringify(pup)
                            })
                            .then( res => res.json())
                            .then( pup => console.log(pup))
                     
                    }
                
                }
        
            
              
         
            })
    }
    
    )}
    