const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const ELASTIC_EMAIL_API_KEY = 'D37645F4D703219D06BDC530999F1BFDC0FF20873B0E8D9BE257FFFE44318089139EC5BA2CA41706398B03A55488B61C';

app.post('/api/feedback', async (req, res) => {
    const { email, message } = req.body;

    try {
        const response = await axios.post('https://api.elasticemail.com/v2/email/send', null, {
            params: {
                apikey: ELASTIC_EMAIL_API_KEY,
                to: email,
                subject: 'Feedback Received',
                bodyText: message,
                from: 'ecostroy00@gmail.com',
            },
        });

        if (response.data.success) {
            res.send('Email sent successfully');
        } else {
            res.status(500).send('Failed to send email: ' + response.data.error);
        }
    } catch (error) {
        res.status(500).send('Error sending email: ' + error.message);
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
