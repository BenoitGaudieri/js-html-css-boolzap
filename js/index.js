$(document).ready(function () {
    // Message references
    let messageArr = ["Ciao come stai?", "Questo è il secondo messaggio"];
    let newMessage = $(".js-chat--input");
    let text = newMessage.val();
    let answer = "Ok!";

    // Sidebar references
    let sidebar = $(".js-sidebar__content");
    let searchBar = $(".js-searchbar");
    // User list
    let userList = [
        "michele",
        "fabio",
        "samuele",
        "alessandro b.",
        "alessandro l.",
        "claudia",
        "davide",
        "federico",
    ];

    // Populating sidebar and conversations
    for (let s = 0; s < userList.length; s++) {
        // Sidebar
        let newUser = $(".js-template .js-user--div").clone();
        //Username
        newUser.find(".user--username").text(userList[s]);
        // Message
        newUser.find(".user--last-message").text("Che fame");
        //Pic
        newUser.find(".user-pic").attr("src", "img/avatar_" + (s + 1) + ".jpg");
        //Data attr
        newUser.attr("data-conversation", s);
        sidebar.append(newUser);

        // Conversations
        let newConvo = $(".js-template .js-conversation").clone();
        newConvo.attr("data-conversation", s);
        $(".content__messages--margin").append(newConvo);
    }
    // First element active
    $(".js-user--div:first-child").addClass("active");
    $(".js-conversation:first-child").addClass("active");

    // Reference to the active
    let messageDivActive = $(".js-conversation.active .js-content__messages");

    // Populating messageDisplay with array of old messages
    for (let i = 0; i < messageArr.length; i++) {
        // Previously:
        // let oldMessage = $(".js-template .message").clone();
        // var oldTimestamp = $(".js-template .message--timestamp").clone();
        // Prepend to mantain timestamp
        // oldMessage.prepend(messageArr[i]);
        // oldTimestamp.prepend(timestampCalc());
        // oldMessage.append(oldTimestamp);
        // // Display message
        // messageDiv.append(oldMessage);

        // Refactored:
        msgDisplay(messageArr[i]);
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

    $(".js-user--div").click(function () {
        // reference for the switch
        var clicked = $(this).attr("data-conversation");
        // change active user div
        $(".js-user--div").removeClass("active");
        $(".js-user--div[data-conversation='" + clicked + "']").addClass(
            "active"
        );
        // change active convo
        $(".js-conversation").removeClass("active");
        $(".js-conversation[data-conversation='" + clicked + "']").addClass(
            "active"
        );
        messageDivActive = $(".js-conversation.active .js-content__messages");
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
        if (text) {
            // Refactored:
            msgDisplay(text, true, true);
        }

        // Previously:
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

    /**
     * Display message
     * If text = false it's an automated reply sent by the function itself
     * If sent = false it's a message passed by an array.
     * If reply = false it doesn't trigger the reply function with false text
     * @param {bool} text
     * @param {bool} sent
     * @param {bool} reply
     */
    function msgDisplay(text = false, sent = false, reply = false) {
        var elementNew = $(".js-template .message").clone();

        if (text) {
            if (text !== "") {
                elementNew.children(".message--text").text(text);
                elementNew
                    .children(".message--timestamp")
                    .text(timestampCalc());

                if (sent) {
                    elementNew.addClass("my-message");
                }

                if (reply) {
                    setTimeout(msgDisplay, 1000);
                }
                messageDivActive.append(elementNew);

                // empty input val
                newMessage.val("");
            }
        } else {
            elementNew.children(".message--text").text(answer);
            elementNew.children(".message--timestamp").text(timestampCalc());
            messageDivActive.append(elementNew);
        }
        scrollDown();
    }

    //TODO: NOT WORKING
    function scrollDown() {
        let pixelScroll = $(
            ".js-content__messages .message:last-child"
        ).height();

        messageDivActive.scrollTop(pixelScroll);
        // $(".content__messages--margin").animate(
        //     {
        //         scrollTop: pixelScroll,
        //     },
        //     500
        // );
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

    /**
     *   
  ____ ___ ____  _____ ____    _    ____  
 / ___|_ _|  _ \| ____| __ )  / \  |  _ \ 
 \___ \| || | | |  _| |  _ \ / _ \ | |_) |
  ___) | || |_| | |___| |_) / ___ \|  _ < 
 |____/___|____/|_____|____/_/   \_\_| \_\
                                          
     */

    //  Searchbar logic
    searchBar.keyup(function () {
        let searchInput = $(this).val().toLowerCase().trim();
        // if (searchInput != "") {
        //     sidebar.children().hide();
        //     for (let i = 0; i < userList.length; i++) {
        //         if (userList[i].includes(searchInput)) {
        //             // nth-child solution
        //             let selectedUser = $(
        //                 ".js-user--div:nth-child(" + (i + 1) + ")"
        //             );
        //             // eq solution
        //             // sidebar.children().eq(i).show();
        //             selectedUser.show();
        //         }
        //     }
        // } else {
        //     sidebar.children().show();
        // }

        $(".js-sidebar__content .js-user--div").each(function () {
            // Nome contatto attuale nel loop
            var name = $(this).find(".user--username").text().toLowerCase();

            // verifica input con nome contatto
            if (name.includes(searchInput)) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    });
}); // end Doc ready
