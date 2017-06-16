/*
 * Sample program
 * Copyright (c) 2015
 *
 * Licensed under the MIT License
 */

(function(PLUGIN_ID) {
    "use strict";

    var LOAD_VIEWTYPE, LOAD_TIME;
    var conf;

    // Use the plug-in.
    if (PLUGIN_ID) {
        conf = kintone.plugin.app.getConfig(PLUGIN_ID);
        if (!conf) { return null; }

        LOAD_VIEWTYPE = conf['loadpage_view'];
        LOAD_TIME = parseInt(conf['loadpage_time'], 10);
    } else {
        LOAD_VIEWTYPE = "Report";
        LOAD_TIME = 300;
    }

    var ev;
    switch (LOAD_VIEWTYPE) {
        case 'View':
            ev = "app.record.index.show";
            break;
        case 'Detail':
            ev = "app.record.detail.show";
            break;
        case 'Report':
            ev = "app.report.show";
            break;
        default:
            ev = null;
            break;
    }

    kintone.events.on(ev, function(event) {

        setTimeout(function() {
            location.reload();
        }, LOAD_TIME * 1000);
    });

})(kintone.$PLUGIN_ID);
