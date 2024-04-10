const getData = async () => {
    const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": "live_SRybE9aClYSKwUZ7WPMIvYqFMfLUr4AzbZeMWVBpQkh8LLKSVHeQqwcP2xa1hvt6"
    });

    return await fetch(
        "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1", {
        method: 'GET',
        headers: headers,
        redirect: 'follow'
    }
    )
        .then(response => response.json())
        .then(result => result[0])
        .catch(error => console.error('Erro ao buscar dados da API:', error));
}

getData()

const findDog = async () => {
    const data = await getData()
    const breeds = data.breeds[0]

    const root = document.getElementById('root')
    if (root.childNodes) {
        [...root.childNodes].forEach(node => node.remove())
    }

    console.log(data)
    const dogPic = document.createElement('img')
    dogPic.src = data.url
    dogPic.className = 'dog-picture'


    const dogName = document.createElement('h2')
    dogName.innerText = breeds.name
    dogName.className = 'dog-name'

    const dogFor = document.createElement('span')
    dogFor.innerText = '(' + breeds.breed_group + ')'
    dogFor.className = 'dog-for'

    const dogTitle = document.createElement('div')
    dogTitle.className = 'dog-title'
    dogTitle.append(dogName, dogFor)

    const dogLifeSpan = document.createElement('p')
    dogLifeSpan.className = 'dog-info'
    dogLifeSpan.innerHTML = `<strong>• LIFE SPAN:</strong> ${breeds.life_span} years`

    const dogTemperament = document.createElement('p')
    dogTemperament.className = 'dog-info'
    dogTemperament.innerHTML = `<strong>• TEMPERAMENT:</strong> ${breeds.temperament} years`

    const dogHeigth = document.createElement('p')
    dogHeigth.className = 'dog-info'
    dogHeigth.innerHTML = `<strong>• HEIGHT:</strong> ${breeds.height.metric}cm`

    const dogWeigth = document.createElement('p')
    dogWeigth.className = 'dog-info'
    dogWeigth.innerHTML = `<strong>• WEIGHT:</strong> ${breeds.weight.metric}cm`

    const dogInfo = document.createElement('div')
    dogInfo.className ='dog-info-area'
    dogInfo.append(dogLifeSpan, dogTemperament, dogHeigth, dogWeigth)

    root.append(dogPic, dogTitle, dogInfo)
}
