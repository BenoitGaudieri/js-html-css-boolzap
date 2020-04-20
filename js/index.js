$(document).ready(function () {
    let messageArr = ["Ciao come stai?", "Questo è il secondo messaggio"];
    let messageDiv = $(".js-content__messages");
    let newMessage = $(".js-chat--input");
    let text = newMessage.val();
    let answer = "Ok!";

    // Populating messageDisplay with array of old messages
    for (let i = 0; i < messageArr.length; i++) {
        let oldMessage = $(".js-template .message").clone();
        var oldTimestamp = $(".js-template .message--timestamp").clone();

        // Prepend to mantain timestamp
        oldMessage.prepend(messageArr[i]);
        oldTimestamp.prepend(timestampCalc());
        oldMessage.append(oldTimestamp);

        // Display message
        messageDiv.append(oldMessage);
    }

    // Toggle send icon
    newMessage.on("focus blur", function () {
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
    // TODO: select only active conv
    function sendMessage() {
        text = newMessage.val().trim();
        msgDisplay(text);

        // // if not empty append
        // if (text !== "") {
        //     var elementNew = $(".js-template .message").clone();
        //     var timestampNew = $(".js-template .message--timestamp").clone();
        //     elementNew.prepend(text);
        //     timestampNew.prepend(timestampCalc());
        //     elementNew.append(timestampNew);
        //     elementNew.addClass("my-message");
        //     messageDisplay.append(elementNew);
        // }

        // empty input val
        newMessage.val("");
    }

    // TODO: refactoring
    function msgDisplay(text = false) {
        var elementNew = $(".js-template .message").clone();
        var timestampNew = $(".js-template .message--timestamp").clone();
        if (text) {
            if (text !== "") {
                elementNew.prepend(text);
                timestampNew.prepend(timestampCalc());
                elementNew.append(timestampNew);
                elementNew.addClass("my-message");
                messageDiv.append(elementNew);

                setTimeout(msgDisplay, 3000);
            }

            // empty input val
            newMessage.val("");
        } else {
            elementNew.prepend(answer);
            timestampNew.prepend(timestampCalc());
            elementNew.append(timestampNew);
            messageDiv.append(elementNew);
        }
    }

    /**
     * Toggle icon
     */
    function toggleIcon() {
        if (newMessage.val() == "") {
            $(".js-send").toggleClass("fa-microphone active fa-paper-plane");
        }
    }

    /**
     * Inserts zero on num inferior to 10. Used in timestamp.
     */
    function addZero(num) {
        if (num < 10) {
            num = "0" + num;
        }
        return num;
    }

    /**
     * Return styled timestamp
     */
    function timestampCalc() {
        var date = new Date();
        var hour = addZero(date.getHours());
        var minutes = addZero(date.getMinutes());
        var timestamp = hour + ":" + minutes;
        return timestamp;
    }
}); // end Doc ready
