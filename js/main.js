var svgWrapper = $('.svg-wrapper'),
    buttons = $('.button'),
    infopane = $('.infopane'),
    infopaneText = $('.infopane__text'),
    preloader = $('.preloader');

d3.tsv('data/examples.tsv', function (data) {
    var structData = {};

    for (var i = 0; i < data.length; i++) {
        var $examples = $('<ul>').addClass('examples');

        for (var j = 1; j < 6; j++) {
            $examples.append($('<li>').addClass('example').html('[' + data[i]['q' + j] + ']'));
        }

        structData[fixNames(data[i].theme)] = $examples;
    }

    preloader.hide();

    buttons.on('click', function () {
        var $this = $(this);

        $this.addClass('button_pressed').siblings().removeClass('button_pressed');

        preloader.show();

        svgWrapper.load($this.data().url, setExamples);
    });

    function setExamples() {
        var svgHeight = $('.svg-wrapper').height();

        preloader.hide();

        $('#Layer_2 > g, #Layer_5 > g').on('mouseover', function (e) {
            var curText = $(this).find('text').text().toLowerCase().trim(),
                curTop = e.pageY,
                infopaneTop = svgHeight < 415 ? 0 : curTop < svgHeight * 0.75 ? curTop + 50 : curTop - 200;
            
            if (structData[curText.toLowerCase()] === undefined) {
                return;
            }
            
            infopaneText.html(structData[curText]);
            
            infopane
                .css('top', infopaneTop)
                .show();
        }).on('mouseout', hideInfopane);
    }

    buttons[0].click();

    infopane.on('click', hideInfopane);

    infopane.css({
        'left': $('.svg-wrapper').width() / 2,
        'transform': 'translate(-50%,0)'
    });

    function hideInfopane() {
        infopane.hide();
    }
});

function fixNames(s) {
    return s
        .replace('С‚РІ Рё СЂР°РґРёРѕ', 'С‚РµР»РµРІРёРґРµРЅРёРµ Рё СЂР°РґРёРѕ')
        .replace('РїСЂРѕРёР·РІРѕРґСЃС‚РІРѕ Рё СЃС‚СЂРѕРёС‚РµР»СЊСЃС‚РІРѕ', 'РїСЂРѕРёР·РІРѕРґСЃС‚РІРѕ')
        .replace('РРў', 'it')
        .replace('СЌР»РµРєС‚СЂРѕРЅРёРєР° Рё Р±С‹С‚РѕРІР°СЏ С‚РµС…РЅРёРєР°', 'СЌР»РµРєС‚СЂРѕРЅРёРєР°');
}
