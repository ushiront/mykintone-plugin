jQuery.noConflict();

(function($, PLUGIN_ID) {
    "use strict";

    $(document).ready(function() {

        var terms = {
            'en': {
                'updateFieldTitle': 'Title',
                'updateFieldTitle_label': 'Field of title.',
                'updatefieldTitle_description': 'Please select the fields you want to update the record detail screen.',
                'error': 'Error: ',
                'plugin_submit': '     Save   ',
                'plugin_cancel': '     Cancel   ',
                'required_field': 'Required field is empty.'
            },
            'ja': {
                'updateFieldTitle': '更新するフィールド',
                'updatefieldTitle_label': '更新するフィールド',
                'updatefieldTitle_description': 'レコード詳細画面で更新するフィールドを選択してください。',
                'error': 'エラー: ',
                'plugin_submit': '     保存   ',
                'plugin_cancel': '  キャンセル   ',
                'required_field': '必須項目が入力されていません。'
            }
        };

        // To switch the display by the login user's language (English display in the case of Chinese)
        var appId = kintone.app.getId();
        var lang = kintone.getLoginUser().language;
        var i18n = (lang in terms) ? terms[lang] : terms['en'];

        var configHtml = $('#updatefieldbutton-plugin').html();
        var tmpl = $.templates(configHtml);
        $('div#updatefieldbutton-plugin').html(tmpl.render({'terms': i18n}));

        // Set in the item selection box retrieves the form information design
        kintone.api(kintone.api.url('/k/v1/preview/app/form/fields', true), 'GET', {'app': appId}, function(resp) {

            for (var key in resp.properties) {
                var prop = resp.properties[key];

                switch (prop['type']) {
                    case 'RADIO_BUTTON':
                    case 'DROP_DOWN':
                        $('#updatefieldbutton-plugin-title')
                        .append($('<option>').text(prop['label']).val(prop['code']));
                        break;
                }
            }

            // Get the plug-in information to set the definition data
            var config = kintone.plugin.app.getConfig(PLUGIN_ID);
            (config['updateFieldTitle'] && $('#updatefieldbutton-plugin-title')).val(config['updateFieldTitle']);
        });

        // Save the value
        $('#plugin_submit').click(function() {

            var updateFieldTitle = $('#updatefieldbutton-plugin-title').val();

            // Check the required fields
            if (updateFieldTitle === '') {alert(i18n.required_field); return; }

            // Set the definition data
            var config = {};
            config['updateFieldTitle'] = updateFieldTitle;

            kintone.plugin.app.setConfig(config);

        });

        // Clear the value
        $('#plugin_cancel').click(function() {
            history.back();
        });

    });
})(jQuery, kintone.$PLUGIN_ID);
