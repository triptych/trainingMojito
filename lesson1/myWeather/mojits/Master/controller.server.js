/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Master', function(Y, NAME) {

/**
 * The Master module.
 *
 * @module Master
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.mojito.controllers[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */

        index: function(ac) {

            //Retrieving GET params
            var geoParams = ac.params.url();

            if (geoParams.longitude && geoParams.latitude) {
                var yqlModel = ac.models.MasterModelWeatherYQL;

                yqlModel.getData(geoParams, function (err, data) {
                    if (err) {
                        ac.error(err);
                        return;
                    }
                    ac.done(data);
                });
            } else {
                ac.done({});
            }
        },
        getWeatherJSON: function(ac) {
            ac.models.MasterModelWeatherYQL.getData({geo:'data'}, function (err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.done(data, 'json');
            });
        },
        getWeather: function () {
            
        }

    };

}, '0.0.1', {requires: ['mojito', 'MasterModelWeatherYQL']});