$(document).ready(function () {
    let messageArr = ["Ciao come stai?", "Questo è il secondo messaggio"];
    let messageDisplay = $(".js-content__messages");
    let newMessage = $(".js-chat--input");
    let text = newMessage.val();

    // Populating messageDisplay with array of old messages
    for (let i = 0; i < messageArr.length; i++) {
        let oldMessage = $(".js-template .message").clone();

        // Prepend to mantain timestamp
        oldMessage.prepend(messageArr[i]);

        // Display message
        messageDisplay.append(oldMessage);
    }

    // Toggle send icon
    newMessage.focus(function () {
        $(".js-send").addClass("fa-paper-plane");
        $(".js-send").removeClass("fa-microphone active");
    });

    newMessage.blur(function () {
        toggleIcon();
    });

    // Send message

    $(".js-send").click(function () {
        sendMessage();
        toggleIcon();
    });

    newMessage.keyup(function (e) {
        if (e.which == 13 || e.keyCode == 13) {
            sendMessage();
        }
    });

    /**
     * FUNCTIONS
     */

    /**
     * cloning the js-template html to display the message
     */
    function sendMessage() {
        text = newMessage.val();

        // if not empty append
        if (text !== "") {
            var elementNew = $(".js-template .message").clone();
            elementNew.prepend(text);
            elementNew.addClass("my-message");
            messageDisplay.append(elementNew);
        }

        // empty input val
        newMessage.val("");
    }

    /**
     * Toggle icon
     */
    // TODO: refactor toggle
    function toggleIcon() {
        if (newMessage.val() == "") {
            $(".js-send").removeClass("fa-paper-plane");
            $(".js-send").addClass("fa-microphone active");
        }
    }
}); // end Doc ready
