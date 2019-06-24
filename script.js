let output = document.getElementById('output');
const breedList = document.getElementById('breed-list');

// fetch all dog breeds for select options
(function() {
  fetch(`https://dog.ceo/api/breeds/list/all`)
  .then(response => {
    return response.json();
  })
  .then(data => {
    let output = '';
    for(let key in data.message){
      output += `<option value="${key}">${key}</option>`;
    }
    breedList.innerHTML = output;

  })
  .catch(err => console.log(err));
}());

// loading spinner
const loader = () => {
  const loader = '<img src="ajax-loader.gif">';
  output.innerHTML = loader;
}

// get random image
const getRandomImage = () => {
  loader();
  fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => {
      return response.json();
    })
    .then(data => {
        output.innerHTML = `<img src="${data.message}" style="width: 300px">`
    })
    .catch(err => console.log(err));
}

// get selected breed
const getDogBreed = (e) => {
  loader();
  fetch(`https://dog.ceo/api/breed/${e.target.value}/images/random/5`)
    .then(response => {
      return response.json();
    })
    .then(data => {
      let result = '';
      data.message.forEach(image => {
        result += `<img src="${image}" style="width: 300px">`;
      });
      output.innerHTML = result;
    })
    .catch(err => console.log(err));
}

// event listeners
document.getElementById('random').addEventListener('click', getRandomImage);
breedList.addEventListener('change', getDogBreed);

