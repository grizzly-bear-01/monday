const loadAIData = () => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`
    toggleSpinner(true);
    fetch(url)
        .then(res => res.json())
        .then((data) => {

            displayAllDataIfWant(data.data.tools.slice(0, 6))
            AIElement = data.data.tools.slice(0, 6)
        })



}
const displayAllDataIfWant = (displayUniverse) => {

    const UniverseContainer = document.getElementById("cards-container");
    UniverseContainer.innerHTML = "";
    displayUniverse.forEach((Universe) => {

        const cardElement = document.createElement("div")

        cardElement.classList.add('col')

        cardElement.innerHTML = `
        <div class="card h-100 w-full">
          <img src="${Universe.image}" class="card-img-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-semibold">Features</h5>
              <p class="card-text">1. ${Universe.features[0]}</p>
              <p class="card-text">2. ${Universe.features[1]}</p>
              <p class="card-text">3. ${Universe.features[2]}</p>
            </div>
            <div class="card-footer row w-full">
            <div class="col-9"><h5 class="fw-semibold">${Universe.name}</h5>
            <p><i class="bi bi-calendar-week"></i>  ${Universe.published_in}</p></div>  
            <div class="col-3 py-3" ><button onclick="universeDetails('${Universe.id}')" class=" ms-4 border-0 btn btn-outline-danger " data-bs-toggle="modal" data-bs-target="#universeModalDetail"><i class="bi bi-arrow-right"></i></button></div>
        </div>
        </div> `
        UniverseContainer.appendChild(cardElement)

    })

    toggleSpinner(false);
}

const sortCardsByDate = () => {
    AIElement.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
    displayAllDataIfWant(AIElement);
};



const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none')
    }
    else {
        loaderSection.classList.add('d-none')
    }
}

const universeDetails = async id => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    displayUniverseDetails(data.data)

}

const displayUniverseDetails = details => {
    console.log(details)


    const modalDetails = document.getElementById('helloProgramers')
    modalDetails.innerHTML = `
    <div class=" text-center p-5 container">
      <div class="row">
        <div class="col-sm-6">
          <div class="card border border-2 border-secondary rounded-2 h-100 ">
            <div class="card-body ">
              <h5 class="card-title text-black py-3 text-start">${details.description}</h5>
              <div class="d-flex justify-content-evenly">
                <div class="p-2 bd-highlight border border-success  rounded fw-bold text-success">${details.pricing ? details.pricing["0"].price : 'Free of cost'}<br>${details.pricing ? details.pricing["0"].plan : '/Basic'}</div>
                <div class="p-2 bd-highlight border border-warning  rounded fw-bold text-warning">${details.pricing ? details.pricing["1"].price : 'Free of cost'}<br>${details.pricing ? details.pricing["1"].plan : '/Pro'}</div>
                <div class="p-2 bd-highlight border border-danger    rounded fw-bold text-danger">${details.pricing ? details.pricing["2"].price : 'Free of cost'}<br>${details.pricing ? details.pricing["2"].plan : '/Enterprise'}</div>         
              </div>
                <div class="row mt-5">
                  <div class="col-6">
                    <h5 class="fw-bold text-center">Features</h5>
                      <p><i class="bi bi-dot">${details.features["1"].feature_name}</i></p>
                      <p><i class="bi bi-dot">${details.features["2"].feature_name}</i></p>
                      <p><i class="bi bi-dot">${details.features["3"].feature_name}</i></p>
                  </div>
                  <div class="col-6">
                    <h5 class="fw-bold text-center">Integrations</h5>
                    <p><i class="bi bi-dot">${details.integrations ? details.integrations[0] : 'No data Found'}</i></p>
                    <p><i class="bi bi-dot">${details.integrations ? details.integrations[1] ? details.integrations[1] : 'No data Found' : 'No data Found'}</i></p>
                    <p><i class="bi bi-dot">${details.integrations ? details.integrations[2] ? details.integrations[2] : 'No data Found' : 'No data Found'}</i></p>
                  </div>
                </div>
            </div>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="card h-100">
          ${details.accuracy.score ? `<span class="badge bg-danger w-25 mt-5 position-absolute top-0 end-0">${details.accuracy.score} % accuracy</span>` : ''}
              <img  src="${details.image_link["0"]}" class="card-img p-4 rounded-5">
            <div class="card-body">
              <h5 class="card-title">${details.input_output_examples ? details.input_output_examples["0"].input : 'Can you give us any example?'}</h5>
              <p class="card-text">${details.input_output_examples ? details.input_output_examples["0"].output : 'No! Not yet! Take a break!!'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `

}

loadAIData();

const displayAllDataIfWantTogether = async () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    const res = await fetch(url)
    const data = await res.json();
    displayAllDataIfWant(data.data.tools);

    if (displayAllDataIfWant.length >= displayAllDataIfWantTogether.length) {
        document.getElementById("see-more-btn").style.display = "none";
    }

}