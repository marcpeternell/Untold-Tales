window.onload = function () {

    const defaultChar = "Stromboli";

    const body = document.getElementById('body');

    let url = new URL(window.location.href);
    let getChar = url.searchParams.get('char');

    let stories_json;

    function loadJSON(callback) {
        let xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', '../assets/stories/stories.json', false);
        xobj.onreadystatechange = function () {
            if (xobj.readyState == 4 && xobj.status == "200") {
                // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
                callback(xobj.responseText);
            }
        };
        xobj.send(null);
    }

    loadJSON((response) => {
        // Parse JSON string into object
        stories_json = JSON.parse(response);
        filterCharResponse(stories_json);
    });

    function filterCharResponse(json) {
        let obj = json['charakter'];
        let setChar = defaultChar;
        for (let i = 0; i < obj.length; i++) {
            //check if there is a char in the URl, if not set it to default Char
            if (obj[i].name == getChar) {
                setChar = getChar;
            }
        }
        //Append HTML to body with the right Asset
        insertHTML(setChar);
    }

    function insertHTML(char) {
        body.insertAdjacentHTML('afterbegin', '<a-scene embedded\n' +
            '         arjs="debugUIEnabled: false; sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960"\n' +
            '         vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"\n' +
            '         artoolkit="sourceType: webcam;"\n' +
            '         outline\n' +
            '         antialias="true">\n' +
            '    <a-assets>\n' +
            '        <a-asset-item\n' +
            '                id="asset"\n' +
            '                src="../assets/chars/' + char + '/' + char + '.gltf"\n' +
            '        ></a-asset-item>\n' +
            '    </a-assets>\n' +
            '    <a-marker type="pattern" url="../assets/images/arjs/pattern/sae.patt">\n' +
            '        <a-entity light="type: point;\n' +
            '        color: #fff;\n' +
            '        distance: 50;\n' +
            '        intensity: 2.5;"\n' +
            '                  position="0 5 0 "></a-entity>\n' +
            '        <a-entity\n' +
            '                id="directionaltarget"\n' +
            '                rotation="-90 90 -90"\n' +
            '                scale="1 1 1"\n' +
            '                animation-mixer="clip: Idle"\n' +
            '                position="0 0 1"\n' +
            '                gltf-model="#asset"\n' +
            '        ></a-entity>\n' +
            '\n' +
            '    </a-marker>\n' +
            '    <a-entity camera></a-entity>\n' +
            '</a-scene>\n')
    }
}
