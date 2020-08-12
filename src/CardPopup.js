import React from 'react';
import './index.css';

// const level1Cards = [
//   {id:1, text:"Dennis is asshole. Why Charlie Hate? Answer: Because Dennis is a bastard man."},
//   {id:2, text:"Puzzle: Put this bottle back together"},
//   {id:3, text:"Advance to Level 2"},
//   // {id:4, text:""},
//   // {id:5, text:""},
//   // {id:6, text:""},
//   // {id:7, text:""},
//   // {id:8, text:""},
//   // {id:9, text:""},
//   // {id:10, text:""},
//   // {id:11, text:""},
//   // {id:12, text:""},
//   // {id:13, text:""},
//   // {id:14, text:""},
//   // {id:15, text:""},
//   // {id:16, text:""},
//   // {id:17, text:""},
//   // {id:18, text:""},
//   // {id:19, text:""},
//   // {id:20, text:""},
//   // {id:21, text:""},
//   // {id:22, text:""},
//   // {id:23, text:""},
//   // {id:24, text:""},
//   // {id:25, text:""},
//   // {id:26, text:""},
//   // {id:27, text:""},
//   // {id:28, text:""},
//   // {id:29, text:""},
//   // {id:30, text:""},
//   // {id:31, text:""},
//   // {id:32, text:""},
//   // {id:33, text:""},
//   // {id:34, text:""},
//   // {id:35, text:""},
//   // {id:36, text:""},
//   // {id:37, text:""},
//   // {id:38, text:""},
//   // {id:39, text:""},
//   // {id:40, text:""},
//   // {id:41, text:""},
//   // {id:42, text:""},
//   // {id:43, text:""},
//   // {id:44, text:""},
//   // {id:45, text:""},
//   // {id:46, text:""},
//   // {id:47, text:""},
//   // {id:48, text:""},
//   // {id:49, text:""},
//   // {id:50, text:""},
//   // {id:51, text:""},
//   // {id:52, text:""},
//   // {id:53, text:""},
//   // {id:54, text:""},
//   // {id:55, text:""},
//   // {id:56, text:""},
//   // {id:57, text:""},
//   // {id:58, text:""},
//   // {id:59, text:""},
//   // {id:60, text:""},
//   // {id:61, text:""},
//   // {id:62, text:""},
//   // {id:63, text:""},
//   // {id:64, text:""},
//   // {id:65, text:""},
//   // {id:66, text:""},
//   // {id:67, text:""},
//   // {id:68, text:""},
//   // {id:69, text:""},
//   // {id:70, text:""},
//   // {id:71, text:""},
//   // {id:72, text:""},
//   // {id:73, text:""},
//   // {id:74, text:""},
//   // {id:75, text:""},
//   // {id:76, text:""},
//   // {id:77, text:""},
//   // {id:78, text:""},
//   // {id:79, text:""},
//   // {id:80, text:""},
//   // {id:81, text:""},
//   // {id:82, text:""},
//   // {id:83, text:""},
//   // {id:84, text:""},
//   // {id:85, text:""},
//   // {id:86, text:""},
//   // {id:87, text:""},
//   // {id:88, text:""},
//   // {id:89, text:""},
//   // {id:90, text:""},
//   // {id:91, text:""},
//   // {id:92, text:""},
//   // {id:93, text:""},
//   // {id:94, text:""},
//   // {id:95, text:""},
//   // {id:96, text:""},
//   // {id:97, text:""},
//   // {id:98, text:""},
//   // {id:99, text:""},
//   // {id:100, text:""},
//   // {id:101, text:""},
//   // {id:102, text:""},
//   // {id:103, text:""},
//   // {id:104, text:""},
//   // {id:105, text:""},
//   // {id:106, text:""},
//   // {id:107, text:""},
//   // {id:108, text:""},
//   // {id:109, text:""},
// ];

const level2Cards = [
  {id:1, text:"Some fish card that might contains some words in  “You must dance in the dance in rounds”"},
  {id:2, text:"Choose any player and win an arm wrestling match"},
  {id:3, text:"Drink from two glasses simultaneously"},
  {id:4, text:"Close your eyes and stretch out your arms. Try to connect the fingers of both hands on the first try."},
  {id:5, text:"Drink with your mouth wide open"},
  {id:6, text:"Choose a player. They must play the next round standing up."},
  {id:7, text:"Play this card when you are about you take a drink. Choose another player. They must drink instead of you."},
  {id:8, text:"Clench your fist, balance a drink on it, then drink it."},
  {id:9, text:"Stick a pen cap to your tongue and keep it that way until your next turn."},
  {id:10, text:"Put a coin in your eye and keep it there until your next turn."},
  {id:11, text:"Drink while lying on the ground."},
  {id:12, text:"Pretend to be an airplane pilot flying in very low visibility conditions."},
  {id:13, text:"Put your hand in your mouth and keep it that way until your next turn."},
  {id:14, text:"Pick a name for yourself. All players must call you by this name until the end of the game."},
  {id:15, text:"Drink a shot from your elbow without holding it with the other hand."},
  {id:16, text:"Each player gives you a compliment."},
  {id:17, text:"You can go to the bathroom."},
  {id:18, text:"Choose a player. They must kiss you."},
  {id:19, text:"Give your phone to any player and they can change its settings for the night"},
  {id:20, text:"Do 15 squats"},
  {id:21, text:"Keep your hands behind your back until your next turn."},
  {id:22, text:"Stand for 5 seconds on your heels."},
  {id:23, text:"Drink like a dog."},
  {id:24, text:"Change the seating order of the players as you like."},
  {id:25, text:"Choose a player. He, she, or they must dance a hot dancing while sitting on your lap."},
  {id:26, text:"Play when another player uses a bonus card. Cancel that card."},
  {id:27, text:"Never have I ever"},
  {id:28, text:"Play this card when you are about to take a drink. Choose another player. They must drink instead of you."},
  {id:29, text:"Name 3 works written by Sir Arthur Conan Doyle."},
  {id:30, text:"Put the cat hat out and street perform until you earn $3 or 30 minutes has passed."},
  {id:31, text:"Pretend you’re a heroin addict. Try to score from 3 people. Be in character the whole time."},
  {id:32, text:"Refer to yourself in 3rd person all night. 3 strikes."},
  {id:33, text:"Stand, close your eyes, and try to walk around the table and return to your seat. Time it +5 seconds"},
  {id:34, text:"You must speak in rhyme until your next turn."},
  {id:35, text:"Win a game of “Rock, Paper, Scissors” against another player."},
  {id:36, text:"Other players cut up to 2 inches off your hair (any style)"},
  {id:37, text:"Player must remove an item of clothing of others’ choice."},
  {id:38, text:"Play when another player uses a bonus card. Cancel that card."},
  {id:39, text:"Pick a name for yourself. All players must call you by this name until the end of the night."},
  {id:40, text:"All players, except you, drink."},
  {id:41, text:"Spin 360 degrees 10 times in 15 seconds."},
  {id:42, text:"Play this card when you are about to take a drink. Choose another player. They must drink instead of you."},
  {id:43, text:"Until your next turn, you must remain completely silent."},
  {id:44, text:"Ask a toast from any player. Everyone drinks."},
  {id:45, text:"Miss your turn."},
  {id:46, text:"Grind with the oldest person in the bar for 5 minutes (2 songs) and exchange real numbers."},
  {id:47, text:"Choose a player who is about to do a task. They must do the task twice to succeed."},
  {id:48, text:"Drink, but rinse your mouth and gargle with it before swallowing."},
  {id:49, text:"Choose a player. They must remove an item of clothing."},
  {id:50, text:"Put hard alcohol in your mouth. Don’t drink. Keep it in your mouth until your next turn. Swallow it at the end."},
  {id:51, text:"Change the seating order of the players as you like."},
  {id:52, text:"Be super depressing to strangers all night. 3 strikes."},
  {id:53, text:"Say a toast using only words that start with the letter “D”. Minimum 10 words."},
  {id:54, text:"Players pick a nickname for you. All players must call this player by this nickname until the end of the night."},
  {id:55, text:"Play when another player uses a bonus card. Cancel that card."},
  {id:56, text:"Say a sexy toast including the words “DesoxyRiboNucleoid” and “Butt”. Successful and everyone drinks."},
  {id:57, text:"Choose a player. They must dance a hot dance."},
  {id:58, text:"Choose a player. For the rest of the game, he, she, or they must drink every time you drink. Doesn’t count for advancement."},
  {id:59, text:"Don’t laugh until your next turn."},
  {id:60, text:"Say eight long words in 30 seconds. Every word must contain more than 10 letters."},
  {id:61, text:"Say a toast about love while using the words “differentiation” and “sub-equatorial climate”."},
  {id:62, text:"Put on an item of clothing that has been previously removed."},
  {id:63, text:"Say it clearly and fast: “Georgy the geologist is the hero of gay orgies.”"},
  {id:64, text:"In 20 seconds, spell the word “difficult”, backwards."},
  {id:65, text:"Say it clearly and fast: “Just compare heart, beard, and heard, dies and diet, lord and word. Sword and Sward, Retain and Britain”"},
  {id:66, text:"Post a fabricated story about any player on facebook. They must say that all of it is true. Refusal costs 3 drinks."},
  {id:67, text:"Until your next turn, you must drink loudly whenever another players drinks."},
  {id:68, text:"Advertise any object as a TV advertisement in such a way that someone would but it from you."},
  {id:69, text:"Make up the tale of the “ratcatcher” like you are a rat."},
  {id:70, text:"Name 10 countries which have the color blue in their flag. 1 mistake allowed."},
  {id:71, text:"Rap w/ swear words one verse of your favorite children’s song. No f-word."},
  {id:72, text:"Don’t use nouns until your next turn."},
  {id:73, text:"You must talk with a very deep voice until your next turn."},
  {id:74, text:"Name two well-known chemists."},
  {id:75, text:"Choose a player. They must sit under the table until your next turn."},
  {id:76, text:"Until your next turn. Every time another player says anything, pretend to sneeze loudly."},
  {id:77, text:"You can smoke."},
  {id:78, text:"Miss your turn."},
  {id:79, text:"Choose a player who is about to do a task. They must do the task twice to succeed."},
  {id:80, text:"Give a backhanded-compliment to each player without repeating yourself."},
  {id:81, text:"Choose any player and have a drink with him or her."},
  {id:82, text:"You can smoke."},
  {id:83, text:"Speak according to 19th century etiquette until your next turn."},
  {id:84, text:"Put on an item of clothing, chosen by others, that has been previously removed, for the rest of the game."},
  {id:85, text:"Choose a player. They must remove an item of clothing."},
  {id:86, text:"All men around the table drink."},
  {id:87, text:"Choose a player. They must sing a verse from a song."},
  {id:88, text:"Do 10 push-ups."},
  {id:89, text:"Choose any player and have a drink with him or her. Doesn’t count for advancement."},
  {id:90, text:"All ladies around the table drink. Doesn’t count for advancement."},
  {id:91, text:"Speak with a redneck accent until your next turn."},
  {id:92, text:"Change the direction of the game."},
  {id:93, text:"Say a toast about the ladies including the words “gas lamp” and “monkey wrench”"},
  {id:94, text:"Choose a card from the discard pile and put it back on top of the deck."},
  {id:95, text:"Until your next turn, whenever you say anything, you must whisper it."},
  {id:96, text:"Play this card when you are about to take a drink. Choose another player. They must drink instead of you."},
  {id:97, text:"Place a shot on the floor and drink it without touching it."},
  {id:98, text:"You can go to the bathroom."},
  {id:99, text:"Tell a vulgar story of your life."},
  {id:100, text:"Drink while jumping."},
  {id:101, text:"Say it clearly and fast: “Ivy, privy, famous, clamour, and enamour rhyme with hammer. River, rival, tomb, bomb, comb, doll and roll and some and home.”"},
  {id:102, text:"Hang your tongue out and keep it that way until your next turn."},
  {id:103, text:"Remove 1 item of clothing (accessories do not count)."},
  {id:104, text:"Act out (without words) a well-known painting."},
  {id:105, text:"You can smoke."},
];

const level3Cards = [
  {id:1, text:"Nip (or ass or vagina or ball slip) until someone tells the person their nip is out, or 15 minutes."},
  {id:2, text:"Eat food of opponents’ choice within a set amount of time pre-determined by opponents"},
  {id:3, text:"Write a word of four letters on your forehead"},
  {id:4, text:"Use your phone to swipe right until group picks someone. Ask them to meet."},
  {id:5, text:"Celebrate this morning’s abortion all night"},
  {id:6, text:"Convince at least 2 people to join your clan of monster hunters"},
  {id:7, text:"Dance while crouching"},
  {id:8, text:"Send the text, “Sorry, I scratched your car” to a number chosen by another player"},
  {id:9, text:"Heavily ass-grab someone until they turn around. DO NOT ACKNOWLEDGE and ignore them the rest of the night"},
  {id:10, text:"Make out with at least 7 people (of your choice) before the ned of the night. End of the night = whenever we come home"},
  {id:11, text:"Question Master"},
  {id:12, text:"Make up a rude limerick about one of the other players"},
  {id:13, text:"Smell another player’s armpit, then drink"},
  {id:14, text:"Take pictures in three different poses. The poses are chosen by other players"},
  {id:15, text:"Get 2 people to give you their underwear (no bras). Cannot mention the game of games. Pretend you have a fetish."},
  {id:16, text:"Thumb Master"},
  {id:17, text:"Get a piercing (the group splits the cost. Up to $40)"},
  {id:18, text:"Choose a player of the opposite sex. Speak when they speak, at the same time, repeating everything word for word."},
  {id:19, text:"Categories"},
  {id:20, text:"Send the text, “I have 2 stripes, what to do?” to a number chosen by another player."},
  {id:21, text:"Challenge another player to a drinking or eating competition and win it."},
  {id:22, text:"Take a picture while sitting on a nearby player’s lap."},
  {id:23, text:"Change footwear with any other player."},
  {id:24, text:"Pick a mate"},
  {id:25, text:"Anyone who says something to you, say “what?” every time"},
  {id:26, text:"Send the text, “My underside has fallen off, can you tell me what to do?” to a number chosen by another player."},
  {id:27, text:"Rhyme"},
  {id:28, text:"Each player may ask you one question with you must answer truthfully"},
  {id:29, text:"You hav ea foot fetish. Touch the bottom of 3 people’s feet."},
  {id:30, text:"Opponents make a rule for you all night"},
  {id:31, text:"Send the text, “You ruined my life!” to a number chosen by another player."},
  {id:32, text:"Convince any player to make a declaration of love to you."},
  {id:33, text:"With the help of the other players, take a photo of all of you recreating a famous landmark."},
  {id:34, text:"Get 5 drinks (of their choice) bought for you from different people."},
  {id:35, text:"Describe briefly what “Harry Potter” is about, using modern slang"},
  {id:36, text:"Be a racist all night"},
  {id:37, text:"Use your phone to call a random number and say that you are a character from a fairy tale"},
  {id:38, text:"Change pants with any other player."},
  {id:39, text:"Give a lovebite to a player of the opposite gender."},
  {id:40, text:"Draw marks on your neck and face so you look like Frankenstein."},
  {id:41, text:"Remove 1 item of clothing (accessories do not count)."},
  {id:42, text:"Convince any player to cuddle with you."},
  {id:43, text:"Draw a bruise around your eye so it looks like you have a black eye"},
  {id:44, text:"All players, except you, drink."},
  {id:45, text:"Tear drop in pen on your cheek for the rest of the night."},
  {id:46, text:"No makeup all night."},
  {id:47, text:"All ladies around the table drink."},
  {id:48, text:"You can go to the bathroom."},
  {id:49, text:"Close your eyes and keep them closed until your next turn."},
  {id:50, text:"Send the text “kisses” to a number chosen by another player."},
  {id:51, text:"Have blood obviously running down your leg. Ask 3 people for a tampon."},
  {id:52, text:"Kiss someone with a mustache with tongue"},
  {id:53, text:"Close your eyes and get all other players to stand in a line. You must recognize each one by touch."},
  {id:54, text:"Give someone a handie in the bar. Hand must touch genitals and be inside the bar. Skin on skin, 3 pumps."},
  {id:55, text:"Talk and Act like the Terminator until your next turn."},
  {id:56, text:"Every time you buy or accept a drink you must chug it (once you start drinking it you can’t stop)"},
];

// const API_KEY = 'AIzaSyCGi_Gofp8TC2lZaejSoHrhYelK6zhT18I';
// const shareUrl = 'https://docs.google.com/spreadsheets/d/1dQtOfi_e_W0CLvBDp3mByXcERS-QoO5FBrOmkaBTXcE/edit?usp=sharing';
// const { rows, isFetching } = useGoogleSpreadsheet(shareUrl, API_KEY);

class CardPopup extends React.Component {
  constructor(props) {
    super(props);
    this.getLevel1Cards = this.getLevel1Cards.bind(this);
    let min = 1;
    let max = level2Cards.length;
    let rand =  min + Math.floor((Math.random() * (max-min)));
    console.log(rand.toString());
    this.state = {
      level: props.level,
      cardText: "default",
      level1FromGoogle: null,
    };
    // console.log("LEVEL IS SET TO: " + this.state.level);
  }

  componentDidMount() {
    //Grab a random card, depending on the player's current level
    // this.getLevel1Cards().then(result => this.setCard(result), null);
    this.getLevel1Cards();
  }

  setCard(level1Questions) {
    console.log("Level 1 Questions: ");
    console.log(level1Questions);
    let min = 1;
    if(this.state.level === 1) {
      // let max = level1Cards.length;
      let max = level1Questions.length -2;
      let rand =  (min + Math.floor((Math.random() * (1+max-min))/2))*2;
      //2, 4, 6 are questions, 3,5,7 are answers to those questions. I have no idea if it'll always be like this, as I don't know the Google format.
      //TODO: See what the format is supposed to be. This may cause problems in the future.
      // this.setState({cardText: level1Cards.find(item => item.id === rand).text});
      // this.setState({cardText: level1Questions.find(item => item.id === rand).text});
      this.setState({cardText: level1Questions[rand].content.$t});
    }
    else if(this.state.level === 2) {
      let max = level2Cards.length;
      let rand = min + Math.floor((Math.random() * (max - min)));
      this.setState({cardText: level2Cards.find(item => item.id === rand).text});
    }
    if(this.state.level === 3) {
      let max = level3Cards.length;
      let rand = min + Math.floor((Math.random() * (max - min)));
      this.setState({cardText: level3Cards.find(item => item.id === rand).text});
    }
  }

  render() {
    return (
      <div className='popup'>
        {this.state.cardText}
        <div className='popup\_inner'>
          {/*<h1>{this.props.text}</h1>*/}
          <button id="innerCardPopupButton" onClick={this.props.closePopup}>close</button>
        </div>
      </div>
    );
  }

  async getLevel1Cards() {

    await fetch('https://spreadsheets.google.com/feeds/cells/1dQtOfi_e_W0CLvBDp3mByXcERS-QoO5FBrOmkaBTXcE/1/public/values?alt=json', {
      method: 'GET',
      apiKey: 'AIzaSyCGi_Gofp8TC2lZaejSoHrhYelK6zhT18I',
    })
      .then(response => {
        return response.json();
      }).then(result => {
      this.setState({level1FromGoogle: result});
      console.log("Google JSON:");
      console.log(result);
      console.log("Entry: ");
      console.log(result.feed.entry);
      // return result;
      this.setCard(result.feed.entry);
    });
  }
}

export default CardPopup;