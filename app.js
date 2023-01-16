const express = require('express');
const winston = require("winston");

const app = express();
app.use(express.json());

const logConfiguration = {
    'transports': [
        new winston.transports.Console()
    ]
};
const LOGGER = winston.createLogger(logConfiguration);

app.get("/axischub/dlr", (req, res) => {

    LOGGER.info("DLR REQUEST BODY");
    LOGGER.info("============================");
    LOGGER.info(req.body);

    LOGGER.info("DLR REQUEST HEADERS");
    LOGGER.info("===========================");
    LOGGER.info(req.headers);

    res.status(200).send({
        "dataArray": [
            {
                "transaction_id": "1061e80104bf-7004-4bc5-a146-a69eb535be80",
                "account_type": "tanla",
                "channel": "sms",
                "receiver_id": "919164504025",
                "sender_id": "AXISBK",
                "message_id": "10982340395082337490",
                "evt_status": "DELIVRD",
                "evt_status_code": "0",
                "evt_time": "2022-06-13 10:29:51",
                "evt_comments": "1,DELIVRD"
            }
        ],
        "errdesc": "",
        "errorCode": 200,
        "status": "ACCEPT"
    }
    );
});

app.post("/axischub/notif", (req, res) => {
    LOGGER.info("NOTIFICATION REQUEST BODY");
    LOGGER.info("============================");
    LOGGER.info(req.body);

    LOGGER.info("NOTIFICATION REQUEST HEADERS");
    LOGGER.info("===========================");
    LOGGER.info(req.headers);
    res.status(200).send({
        "ackId": 3165213167131330294,
        "errdesc": "",
        "errorCode": 0,
        "status": "ACCEPT"
    });
})

app.post("/axissso/validate-sso", (req, res) => {

    LOGGER.info("SSO REQUEST BODY");
    LOGGER.info("============================");
    LOGGER.info(req.body);

    LOGGER.info("SSO REQUEST HEADERS");
    LOGGER.info("===========================");
    LOGGER.info(req.headers);

    res.status(200).send(
        {
            "response": {
                "header": {
                    "subHeader": {
                        "requestUUID": "32076477-0ef2-47f8-9e71-43c714f3a111",
                        "serviceRequestId": "AE.FPAY.CIB.SDBDP.001",
                        "serviceRequestVersion": "1.0",
                        "channelId": "FPAY"
                    }
                },
                "body": {
                    "validateSsoResponse": {
                        "encryptedResponse": "I4qyavd5mtUJNeJgH08f2iYucm3zWa1E+3IAQqdYRLmhRMBXsmVQG2xqBpGCgwvBRRdcmArBCmVu2aaDNr9MjYLyEhQygQIb4fO4IKgw/1ZW/Jm0" // VALID
                        // "encryptedResponse": "58BSK5AVvYDcwWV7F/z3xuUeMnWrPpJtEA7p89oGSla4McUiAH6Blvpwqam/+3tTvpv+Li6HSuJX\r\nhwNn0Vf7rpfLOUBWB15TGcO6HDs1Do1w9o2n\r\n"   // INVALID
                    }
                }
            }
        }

    );
})





const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    LOGGER.info(`Server started @ http://localhost:${PORT}`);
})
