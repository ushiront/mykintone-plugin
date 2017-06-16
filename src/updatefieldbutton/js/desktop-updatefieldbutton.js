/*
 * Sample program
 * Copyright (c) 2015
 *
 * Licensed under the MIT License
 */

(function(PLUGIN_ID) {

    "use strict";

    var appId = kintone.app.getId();
    var recId;
    var UPDATE_FIELD;

    // Update field data
    function setRecord(valContent) {

        var upData = {};
        upData[UPDATE_FIELD] = {};
        upData[UPDATE_FIELD]['value'] = valContent;

        kintone.api(kintone.api.url('/k/v1/record', true), 'PUT', {app: appId, id: recId, record: upData},
        function(resp) {
            location.reload();
        }, function(resp) {
            alert('Error');
        });
    }

    // Create field option button
    function createButton(valText, flgDisabled) {
        var elButton = document.createElement("button");
        elButton.className = 'kintoneplugin-button-normal';
        elButton.disabled = flgDisabled;
        elButton.disabled ? elButton.className = 'kintoneplugin-button-disabled' : '';
        elButton.style.minWidth = '50px';
        elButton.appendChild(document.createTextNode(valText));

        elButton.addEventListener("click", function() {
            if (confirm('"' + elButton.textContent + '" に更新しますか？\n編集中のコメントは保存されません。')) {
                setRecord(elButton.textContent);
            } else {
                return null;
            }
        });
        return elButton;
    }

    var events = ['app.record.detail.show'];
    kintone.events.on(events, function(event) {

        var conf;

        // Use the plug-in.
        if (PLUGIN_ID) {
            conf = kintone.plugin.app.getConfig(PLUGIN_ID);
            if (conf) {
                UPDATE_FIELD = conf['updateFieldTitle'];
            }
        // Set when utilized in JavaScript read without using a plug-in.
        } else {
            UPDATE_FIELD = "Priority";
        }

        var record = event.record;
        recId = record['$id']['value'];

        // Create dropdown-options
        kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', {app: appId}, function(resp) {

            var df = document.createElement('div');
            df.style.marginLeft = '16px';

            for (var key in resp.properties) {
                if (!resp.properties.hasOwnProperty(key)) { continue; }
                var prop = resp.properties[key];

                if (prop['code'] === UPDATE_FIELD) {

                    // Field label
                    var elLabel = document.createElement("span");
                    df.appendChild(elLabel.appendChild(
                        document.createTextNode('Change of "' + prop['label'] + '" : ')));

                    var valOptions = Object.keys(prop['options']);
                    for (var j = 0; j < valOptions.length; j++) {

                        var flgDisabled = false;
                        if (record[UPDATE_FIELD]['value'] === valOptions[j]) {
                            flgDisabled = true;
                        }
                        // Create button
                        df.appendChild(createButton(valOptions[j], flgDisabled));

                        // Append space
                        var elSpace = document.createElement("span");
                        df.appendChild(elSpace.appendChild(document.createTextNode("\u00a0")));
                    }
                }
            }
            kintone.app.record.getHeaderMenuSpaceElement().appendChild(df);
        });
        return event;
    });

})(kintone.$PLUGIN_ID);
