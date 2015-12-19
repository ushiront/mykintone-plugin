jQuery.noConflict();

(function($, PLUGIN_ID) {
    "use strict";

    $(document).ready(function() {

        var terms = {
            'en': {
                'loadpage_view': 'Viewname',
                'loadpage_view_title': 'Viewname',
                'loadpage_view_name_view': 'View',
                'loadpage_view_name_report': 'Report',
                'loadpage_view_name_detail': 'Detail',
                'pageload_view_description': 'Select the screen you want to regularly update',
                'loadpage_time_title': 'Time',
                'error': 'Error: ',
                'plugin_submit': '     Save   ',
                'plugin_cancel': '     Cancel   ',
                'required_field': 'Required field is empty.',
                'number_field': 'Number has not been entered.'
            },
            'ja': {
                'loadpage_view': '画面',
                'loadpage_view_title': '画面',
                'loadpage_view_name_view': 'レコード一覧',
                'loadpage_view_name_detail': 'レコード詳細',
                'loadpage_view_name_report': 'グラフ',
                'loadpage_view_description': '定期的に更新する画面を選択します。',
                'loadpage_time': '30',
                'loadpage_time_title': '更新する間隔（秒）',
                'error': 'エラー: ',
                'plugin_submit': '     保存   ',
                'plugin_cancel': '  キャンセル   ',
                'required_field': '必須項目が入力されていません。',
                'number_field': '数字が入力されていません。'
            }
        };

        // To switch the display by the login user's language (English display in the case of Chinese)
        var lang = kintone.getLoginUser().language;
        var i18n = (lang in terms) ? terms[lang] : terms['en'];

        var configHtml = $('#loadpage-plugin').html();
        var tmpl = $.templates(configHtml);
        $('div#loadpage-plugin').html(tmpl.render({'terms': i18n}));

        // Get the plug-in information to set the definition data
        var config = kintone.plugin.app.getConfig(PLUGIN_ID);
        config['loadpage_view'] += $('#loadpage-plugin-view').val(config['loadpage_view']);
        config['loadpage_time'] += $('#loadpage-plugin-time').val(config['loadpage_time']);

        // Save the value
        $('#plugin_submit').click(function() {

            var loadpage_view = $('#loadpage-plugin-view').val();
            var loadpage_time = $('#loadpage-plugin-time').val();

            // Check the required fields
            if (loadpage_view === '') {alert(i18n.required_field); return; }
            if (loadpage_time === '') {alert(i18n.required_field); return; }

            // Set the definition data
            config['loadpage_view'] = loadpage_view;
            config['loadpage_time'] = loadpage_time;
            kintone.plugin.app.setConfig(config);
        });

        // Clear the value
        $('#plugin_cancel').click(function() {
            history.back();
        });
    });
})(jQuery, kintone.$PLUGIN_ID);
