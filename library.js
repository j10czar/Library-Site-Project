var library = []

var user_title
var user_author
var user_pagenums






class Book{
    constructor(a,t,n,r,){
        this.author = a
        this.title = t
        this.pagenum = n
        this.read = r
        this.index = library.length

    }
    createCard(){

        const mainpanel = document.getElementById("book-panel")
        const container = document.createElement("div")
        container.setAttribute("class","book_box")
        container.setAttribute("id","div"+this.index)

        const h3 = document.createElement("h3")
        h3.innerText = this.title

        const p1 = document.createElement("p")
        p1.innerText ="Author: "+this.author

        const p2 = document.createElement("p")
        p2.innerText = "Pages: "+this.pagenum

        const rbutton = document.createElement("button")
        rbutton.innerHTML="Remove"
        rbutton.setAttribute("id","r"+this.index)
        rbutton.setAttribute("type","button")
        rbutton.setAttribute("class","remove")
        rbutton.addEventListener("click", () => {
            document.getElementById("div"+this.index).remove()

            let libIndex = 0

            for(let i = 0; i<library.length;i++)
            {
                if(library[i].index == this.index)
                {
                    libIndex=i
                }
            }
            
            library.splice(libIndex,1)


            saveDataToLocalStorage("library",library)
            


        })


        const mbutton = document.createElement("button")
        mbutton.innerHTML="Mark as read"
        mbutton.setAttribute("id","m"+this.index)
        mbutton.setAttribute("type","button")
        mbutton.setAttribute("class","read")
        if(this.read) 
            {
                container.style.borderColor="rgb(31, 208, 45)"
                mbutton.innerHTML="Mark as unread"
                  
            }
        else 
            {
                container.style.borderColor="rgb(0, 0, 0)"
                mbutton.innerHTML="Mark as read"
                
            }
        mbutton.addEventListener("click", () => {

            if(this.read) 
            {
                document.getElementById("div"+this.index).style.borderColor="rgb(0, 0, 0)"
                mbutton.innerHTML="Mark as read"
                this.read=false   
                saveDataToLocalStorage("library",library)
            }
            else 
            {
                document.getElementById("div"+this.index).style.borderColor="rgb(31, 208, 45)"
                mbutton.innerHTML="Mark as unread"
                this.read=true
                saveDataToLocalStorage("library",library)
            }
        })


    container.appendChild(h3)
    container.appendChild(p1)
    container.appendChild(p2)
    container.appendChild(mbutton)
    container.appendChild(rbutton)
    mainpanel.appendChild(container)

    


    }
}



document.getElementById("add_book").onclick = function(){
    document.querySelector('.bg-modal').style.display = 'flex'
    
}

document.getElementById("button-submit").addEventListener('click',function(){ 
    user_title = document.getElementById('user-title').value
    user_author = document.getElementById('user-author').value
    user_pagenums = document.getElementById('user-pages').value

    if(user_title==""||user_title.length>100)
    {
        document.getElementById('user-title').style.border = "2px solid rgb(247, 77, 77)"
    }
    else if(user_author==""||user_title.length>100)
    {
        document.getElementById('user-author').style.border = "2px solid rgb(247, 77, 77)"
    }
    else if(user_pagenums<0 || user_pagenums>10000 || user_pagenums=="")
    {
        document.getElementById('user-pages').style.border = "2px solid rgb(247, 77, 77)"
    }
    else{
        document.getElementById('user-title').value=''
        document.getElementById('user-author').value=''
        document.getElementById('user-pages').value=''
        document.getElementById('user-title').style.border = "2px solid rgb(221, 221, 221)"
        document.getElementById('user-author').style.border = "2px solid rgb(221, 221, 221)"
        document.getElementById('user-pages').style.border = "2px solid rgb(221, 221, 221)"
        document.querySelector('.bg-modal').style.display='none'
        var user_book = new Book(user_author,user_title,user_pagenums,false)
        library.push(user_book)
        user_book.createCard()  
        saveDataToLocalStorage("library",library)

    }
    
})

document.querySelector('.close').addEventListener('click',function(){
    document.querySelector('.bg-modal').style.display='none'
    document.getElementById('user-title').value=''
    document.getElementById('user-author').value=''
    document.getElementById('user-pages').value=''
    document.getElementById('user-title').style.border = "2px solid rgb(221, 221, 221)"
    document.getElementById('user-author').style.border = "2px solid rgb(221, 221, 221)"
    document.getElementById('user-pages').style.border = "2px solid rgb(221, 221, 221)"
})

function loadDataFromLocalStorage(key) {
    if (localStorage[key] && localStorage) {
      obj = JSON.parse(localStorage[key])
      return obj
    }

    console.log("didnt return an object")
    return null
  }
function saveDataToLocalStorage(key, obj) {
    if (localStorage) {
      localStorage[key] = JSON.stringify(obj)
    }
  }
function deleteDataFromLocalStorage(key) {
    if (localStorage) {
      localStorage.removeItem(key)
    }
  }





if(localStorage.getItem('library') != null)
{
    console.log("Local storage found!")

    let storedLibrary =  JSON.parse(localStorage.library)

    for(let i = 0; i<storedLibrary.length;i++)
    {
        
            let loadedBook = Object.assign(new Book(), storedLibrary[i])
            loadedBook.createCard() 
            library.push(loadedBook)

    }
  
      
}
else
{
    console.log("No local storage found.")
}


