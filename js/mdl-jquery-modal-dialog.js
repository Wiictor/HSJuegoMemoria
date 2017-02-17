function showLoading() {
    // remove existing loaders
    $('.loading-container').remove();
    $('<div id="orrsLoader" class="loading-container"><div><div class="mdl-spinner mdl-js-spinner is-active"></div></div></div>').appendTo("body");

    componentHandler.upgradeElements($('.mdl-spinner').get());
    setTimeout(function () {
        $('#orrsLoader').css({opacity: 1});
    }, 1);
}

function hideLoading() {
    $('#orrsLoader').css({opacity: 0});
    setTimeout(function () {
        $('#orrsLoader').remove();
    }, 400);
}

function showDialog(options) {
    options = $.extend({
        id: 'orrsDiag',
        title: null,
        text: null,
        button:null,
        neutral: false,
        negative: false,
        positive: false,
        cancelable: true,
        contentStyle: null,
        onLoaded: false,
        hideOther: true
    }, options);

    if (options.hideOther) {
        // remove existing dialogs
        $('.dialog-container').remove();
        $(document).unbind("keyup.dialog");
    }

    $('<div id="' + options.id + '" class="dialog-container"><div class="mdl-card mdl-shadow--16dp" id="' + options.id + '_content"><img src="media/win.png" style="position:absolute; width:20%;top:20%;left:1%"></div></div>').appendTo("body");
    var dialog = $('#' + options.id);
    var content = dialog.find('.mdl-card');
    if (options.contentStyle != null) content.css(options.contentStyle);
    if (options.title != null) {
        $('<h5>' + options.title + '</h5>').appendTo(content);
    }
    if (options.text != null) {
        $('<p>' + options.text + '</p>').appendTo(content);
    }
    if(options.button != null){
      var url = "media/botoncontinuar.png";
      var optionsButton = $("<a style='width:25%; margin-left:auto; margin-right:auto;'>"+options.button+"</a>");
      optionsButton.on("click",function (e) {
          e.preventDefault();
          // alert("va");
          $("#boardmusic")[0].pause();
          var audio = document.createElement('audio')
          audio.src = "sounds/Hub_Click.ogg";
          audio.play();
          $(".cartahs").flip(false);
          $("#contenedormenu,#contenedormenu2").show();
             $('#userNav2').show('slide',{direction:'right'},1000);
             $('#userNav').show('slide',{direction:'left'},1000);
             hideDialog(dialog);
      });
      optionsButton.appendTo(content);
    }
    if (options.neutral || options.negative || options.positive) {
        var buttonBar = $('<div class="mdl-card__actions dialog-button-bar"></div>');
        if (options.neutral) {
            options.neutral = $.extend({
                id: 'neutral',
                title: 'Neutral',
                onClick: null
            }, options.neutral);
            var neuButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" id="' + options.neutral.id + '">' + options.neutral.title + '</button>');
            neuButton.click(function (e) {
                e.preventDefault();
                if (options.neutral.onClick == null || !options.neutral.onClick(e))
                    hideDialog(dialog)
            });
            neuButton.appendTo(buttonBar);
        }
        if (options.negative) {
            options.negative = $.extend({
                id: 'negative',
                title: 'Cancel',
                onClick: null
            }, options.negative);
            var negButton = $('<button class="mdl-button mdl-js-button mdl-js-ripple-effect" style="min-width:25%; background:url(\'media/botoncontinuar.png\');background-size:cover;background-repeat:no-repeat;" id="' + options.negative.id + '">' + options.negative.title + '</button>');
            negButton.click(function (e) {
                e.preventDefault();
                if (options.negative.onClick == null || !options.negative.onClick(e))
                    hideDialog(dialog)
            });
            $(document).bind("keyup.dialog", function (e) {
                if (e.which == 13){
                  if (options.positive.onClick == null || !options.positive.onClick(e))
                      hideDialog(dialog);
                  }
            });
            negButton.appendTo(buttonBar);
        }
        if (options.positive) {
            options.positive = $.extend({
                id: 'positive',
                title: 'OK',
                onClick: null
            }, options.positive);
            var posButton = $('<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="background:url(\'media/botoncontinuar.png\');background-size:cover;background-repeat:no-repeat;" id="' + options.positive.id + '">' + options.positive.title + '</button>');
            posButton.click(function (e) {
                e.preventDefault();
                if (options.positive.onClick == null || !options.positive.onClick(e))
                    hideDialog(dialog)
            });
            $(document).bind("keyup.dialog", function (e) {
                if (e.which == 13){
                  if (options.positive.onClick == null || !options.positive.onClick(e))
                      hideDialog(dialog);
                  }
            });
            posButton.appendTo(buttonBar);
        }
        buttonBar.appendTo(content);
    }
    componentHandler.upgradeDom();
    if (options.cancelable) {
        dialog.click(function () {
            hideDialog(dialog);
        });
        $(document).bind("keyup.dialog", function (e) {
            if (e.which == 27)
                hideDialog(dialog);
        });
        content.click(function (e) {
            e.stopPropagation();
        });
    }
    setTimeout(function () {
        dialog.css({opacity: 1});
        if (options.onLoaded)
            options.onLoaded();
    }, 1);
}

function hideDialog(dialog) {
    $(document).unbind("keyup.dialog");
    dialog.css({opacity: 0});
    setTimeout(function () {
        dialog.remove();
    }, 400);
}
