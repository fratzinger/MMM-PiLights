/* global Module */

Module.register('MMM-PiLights',{

    /**
     * Module config defaults
     */
    defaults: {
        ledCount:   64,
        type:       'ws2801', // 'ws2801' or 'lpd8806'
        device:     '/dev/spidev0.0',
        brightness: 1.0, // between 0.0 and 1.0
        notifications: [
            {
                id: 'BUTTONPRESSED',
                animation: {
                    type: 'sequence',
                    name: 'blue_pulse'
                },
            },
        ]
    },

    leds: null,

    /**
     * Starting of the module
     */
    start: function() {
        Log.info('[' + this.name + '] Starting');
        this.sendSocketNotification('START', this.config);
    },

    /**
     * @param {String} notification
     * @param {*}      payload
     */
    notificationReceived: function(notification, payload) {
        if (this.config && this.config.notifications) {
            for (i = 0; i < this.config.notifications.length; i++) {
            var noti = this.config.notifications[i];
            if (notification === noti.id)
            {
		var ani = noti.animation;
                this.sendSocketNotification(ani.type, ani.name);
                break;
            }

            }
        }
        if (notification === 'PILIGHTS_SEQUENCE') {
            this.sendSocketNotification("SEQUENCE", payload);
        }
    },

    /**
     * @returns {*}
     */
    getDom: function() {
        //return null;
        return document.createElement('div');
    },

    /**
     * Fade's the LED's in and out
     * @param r
     * @param g
     * @param b
     * @param speed
     */
    pulseColor: function(r, g, b, speed) {

    },
});
