/**
 * @fileOverview 路由
 * @author 行列
 * @version 1.0
 */
define('magix/router', ["magix/magix", "magix/event"], function(Magix, Event) {
    //todo dom event;
    eval(Magix.include('../tmpl/router'));
    Router.useState = function() {
        var me = Router,
            initialURL = location.href;
        $(WIN).on('popstate', function(e) {
            var equal = location.href == initialURL;
            if (!me.poped && equal) return;
            me.poped = 1;
            console.log('push?', e.type, e.state);
            me.route();
        }, false);
    };
    Router.useHash = function() { //extension impl change event
        $(WIN).on('hashchange', Router.route, false);
    };
    return Router;
});