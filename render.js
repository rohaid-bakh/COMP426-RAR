export const loadArrayIntoDOM = function() {
    $(document).on("click");

    $(document).click(event => {
        handleButtonPress(event, experiment);
        event.preventDefault();
    });
    $root.on("click", "button#id", function() {
        experiment.setupNewGame();
        let z = renderCurrentArray(experiment.gameState);
        $("h3#score").replaceWith(
            "<h3 id='score'>Score:" + experiment.gameState.score + "</h3>"
        );
        $("h3#lose").remove();
        $("h3#win").remove();
        $("section#board").replaceWith(z);
    });
};

$(function() {
    loadArrayIntoDOM();
});