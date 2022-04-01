document.ontouchmove = (e) => e.preventDefault();

let url =
  "https://sleepy-peak-96457.herokuapp.com/https://www.howmanypeopleareinspacerightnow.com/peopleinspace.json";
let people = [];

async function fetchDataAsync(url) {
  const response = await fetch(url);
  processJSON(await response.json());
}

processJSON = (value) => {
  document.getElementById("num-people").innerHTML = value.number;
  people = value.people;
};

fetchDataAsync(url);
