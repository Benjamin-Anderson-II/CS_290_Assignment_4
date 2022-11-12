/*
 * Write your client-side JS code in this file.  Don't forget to include your
 * name and @oregonstate.edu email address below.
 *
 * Name:  Benjamin Anderson II
 * Email: anderbe2@oregonstate.edu
 */

var postList = document.querySelectorAll('.post')
postList = Array.from(postList).map(e=>e)

//Toggles the modal's visibility
function toggleModal(){
    document.getElementById("modal-backdrop").classList.toggle("hidden")
    document.getElementById("sell-something-modal").classList.toggle("hidden")
}

function createPostHandler(event){
    //-----------------------------------Create New Post-----------------------------------//
    var nothingWrong = true
    var postInfo = []
    postInfo[0] = document.getElementById('post-text-input').value
    postInfo[1] = document.getElementById('post-photo-input').value
    postInfo[2] = document.getElementById('post-price-input').value
    postInfo[3] = document.getElementById('post-city-input').value
    postInfo[4] = document.querySelectorAll("input[name='post-condition']:checked")[0].value

    postInfo.every(function(cur){
        if(cur===''){
            alert("You have not filled in one or more fields!")
            nothingWrong = false
            return false
        }
        nothingWrong = true
        return true
    })

    if(nothingWrong){

        //-------------------------------------Add City To Filter-----------------------------------//
        var filterCity = document.getElementById("filter-city")
        var cities = Array.from(filterCity.options).map(e => e.value)
        if(cities.findIndex(e => e.toLowerCase()===postInfo[3].toLowerCase()) === -1){  // city is not in list
            var newCity = document.createElement("option")
            newCity.textContent = postInfo[3]
            filterCity.appendChild(newCity)
        } else {                                                                        // city is in list
            // adjusts the value of the city to the one in the list
            postInfo[3] = cities[cities.findIndex(e => e.toLowerCase()===postInfo[3].toLowerCase())]
        }

        var postSection = document.getElementById("posts")
        var newPostDiv = document.createElement("div")
        newPostDiv.classList.add("post")
        newPostDiv.setAttribute('data-price', postInfo[2])
        newPostDiv.setAttribute('data-city', postInfo[3])
        newPostDiv.setAttribute('data-condition', postInfo[4])
        postSection.appendChild(newPostDiv)

        var postContentsDiv = document.createElement("div")
        postContentsDiv.classList.add("post-contents")
        newPostDiv.appendChild(postContentsDiv)

        var postImageContainerDiv = document.createElement("div")
        postImageContainerDiv.classList.add("post-image-container")
        postContentsDiv.appendChild(postImageContainerDiv)

        var postImage = document.createElement("img")
        postImage.setAttribute('src', postInfo[1])
        postImage.setAttribute('alt', postInfo[0])
        postImageContainerDiv.appendChild(postImage)

        var postInfoContainerDiv = document.createElement("div")
        postInfoContainerDiv.classList.add("post-info-container")
        postContentsDiv.appendChild(postInfoContainerDiv)

        var postTitle = document.createElement("a")
        postTitle.setAttribute("href", "#")
        postTitle.classList.add('post-title')
        postTitle.textContent = postInfo[0]
        postInfoContainerDiv.appendChild(postTitle)

        var postPrice = document.createElement("span")
        postPrice.classList.add("post-price")
        postPrice.textContent = "$"+postInfo[2]
        postInfoContainerDiv.appendChild(postPrice)

        var postCity = document.createElement("span")
        postCity.classList.add("post-city")
        postCity.textContent = '('+postInfo[3]+')'
        postInfoContainerDiv.appendChild(postCity)

        //-----------------------------------append new post to list-----------------------------------//
        postList.push(postSection.lastChild)

        //-----------------------------------Clear Inputs and Remove Overlay Overlay-----------------------------------//
        document.getElementById('post-text-input').value = ''
        document.getElementById('post-photo-input').value = ''
        document.getElementById('post-price-input').value = ''
        document.getElementById('post-city-input').value = ''
        document.getElementById('post-condition-new').checked = true
        toggleModal()
    }
}

function filterItemsHandler(event){
    //remove everything from the list
    for (var i = postList.length - 1; i >= 0; i--) {
        postList[i].remove()
    }
    //re-add everything back to the page
    var posts = document.getElementById('posts')
    for (var i = 0; i < postList.length; i++) {
        posts.appendChild(postList[i])
    }

    //get filters
    var textFilter = document.getElementById('filter-text').value.toLowerCase()
    var minPriceFilter = document.getElementById('filter-min-price').value
    var maxPriceFilter = document.getElementById('filter-max-price').value
    var cityFilter = document.getElementById('filter-city').value
    var conditionFilter = document.querySelectorAll("input[name='filter-condition']:checked")
    conditionFilter = Array.from(conditionFilter).map(e => e.value)

    //remove posts that do not have filters
    for(var i = postList.length-1; i >= 0; i--){
        var postText = postList[i].querySelector(".post-title").textContent.toLowerCase()
        var postPrice = postList[i].dataset.price
        var postCity = postList[i].dataset.city
        var postCondition = postList[i].dataset.condition
        if
        (       postText.includes(textFilter) == false                                      // filter text is in title
            || (minPriceFilter && parseInt(postPrice) < parseInt(minPriceFilter))           // price isn't too low
            || (maxPriceFilter && parseInt(postPrice) > parseInt(maxPriceFilter))           // price isn't too high
            || (cityFilter && cityFilter !== postCity)                                      // city is in filter
            || (conditionFilter.length>0 && conditionFilter.includes(postCondition)==false)
        )
            postList[i].remove() // technically this is a 1-line if (I just broke up the conditions)
    }
}

var sellSomethingButton = document.getElementById("sell-something-button")
sellSomethingButton.addEventListener("click", toggleModal)

var createPostButton = document.getElementById("modal-accept")
createPostButton.addEventListener("click", createPostHandler)

var modalCancel = document.getElementById("modal-cancel")
var modalClose = document.getElementById("modal-close")
modalClose.addEventListener("click", toggleModal)
modalCancel.addEventListener("click", toggleModal)

var updateButton = document.getElementById('filter-update-button')
updateButton.addEventListener('click', filterItemsHandler)