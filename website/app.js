const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=0d6d88364f11e303bb2b994e2f7f5574&units=imperial";

const fromUser = () => {
    const zipCode = document.getElementById("zip").value;
    const feeling = document.getElementById("feelings").value;
    const date = new Date();
    const today = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    return {zipCode,feeling,today}
}

const weather = async (zipCode) => {
    const webRes = await fetch(baseURL + zipCode + apiKey);
    const webData = await webRes.json();
    const temperature = webData.main.temp;
    return temperature
}

const toServer = async (temperature,feeling,today) => {
  
    const localRes = await fetch("/saveData", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify({ temperature, feeling, today }),
      });
    
      const localData = await localRes.json();
}

const fromServer = async () => {
    const lcoalServer = await fetch("/getData");
  const lcoalServerData = await lcoalServer.json();
  return lcoalServerData
}

const updateUI = (lcoalServerData) => {
  
    document.getElementById("temp").innerHTML = lcoalServerData.temperature
    document.getElementById("date").innerHTML = lcoalServerData.today
    document.getElementById("content").innerHTML = lcoalServerData.feeling
}

const performAction = async () => {
try {
    // input&text area&date
 const {zipCode,feeling,today} = fromUser()

 // fetch weather data from website

 const temperature = await weather(zipCode)

 // send fetched data to the local back end to save it by post request
 await toServer(temperature,feeling,today)

 // fetch the data again from the local backend
const lcoalServerData = await fromServer()

 //update the user's UI by the fetched Data
 updateUI(lcoalServerData)
} catch (error) {
  console.log(error)
}

};

document.getElementById("generate").addEventListener("click", performAction);
