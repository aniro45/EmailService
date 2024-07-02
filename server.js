import dotenv from 'dotenv';
dotenv.config();
import app from './app.js'
import { initializeEmailService } from './configEmailService.js';

initializeEmailService();

const port = process.env.PORT || 5570; 
app.listen(port, (req, res) => {
    console.log(`Email service is running on port ${port}`);
});
