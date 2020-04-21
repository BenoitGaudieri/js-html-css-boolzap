$(document).ready(function () {
    // Message references
    let convStart = ["Hello!", "Please ask me anything."];
    let newMessage = $(".js-chat--input");
    let text = newMessage.val();

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
    let allMessageDiv = $(
        ".content__messages--margin .js-conversation .js-content__messages"
    );

    // Initial messages
    for (let i = 0; i < convStart.length; i++) {
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
        msgDisplay(convStart[i], false, true);
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

    // Change active selected conversation and user
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
        // Refresh active div reference
        messageDivActive = $(".js-conversation.active .js-content__messages");
        // Change avatar in header
        $(".content__header--left .user-pic").attr(
            "src",
            "img/avatar_" + (parseInt(clicked) + 1) + ".jpg"
        );
        // Change username
        $(".content__header--left .user--info .user--username").text(
            userList[clicked]
        );
    });

    // Remove message
    $("body").on("click", ".fa-trash-alt", function () {
        $(this).parent().remove();
    });

    /**
     * Searchbar
     */

    //  Searchbar logic
    searchBar.keyup(function () {
        let searchInput = $(this).val().toLowerCase().trim();
        // Previously:
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
        // Refactored:
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

    /**
     * FUNCTIONS
     */

    /**
     * invoke msgDisplay passing the message
     */
    function sendMessage() {
        text = newMessage.val();
        if (text) {
            // Refactored:
            msgDisplay(text, true);
        }
    }

    /**
     * Display message
     * @text {bool} If false it's an automated reply sent by the function itself
     * @sent {bool} If false it's not my-message
     * @init {bool} If true it's the first message
     */
    function msgDisplay(text = false, sent = false, init = false) {
        var elementNew = $(".js-template .message").clone();

        // There is a message input
        if (text) {
            // Double check if text exist
            if (text !== "") {
                elementNew.children(".message--text").text(text);
                elementNew
                    .children(".message--timestamp")
                    .text(timestampCalc());

                // User message class
                if (sent) {
                    elementNew.addClass("my-message");
                    // Bot reply
                    setTimeout(msgDisplay, 1000);
                }

                if (init) {
                    allMessageDiv.append(elementNew);
                } else {
                    messageDivActive.append(elementNew);
                }

                // empty input val
                newMessage.val("");
            }
        } else {
            // Bot side
            // Answer generator
            var answer = "";
            var data = $(".active").attr("data-conversation");
            console.log(data);

            answer += randomFromArr([
                randomFromArr([
                    "What a nice day!",
                    "It's sunny today.",
                    "It's a sunny day out.",
                    "It's such a nice day.",
                    "It's such a great day to be alive!",
                    "This is a happy kind of day.",
                    "I feel great.",
                    "Ooh, I'm feeling fine.",
                    "I'm feeling awesome.",
                    "Hey, this is great!",
                    "I'm so glad I came here.",
                    "I regret nothing!",
                    "Regrets are pointless.",
                    "I have no regrets.",
                    "This is what I wanted!",
                    "Everything's going just fine.",
                    "I can't wait!",
                    "Things are going smoothly.",
                    "I'm just happy to be here.",
                    "Well, this is " +
                        randomFromArr([
                            "unexpected",
                            "awkward",
                            "fun",
                            "just funny",
                            "strange",
                            "interesting",
                            "odd",
                            "peculiar",
                            "weird",
                        ]) +
                        ".",
                    "I know the meaning of life!",
                    "I didn't expect this!",
                    "I'm glad someone understands me.",
                    "I'm glad someone likes me for who I am.",
                    "I love my friends!",
                    "Life is good!",
                    "I could picture myself spending the rest of my life here.",
                    "I should meet new friends!",
                    "I feel loved.",
                    "I feel almighty!",
                    "I matter.",
                    "This place is nice.",
                    "Everybody's great in some way!",
                    "I hope " +
                        randomFromArr(["they", "she", "he"]) +
                        "'ll like me!",
                    "I wonder what happens next!",
                    "It's all going to be alright.",
                    "It'll all be alright in the end. I just know it.",
                    "This is actually okay.",
                    "I love the whole world!",
                    "The world is a big place!",
                    "The world is amazing!",
                    "So it has come to this.",
                    "Well this is an interesting development.",
                    "Let's see what happens next.",
                    "Oh hey. I found me.",
                    "I NEED to blog about this.",
                ]),
                randomFromArr([
                    "I should take a self-help course!",
                    "I'm doing alright.",
                    "My job is pretty fulfilling.",
                    "I don't really worry.",
                    "Worrying is pointless!",
                    "This is cooler than I expected!",
                    "Haha, this is just like me.",
                    "Wouldn't it be awesome if I was " +
                        randomFromArr([
                            "a pirate",
                            "a dolphin",
                            "an unicorn",
                            "a panda",
                            "a cyborg",
                            "a robot",
                            "a superhero",
                            "invisible",
                        ]) +
                        "?",
                    "I'm pretty self-confident.",
                    "I'm a pretty big deal.",
                    "I'm pretty extreme.",
                    randomFromArr([
                        "You want a piece of this?",
                        "I'm all business, all the time.",
                        "I vibrate through walls.",
                        "This is going to be gay as hell.",
                        "We're making this happen!",
                    ]),
                    "I mean, wow.",
                    "Yep. Just a regular human person. Nothing to see here.",
                    "I want to become even better!",
                    "I should learn a new " +
                        randomFromArr(["skill", "language"]) +
                        "!",
                    "I hope I'll become a nice old person.",
                    "I kinda miss my youth!",
                    "I should call " +
                        randomFromArr(["her", "him"]) +
                        ' and say "I love you"!',
                    "Maybe I should call my parents?",
                    "You can always better yourself.",
                    "Do I really suck at " +
                        randomFromArr([
                            "singing",
                            "painting",
                            "dancing",
                            "writing",
                            "video-games",
                            "maths",
                        ]) +
                        "?",
                    "I'm secretly " +
                        randomFromArr([
                            "super-hardcore",
                            "perfectly normal",
                            "perfectly ordinary",
                            "peeking over your shoulder right now",
                            "a wizard",
                            "the smartest person in the world",
                            "the wisest person in the world",
                            "the most important person in the world",
                            "a spider",
                            "a robot",
                            "a midget",
                            "a very ancient ghost",
                            "an extra-terrestrial",
                            "a tree",
                            "a flower",
                            "a shark",
                            "a bear",
                            "my own cousin",
                            "an astral monstrosity",
                            "a secret",
                        ]) +
                        "!",
                    "H-here I go!",
                    "This place would look good on fire!",
                    "I don't worry, because I know nothing matters in the end.",
                    "Well, I'm glad nobody can read my mind.",
                ]),
                randomFromArr([
                    "Hmm! I should get",
                    "I know what would be awesome...",
                    "Time for",
                    "I need",
                    "You know what? I need",
                    "Know what I need? I'll tell you - ",
                ]) +
                    " " +
                    randomFromArr([
                        "some new shoes",
                        "a new TV",
                        "a new computer",
                        "a new car",
                        "a bigger house",
                        "a cooler job",
                        "a lover",
                        "more pets",
                        "a makeover",
                        "a good movie",
                        "a nice dinner in town",
                    ]) +
                    "!",
                randomFromArr([
                    "This is the best relationship ever.",
                    "I love being married!",
                    "Marriage isn't as bad as they make it out to be!",
                    "This relationship is awesome!",
                    "I love my family.",
                    "I love doing stuff with my family.",
                ]),
                randomFromArr([
                    randomFromArr([
                        "I really, really like",
                        "I can't get enough of",
                        "I'm going to get more of",
                        "I wonder what they put in",
                    ]) +
                        " " +
                        randomFromArr([
                            "this hamburger",
                            "this steak",
                            "this salad",
                            "this pasta",
                            "this sandwich",
                            "this pizza",
                            "this meal",
                            "this beer",
                            "this soda",
                        ]) +
                        ".",
                    randomFromArr([
                        "Haha, I love that show!",
                        "That show is confusing!",
                        "That show is hilarious.",
                        "That's a silly show, but there's nothing on TV anyway.",
                        "Oooh, my parents used to watch that show!",
                        "There's nothing on TV!",
                        "That movie's plot is hilariously bad.",
                        "I've never seen that movie before!",
                    ]),
                ]),
            ]);
            elementNew.children(".message--text").text(answer);
            elementNew.children(".message--timestamp").text(timestampCalc());
            messageDivActive.append(elementNew);
            // Change last message in user div
            $(".js-user--div.active").find(".user--last-message").text(answer);
        }
        scrollDown();
    }

    /**
     * Scrolldown function
     */
    function scrollDown() {
        let pixelScroll = $(".content__messages--margin").height();

        $(".content__messages--margin").scrollTop(pixelScroll);

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
     * Choose a random array
     * @arr {arr} pass an array as max
     * @min {int} min
     */
    function randomFromArr(arr, min = 0) {
        return arr[
            Math.floor(Math.random() * Math.floor(arr.length - min)) + min
        ];
    }
}); // end Doc ready
