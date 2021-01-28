const api = {
    id: '3244fe2f',
    key: '1f0c171cc84329ec2394c8ed9f7ba759'
};
let page = {
    from: '0',
    to: '15'
};
let from = parseInt(page.from)
let to = parseInt(page.to)
let diff = to - from

const search_form = document.querySelector('.recipe__search_form');
const next_btn = document.querySelector('.recipe__search_next');
const prev_btn = document.querySelector('.recipe__search_prev');
const container = document.querySelector('.recipe__search');
const search_btn = document.querySelector('.recipe__search_btn')


let search_value;


let search_list = document.querySelector('.recipe__list')

search_form.addEventListener("submit", (evt) => {
    DopFunc(evt)
});

search_btn.addEventListener('submit', (evt) => {
    DopFunc(evt)
});

next_btn.addEventListener('click', function (evt) {
    evt.preventDefault()
    changePage(2)
})

prev_btn.addEventListener('click', function (evt) {
    evt.preventDefault()
    changePage(1)
})

function DopFunc(evt) {
    evt.preventDefault();
    search_value = evt.target.querySelector('.recipe__search_input').value;
    getResults(search_value);
    container.classList.remove('start_position')
    prev_btn.classList.remove('visible')
    next_btn.classList.add('visible')
    prev_btn.classList.remove('hidden')
    next_btn.classList.add('hidden')
};


function getResults(name) {
    console.log(name);
    let url = `https://api.edamam.com/search?q=${name}&app_id=${api.id}&app_key=${api.key}&from=${page.from}&to=${page.to}`;
    console.log(url);
    fetch(url)
        .then(recipe => {
            return recipe.json()

        }).then(data => {
        return data.hits
    }).then(createHTML)


        .catch((error) => {
            alert("There is a mistake, please reload website")
        });
}

function changePage(mean) {
    if (mean === 1 && to === diff) {
        stop()
    } else if (mean === 2) {
        from += diff
        to += diff
    } else if (mean === 1) {
        from -= diff
        to -= diff
    }
    page.to = String(to)
    page.from = String(from)
    console.log(page);
    getResults(search_value)
}

function createHTML(recipe) {
    console.log(recipe)
    let newHTML = '';
    let addStr  = 0;

    recipe.map((one) => {
        addStr = one.recipe.totalTime
        if (addStr===0) {
            addStr = '';
        }
        else {
            addStr+=' min'
        }
        newHTML += `
        <div class="recipe__list_item">
            <div class="recipe__list_item_img_wrapper"></div>
            <img src="${one.recipe.image}" alt="" class="recipe__list_item_img">
            <div class="recipe__list_item_name">${one.recipe.label}</div>
            <div class="recipe__list_item_info">
                <div class="recipe__list_item_info_calories">${Math.round(one.recipe.calories)} calories</div>
                <div class="recipe__list_item_info_time">${addStr}</div>
                <div class="recipe__list_item_info_diet">Diet: ${one.recipe.healthLabels}</div>
            </div>
            <a href="${one.recipe.url}" class="recipe__list_item_btn" target="_blank"></a>
        </div>
        `
        if (one.recipe.totalTime === 0){
            console.log(one.recipe.totalTime);
        }
    });
    search_list.innerHTML = newHTML
}
