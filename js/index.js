$(document).ready(function () {
    let messageArr = ["Ciao come stai?", "Questo è il secondo messaggio"];
    var messageDisplay = $(".content__messages");

    // Populating messageDisplay with array of old messages
    for (let i = 0; i < messageArr.length; i++) {
        let oldMessage = $(".template .message").clone();

        // Prepend to mantain timestamp
        oldMessage.prepend(messageArr[i]);

        // Display message
        messageDisplay.append(oldMessage);
    }

    // Send message
    var newMessage = $(".chat--input");

    newMessage.keyup(function (e) {
        if (e.which == 13 || e.keyCode == 13) {
            var text = newMessage.val();
            console.log(text);

            // if not empty append
            if (text !== "") {
                var elementNew = $(".template .message").clone();
                elementNew.prepend(text);
                elementNew.addClass("my-message");
                messageDisplay.append(elementNew);
            }

            // empty input val
            newMessage.val("");
        }
    });
}); // end Doc ready
