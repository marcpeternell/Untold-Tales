import {charsConfig} from "../config/charsConfig";

window.onload = function () {

    const body = document.getElementById('body_arjs');

    let url = new URL(window.location.href);
    //let getChar = url.searchParams.get('char');

    let getChar = url.pathname.split("/");

    //set default display char to config char
    let setChar = charsConfig.main;

    //if a users go to the arjs website without the qrcode a default char has to be set
    if (getChar[2] != '' && getChar[2] != null) {
        //Loop through chars object and check if the char form the url exists, if it does not exist, setchar will not be changed
        for (let i in charsConfig) {
            if (charsConfig[i].asset.toLowerCase() === getChar[2].toLowerCase()) {
                setChar = charsConfig[i];
            }
        }
    }
    insertHTML(setChar);

    //select parent elements
    const buttonWrapper = document.getElementById('button_wrapper');
    const directionaltarget = document.getElementById('directionaltarget');

    //this function is needed to danymicaly load the chars
    function insertHTML(assetData) {

        console.log('inser: ', assetData)

        //load the gltf FIle
        //jquery is used because its easy async load of the gltf file
        $.getJSON('../assets/chars/' + assetData.asset + '/' + assetData.asset + '.gltf', function (json) {
            //loop all animations
            json.animations.forEach((element) => {
                //create button elements
                let li = document.createElement('button');
                li.setAttribute('class', 'animationBtn');
                //append them to the dom element
                li.appendChild(document.createTextNode(element.name));
                //add devent listener to change the animation of the asset
                li.addEventListener("click", function () {
                    //animation-mixer defines the animation that is played
                    directionaltarget.setAttribute('animation-mixer', 'clip: ' + element.name);
                });
                //append all buttons to DOM
                buttonWrapper.appendChild(li);
            })
        });


        body.insertAdjacentHTML('beforeend', '<a-scene embedded\n' +
            '         arjs="debugUIEnabled: false; sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960"\n' +
            '         vr-mode-ui="enabled: false" device-orientation-permission-ui="enabled: false"\n' +
            '         artoolkit="sourceType: webcam;"\n' +
            '         outline\n' +
            '         antialias="true">\n' +
            '    <a-assets>\n' +
            '        <a-asset-item\n' +
            '                id="asset"\n' +
            '                src="../assets/chars/' + assetData.asset + '/' + assetData.asset + '.gltf"\n' +
            '        ></a-asset-item>\n' +
            '    </a-assets>\n' +
            '    <a-marker type="pattern" url="../assets/images/arjs/pattern/pattern-arjs.patt">\n' +
            '        <a-entity light="type: ambient;\n' +
            '        color: #fff;\n' +
            '        distance: 100;\n' +
            '        intensity: '+ assetData.ar.lightIntensity +';"\n' +
            '                  position="'+ assetData.ar.lightPosition + '"></a-entity>\n' +
            '        <a-entity\n' +
            '                id="directionaltarget"\n' +
            '                rotation="'+ assetData.ar.rotation + '"\n' +
            '                scale="'+ assetData.ar.scale + '"\n' +
            '                animation-mixer="clip: Neutral"\n' +
            '                position="'+ assetData.ar.position + '"\n' +
            '                gltf-model="#asset"\n' +
            '        ></a-entity>\n' +
            '\n' +
            '    </a-marker>\n' +
            '    <a-entity camera></a-entity>\n' +
            '</a-scene>\n')
    }
};
