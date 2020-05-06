
class EnterMinigame {

  constructor(inName) {
    console.log("EnterMinigame started");
    console.log(inName);
    fetch('/api/enterminigame/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: inName,
        //secondParam: 'yourOtherValue',
      })
    })
      .then(response => {
        return response.json();
      });
  }
}

export default EnterMinigame;