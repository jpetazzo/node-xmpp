var xmpp = require('node-xmpp');

// http://xmpp.org/extensions/xep-0160.html
exports.name = "mod_offline";

exports.default = {
};

function RecipientOffline(client) {
    client.on('recipient_offline', function(stanza) {
        stanza.attrs.type = "error";
        stanza.attrs.from = new xmpp.JID(stanza.attrs.to).bare();
        stanza.attrs.to = client.jid;
        stanza.c("error", {type: "cancel", code: "503"}).c("service-unavailable", {xmlns: "urn:ietf:params:xml:ns:xmpp-stanzas"});
        client.send(stanza)
    });
}

exports.mod = RecipientOffline;

