# Desarrollo de un chatbot multilingüe para pedir unas tapas a través de WhatsApp

## Ficheros de acompañamiento al artículo del blog: https://www.twilio.com/blog/chat-multilingue-con-whatsapp-y-dialogflow

* tapas-bar/functions/inbound-message-stage0.js

Twilio function que responde a un mensaje de entrada de Whatsapp

* tapas-bar/functions/inbound-message-stage1.js


Twilio function que responde a un mensaje de entrada de Whatsapp según el idioma que se ha detectado en el mensaje

* tapas-bar/functions/inbound-message-stage2.js


Twilio function que responde a un mensaje de entrada de Whatsapp usando Google Dialogflow para reconocer la intención y según el idioma que se ha detectado en el mensaje

* Camarero/ y Camarero.zip


Ficheros que se pueden importar en Dialog Flow para el ejemplo

## Ficheros de acompañaiento del webinar: https://ahoy.twilio.com/devgen_webinar_gs_studio_dialog_esp_EMEA-1

Una vez desarrollada la función del servico de bot, éste se puede integrar en el Contact Centre Twilio Flex como fase previa al paso a un agente. El chatbot se añadirá al Studio asociado al canal de Whatsapp. Para añadir la sandbox de Whatsapp (o tu propio número) sigue los pasos aquí indicados: https://www.twilio.com/blog/whatsapp-and-flex-in-minutes

* tapas-bar/functions/inbound-message-flex.js


Twilio function que responde a un mensaje de entrada de Whatsapp usando Google Dialogflow para reconocer la intención y según el idioma que se ha detectado en el mensaje. Esta versión está preparada para devolver un JSON que pueda ser utilizado por Studio; con la variable <i>escalated</i> para pasar al agente.

* studio/TapasFlow.json


Fichero que se puede importar en Twilio Studio - Cambiar el módulo RunFunction por tu propia versión de <i>inbound-message-flex.js</i>
