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

  static add(client, inName) {
    console.log("EnterLeaveMinigame called");
    client.send(JSON.stringify({
      type: "enterminigame",
      name: inName,
    }))
  }

  static remove(client, inName) {
    console.log("Leaving minigame");
    client.send(JSON.stringify({
      type: "leaveminigame",
      name: inName,
    }))
    // fetch('/api/leaveminigame/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: inName,
    //     //secondParam: 'yourOtherValue',
    //   })
    // })
    //   .then(response => {
    //     return response.json();
    //   });
  }

}

export default LeaveMinigame;