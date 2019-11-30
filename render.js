// export const loadArrayIntoDOM = function() {
//     $(document).on("click");

//     $(document).click(event => {
//         handleButtonPress(event, experiment);
//         event.preventDefault();
//     });
//     $root.on("click", "button#id", function() {
//         experiment.setupNewGame();
//         let z = renderCurrentArray(experiment.gameState);
//         $("h3#score").replaceWith(
//             "<h3 id='score'>Score:" + experiment.gameState.score + "</h3>"
//         );
//         $("h3#lose").remove();
//         $("h3#win").remove();
//         $("section#board").replaceWith(z);
//     });
// };

// $(function() {
//     loadArrayIntoDOM();
// });

// import axios from 'axios';

// const pubRoot = new axios.create({
//   baseURL: "http://localhost:3000/public"
// });

// async function createAuthor({first = 'John', last = 'Doe', numBooks = 0}) {
//   return await pubRoot.post(`/authors/`, {
//     data: {first, last, numBooks}
//   })
// }

// async function getAllAuthors() {
//   return await pubRoot.get('/authors');
// }

// (async () => {
//   await createAuthor({
//     first: "chris",
//     numBooks: 4
//   });

//   let {data} = await getAllAuthors();
//   console.log(data)
// })();