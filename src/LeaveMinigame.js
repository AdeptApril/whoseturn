class LeaveMinigame {

  // constructor(inName) {
  //   console.log("LeaveMinigame started");
  //   fetch('/api/leaveminigame/', {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       name: inName,
  //       //secondParam: 'yourOtherValue',
  //     })
  //   })
  //     .then(response => {
  //       return response.json();
  //     });
  // }

  static remove(inName) {
    console.log("LeaveMinigame started");
    fetch('/api/leaveminigame/', {
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

export default LeaveMinigame;